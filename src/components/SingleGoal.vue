<template>

    <div class="single-goal">

        <div class="name">
            <label :for="`name-${ goal.guid }`">Name</label>
            <input type="text" :id="`name-${ goal.guid }`" v-model="goal.name">
        </div>

        <div class="text">
            <label :for="`text-${ goal.guid }`">Text</label>
            <input type="text" :id="`text-${ goal.guid }`" v-model="goal.text">
        </div>

        <div class="conditions">Conditions</div>

        <div class="importance">
            <select v-model="goal.importance">
                <option disabled value="">Select one...</option>
                <option v-for="level in importanceLevels">{{ level }}</option>
            </select>
        </div>

        <button class="remove" @click="$store.commit('REMOVE_GOAL', { goal })">X</button>

    </div>

</template>

<script>
export default {
    props: {
        goal: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            importanceLevels: ['primary', 'secondary']
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.single-goal {
    .remove {
        background: $danger;
        color: $white;
        padding: 2px 7px;

        &:hover,
        &:focus {
            background: $dark-danger;
        }
    }
}
</style>
