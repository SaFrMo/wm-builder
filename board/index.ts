import Partition from './partition'
import BoardState from './board-state'
import BoardSequence from './board-sequence'

const entities = [
    {
        name: 'Wall',
        description: 'A standard wall.'
    },
    {
        name: 'Empty Space',
        description: 'An empty space. Will not be rendered in-game.'
    }
]

export default { Partition, BoardState, BoardSequence, entities }
