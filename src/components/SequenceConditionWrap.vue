<template>

    <ul class="sequence-condition-wrap">

        <li>
            <h3>Conditions (All must be true to start sequence)</h3>

        </li>

        <!-- Conditions -->
        <li
            v-for="(condition, i) in sequence.conditions"
            :key="i"
            class="single-condition">

            <span class="subject">{{ condition.subject }}</span>
            <span class="comparator">{{ condition.comparator }}</span>
            <span class="value">{{ condition.value }}</span>
            <span
                v-if="showNumber(condition)"
                class="number">
                {{ condition.number }}
            </span>

            <span class="remove-wrap">
                <button
                    @click="$store.commit('REMOVE_CONDITION', { sequence, index: i })"
                    class="remove">
                    Remove
                </button>
            </span>

        </li>

        <!-- Add condition -->
        <li class="add-condition-wrap">

            <!-- Subject -->
            <select v-model="subject">
                <option disabled value="">Subject</option>
                <option
                    v-for="(possibleSubject, i) in cmpSubjects"
                    :key="i">
                    {{ possibleSubject }}
                </option>
            </select>

            <!-- Comparator -->
            <select v-model="comparator">
                <option disabled value="">Comparator</option>
                <option
                    v-for="(possibleComparator, i) in cmpComparators"
                    :key="i">
                    {{ possibleComparator }}
                </option>
            </select>

            <!-- Value -->
            <select v-model="value">
                <option disabled value="">Value</option>
                <option
                    v-for="(possibleValue, i) in cmpValues"
                    :key="i">
                    {{ possibleValue }}
                </option>
            </select>

            <input
                v-model="number"
                v-if="cmpShowNumber"
                class="number-input"/>

            <!-- Add button -->
            <button class="add-condition" @click="addCondition">Add</button>

        </li>

    </ul>

</template>

<script>
import _differenceWith from 'lodash/differenceWith'

export default {
    props: {
        sequence: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            conditions: {
                subjects: ['Sequence', 'Sequence step', 'Random number'],
                comparators: [
                    'equals',
                    'less than',
                    'greater than',
                    'less than or equal to',
                    'greater than or equal to',
                    'does not equal'
                ],
                values: ['anything', 'number', 'percentage'],
                booleans: ['and', 'or']
            },
            subject: '',
            subjectId: -1,
            comparator: '',
            value: '',
            number: 0
        }
    },
    methods: {
        addCondition() {
            this.$emit('add-condition', {
                subject: this.subject,
                subjectId: this.subjectId,
                comparator: this.comparator,
                value: this.value,
                number: this.number
            })

            this.subject = this.comparator = this.value = ''
            this.number = 0
        },
        showNumber(condition) {
            return (
                condition.value == 'number' || condition.value == 'percentage'
            )
        }
    },
    computed: {
        // TODO: Start here - build out dynamic conditions

        cmpSubjects() {
            // get abbreviated version of all partitions
            const partitionNames = this.$store.state.boardState.partitions.map(
                p => p.name
            )

            // get all cells in all partitions
            const cells = [].concat(
                ...this.$store.state.boardState.partitions.map(p => {
                    const output = []
                    for (let y = 0; y < p.width; y++) {
                        for (let x = 0; x < p.height; x++) {
                            const base = `[${p.name}] (${x}, ${y})`
                            output.push(`${base} occupant`)
                            output.push(`${base} occupant health`)
                            output.push(`${base} occupant AP`)
                        }
                    }
                    return output
                })
            )

            const output = [].concat(
                this.conditions.subjects,
                partitionNames,
                cells
            )

            return output
        },
        cmpComparators() {
            const output = [].concat(this.conditions.comparators)

            return output
        },
        cmpValues() {
            const output = [].concat(this.conditions.values)

            return output
        },
        cmpShowNumber() {
            return this.value == 'number' || this.value == 'percentage'
        },
        cmpPartitionNames() {
            return this.$store.state.boardState.partitions.map(p => {
                return {
                    name: p.name,
                    id: p.guid
                }
            })
        }
    },
    watch: {
        subject(newVal) {
            const partitionName = newVal.match(/\[(.*?)\]/)
            if (partitionName) {
                const partition = this.$store.state.boardState.partitions.find(
                    p => p.name == partitionName[1]
                )
                this.subjectId = partition.guid
            }
        },
        cmpPartitionNames(newVal, oldVal) {
            // find any changed conditions
            const changedConditions = _differenceWith(
                newVal,
                oldVal,
                (x, y) => {
                    return x.id == y.id && x.name == y.name
                }
            )

            // for each condition...
            this.sequence.conditions.forEach((condition, i) => {
                // ...check if we're in the list of changed conditions...
                const changed = changedConditions.find(
                    x => x.id == condition.subjectId
                )
                if (changed) {
                    // ...start a new value for that condition...
                    const newCondition = { ...condition }

                    // ...replace the old name with the new name...
                    newCondition.subject = newCondition.subject.replace(
                        /\[.*?\]/g,
                        `[${changed.name}]`
                    )

                    // ...and replace the old condition with the new condition
                    this.$store.commit('EDIT_CONDITION', {
                        sequence: this.sequence,
                        index: i,
                        condition: newCondition
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.sequence-condition-wrap {
    color: $white;
    list-style: none;
    padding: 0;

    .single-condition {
        display: flex;
        align-items: center;

        & > * {
            margin-bottom: 5px;
        }
        & > * + * {
            margin-left: 5px;
        }
        .remove-wrap {
            flex: 1;
            text-align: right;
        }
    }
    .add-condition-wrap {
        display: flex;
        align-items: center;

        select,
        button {
            flex: 1;
        }
    }
    .add-condition {
        background-color: $safe;
        color: $white;
        padding: 5px 10px;

        &:hover,
        &:focus {
            background-color: $white;
            color: $black;
        }
    }
    .number-input {
        max-width: 70px;
    }
}
</style>
