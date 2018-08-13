<template>

    <section
        class="board-partition"
        :key="cmpStyle['grid-area']"
        :style="cmpStyle"
        v-show="visible">

        <button
            v-for="(direction, i) in directions"
            :key="i"
            :class="['direction', direction]">
            {{ direction }}
        </button>

        <input v-model="displayName"/>

    </section>

</template>

<script>
import { clamp } from '@/utils/shared'

export default {
    data() {
        return {
            directions: ['up', 'right', 'down', 'left'],
            visible: true,
            displayName: ''
        }
    },
    props: {
        partition: {
            type: Object,
            required: true
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

.board-partition {
    position: absolute;
    background-color: rgba($partition, 0.9);
    z-index: 5;
    overflow-y: auto;
    width: 100%;
    height: 100%;

    .direction {
        background-color: $alt;
        border: none;
        color: $white;
        font-family: $font-family;
        padding: 0;
        position: absolute;
    }
}
</style>
