<template>

    <div class="single-goal">

        <div class="name">
            <label :for="`name-${ goal.guid }`">Name</label>
            <input type="text" :id="`name-${ goal.guid }`" v-model="goal.name">
        </div>

        <div class="text">
            <label :for="`text-${ goal.guid }`">Text</label>
            <textarea type="text" :id="`text-${ goal.guid }`" v-model="goal.text"/>
        </div>

        <div class="importance">
            <label :for="`importance-${ goal.guid }`">Priority</label>
            <select v-model="goal.importance" :id="`importance-${ goal.guid }`">
                <option disabled value="">Select one...</option>
                <option v-for="level in importanceLevels">{{ level }}</option>
            </select>
        </div>

        <sequence-condition-wrap
            :sequence="goal"
            @add-condition="addCondition"
            @remove-condition="({ index }) => removeCondition(index)"/>

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
    },
    methods: {
        addCondition(condition) {
            this.goal.conditions.push(condition)
        },
        removeCondition(index) {
            this.goal.conditions.splice(index, 1)
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
