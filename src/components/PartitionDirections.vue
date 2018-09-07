<template>

    <section class="partition-directions">

        <section
            v-for="(direction, i) in directions"
            :key="i"
            :class="['direction', direction]">

            <!-- Change size arrows -->
            <button class="add" @click="changeSize(direction, 1)">+</button>
            <button class="subtract" @click="changeSize(direction, -1)">-</button>

            <!-- Change position arrows -->
            <button class="increment" @click="move(direction, 1)">
                {{ direction == 'up' || direction == 'down' ? '↑' : '→' }}
            </button>
            <button class="decrement" @click="move(direction, -1)">
                {{ direction == 'up' || direction == 'down' ? '↓' : '←' }}
            </button>

        </section>

    </section>

</template>

<script>
export default {
    props: {
        guid: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            directions: ['up', 'right', 'down', 'left']
        }
    },
    methods: {
        changeSize(direction, delta) {
            this.$store.commit('CHANGE_PARTITION_SIZE', {
                guid: this.guid,
                direction,
                delta
            })
        },
        move(direction, delta) {
            this.$store.dispatch('MOVE_PARTITION', {
                guid: this.guid,
                direction,
                delta
            })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.partition-directions {
    @include fill;

    // Directions
    .direction {
        position: absolute;
        margin: auto;
        display: flex;
        justify-content: space-between;
        transition: transform 0.2s 0.2s;

        button {
            background-color: $alt;
            color: $white;
            font-size: 16px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1;
            padding: 5px;

            &:hover,
            &:focus {
                background-color: $dark-alt;
            }
        }

        // top/bottom
        &.up,
        &.down {
            width: calc(100% - 45px);
            right: 0;
            left: 0;
            // transform: scaleY(0);

            button {
                width: 100%;

                &.subctract {
                    order: -1;
                }
            }
        }
        &.up {
            bottom: 100%;
            transform-origin: bottom center;
        }
        &.down {
            top: 100%;
            transform-origin: top center;
        }

        // right/left
        &.right,
        &.left {
            top: 0;
            bottom: 0;
            height: calc(100% - 45px);
            flex-direction: column;
            // transform: scaleX(0);

            button {
                height: 50%;
            }
        }
        &.right {
            left: 100%;
            transform-origin: left center;
        }
        &.left {
            right: 100%;
            transform-origin: right center;
        }
    }
}
</style>
