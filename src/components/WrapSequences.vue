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
                class="add-sequence"
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
        border-top: 2px solid $white;
        padding-top: 15px;
    }

    .wrap-entry + .wrap-entry {
        margin-top: 20px;
    }
    .add-sequence {
        width: 100%;
        padding: 10px 20px;
        background-color: $safe;
        color: $white;

        margin-bottom: 20px;

        &:hover,
        &:focus {
            background-color: $white;
            color: $black;
        }
    }
}
</style>
