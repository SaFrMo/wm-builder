<template>

    <section class="item-builder">

        <h2>Item Builder</h2>

        <p>(Not yet complete! Use at your own risk!)</p>

        <div class="builder-wrap">

            <label for="name">Name</label>
            <input type="text" id="name" v-model="name"/>

            <div>
                <label for="guid">GUID</label>
                <button @click="guid = Date.now()">Generate New</button>
            </div>
            <input readonly disabled type="text" id="guid" v-model="guid"/>

            <label for="description">Description</label>
            <textarea id="description" v-model="description"/>

            <label for="value">Value</label>
            <input type="number" id="value" v-model="value"/>

            <a
                aria-hidden="true"
                v-show="false"
                ref="downloadLink"
                :href="dataString"
                :download="name + '.json'"/>

        </div>

        <button @click="exportItem">Download Item</button>

    </section>

</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            // values to be serialized
            name: '',
            guid: Date.now(),
            description: '',
            value: 0,

            // other values
            dataString: ''
        }
    },
    methods: {
        async exportItem() {
            // Build data from board state
            this.dataString = `data:text/json;charset=utf-8,`

            // get relevant data
            const toSave = { ...this.$data }
            // delete anything we don't need
            delete toSave.dataString

            // save data to string
            this.dataString += encodeURIComponent(JSON.stringify(toSave))

            // Let data string populate
            await Vue.nextTick()
            // Download json
            this.$refs.downloadLink.click()

            // Next item needs to be unique, so let's generate a new guid
            this.guid = Date.now()
        }
    }
}
</script>

<style lang="scss">
.item-builder {
    .builder-wrap {
        display: grid;
        grid-template-columns: repeat(2, 50%);
        grid-row-gap: 10px;

        textarea {
            grid-column: 1 / span 2;
        }
    }
}
</style>
