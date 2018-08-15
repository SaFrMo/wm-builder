<template>

    <section class="board-view" >

        <div class="grid" :style="cmpStyle">

            <board-cell
                v-for="i in cmpTotalCells"
                :key="i"
                :data-index="i"
                :x="getX(i)"
                :y="getY(i)"/>

            <board-partition
                v-for="(partition, i) in $store.state.boardState.partitions"
                :key="i"
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

    .grid {
        display: grid;
        grid-gap: 10px;
        position: relative;
        width: 750px;
        height: 750px;
        margin: auto;
    }
    .cell {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
    }
}
</style>
