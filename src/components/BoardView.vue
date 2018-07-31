<template>

    <section class="board-view" :style="cmpStyle">

        <div class="cell-wrap" v-for="i in width * height" :key="i">
            <button>
                {{ i }}
            </button>
        </div>

    </section>

</template>

<script>
export default {
    data() {
        return {
            width: 10,
            height: 10
        }
    },
    computed: {
        cmpStyle() {
            return {
                'grid-template': `repeat(${this.height}, 1fr) / repeat(${
                    this.width
                }, 1fr)`
            }
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-view {
    display: grid;
    grid-gap: 10px;

    .cell-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
    }
    button {
        background-color: $gray;
        font-family: $font-family;
        padding: 0;
        width: 100%;
        height: 100%;
        font-size: 16px;
        border: none;
        margin: auto;
        @include fill;
    }
}
</style>
