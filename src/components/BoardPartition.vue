<template>

    <section
        class="board-partition"
        :key="cmpStyle['grid-area']"
        :style="cmpStyle"
        v-show="visible">

        <partition-directions guid="partition.guid"/>

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
            metaVisible: true,

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

.board-partition {
    position: absolute;
    background-color: rgba($partition, 0.9);
    z-index: 5;
    overflow-y: visible;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .toggle-meta {
        color: $white;
        background-color: darken($dark-partition, 20%);
        padding: 10px;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 5;

        &:hover,
        &:focus {
            background-color: $dark-partition;
        }
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
        .partition-directions .direction {
            transform: none;
            transition: none;
        }
    }
}
</style>
