<template>

    <ul class="wrap-sequences">

        <li
            v-for="(sequence, i) in $store.state.boardState.sequences"
            :key="i">

            <single-sequence
                :sequence="sequence"
                :key="sequence.id"
                :index="i"/>

        </li>

        <li>
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

    li + li {
        margin-top: 20px;
    }
}
</style>
