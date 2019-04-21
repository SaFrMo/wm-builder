<template>
    <ul class="condition-wrap">
        <li class="slot">
            <slot />
        </li>

        <li class="boolean">
            <select v-model="boolean">
                <option
                    v-for="(val, i) in conditions.booleans"
                    :key="i"
                    :value="val"
                    v-html="
                        val == 'and' ? 'All must be true' : 'Any can be true'
                    "
                />
            </select>
        </li>

        <!-- Conditions -->
        <li
            v-for="(condition, i) in sequence.conditions"
            :key="i"
            class="single-condition"
        >
            <div class="factors">
                <span class="subject">{{ condition.subject }}</span>
                <span class="comparator">{{ condition.comparator }}</span>
                <span class="value">{{ condition.value }}</span>
                <span v-if="showNumber(condition)" class="number">
                    {{ condition.number }}
                </span>
            </div>

            <div class="meta">
                <span v-if="condition.triggerType"
                    >Activation: {{ condition.triggerType }}.</span
                >
                <span v-if="condition.onComplete"
                    >When complete: {{ condition.onComplete }}.</span
                >
            </div>

            <span class="remove-wrap">
                <button
                    @click="$emit('remove-condition', { index: i })"
                    class="remove"
                >
                    Remove
                </button>
            </span>
        </li>

        <!-- Add condition -->
        <li class="add-condition-wrap">
            <!-- Subject -->
            <select class="subject" v-model="subject">
                <option disabled value="">Subject</option>
                <option v-for="(possibleSubject, i) in cmpSubjects" :key="i">
                    {{ possibleSubject }}
                </option>
            </select>

            <!-- Comparator -->
            <select class="comparator" v-model="comparator">
                <option disabled value="">Comparator</option>
                <option
                    v-for="(possibleComparator, i) in cmpComparators"
                    :key="i"
                >
                    {{ possibleComparator }}
                </option>
            </select>

            <!-- Value -->
            <select class="value" v-model="value">
                <option disabled value="">Value</option>
                <option v-for="(possibleValue, i) in cmpValues" :key="i">
                    {{ possibleValue }}
                </option>
            </select>

            <input v-model="number" v-if="cmpShowNumber" class="number-input" />

            <div class="trigger-type">
                <select v-model="triggerType">
                    <option disabled value="">Type</option>
                    <option v-for="(possibleValue, i) in triggerTypes" :key="i">
                        {{ possibleValue }}
                    </option>
                </select>
            </div>

            <div class="on-complete">
                <select v-model="onComplete">
                    <option disabled value="">When Complete...</option>
                    <option
                        v-for="(possibleValue, i) in onCompleteActions"
                        :key="i"
                    >
                        {{ possibleValue }}
                    </option>
                </select>
            </div>

            <!-- Add button -->
            <button class="add-condition" @click="addCondition">Add</button>
        </li>
    </ul>
</template>

<script>
import _differenceWith from 'lodash/differenceWith'
const entityStartingAtText = 'starting at'

export default {
    props: {
        sequence: {
            type: Object,
            default: () => {}
        },
        isGoal: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            triggerTypes: ['toggle', 'pressure'],
            onCompleteActions: ['continue', 'loop'],
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
            number: 0,
            triggerType: '',
            onComplete: '',
            boolean: ''
        }
    },
    mounted() {
        this.boolean = this.sequence.boolean
    },
    methods: {
        addCondition() {
            this.$emit('add-condition', {
                subject: this.subject,
                subjectId: this.subjectId,
                comparator: this.comparator,
                value: this.value,
                number: this.number,
                onComplete: this.onComplete,
                triggerType: this.triggerType
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
                    for (let y = 0; y < p.height; y++) {
                        for (let x = 0; x < p.width; x++) {
                            const base = `[${p.name}] (${x}, ${y})`
                            output.push(`${base} occupant`)
                            output.push(`${base} occupant health`)
                            output.push(`${base} occupant AP`)
                        }
                    }
                    return output
                })
            )

            // get all entities
            const entities = this.$store.state.boardState.entities.map(e => {
                const hostPartition = this.$store.state.boardState.partitions.filter(
                    p => p.guid == e.location.partitionGuid
                )[0]

                return `${e.name} ${entityStartingAtText} [${
                    hostPartition.name
                }] (${e.location.x}, ${e.location.y}) health`
            })

            const output = [].concat(
                this.conditions.subjects,
                partitionNames,
                cells,
                entities
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
            let partitionGuid = null

            // partition name will be in square brackets - check if one exists
            const partitionName = newVal.match(/\[(.*?)\]/)
            if (partitionName) {
                const partition = this.$store.state.boardState.partitions.find(
                    p => p.name == partitionName[1]
                )
                this.subjectId = partition.guid
                partitionGuid = partition.guid
            }

            // if we're referencing an entity, switch the subject ID to that entity
            if (newVal.includes(entityStartingAtText)) {
                // get the cell coordinates
                const coords = newVal.match(/\((\d+), (\d+)\)/)
                let coordsX, coordsY
                if (coords) {
                    coordsX = coords[1]
                    coordsY = coords[2]
                }
                const targetEntity = this.$store.state.boardState.entities.find(
                    e => {
                        return (
                            e.location.partitionGuid == partitionGuid &&
                            e.location.x == coordsX &&
                            e.location.y == coordsY
                        )
                    }
                )
                if (targetEntity) {
                    this.subjectId = targetEntity.guid
                } else {
                    console.log(
                        `Couln't find entity at ${partitionGuid} coordinates (${coordsX}, ${coordsY})`
                    )
                }
            }
        },
        boolean(newVal) {
            this.$emit('boolean-changed', newVal)
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

.condition-wrap {
    color: $white;
    list-style: none;
    padding: 0;

    .single-condition {
        display: grid;
        grid-template-areas:
            'factors remove'
            'meta remove';
        grid-auto-flow: column;
        margin: 10px auto;
        border-left: 2px solid $white;
        padding-left: 10px;
        position: relative;

        .remove-wrap {
            text-align: right;
            grid-area: remove;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }
    }
    .add-condition-wrap {
        display: grid;
        grid-template-areas:
            'subj comp valu numb'
            'trig onco .    addc';
        grid-template-columns: repeat(4, 1fr);

        select,
        button {
            flex: 1;
        }
        .subject {
            grid-area: subj;
        }
        .comparator {
            grid-area: comp;
        }
        .value {
            grid-area: valu;
        }
        .number-input {
            grid-area: numb;
        }
        .trigger-type {
            grid-area: trig;
        }
        .on-complete {
            grid-area: onco;
            select,
            option {
                width: 100%;
            }
        }
        .add-condition {
            grid-area: addc;
            select,
            option {
                width: 100%;
            }
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
