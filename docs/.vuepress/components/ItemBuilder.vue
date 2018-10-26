<template>

    <section class="item-builder">

        <h2>Item Builder</h2>

        <p>(Not yet complete! Use at your own risk!)</p>

        <div class="builder-wrap">

            <label for="name">Name</label>
            <input type="text" id="name" v-model="name"/>

            <div class="icon">
                <label for="icon">Icon</label>
                <img :src="icon" class="full-width"/>
            </div>
            <input type="file" @change="iconUploaded" ref="icon"/>

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
/* global JSZip */
import Vue from 'vue'
import saveAs from 'file-saver'

export default {
    data() {
        return {
            // values to be serialized
            name: '',
            icon: '',
            guid: Date.now(),
            description: '',
            value: 0,

            // other values
            dataString: ''
        }
    },
    methods: {
        iconUploaded() {
            // get result
            const reader = new FileReader()
            reader.onload = () => {
                this.icon = reader.result
            }
            if (this.$refs.icon) {
                this.$refs.icon.blur()
                reader.readAsDataURL(this.$refs.icon.files[0])
            }
        },
        async exportItem() {
            const zip = new JSZip()

            const toSave = { ...this.$data }

            // delete anything we don't want to save
            delete toSave.dataString

            // delete any non-text
            delete toSave.icon

            // save the text
            zip.file(`${this.name}.json`, JSON.stringify(toSave))

            // save the icon
            const imgString = this.icon.replace(
                /^data:image\/(png|jpg|jpeg);base64,/,
                ''
            )
            zip.file('icon.png', imgString, { base64: true })

            // create the zip
            const res = await zip.generateAsync({ type: 'blob' })

            // download!
            saveAs(res, 'example.zip')
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
        .icon img {
            width: 128px;
            height: auto;
            display: block;
        }
    }
}
</style>
