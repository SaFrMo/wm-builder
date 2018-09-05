<template>

    <section class="meta-info">

        <textarea class="board-name" type="text" v-model="boardName"/>

    </section>

</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            boardName: 'test'
        }
    },
    async mounted() {
        await Vue.nextTick()
        this.boardName = this.$store.state.boardState.name
    },
    watch: {
        boardName(newVal) {
            this.$store.commit('SET_BOARD_NAME', newVal)
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.meta-info {
    color: $white;
    background-color: rgba($black, 0.4);
    padding: 20px;

    .board-name {
        background: transparent;
        color: $white;
        border: none;
        font-weight: 700;
        font-size: 30px;
        height: 1.4em;
        width: 100%;
        padding: 5px 0;
        text-align: center;
        resize: vertical;
        font-family: $font-family;

        &:hover,
        &:focus {
            background-color: $white;
            color: $black;
        }
    }
}
</style>
