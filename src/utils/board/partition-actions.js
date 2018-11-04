import board from '@/board'
import Vue from 'vue'
const { Partition } = board

function findPartition(state, guid) {
    return state.partitions.find(x => x.guid === guid)
}

export const mutations = {
    SET_PARTITION_NAME(state, { guid, value }) {
        const targetPartition = state.partitions.find(p => p.guid == guid)
        targetPartition.name = value
    },
    CHANGE_PARTITION_SIZE: (state, { guid, direction, delta }) => {
        const partition = state.partitions.find(p => p.guid === guid)

        if (direction == 'right') {
            partition.width += delta
            if (partition.width <= 0) partition.width = 1
        }
        if (direction == 'left') {
            const startingWidth = partition.width
            partition.width += delta
            if (partition.width <= 0) partition.width = 1

            const finalDelta = startingWidth - partition.width
            partition.pivot.x -= finalDelta
        }

        if (direction == 'up') {
            partition.height += delta
            if (partition.height <= 0) partition.height = 1
        }
        if (direction == 'down') {
            const startingHeight = partition.height
            partition.height += delta
            if (partition.height <= 0) partition.height = 1

            const finalDelta = startingHeight - partition.height
            partition.pivot.y -= finalDelta
        }

        // Remove any conditions referencing a removed cell
        state.sequences.forEach(sequence => {
            sequence.conditions = sequence.conditions.filter(condition => {
                // not referencing this partition, so ignore
                if (
                    !condition.subjectId ||
                    condition.subjectId !== partition.guid
                ) {
                    return true
                }

                const re = /\((\d+), (\d+)\)/g
                const match = re.exec(condition.subject)
                if (match && match.length >= 3) {
                    // Find if cell was removed by alteration
                    const x = parseInt(match[1]) + 1
                    const y = parseInt(match[2]) + 1
                    return x <= partition.width && y <= partition.height
                } else {
                    return true
                }
            })
        })
    },
    CREATE_PARTITION: (state, payload) => {
        // add a new partition
        state.partitions.push(
            new Partition({
                position: payload
            })
        )
    },
    DELETE_PARTITION: (state, payload) => {
        state.partitions = state.partitions.filter(x => x.guid !== payload.guid)

        // Remove any conditions referencing this partition
        state.sequences.forEach(sequence => {
            sequence.conditions = sequence.conditions.filter(
                condition => condition.subjectId !== payload.guid
            )
        })
    },
    MOVE_PARTITION: (state, { guid, delta }) => {
        // find the desired partition
        const partition = findPartition(state, guid)
        partition.position = {
            x: partition.position.x + delta.x,
            y: partition.position.y + delta.y
        }
    },
    SET_PIVOT_POINT: (state, { guid, cell }) => {
        const partition = findPartition(state, guid)

        const oldX = partition.pivot.x
        const oldY = partition.pivot.y

        // set new pivot point
        partition.pivot.x = cell.x
        partition.pivot.y = cell.y

        // calculate change
        const deltaX = partition.pivot.x - oldX
        partition.position.x += deltaX
        const deltaY = partition.pivot.y - oldY
        partition.position.y += deltaY
    }
}

export const actions = {
    MOVE_PARTITION({ state, commit, rootState }, payload) {
        // are we in the default state?
        const isDefaultState = rootState.selectedBoardStateIndex === 0
        // calculate desired delta
        const delta = {
            x:
                payload.direction == 'right' || payload.direction == 'left'
                    ? payload.delta
                    : 0,
            y:
                payload.direction == 'up' || payload.direction == 'down'
                    ? payload.delta
                    : 0
        }

        if (isDefaultState) {
            // if we are in the default state,
            // move the starting point of the partition
            commit('MOVE_PARTITION', {
                guid: payload.guid,
                delta
            })
        } else {
            // otherwise, change the delta of the partition
            // in this state
            const currentState = state.states[rootState.selectedBoardStateIndex]

            // find index of current partition
            let currentDeltaIndex = currentState.deltas.findIndex(
                x => x.guid === payload.guid
            )

            if (currentDeltaIndex !== -1) {
                // console.log(currentState.deltas[currentDeltaIndex].y)
                const old = currentState.deltas[currentDeltaIndex]
                // if we found it, modify the saved delta
                Vue.set(currentState.deltas, currentDeltaIndex, {
                    x: old.x + delta.x,
                    y: old.y + delta.y,
                    guid: old.guid
                })
                // currentState.deltas[currentDeltaIndex].x += delta.x
                // currentState.deltas[currentDeltaIndex].y += delta.y
                // console.log(currentState.deltas[currentDeltaIndex].y)
            } else {
                // if not, create a saved delta
                currentState.deltas.push({
                    guid: payload.guid,
                    x: delta.x,
                    y: delta.y
                })
            }
        }
    }
}
