<template>

    <div class="single-goal">

        <button class="remove" @click="$store.commit('REMOVE_GOAL', { goal })">
            X
        </button>

        <div class="name wrapper">
            <label :for="`name-${ goal.guid }`">Name</label>
            <input type="text" :id="`name-${ goal.guid }`" v-model="goal.name">
        </div>

        <div class="text wrapper">
            <label :for="`text-${ goal.guid }`">Text</label>
            <textarea type="text" :id="`text-${ goal.guid }`" v-model="goal.text"/>
        </div>

        <div class="importance wrapper">
            <label :for="`importance-${ goal.guid }`">Priority</label>
            <select v-model="goal.importance" :id="`importance-${ goal.guid }`">
                <option disabled value="">Select one...</option>
                <option v-for="level in importanceLevels">{{ level }}</option>
            </select>
        </div>

        <condition-wrap
            :sequence="goal"
            @add-condition="addCondition"
            @remove-condition="({ index }) => removeCondition(index)"
            :is-goal="true">

            <h3 class="condition-label">Conditions</h3>

        </condition-wrap>

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
    background: rgba($black, 0.2);
    padding: 10px;
    margin-bottom: 10px;
    color: $white;

    // Generic
    input,
    textarea {
        @include input-styling;
    }
    textarea {
        font-size: 14px;
        font-weight: 400;
    }
    .wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        label {
            width: 30%;
        }
        input,
        textarea {
            flex: 1;
            margin: 0 30px 0 10px;
        }
    }

    .condition-label {
        margin-bottom: 10px;
    }

    // Remove button
    .remove {
        background: $danger;
        color: $white;
        padding: 0 10px;
        display: block;
        margin: 0;
        position: absolute;
        top: 0;
        right: 0;

        &:hover,
        &:focus {
            background: $dark-danger;
        }
    }
}
</style>
