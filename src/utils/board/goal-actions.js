import board from '@/board'
import Vue from 'vue'
const { Partition } = board
const { Goal } = board

function findPartition(state, guid) {
    return state.partitions.find(x => x.guid === guid)
}

export const mutations = {
    ADD_BOARD_GOAL: state => {
        state.goals.push(new Goal())
    }
}
