<template>

    <main class="front-page">

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
}
</style>
