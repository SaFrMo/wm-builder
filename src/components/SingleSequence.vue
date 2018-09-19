<template>

    <div class="single-sequence">

        <div class="meta-wrap">
            <input class="sequence-name" v-model="name"/>
            <button
                @click="$store.commit('REMOVE_SEQUENCE', sequence.id)"
                class="remove">
                Remove
            </button>
        </div>

        <div class="sequence-items">

            <div class="state-wrap">
                <button
                    v-for="(state, i) in cmpSequenceStates"
                    class="board-state"
                    :key="i"
                    @click="removeIdAt(i)">
                    {{ state.name }}
                </button>
            </div>

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

        </div>

    </div>

</template>

<script>
import _get from 'lodash/get'

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
            name: ''
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
        }
    },
    watch: {
        name(newVal) {
            this.$store.commit('CHANGE_SEQUENCE_NAME', {
                id: this.sequence.id,
                value: newVal
            })
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
    }
    .sequence-name {
        background-color: transparent;
        border: none;
        color: $white;
        font-size: 18px;
        font-weight: 700;
        font-family: $font-family;
        flex: 1;

        &:hover,
        &:focus {
            background-color: rgba($black, 0.2);
        }
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
