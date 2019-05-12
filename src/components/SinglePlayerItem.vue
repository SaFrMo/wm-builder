<template>
    <li class="single-player-item">
        <select v-model="selectedItem">
            <option disabled value="">Select a unit...</option>
            <option v-for="(item, i) in playerItems" :value="item" :key="i">
                {{ item.label }}
            </option>
        </select>

        <button class="remove" @click="$emit('remove')">X</button>
    </li>
</template>

<script>
import { playerItems } from '@/content'
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    mounted() {
        this.selectedItem = this.item
    },
    data() {
        return {
            playerItems,
            selectedItem: ''
        }
    },
    watch: {
        selectedItem(newVal) {
            this.$emit('change', newVal)
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.single-player-item {
    .remove {
        background: $danger;
        color: $white;
        padding: 5px;

        &:hover,
        &:focus {
            background: $dark-danger;
        }
    }
}
</style>
