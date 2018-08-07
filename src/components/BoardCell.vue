<template>


        <button class="board-cell" @click="handleClick">

        <span class="coordinates">
            ({{ x }}, {{ y }})
        </span>
    </button>


</template>

<script>
export default {
    props: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }
    },
    methods: {
        handleClick() {}
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-cell {
}
</style>
