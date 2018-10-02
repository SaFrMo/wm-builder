// Arbitrary string-string KV pair
interface KeyValuePair {
    key: string
    value: string
}

// Condition for a BoardSequence
interface Condition {}

// Generic x-y Vector2
interface Vector2 {
    x: number
    y: number
}

// Contains the ID of a Partition and its desired Delta
// (used in BoardStates to indicate partition movement)
interface Delta {
    id: string
    x: number
    y: number
}
