<template>

    <section
        class="board-view"
        v-keydown.right="() => $store.commit('CHANGE_BOTTOM_LEFT_BY', [1, 0])"
        v-keydown.left="() => $store.commit('CHANGE_BOTTOM_LEFT_BY', [-1, 0])"
        v-keydown.up="() => $store.commit('CHANGE_BOTTOM_LEFT_BY', [0, 1])"
        v-keydown.down="() => $store.commit('CHANGE_BOTTOM_LEFT_BY', [0, -1])">

        <div class="grid" :style="cmpStyle">

            <board-cell
                v-for="i in cmpTotalCells"
                :key="i"
                :data-index="i"
                :x="getX(i)"
                :y="getY(i)"/>

            <board-partition
                v-for="partition in $store.state.boardState.partitions"
                :key="partition.guid"
                :partition="partition"/>

        </div>

    </section>

</template>

<script>
export default {
    computed: {
        cmpStyle() {
            return {
                'grid-template': `repeat(${this.width}, 1fr) / repeat(${
                    this.height
                }, 1fr)`
            }
        },
        width() {
            return this.$store.state.topRight.x - this.$store.state.bottomLeft.x
        },
        height() {
            return this.$store.state.topRight.y - this.$store.state.bottomLeft.y
        },
        cmpTotalCells() {
            return this.width * this.height
        }
    },
    methods: {
        getX(i) {
            const boardIndex = (i - 1) % this.width
            return this.$store.state.bottomLeft.x + boardIndex
        },
        getY(i) {
            i = this.cmpTotalCells - i
            const boardIndex = Math.floor(i / this.height)
            return this.$store.state.bottomLeft.y + boardIndex
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-view {
    margin: auto;
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: auto;

    .grid {
        display: grid;
        grid-gap: 1px;
        width: calc(100% - 80px);
        height: calc(100% - 80px);
        margin: auto;
        position: absolute;
        top: 40px;
        left: 40px;
        overflow: hidden;
    }
    .cell {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
    }
}
</style>
