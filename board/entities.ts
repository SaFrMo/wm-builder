import Entity from './entity'

export default [
    // Wall
    new Entity({
        name: 'Wall',
        description: 'A standard wall.'
    }),

    // Empty Space
    new Entity({
        name: 'Empty Space',
        description: 'An empty space. Will not be rendered in-game.'
    }),

    new Entity({
        name: 'Goober',
        description: 'A goober with some HP. Like Into the Spider-Verse.',
        meta: [{ key: 'hp', value: '4' }]
    }),

    new Entity({
        name: 'Guard',
        description:
            'A basic guard that moves toward the player and tries to attack them.',
        meta: [{ key: 'hp', value: '3' }]
    }),

    // new Entity({
    //     name: 'Artillery',
    //     description: 'A 2x1 unit with a sliceable weapon to its right.',
    //     meta: [{ key: 'hp', value: '3' }]
    // }),

    new Entity({
        name: 'Data',
        description: 'Data drop revealing one or more Sequences.',
        meta: [{ key: 'sequences', value: '' }]
    }),

    new Entity({
        name: 'Deploy Lock',
        description:
            'A lock that prevents deployment on this space until picked up.',
        meta: [{ key: 'hp', value: '1' }, { key: 'ap', value: '1' }]
    })
]
