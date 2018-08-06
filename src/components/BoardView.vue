<template>

    <section class="board-view" :style="cmpStyle">

        <div class="row" v-for="y in height" :key="y">
            <div class="cell" v-for="x in width" :key="x">
                <button>
                    x: {{ x - 1 + $store.state.bottomLeft.x }}
                    y: {{ height - y + $store.state.bottomLeft.y }}
                </button>
            </div>
        </div>

    </section>

</template>

<script>
export default {
    computed: {
        cmpStyle() {
            return {
                'grid-template-rows': `repeat(${this.width}, 1fr)`
            }
        },
        width() {
            return this.$store.state.topRight.x - this.$store.state.bottomLeft.x
        },
        height() {
            return this.$store.state.topRight.y - this.$store.state.bottomLeft.y
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-view {
    display: grid;
    grid-gap: 10px;
    grid-auto-flow: row;
    width: 450px;
    margin: auto;

    .row {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
    }
    .cell {
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
