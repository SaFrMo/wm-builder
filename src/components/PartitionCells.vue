<template>

    <section class="partition-cells" :style="cmpStyle">

        <component
            :is="getPoi(i + 1).length ? 'span': 'button'"
            v-for="(cell, i) in cmpTotalCells"
            v-if="isVisible(i + 1)"
            :key="i"
            @click="getPoi(i + 1).length ? null : startAdding($event, { x: getX(i + 1), y: getY(i + 1) })"
            class="single-cell">

            {{ getX(i + 1) + ', ' + getY(i + 1) }}

            <span v-if="getPoi(i + 1).length" class="poi-contents">
                <span class="poi">
                    {{ getPoi(i + 1).map(poi => poi.name).join(',') }}
                </span>

                <button
                    class="remove"
                    @click.stop="removePoi(i + 1)">
                    Remove
                </button>
            </span>

            <span v-else class="add-poi">+</span>
        </component>

        <poi-menu-wrap
            v-if="adding"
            :style="cmpPoiMenuStyle"
            @addPoi="addPoi"
            @onClose="adding = false"/>

    </section>

</template>

<script>
export default {
    props: {
        partition: {
            type: Object,
            required: true
        },
        visibleWidth: {
            type: Number,
            required: true
        },
        visibleHeight: {
            type: Number,
            required: true
        },
        startX: {
            type: Number,
            required: true
        },
        startY: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            adding: false,
            currentCell: { x: 0, y: 0 },

            // POI menu location, in px
            top: 0,
            left: 0
        }
    },
    computed: {
        cmpStyle() {
            return {
                'grid-template': `repeat( ${
                    this.visibleHeight
                }, 1fr) / repeat(${this.visibleWidth}, 1fr)`
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
            return this.$store.state.boardState.pois.filter(
                poi =>
                    poi.guid === this.partition.guid &&
                    poi.coordinates.x === x &&
                    poi.coordinates.y === y
            )
        },
        addPoi(poi) {
            this.$store.commit('ADD_POI', {
                guid: this.partition.guid,
                coordinates: this.currentCell,
                ...poi
            })
            this.adding = false
        },
        removePoi(i) {
            const x = this.getX(i)
            const y = this.getY(i)
            this.$store.commit('REMOVE_POI', {
                guid: this.partition.guid,
                coordinates: { x, y }
            })
            this.adding = false
        },
        startAdding(evt, cellCoords) {
            this.currentCell = cellCoords
            this.adding = true
            this.left = evt.clientX
            this.top = evt.clientY
        },
        isVisible(i) {
            const x = this.getX(i)
            console.log(x)
            const y = this.getY(i)

            return x < this.visibleWidth && x >= 0
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
        position: relative;

        .poi-contents {
            @include fill;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;

            .poi {
                flex: 1;
                display: flex;
                align-items: center;
            }
            .remove {
                background-color: $danger;
                color: $white;
                width: 100%;
                font-size: 14px;

                &:hover,
                &:focus {
                    background-color: $dark-danger;
                }
            }
        }

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
