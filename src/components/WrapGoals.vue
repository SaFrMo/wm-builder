<template>

    <ul class="wrap-goals">

        <li
            v-for="(goal, i) in $store.state.boardState.goals"
            :key="i"
            class="wrap-entry">

            <single-goal
                :goal="goal"
                :key="goal.guid"
                :index="i"/>

        </li>

        <li class="wrap-entry">
            <button
                class="add-goal"
                @click="$store.commit('ADD_BOARD_GOAL')">
                Add Goal
            </button>
        </li>

    </ul>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'src/styles/vars';

.wrap-goals {
    margin: 0;

    .add-goal {
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
