// Condition for a BoardSequence
interface Condition {
    subject: string
    subjectId: number
    comparator: string
    value: string
    number: number
    triggerType: string
    onComplete: string
}

interface ConditionGroup {
    conditions: Array<Condition>
    operator: Operator
}
