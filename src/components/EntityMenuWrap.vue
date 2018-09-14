<template>

    <section class="entity-menu-wrap">

        <button class="close" aria-label="close" @click="$emit('onClose')">X</button>

        <ul>
            <li
                v-for="(entity, i) in entities"
                :key="i">
                <button
                    v-interact="() => selectedEntityIndex = i"
                    v-interact.end="() => selectedEntityIndex = -1"
                    @click="$emit('addEntity', cmpSelectedEntity)">
                    {{ entity.name }}
                </button>
            </li>
        </ul>

        <span class="description" v-if="cmpSelectedEntity">
            {{ cmpSelectedEntity.description }}
        </span>

    </section>

</template>

<script>
import _get from 'lodash/get'

export default {
    data() {
        return {
            selectedEntityIndex: -1
        }
    },
    computed: {
        cmpSelectedEntity() {
            return _get(this.entities, `[${this.selectedEntityIndex}]`, false)
        },
        entities() {
            return this.$root.entities
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.entity-menu-wrap {
    background-color: $white;
    padding: 10px;
    z-index: 15;

    // Close button
    .close {
        position: absolute;
        top: 0;
        left: 100%;
        padding: 5px 10px;
        background-color: $danger;
        color: $white;

        &:hover,
        &:focus {
            background-color: $dark-danger;
        }
    }

    // Main list
    ul {
        padding: 0;
        list-style: none;
        margin: 0;

        li:nth-child(even) {
            background-color: rgba($black, 0.2);
        }
        button {
            padding: 5px;
            width: 100%;
            text-align: left;
        }
    }

    // Description
    .description {
        position: absolute;
        top: 100%;
        left: 0;
        padding: 10px;
        background-color: $white;
        width: 150px;
    }
}
</style>
