<template>

    <ul class="sequence-condition-wrap">

        <li><h3>Conditions</h3></li>

        <!-- Conditions -->

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
export default {
    data() {
        return {
            conditions: {
                subjects: ['Sequence', 'Sequence step'],
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
            comparator: '',
            value: '',
            number: 0
        }
    },
    methods: {
        addCondition() {
            this.$emit('add-condition', {
                subject: this.subject,
                comparator: this.comparator,
                value: this.value,
                number: this.number
            })

            this.subject = this.comparator = this.value = ''
            this.number = 0
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
                            const base = `${p.name} (${x}, ${y})`
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
