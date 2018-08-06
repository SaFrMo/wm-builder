<template>

    <section class="toolbar-main">

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
        

    </section>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'src/styles/vars';

.toolbar-main {
}
</style>
