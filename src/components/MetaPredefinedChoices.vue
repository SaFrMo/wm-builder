<template>
    <div class="meta-predefined-choices">
        <ul class="sequence-selection-wrap">
            <li v-for="(choice, i) in choices" :key="i">
                <input
                    type="checkbox"
                    :id="`${uniqId}-seq${i}`"
                    :key="`seq${i}`"
                    :value="getValue(choice)"
                    v-model="values"
                />
                <label :for="`${uniqId}-seq${i}`">{{ getLabel(choice) }}</label>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        choices: {
            type: Array,
            default: () => []
        },
        getValue: {
            type: Function,
            default: val => val
        },
        getLabel: {
            type: Function,
            default: val => val
        },
        passedValues: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.values = this.passedValues.split(',').filter(Boolean)
    },
    data() {
        return {
            values: []
        }
    },
    watch: {
        values(newVal) {
            this.$emit('value-change', newVal.join(','))
        }
    }
}
</script>

<style lang="scss">
.meta-predefined-choices {
    .sequence-selection-wrap {
        max-height: 55px;
        overflow-y: auto;
    }
}
</style>
