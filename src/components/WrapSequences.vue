<template>

    <ul class="wrap-sequences">

        <li
            v-for="(sequence, i) in $store.state.boardState.sequences"
            :key="i"
            class="wrap-entry">

            <single-sequence
                :sequence="sequence"
                :key="sequence.id"
                :index="i"/>

        </li>

        <li
            class="wrap-entry">
            <button
                @click="$store.commit('ADD_BOARD_SEQUENCE')">
                Add Sequence
            </button>
        </li>

    </ul>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'src/styles/vars';

.wrap-sequences {
    margin: 0;

    .wrap-entry + .wrap-entry {
        margin-top: 20px;
    }
}
</style>
