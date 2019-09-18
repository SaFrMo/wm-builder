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
    { name: 'Enemy Selector', value: 'enemy-selector' },
    { name: 'Spawn Type', value: 'spawn-type' },
    { name: 'Spawn Frequency', value: 'spawn-frequency' },
    { name: 'Spawn Location', value: 'spawn-location' },
    { name: 'Spawn Capacity', value: 'spawn-capacity' },
    { name: 'Spawn HP', value: 'spawn-hp' },
    { name: 'Spawn AP', value: 'spawn-ap' },
    { name: 'Lock ID', value: 'lock-id' }
]

// preset item behaviors
export const entityBehaviors = [{ label: 'Stationary', value: 'stationary' }]

// preset enemy types
export const enemyTypes = [
    { label: 'Bulwark', value: 'bulwark' },
    { label: 'Guard', value: 'guard' },
    { label: 'Turret', value: 'turret' },
    { label: 'Spawner', value: 'spawner' },
    { label: 'Lock', value: 'lock' },
    { label: 'Alarm Raiser', value: 'alarm-raiser' }
]

// preset player-usable unit types
export const playerItems = [
    { key: 'RAI', value: 'rai-1.0-prefab' },
    { key: 'M-DOS', value: 'farmer-1.0' }
]

// locations
export const locations = [
    { label: 'N', value: 'n' },
    { label: 'S', value: 's' },
    { label: 'E', value: 'e' },
    { label: 'W', value: 'w' }
]
