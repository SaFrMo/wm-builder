<template>

    <button
        :class="['board-cell', { separator }, { center: x == 0 && y == 0 }]"
        @click="handleClick">

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
    computed: {
        separator() {
            return (
                this.x % this.$store.state.xLines == 0 ||
                this.y % this.$store.state.yLines == 0
            )
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
    position: relative;
    font-family: $font-family;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    border: none;
    margin: auto;
    @include fill;
    background-color: $cell;

    &.separator {
        background-color: $dark-cell;
    }
    &.center {
        background-color: $black;
    }

    .coordinates {
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        font-size: 13px;
        padding: 3px;
        background-color: $black;
        color: $white;
        font-weight: 700;
    }
}
</style>
