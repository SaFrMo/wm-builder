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

            <!-- Comparator -->
            <select v-model="value">
                <option disabled value="">Value</option>
                <option
                    v-for="(possibleValue, i) in cmpValues"
                    :key="i">
                    {{ possibleValue }}
                </option>
            </select>

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
                subjects: ['sequence', 'sequence step'],
                comparators: ['equals', 'less than', 'greater than'],
                values: ['anything', 'number'],
                booleans: ['and', 'or']
            },
            subject: '',
            comparator: '',
            value: ''
        }
    },
    methods: {
        addCondition() {
            this.$emit('add-condition', {
                subject: this.subject,
                comparator: this.comparator,
                value: this.value
            })

            this.subject = this.comparator = this.value = ''
        }
    },
    computed: {
        // TODO: Start here - build out dynamic conditions

        cmpSubjects() {
            const output = [].concat(this.conditions.subjects)

            return output
        },
        cmpComparators() {
            const output = [].concat(this.conditions.comparators)

            return output
        },
        cmpValues() {
            const output = [].concat(this.conditions.values)

            return output
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
}
</style>
