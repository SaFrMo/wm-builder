<template>

    <section class="partition-cells" :style="cmpStyle">

        <button
            v-for="(cell, i) in cmpTotalCells"
            :key="i"
            @click="startAdding"
            class="single-cell">

            <!-- <span class="coordinates">
                ({{ getX(i + 1) }}, {{ getY(i + 1) }})
            </span>-->

            <span v-if="getPoi(i + 1).length">
                {{ getPoi(i + 1).map(poi => poi.type).join(',') }}
            </span>

            <span class="add-poi">+</span>
        </button>

        <poi-menu-wrap
            v-if="adding"
            :style="cmpPoiMenuStyle"
            @onClose="adding = false"/>

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
    data() {
        return {
            adding: false,
            top: 0,
            left: 0
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
        },
        cmpPoiMenuStyle() {
            return {
                top: this.top + 'px',
                left: this.left + 'px'
            }
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
                type: 'test POI'
            })
        },
        startAdding(evt) {
            this.adding = true
            this.left = evt.clientX
            this.top = evt.clientY
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
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        .add-poi {
            background-color: rgba($black, 0.2);
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $white;
            border-radius: 50%;
            transform: scale(0);
            transition: transform 0.2s;

            &:hover,
            &:focus {
                background-color: rgba($black, 0.4);
            }
        }

        // Hover state for single cell
        &:hover,
        &:focus-within {
            .add-poi {
                transform: none;
                transition: none;
            }
        }
    }

    .poi-menu-wrap {
        position: fixed;
    }
}
</style>
