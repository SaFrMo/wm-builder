import board from '@/board/'
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
    },
    MOVE_PARTITION: (state, { guid, delta }) => {
        // find the desired partition
        const partition = findPartition(state, guid)
        partition.position = {
            x: partition.position.x + delta.x,
            y: partition.position.y + delta.y
        }
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

            let currentDelta = currentState.deltas[payload.guid]
            if (currentDelta) {
                currentState.deltas[payload.guid].x += delta.x
                currentState.deltas[payload.guid].y -= delta.y
            } else {
                currentState.deltas[payload.guid] = delta
            }
        }
    }
}
