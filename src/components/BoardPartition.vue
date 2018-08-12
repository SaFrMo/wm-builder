<template>

    <section class="board-partition" :style="cmpStyle">

        <button
            v-for="(direction, i) in directions"
            :key="i"
            :class="['direction', direction]">
            {{ direction }}
        </button>

    </section>

</template>

<script>
export default {
    data(){
        return {
            directions: ['up', 'right', 'down', 'left']
        }
    },
    props: {
        partition: {
            type: Object,
            required: true
        }
    },
    computed: {
        cmpStyle(){
            // find the position on the visible grid
            const relativeX = 1 + Math.abs(this.$store.state.bottomLeft.x)
            const relativeY = 1 + Math.abs(this.$store.state.bottomLeft.y)

            return {
                'grid-column': `${relativeX} / span ${ this.partition.width }`,
                'grid-row': `${relativeY} / span ${ this.partition.height }`
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
