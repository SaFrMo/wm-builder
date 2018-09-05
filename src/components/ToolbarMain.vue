<template>

    <section class="toolbar-main">

        <meta-info/>

        <div>
            <!-- NSEW -->
            <button
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [-1, 0])">
                Move left
            </button>
            <button
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [1, 0])">
                Move right
            </button>
            <button
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [0, 1])">
                Move up
            </button>
            <button
                @click="$store.commit('CHANGE_BOTTOM_LEFT_BY', [0, -1])">
                Move down
            </button>

            <hr>

            <!-- Zoom -->
            <button
                @click="$store.commit('CHANGE_GRID_SIZE_BY', -1)">
                Zoom in
            </button>
            <button
                @click="$store.commit('CHANGE_GRID_SIZE_BY', 1)">
                Zoom out
            </button>

            <hr>

            <!-- Recenter -->
            <button
                @click="$store.commit('RECENTER_GRID')">
                Recenter
            </button>

            <hr>

            <!-- Export/Import -->
            <button
                @click="startExport">
                Export Level
            </button>

            <button
                @click="startImport">
                Import Level
            </button>

            <!-- Hidden element to export board -->
            <a
                aria-hidden="true"
                v-show="false"
                ref="downloadLink"
                :href="dataString"
                :download="$store.state.boardState.name + '.json'"/>
        </div>

    </section>

</template>

<script>
import Vue from 'vue'
import autosave from '@/mixins/autosave'

export default {
    mixins: [autosave],
    data() {
        return {
            dataString: ''
        }
    },
    methods: {
        async startExport() {
            // Build data from board state
            this.dataString = `data:text/json;charset=utf-8,`
            this.dataString += encodeURIComponent(
                JSON.stringify(this.$store.state.boardState)
            )

            // Let data string populate
            await Vue.nextTick()
            // Download json
            this.$refs.downloadLink.click()
        },
        startImport() {}
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.toolbar-main {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    background-color: skyblue;
    padding: 10px;
    box-sizing: border-box;

    * + * {
        margin-top: 5px;
    }

    button {
        width: 100%;
        height: 50px;
        background-color: rgba($black, 0.4);
        color: $white;
        border: none;
        font-family: $font-family;
        font-size: 18px;
        cursor: pointer;

        &:hover,
        &:focus {
            background-color: rgba($black, 0.8);
        }
    }

    hr {
        opacity: 0;
    }
}
</style>
