<template>

    <section class="meta-info">

        <textarea class="board-name" type="text" v-model="boardName"/>

        <key-value-field
            v-for="(meta, i) in $store.state.boardState.meta"
            :key="meta.guid"
            :index="i"
            :kv="meta"
            :update="val => $store.commit('UPDATE_BOARD_META', { index: i, key: val.key, val: val.val })"/>

        <button
            class="add-new"
            @click="$store.commit('ADD_NEW_BOARD_META')">
            Add More Info
        </button>


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
        background-color: rgba($black, 0.4);

        &:hover,
        &:focus {
            background-color: $white;
            color: $black;
        }
    }
    .add-new {
        background: $safe;
        height: 25px;
        font-size: 14px;
    }
}
</style>
