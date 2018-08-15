<template>

    <section class="toolbar-main">

        <!-- NSEW -->
        <button
            @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [-1, 0])">
            Move left
        </button>
        <button
            @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [1, 0])">
            Move right
        </button>
        <button
            @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [0, 1])">
            Move up
        </button>
        <button
            @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [0, -1])">
            Move down
        </button>

        <hr>

        <!-- Zoom -->
        <button
            @click="$store.commit('CHANGE_GRID_SIZE_BY', -1)">
            Zoom in
        </button>
        <button
            @click="$store.commit('CHANGE_GRID_SIZE_BY', 1)">
            Zoom out
        </button>

    </section>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'src/styles/vars';

.toolbar-main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: skyblue;
    padding: 10px;
    box-sizing: border-box;

    * + * {
        margin-top: 5px;
    }

    button {
        width: 100%;
        height: 50px;
        background-color: rgba($black, 0.4);
        color: $white;
        border: none;
        font-family: $font-family;
        font-size: 18px;
        cursor: pointer;

        &:hover,
        &:focus {
            background-color: rgba($black, 0.8);
        }
    }
}
</style>
