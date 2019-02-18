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
        meta: [{ key: 'hp', value: '10' }]
    }),

    new Entity({
        name: 'Guard',
        description:
            'A basic guard that moves toward the player and tries to attack them.',
        meta: [{ key: 'hp', value: '10' }]
    })
]
