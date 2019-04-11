<template>

    <section
        class="board-partition"
        :key="cmpStyle['grid-area']"
        :style="cmpStyle"
        v-show="visible">

        <partition-directions :guid="partition.guid"/>

        <partition-cells
            :partition="partition"
            :start-x="startX"
            :start-y="startY"
            :visible-width="cmpVisibleWidth"
            :visible-height="cmpVisibleHeight"
            :rotation="rotation"
            :origin="transformOrigin"/>

        <!-- Toggle meta -->
        <button class="toggle-meta" @click="metaVisible = !metaVisible">
            {{ metaVisible ? 'Edit Cells' : 'Edit Info' }}
        </button>

        <!-- Meta wrap -->
        <section class="meta" v-if="metaVisible">

            <!-- Name -->
            <input class="name" v-model="displayName" @keydown.enter="blurName"/>

            <!-- Delete section -->
            <section class="delete-controls">
                <button class="main" @click="showDelete = true">Delete</button>

                <span class="confirmation" v-if="showDelete">
                    <span>Delete {{ partition.name }}?</span>
                    <button @click="showDelete = false">No</button>
                    <button @click="$store.commit('DELETE_PARTITION', partition)">Yes</button>
                </span>
            </section>

        </section>

    </section>

</template>

<script>
import { clamp } from '@/utils/shared'

export default {
    data() {
        return {
            visible: true,
            displayName: '',

            // Meta
            metaVisible: false,

            // Deletion
            showDelete: false,

            // Size info
            fullWidth: 0,
            fullHeight: 0,
            startX: 0,
            startY: 0,

            // Rotation info
            rotation: 0
        }
    },
    props: {
        partition: {
            type: Object,
            required: true
        }
    },
    methods: {
        blurName(evt) {
            evt.target.blur()
        }
    },
    mounted() {
        this.displayName = this.partition.name
    },
    computed: {
        transformOrigin() {
            // pivot point
            const pivotXPct =
                (100 / this.partition.width / 2) * (this.partition.pivot.x + 1)
            const pivotYPct =
                100 -
                (100 / this.partition.height / 2) * (this.partition.pivot.y + 1)
            return `calc(${pivotXPct}% - 3px) calc(${pivotYPct}% + 3px)`
        },
        cmpStyle() {
            // starting rotation
            let rotation = 0

            // find the position on the visible grid
            const bottomLeftX = this.$store.state.bottomLeft.x
            let gridX = this.partition.position.x - bottomLeftX + 1
            gridX -= this.partition.pivot.x

            const bottomLeftY = this.$store.state.bottomLeft.y
            let gridY =
                -this.partition.position.y + this.$store.state.topRight.y
            gridY -= this.partition.height - 1
            gridY += this.partition.pivot.y

            // are we in a non-default BoardState?
            const currIndex = this.$store.state.selectedBoardStateIndex
            if (currIndex !== 0) {
                // get the state
                const boardState = this.$store.state.boardState.states[
                    currIndex
                ]

                // if the state exists...
                if (boardState) {
                    // ...look for the deltas...
                    const deltas = boardState.deltas.filter(
                        x => x.guid === this.partition.guid
                    )

                    // reset rotation
                    this.rotation = 0

                    // ...and if the deltas exist...
                    deltas.forEach(d => {
                        // apply X and Y deltas
                        gridX += d.x || 0
                        gridY -= d.y || 0

                        // apply rotation
                        rotation += d.rotation || 0
                        this.rotation += d.rotation || 0
                    })
                }
            }

            // final clamping
            let width = this.partition.width
            let height = this.partition.height

            // adjust final height and row placement
            if (gridY - 1 < 0) {
                height += gridY - 1
            }
            if (gridY < 1) {
                gridY = 1
            }

            this.startX = gridX - 1
            this.startY = gridY - 1

            // adjust final width and column placement
            if (gridX - 1 < 0) {
                width += gridX - 1
            }
            if (gridX < 1) {
                gridX = 1
            }

            // get final styling
            this.fullWidth = width
            this.fullHeight = height
            const gridArea = `${gridY} / ${gridX} / span ${height} / span ${width}`

            // determine whether or not this partition is visible
            if (
                gridX > this.$store.getters.width ||
                gridY > this.$store.getters.height ||
                width <= 0 ||
                height <= 0
            ) {
                this.visible = false
            } else {
                this.visible = true
            }

            return {
                'grid-area': gridArea
                // transform: `rotate(${rotation}deg)`,
                // 'transform-origin': transformOrigin
            }
        },
        cmpVisibleWidth() {
            const boardWidth = this.$store.getters.width
            const delta = boardWidth - this.startX - this.fullWidth
            return Math.min(this.fullWidth, this.fullWidth + delta)
        },
        cmpVisibleHeight() {
            const boardHeight = this.$store.getters.height
            const delta = boardHeight - this.startY - this.fullHeight
            return Math.min(this.fullHeight, this.fullHeight + delta)
        }
    },
    watch: {
        displayName(newVal) {
            this.$store.commit('SET_PARTITION_NAME', {
                guid: this.partition.guid,
                value: newVal
            })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-partition {
    position: absolute;
    z-index: 5;
    overflow-y: visible;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .toggle-meta {
        color: $white;
        background-color: $black;
        padding: 10px;
        position: absolute;
        top: calc(100% + 26px);
        right: 0;
        width: $edit-info-width;
        height: 40px;
        z-index: 5;
        display: none;

        &:hover,
        &:focus {
            background-color: $white;
            color: $black;
        }
    }

    .direction-wrap {
        position: absolute;
        @include fill;
        background: rgba($dark-partition, 0.4);
        z-index: 5;
        border-radius: 50%;
        transition: opacity 0.2s, transform 0.2s;
        transform: translateY(10px);
        opacity: 0;
        pointer-events: none;
    }

    // Meta
    .meta {
        position: absolute;
        top: 10px;
        right: 10px;
        bottom: 10px;
        left: 10px;
        background-color: $white;
        display: block;
        border-radius: 5px;
        padding: 10px;
        color: $black;
    }

    // Name
    .name {
        // color: $white;
        font-size: 24px;
        background-color: transparent;
        border: none;
        width: 100%;
        text-align: center;

        &:hover {
            background-color: $partition;
        }
        &:focus {
            background-color: $partition;
            color: $black;
        }
    }

    // Delete
    .delete-controls {
        background-color: $danger;
        color: $white;
        font-size: 12px;
        text-align: center;
        margin: auto;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 10;

        .main {
            display: block;
            width: 100%;
        }
        .confirmation {
            display: flex;

            span {
                flex: 1;
                text-align: left;
                padding: 10px;
            }
        }

        button {
            color: $white;
            padding: 10px;
            font-size: 12px;
            margin: auto;

            &:hover,
            &:focus {
                background-color: $dark-danger;
            }
        }
    }

    // Partition hover state
    &:hover,
    &:focus-within {
        z-index: 100;

        .partition-directions .direction {
            transform: none;
            transition: none;
        }
        .direction-wrap {
            opacity: 1;
            transform: none;
            pointer-events: all;
        }
        .toggle-meta {
            display: initial;
        }
    }
}
</style>
