<template>

    <div class="key-value-field">

        <input v-model="key"/>

        <input v-model="val"/>

        <button @click="$store.commit('DELETA_BOARD_META', index)">Delete</button>

    </div>

</template>

<script>
export default {
    data() {
        return {
            key: this.kv.key || '',
            val: this.kv.val || ''
        }
    },
    props: {
        kv: {
            type: Object,
            default: () => {}
        },
        update: {
            type: Function,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    watch: {
        key(newVal) {
            this.update({ key: newVal, val: this.val })
        },
        val(newVal) {
            this.update({ key: this.key, val: newVal })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.key-value-field {
}
</style>
