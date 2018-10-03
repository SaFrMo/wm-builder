<template>

    <section class="controls-section">

        <!-- NSEW -->
        <div class="arrow-wrap">
            <button
                class="up"
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [0, 1])">
                ↑
            </button>
            <button
                class="left"
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [-1, 0])">
                ←
            </button>
            <button
                class="right"
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [1, 0])">
                →
            </button>
            <button
                class="down"
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [0, -1])">
                ↓
            </button>
        </div>

        <!-- Zoom -->
        <div class="zoom-wrap">
            <button
                @click="$store.commit('CHANGE_GRID_SIZE_BY', -1)">
                🔍+
            </button>
            <button
                @click="$store.commit('CHANGE_GRID_SIZE_BY', 1)">
                🔍-
            </button>
        </div>

        <div class="misc">
            <!-- Recenter -->
            <button
                @click="$store.commit('RECENTER_GRID')">
                Recenter
            </button>

            <!-- New Board -->

            <button
                @click="$store.commit('RESET_BOARD')">
                New Board
            </button>
        </div>

    </section>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'src/styles/vars';

.controls-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
        'arrows zoom'
        'arrows misc';

    button {
        margin: 0;
    }

    .arrow-wrap {
        display: grid;
        grid-template-areas:
            'up up'
            'left right'
            'down down';
        grid-area: arrows;

        .up {
            grid-area: up;
        }
        .left {
            grid-area: left;
        }
        .right {
            grid-area: right;
        }
        .down {
            grid-area: down;
        }
        button {
            width: 100%;
            height: 100%;
        }
    }

    .zoom-wrap {
        margin: 0;
    }
    .misc {
        margin: 0;
    }
}
</style>
