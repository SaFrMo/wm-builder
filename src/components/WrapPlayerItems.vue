<template>
    <ul class="wrap-player-items">
        <li
            v-for="(item, i) in $store.state.boardState.playerItems"
            :key="i + item.label"
            class="wrap-entry"
        >
            <single-player-item
                :item="item"
                @change="
                    $store.commit('SET_PLAYER_UNIT', { index: i, val: $event })
                "
                @remove="$store.commit('REMOVE_UNIT_AT', i)"
            />
        </li>

        <li class="wrap-entry">
            <button class="add-item" @click="$store.commit('ADD_PLAYER_UNIT')">
                Add
            </button>
        </li>
    </ul>
</template>

<script>
import { playerItems } from '@/content'
export default {
    data() {
        return {
            playerItems
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.wrap-player-items {
    margin: 0;

    .wrap-entry + .wrap-entry {
        border-top: 2px solid $white;
        padding-top: 15px;
    }

    .wrap-entry + .wrap-entry {
        margin-top: 20px;
    }
    .add-item {
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
