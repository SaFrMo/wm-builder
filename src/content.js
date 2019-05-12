// meta key presets available to entities in wm-builder
export const entityMetaPresetKeys = [
    { name: 'HP', value: 'hp' },
    { name: 'AP', value: 'ap' },
    { name: 'Name', value: 'name' },
    {
        name: 'Description',
        value: 'description'
    },
    { name: 'Sequences', value: 'sequences' },
    { name: 'Behavior', value: 'behavior' },
    { name: 'Enemy Selector', value: 'enemy-selector' }
]

// preset item behaviors
export const entityBehaviors = [{ label: 'Stationary', value: 'stationary' }]

// preset enemy types
export const enemyTypes = [
    { label: 'Bulwark', value: 'bulwark' },
    { label: 'Guard', value: 'guard' },
    { label: 'Turret', value: 'turret' }
]

// preset player-usable unit types
export const playerItems = [
    { label: 'RAI', value: 'rai-1.0-prefab' },
    { label: 'M-DOS', value: 'farmer-1.0' }
]
