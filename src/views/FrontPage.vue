<template>

    <main class="front-page">

        <board-view/>

        <toolbar-main/>

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
    font-family: $font-family;
}
</style>
