<template>

    <section class="board-partition">

TODO: Start here

    </section>

</template>

<script>
export default {
    props: {
        partition: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-partition {
    position: absolute;
    grid-row: 1 / 3;
    grid-column: 1 / 3;
    background-color: $black;
    z-index: 5;
}
</style>
