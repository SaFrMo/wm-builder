<template>

    <aside class="toolbar-states">

        <h2 class="title">Board States</h2>

        <ul class="button-wrap">
            <board-state-item
                v-for="(state, i) in $store.state.boardState.states"
                :key="i"
                :board-state="state"
                @selected="selectState(i)"
                @deleted="deleteState(i)"
                :show-delete="i != 0"
                :class="{ selected: $store.state.selectedBoardStateIndex == i }"/>
            <button
                @click="addState"
                aria-label="Add board state">+</button>
        </ul>

    </aside>

</template>

<script>
export default {
    methods: {
        selectState(i) {
            this.$store.commit('SELECT_BOARD_STATE', i)
        },
        addState() {
            this.$store.commit('ADD_BOARD_STATE')
        },
        deleteState(i) {
            this.$store.commit('DELETE_BOARD_STATE', i)
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.toolbar-states {
    background-color: $partition;
    position: relative;

    .title {
        color: $white;
        margin: 0;
        position: absolute;
        top: calc(100% - 10px);
        left: 0;
        transform: rotate(-0.25turn);
        transform-origin: top left;
        font-size: 30px;
    }
    .button-wrap {
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0 0 0 60px;
        padding: 10px 0;
        box-sizing: border-box;

        & > * {
            width: 100px;
            height: 100px;
            background-color: rgba($black, 0.2);
            color: $white;
            border-radius: 15px;
            box-sizing: border-box;

            &:hover,
            &:focus {
                background-color: rgba($black, 0.4);
            }
            & + * {
                margin-left: 10px;
            }
        }
        & > *:last-child {
        }

        .board-state-item.selected {
            border: 5px solid $white;
        }
    }
}
</style>
