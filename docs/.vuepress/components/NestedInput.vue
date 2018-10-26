<template>

    <input v-model="internalValue" class="nested-input" type="text"/>

</template>

<script>
export default {
    props: {
        value: String
    },
    computed: {
        internalValue: {
            get() {
                return this.value
            },
            set(v) {
                this.$emit('input', v)
            }
        }
    }
}
</script>

<style lang="scss">
.nested-input {
}
</style>
