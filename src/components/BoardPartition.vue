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

    </section>

</template>

<script>
import { clamp } from '@/utils/shared'

export default {
    data() {
        return {
            directions: ['up', 'right', 'down', 'left'],
            visible: true
        }
    },
    props: {
        partition: {
            type: Object,
            required: true
        }
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

            if (gridX - 1 < 0) {
                width += gridX - 1
            }
            if (gridX < 1) {
                gridX = 1
            }

            const gridArea = `${gridY} / ${gridX} / span ${
                this.partition.height
            } / span ${width}`

            // if gridX is more than the size of the grid, don't show
            if (gridX > this.$store.getters.width) {
                this.visible = false
            } else if (width <= 0) {
                this.visible = false
            } else if (gridY > this.$store.getters.height) {
                this.visible = false
            } else {
                this.visible = true
            }

            return {
                'grid-area': gridArea
                // 'grid-column': `${gridX} / span ${width}`,
                // 'grid-row': ` / span ${this.partition.height}`
            }
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
