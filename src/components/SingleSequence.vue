<template>

    <div class="single-sequence">

        {{ sequence }}

        <button
            @click="$store.commit('REMOVE_SEQUENCE', sequence.id)"
            class="remove">
            Remove
        </button>

    </div>

</template>

<script>
export default {
    props: {
        sequence: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: -1
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.single-sequence {
    .remove {
        background: $danger;
        color: $white;
        padding: 5px;
    }
}
</style>
