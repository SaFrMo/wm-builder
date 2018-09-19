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

            <button
                v-for="(id, i) in sequence.boardStateIds"
                :key="i"
                @click="removeIdAt(i)">
                {{ id }}
            </button>

            <div class="add-wrap">
                <span>Add...</span>
                <button
                    v-for="(state, i) in cmpBoardStates"
                    :key="i">
                    {{ state.name }}
                </button>
            </div>

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
        }
    },
    mounted() {
        this.name = this.sequence.name
    },
    methods: {
        removeIdAt(i) {
            this.sequence.splice(i, 1)
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

    // Add/Remove
    .add-wrap {
    }
}
</style>
