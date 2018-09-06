<template>

    <div
        class="board-state-item"
        v-interact="() => interacted = true"
        v-interact.end="() => interacted = false">

        <button
            v-if="showDelete && interacted"
            @click="$emit('deleted')"
            aria-label="Delete state"
            class="delete">
            X
        </button>

        <button
            class="label"
            v-html="boardState.name"
            @click="$emit('selected')"/>

    </div>

</template>

<script>
export default {
    props: {
        boardState: {
            type: Object,
            required: true
        },
        showDelete: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            interacted: false
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.board-state-item {
    position: relative;

    .delete {
        position: absolute;
        bottom: 100%;
        left: 15px;
        width: calc(100% - 30px);
        height: 20px;
        background-color: $danger;
        color: $white;

        &:hover,
        &:focus {
            background-color: $dark-danger;
        }
    }
    .label {
        color: $white;
        @include fill;
        display: flex;
        align-items: center;
        justify-content: center;
        display: block;
        width: 100%;
    }
}
</style>
