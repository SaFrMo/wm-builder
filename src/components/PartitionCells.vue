<template>

    <section class="partition-cells" :style="cmpStyle">

        <div
            v-for="(cell, i) in cmpTotalCells"
            :key="i"
            class="single-cell">

            <h1 v-if="getPoi(i + 1).length">{{ getPoi(i + 1) }}</h1>
            {{ getX(i + 1) }}, {{ getY(i + 1) }}

            <button @click="addPoi(i + 1)">Add POI</button>
        </div>

    </section>

</template>

<script>
export default {
    props: {
        partition: {
            type: Object,
            required: true
        }
    },
    computed: {
        cmpStyle() {
            return {
                'grid-template': `repeat( ${
                    this.partition.height
                }, 1fr) / repeat(${this.partition.width}, 1fr)`
            }
        },
        cmpTotalCells() {
            return this.partition.height * this.partition.width
        }
    },
    methods: {
        getX(i) {
            return (i - 1) % this.partition.width
        },
        getY(i) {
            i = this.cmpTotalCells - i
            return Math.floor(i / this.partition.height)
        },
        getPoi(i) {
            const x = this.getX(i)
            const y = this.getY(i)
            return this.partition.pois.filter(
                poi => poi.coordinates.x === x && poi.coordinates.y === y
            )
        },
        addPoi(i) {
            this.$store.commit('ADD_POI', {
                guid: this.partition.guid,
                coordinates: {
                    x: this.getX(i),
                    y: this.getY(i)
                },
                type: 'test'
            })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.partition-cells {
    @include fill;
    display: grid;
    grid-gap: 10px;

    .single-cell {
        background-color: rgba($black, 0.2);
        color: $white;
        border-radius: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
