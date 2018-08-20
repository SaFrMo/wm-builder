<template>

    <section class="poi-menu-wrap">

        <button class="close" aria-label="close" @click="$emit('onClose')">X</button>

        <ul>
            <li
                v-for="(poi, i) in pois"
                :key="i">
                <button
                    v-interact="() => selectedPoiIndex = i"
                    v-interact.end="() => selectedPoiIndex = -1"
                    @click="$emit('addPoi', cmpSelectedPoi)">
                    {{ poi.name }}
                </button>
            </li>
        </ul>

        <span class="description" v-if="cmpSelectedPoi">
            {{ cmpSelectedPoi.description }}
        </span>

    </section>

</template>

<script>
import _get from 'lodash/get'

export default {
    data() {
        return {
            selectedPoiIndex: -1
        }
    },
    computed: {
        cmpSelectedPoi() {
            return _get(this.pois, `[${this.selectedPoiIndex}]`, false)
        },
        pois() {
            return this.$root.pois
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.poi-menu-wrap {
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
