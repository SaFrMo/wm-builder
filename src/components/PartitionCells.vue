<template>

    <div>
    <section class="partition-cells" :style="cmpStyle">

        <span
            :style="{ transform: `rotate(-${rotation}deg)` }"
            v-for="(cell, i) in cmpTotalCells"
            v-if="isVisible(i)"
            :key="i"
            :data-i="i"
            :class="getClasses(i)">

            <span class="coordinates-wrap">
                <span class="coordinates">{{ getX(i) + ', ' + getY(i) }}</span>
                <span class="deploy">
                    <input
                        type="checkbox"
                        id="deploy"
                        @change="updateDeployable($event, i)"
                        :checked="isDeployable(i)">
                    <label for="deploy">🛬</label>
                </span>
            </span>

            <span class="entity-contents">
                <div class="entity-wrap" v-if="getEntity(i).length">
                    <button
                        class="entity"
                        v-if="getEntity(i)"
                        @click="toggleEntity(i)">
                        {{ getEntity(i).map(entity => entity.name).join(',') }}
                    </button>

                    <button
                        class="remove"
                        @click.stop="removeEntity(i)">
                        X
                    </button>
                </div>
                <button
                    v-else
                    class="add-entity"
                    aria-label="Add entity"
                    @click="getEntity(i).length ? null : startAdding($event, { x: getX(i), y: getY(i) })">
                    +
                </button>
            </span>

            <hp-display
                :hp="getHp(i)"
                @onHpChanged="updateHp(i)($event)"/>

        </span>


    </section>

    <entity-expanded-meta
        v-if="expandedEntity != null"
        :entity="expandedEntity"
        @onClose="expandedEntity = null"
        :key="expandedEntity.id"/>

    <entity-menu-wrap
        v-if="adding"
        :style="cmpPoiMenuStyle"
        @addEntity="addEntity"
        @onClose="adding = false"/>

    </div>

</template>

<script>
import _kebabCase from 'lodash/kebabCase'
import _get from 'lodash/get'
import { createGuid } from '@/utils/shared'

export default {
    props: {
        origin: {
            type: [String, Number],
            default: 0
        },
        partition: {
            type: Object,
            required: true
        },
        rotation: {
            type: [String, Number],
            default: 0
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
            expandedEntity: null,

            // ENTITY menu location, in px
            top: 0,
            left: 0
        }
    },
    computed: {
        cmpStyle() {
            return {
                transform: `rotate(${this.rotation}deg)`,
                'transform-origin': this.origin,
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
                // transform: `rotate(-${this.rotation}deg)`
            }
        }
    },
    methods: {
        getX(i) {
            return i % this.partition.width
        },
        getY(i) {
            // if we're in the first row, get ready to decrement by 1
            let modifier = 0
            if (i % this.partition.width === 0) {
                modifier = 1
            }

            // calculate Y coordinate from current index
            return (
                Math.floor((this.cmpTotalCells - i) / this.partition.width) -
                modifier
            )
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
        getHp(i) {
            const x = this.getX(i)
            const y = this.getY(i)
            return this.partition.hps.find(hp => hp.x == x && hp.y == y)
        },
        addEntity(entity) {
            if (entity.isPivot) {
                this.$store.commit('SET_PIVOT_POINT', {
                    guid: this.partition.guid,
                    cell: this.currentCell
                })
            } else {
                const clone = JSON.parse(JSON.stringify(entity))
                const newEntity = {
                    guid: this.partition.guid,
                    coordinates: this.currentCell,

                    // updated structure
                    location: {
                        partitionGuid: this.partition.guid,
                        x: this.currentCell.x,
                        y: this.currentCell.y
                    },
                    prefabGuid: _kebabCase(entity.name),

                    // defaults
                    ...clone
                }

                newEntity.id = createGuid()
                this.$store.commit('ADD_ENTITY', newEntity)
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
            this.left = evt.clientX
            this.top = evt.clientY
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
        },
        updateHp(i) {
            return newHp => {
                this.$store.commit('SET_CELL_HP', {
                    guid: this.partition.guid,
                    x: this.getX(i),
                    y: this.getY(i),
                    hp: newHp
                })
            }
        },
        updateDeployable(evt, i) {
            this.$store.commit('SET_DEPLOYABLE', {
                guid: this.partition.guid,
                x: this.getX(i),
                y: this.getY(i),
                deployable: evt.target.checked
            })
        },
        isDeployable(i) {
            const x = this.getX(i)
            const y = this.getY(i)

            return (
                this.partition.deployable.findIndex(
                    v => v.x == x && v.y == y
                ) != -1
            )
        },
        toggleEntity(i) {
            const entity = _get(this.getEntity(i), '[0]', null)

            if (!entity) return

            this.expandedEntity =
                this.expandedEntity && this.expandedEntity.id == entity.id
                    ? null
                    : entity
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
    background: $partition;

    .single-cell {
        background-color: rgba($black, 0.2);
        color: $white;
        border-radius: 5px;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        margin: auto;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        // justify-content: center;
        overflow: hidden;
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, 33.333%);

        &.is-pivot {
            background-color: rgba(green, 0.5);
        }

        .coordinates-wrap {
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .deploy {
                display: flex;
            }
        }

        .entity-contents {
            @include fill;
            display: flex;
            // flex-direction: column;
            justify-content: flex-end;
            // align-items: center;
            text-align: center;
            grid-column: 2 / span 2;
            grid-row: 1 / span 1;
            background: rgba($black, 0.2);
            font-size: 12px;

            .entity-wrap {
                display: flex;
                width: 100%;
            }
            .entity {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                color: $white;
                font-size: 12px;
                position: relative;
            }
            .remove {
                background-color: $danger;
                color: $white;
                width: 100%;
                font-size: 14px;
                width: 23px;
                height: 23px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover,
                &:focus {
                    background-color: $dark-danger;
                }
            }
        }
        .hp-display {
            grid-column: 1 / span 3;
            grid-row: 2 / span 1;
            height: 10px;
        }

        .add-entity {
            background-color: rgba($black, 0.2);
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $white;
            // border-radius: 50%;
            // transform: scale(0.8);
            transition: transform 0.2s;
            // position: absolute;
            right: 0;
            bottom: 0;

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
