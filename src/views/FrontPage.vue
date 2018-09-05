<template>

    <main class="front-page">

        <toolbar-main/>

        <board-view/>

        <toolbar-states/>

    </main>

</template>

<script>
export default {
    computed: {
        cmpPartitions() {
            return this.$store.getters.board.partitions
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.front-page {
    display: grid;
    grid-template: repeat(4, 25vh) / repeat(4, 25vw);
    font-family: $font-family;

    .toolbar-main {
        grid-area: 1 / 1 / span 4 / span 1;
    }
    .board-view {
        grid-area: 1 / 2 / span 3 / span 3;
    }
    .toolbar-states {
        grid-area: 4 / 2 / span 1 / span 3;
    }
}
</style>
