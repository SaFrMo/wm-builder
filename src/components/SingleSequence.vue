<template>

    <div class="single-sequence">

        {{ sequence }}

        <br/>

        <input v-model="name"/>

        <button
            @click="$store.commit('REMOVE_SEQUENCE', sequence.id)"
            class="remove">
            Remove
        </button>

    </div>

</template>

<script>
export default {
    props: {
        sequence: {
            type: Object,
            default: () => {}
        },
        index: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            name: ''
        }
    },
    mounted() {
        this.name = this.sequence.name
    },
    watch: {
        name(newVal) {
            this.$store.commit('CHANGE_SEQUENCE_NAME', {
                id: this.sequence.id,
                value: newVal
            })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.single-sequence {
    .remove {
        background: $danger;
        color: $white;
        padding: 5px;
    }
}
</style>
