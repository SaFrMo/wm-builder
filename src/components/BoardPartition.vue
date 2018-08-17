<template>

    <section
        class="board-partition"
        :key="cmpStyle['grid-area']"
        :style="cmpStyle"
        v-show="visible">

        <!-- Change size arrows -->
        <section
            v-for="(direction, i) in directions"
            :key="i"
            :class="['direction', direction]">

            <button class="add" @click="changeSize(direction, 1)">+</button>
            <button class="subtract" @click="changeSize(direction, -1)">-</button>

        </section>

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

</template>

<script>
import { clamp } from '@/utils/shared'

export default {
    data() {
        return {
            directions: ['up', 'right', 'down', 'left'],
            visible: true,
            displayName: '',

            // Deletion
            showDelete: false
        }
    },
    props: {
        partition: {
            type: Object,
            required: true
        }
    },
    methods: {
        changeSize(direction, delta) {
            this.$store.commit('CHANGE_PARTITION_SIZE', {
                guid: this.partition.guid,
                direction,
                delta
            })
        },
        blurName(evt) {
            evt.target.blur()
        }
    },
    mounted() {
        this.displayName = this.partition.name
    },
    computed: {
        cmpStyle() {
            // find the position on the visible grid
            const bottomLeftX = this.$store.state.bottomLeft.x
            let gridX = this.partition.position.x - bottomLeftX + 1
            gridX -= this.partition.pivot.x

            const bottomLeftY = this.$store.state.bottomLeft.y
            let gridY =
                -this.partition.position.y + this.$store.state.topRight.y
            gridY -= this.partition.height - 1
            gridY += this.partition.pivot.y

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

            // adjust final width and column placement
            if (gridX - 1 < 0) {
                width += gridX - 1
            }
            if (gridX < 1) {
                gridX = 1
            }

            // get final styling
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
            }
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

$alt: darken($partition, 20%);
$dark-alt: darken($alt, 20%);

.board-partition {
    position: absolute;
    background-color: rgba($partition, 0.9);
    z-index: 5;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .direction {
        position: absolute;
        margin: auto;
        display: flex;
        justify-content: space-between;

        button {
            background-color: $alt;
            color: $white;
            font-size: 10px;

            &:hover,
            &:focus {
                background-color: $dark-alt;
            }
        }

        // top/bottom
        &.up,
        &.down {
            width: calc(100% - 45px);
            height: 15px;
            right: 0;
            left: 0;

            button {
                width: 50%;

                &.add {
                    order: 1;
                }
            }
        }
        &.up {
            top: 0;
        }
        &.down {
            bottom: 0;
        }

        // right/left
        &.right,
        &.left {
            top: 0;
            bottom: 0;
            height: calc(100% - 45px);
            width: 15px;
            flex-direction: column;

            button {
                height: 50%;
            }
        }
        &.right {
            right: 0;
        }
        &.left {
            left: 0;
        }
    }

    // Name
    .name {
        color: $white;
        font-size: 24px;
        background-color: transparent;
        border: none;
        width: 100%;

        &:hover {
            background-color: rgba($black, 0.2);
        }
        &:focus {
            background-color: $white;
            color: $black;
        }
    }

    // Delete
    .delete-controls {
        background-color: $danger;
        display: inline-block;
        color: $white;
        font-size: 12px;

        .main {
            display: block;
        }
        span {
            padding: 5px;
        }

        button {
            color: $white;
            padding: 10px;
            font-size: 12px;

            &:hover,
            &:focus {
                background-color: $dark-danger;
            }
        }
    }
}
</style>
