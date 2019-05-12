<template>
    <aside class="toolbar-states">
        <h2 class="title">{{ toShow }}</h2>

        <!-- All states -->
        <ul class="button-wrap" v-if="toShow == 'States'">
            <board-state-item
                v-for="(state, i) in $store.state.boardState.states"
                :key="i"
                :board-state="state"
                @selected="selectState(i)"
                @deleted="deleteState(i)"
                :show-delete="i != 0"
                :class="{ selected: $store.state.selectedBoardStateIndex == i }"
            />
            <button @click="addState" aria-label="Add board state">+</button>
        </ul>

        <!-- Sequences -->
        <wrap-sequences v-else-if="toShow == 'Sequences'" />

        <!-- Goals -->
        <wrap-goals v-else-if="toShow == 'Goals'" />

        <!-- Player items -->
        <wrap-player-items v-else-if="toShow == 'Player Items'" />

        <!-- Nav -->
        <nav class="display-types">
            <button
                v-for="(display, i) in displays"
                :class="['display-type', { selected: toShow == display }]"
                :key="i"
                v-html="display"
                @click="toShow = display"
            />
        </nav>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            displays: ['States', 'Sequences', 'Goals', 'Player Items'],
            toShow: 'Goals'
        }
    },
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
    background-color: $main-color;
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

    // Sequences & goals
    .wrap-sequences,
    .wrap-goals,
    .wrap-player-items {
        overflow-y: auto;
        position: absolute;
        top: 10px;
        right: 150px;
        bottom: 10px;
        left: 40px;
        background-color: rgba($black, 0.2);
        padding: 10px;
        list-style: none;
    }

    // Display types
    .display-types {
        position: absolute;
        top: 10px;
        right: 20px;
        display: flex;
        flex-direction: column;

        .display-type {
            background-color: rgba($black, 0.3);
            color: $white;
            padding: 5px 10px;
            border: 3px solid transparent;
            box-sizing: border-box;

            &:last-of-type {
                margin-right: 0;
            }
            &:hover,
            &:focus {
                background-color: rgba($black, 0.5);
            }

            &.selected {
                border: 3px solid $white;
            }
        }
    }
}
</style>
