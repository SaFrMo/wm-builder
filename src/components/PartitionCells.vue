<template>

    <section class="partition-cells" :style="cmpStyle">

        <component
            :is="getEntity(i).length ? 'span': 'button'"
            v-for="(cell, i) in cmpTotalCells"
            v-if="isVisible(i)"
            :key="i"
            :data-i="i"
            @click="getEntity(i).length ? null : startAdding($event, { x: getX(i), y: getY(i) })"
            :class="getClasses(i)">

            {{ getX(i) + ', ' + getY(i) }}

            <span v-if="getEntity(i).length" class="entity-contents">
                <span class="entity">
                    {{ getEntity(i).map(entity => entity.name).join(',') }}
                </span>

                <button
                    class="remove"
                    @click.stop="removeEntity(i)">
                    Remove
                </button>
            </span>

            <span v-else class="add-entity">+</span>
        </component>

        <entity-menu-wrap
            v-if="adding"
            :style="cmpPoiMenuStyle"
            @addEntity="addEntity"
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

            // ENTITY menu location, in px
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
            return i % this.partition.width
        },
        getY(i) {
            let n = this.cmpTotalCells - i

            // something happens on the first column that adds 1 to the Y position -
            // not sure why it happens, but this fixes it
            if (i % this.partition.width == 0) {
                n -= this.partition.width
            }

            return Math.floor(n / this.partition.height)
        },
        getEntity(i) {
            const x = this.getX(i)
            const y = this.getY(i)
            return this.$store.state.boardState.entities.filter(
                entity =>
                    entity.guid === this.partition.guid &&
                    entity.coordinates.x === x &&
                    entity.coordinates.y === y
            )
        },
        addEntity(entity) {
            if (entity.isPivot) {
                this.$store.commit('SET_PIVOT_POINT', {
                    guid: this.partition.guid,
                    cell: this.currentCell
                })
            } else {
                this.$store.commit('ADD_ENTITY', {
                    guid: this.partition.guid,
                    coordinates: this.currentCell,
                    ...entity
                })
            }

            this.adding = false
        },
        removeEntity(i) {
            const x = this.getX(i)
            const y = this.getY(i)
            this.$store.commit('REMOVE_ENTITY', {
                guid: this.partition.guid,
                coordinates: { x, y }
            })
            this.adding = false
        },
        startAdding(evt, cellCoords) {
            this.currentCell = cellCoords
            this.adding = true
            const { top, left } = this.$el.getBoundingClientRect()
            this.left = evt.clientX - left
            this.top = evt.clientY - top
        },
        isVisible(i) {
            const x = this.getX(i)
            const y = this.getY(i)

            return x < this.visibleWidth && x >= 0
        },
        getClasses(i) {
            return [
                'single-cell',
                {
                    'is-pivot':
                        this.partition.pivot.x == this.getX(i) &&
                        this.partition.pivot.y == this.getY(i)
                }
            ]
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

        &.is-pivot {
            background-color: rgba(green, 0.5);
        }

        .entity-contents {
            @include fill;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;

            .entity {
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

        .add-entity {
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
            .add-entity {
                transform: none;
                transition: none;
            }
        }
    }

    .entity-menu-wrap {
        position: fixed;
    }
}
</style>
