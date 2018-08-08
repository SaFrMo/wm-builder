<template>

    <section class="board-view" >

        <div class="row" v-for="y in height" :key="y" :style="cmpStyle">
            <div class="cell" v-for="x in width" :key="x">

                <board-cell
                    :x="x - 1 + $store.state.bottomLeft.x"
                    :y="height - y + $store.state.bottomLeft.y"/>

            </div>
        </div>

        <board-partition
            v-for="(partition, i) in $store.state.boardState.partitions"
            :key="i"
            :partition="partition"/>

    </section>

</template>

<script>
export default {
    computed: {
        cmpStyle() {
            return {
                'grid-template-columns': `repeat(${this.width}, 1fr)`
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
        grid-gap: 10px;
    }
    .cell {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        position: relative;
    }
}
</style>
