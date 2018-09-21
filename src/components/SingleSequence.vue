<template>

    <div class="single-sequence">

        <div class="meta-wrap">
            <!-- Sequence name -->
            <input class="sequence-name" v-model="name"/>

            <!-- Priority score -->
            <label for="priority" class="priority-label">Priority</label>
            <input id="priority" class="priority" v-model="priority"/>

            <!-- Toggle preview -->
            <button
                @click="playing = !playing"
                class="play">
                {{ playing ? 'Stop' : 'Preview' }}
            </button>

            <!-- Delete sequence -->
            <button
                @click="$store.commit('REMOVE_SEQUENCE', sequence.id)"
                class="remove">
                Remove
            </button>
        </div>

        <div class="sequence-items">

            <!-- States in Sequence -->
            <div class="state-wrap">
                <button
                    v-for="(state, i) in cmpSequenceStates"
                    v-if="state"
                    :class="['board-state', { playing: isPlaying(i) }]"
                    :key="i"
                    @click="removeIdAt(i)">
                    {{ state.name }}
                </button>
            </div>

            <!-- States available to add -->
            <ul class="add-wrap">
                <li
                    v-for="(state, i) in cmpBoardStates"
                    :key="i"
                    class="state-entry">

                    <button
                        class="button"
                        v-html="'+ ' + state.name"
                        @click="addState(state)"/>
                    </button>

                </li>
            </ul>

            <!-- Conditions -->
            <sequence-condition-wrap
                @add-condition="addCondition"/>

        </div>

    </div>

</template>

<script>
import _get from 'lodash/get'

let interval

export default {
    props: {
        sequence: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            name: '',
            playing: false,
            playIndex: 0,
            savedPosition: 0,
            priority: 0
        }
    },
    computed: {
        cmpBoardStates() {
            return _get(this, '$store.state.boardState.states')
        },
        cmpSequenceStates() {
            const ids = this.sequence.boardStateIds
            return ids.map(id => this.cmpBoardStates.find(x => x.id == id))
        }
    },
    mounted() {
        this.name = this.sequence.name
        this.priority = this.sequence.priority
    },
    methods: {
        removeIdAt(i) {
            this.$store.commit('REMOVE_STATE_ID_FROM_SEQUENCE', {
                sequenceId: this.sequence.id,
                index: i
            })
        },
        addState(state) {
            this.$store.commit('ADD_STATE_ID_TO_SEQUENCE', {
                stateId: state.id,
                sequenceId: this.sequence.id
            })
        },
        isPlaying(i) {
            return (
                this.playing &&
                this.playIndex % this.sequence.boardStateIds.length == i
            )
        },
        addCondition({ subject, comparator, value }) {
            console.log(subject, comparator, value)
        }
    },
    watch: {
        name(newVal) {
            this.$store.commit('CHANGE_SEQUENCE_NAME', {
                id: this.sequence.id,
                value: newVal
            })
        },
        priority(newVal) {
            this.$store.commit('CHANGE_SEQUENCE_PRIORITY', {
                id: this.sequence.id,
                value: newVal
            })
        },
        playing(newVal) {
            if (newVal) {
                this.savedPosition = this.$store.state.selectedBoardStateIndex
                this.playIndex = 0
                interval = setInterval(() => (this.playIndex += 1), 600)
            } else {
                clearInterval(interval)
                this.$store.commit('SELECT_BOARD_STATE', this.savedPosition)
            }
        },
        playIndex(newVal) {
            const stateId = this.sequence.boardStateIds[
                newVal % this.sequence.boardStateIds.length
            ]
            const stateIndex = this.$store.state.boardState.states.findIndex(
                x => x.id == stateId
            )
            this.$store.commit('SELECT_BOARD_STATE', stateIndex)
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.single-sequence {
    // Meta
    .meta-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    input {
        background-color: transparent;
        border: none;
        color: $white;
        font-size: 18px;
        font-weight: 700;
        font-family: $font-family;
        flex: 1;
        margin-right: 5px;

        &:hover,
        &:focus {
            background-color: rgba($black, 0.2);
        }
    }
    .priority-label {
        color: $white;
        font-size: 14px;
        margin-right: 5px;
    }
    .priority {
        width: 30px;
        flex: initial;
        text-align: right;
    }
    .play {
        background: $safe;
        color: $white;
        padding: 5px;
        margin: 0 5px;
    }
    .remove {
        background: $danger;
        color: $white;
        padding: 5px;
    }

    // States in sequence
    .state-wrap {
        display: flex;
        flex-wrap: wrap;

        .board-state {
            padding: 3px 5px;
            background-color: $danger;
            color: $white;
            border: 2px solid transparent;

            &.playing {
                border: 2px solid $white;
            }
        }
        .board-state {
            margin: 5px 5px 0 0;
        }
    }

    // Add/Remove
    .add-wrap {
        list-style: none;
        margin-top: 15px;

        .state-entry + .state-entry {
            margin-top: 5px;
        }
        .state-entry .button {
            color: $white;
            background-color: rgba($black, 0.2);
            padding: 2px 8px;
            border-radius: 5px;
            padding-left: 8px;
            transition: padding 0.3s, background-color 0.3s;

            &:hover,
            &:focus {
                padding-left: 20px;
                background-color: rgba($black, 0.4);
            }
        }
    }
}
</style>
