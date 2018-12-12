<template>

    <section class="item-builder">

        <div class="builder-wrap">

            <!--Name-->
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name"/>

            <!--Icon-->
            <div class="icon">
                <label for="icon">Icon</label>
                <img :src="icon" class="full-width"/>
            </div>
            <input type="file" @change="iconUploaded" ref="icon"/>

            <!--TODO: Add model uploaders-->

            <!--GUID-->
            <div>
                <label for="prefabGuid">GUID</label>
                <button @click="prefabGuid = Date.now()">Generate New</button>
            </div>
            <input readonly disabled type="text" id="prefabGuid" v-model="prefabGuid"/>

            <!--Description-->
            <label for="description">Description</label>
            <textarea id="description" v-model="description"/>

            <!-- Uses -->
            <label for="useLimit">
                <div>Uses Before Breaking</div>
                <div>(-1 = unbreakable)</div>
            </label>
            <input type="number" id="useLimit" v-model="useLimit"/>


            <!--Value-->
            <label for="value">Value</label>
            <input type="number" id="value" v-model="value"/>

            <!--Type-->
            <label for="item-type">I'm a(n)...</label>
            <select v-model="itemType" id="item-type">
                <option disabled value="">Select one</option>
                <option v-for="(type, i) in itemTypes" :key="i" :value="type">{{ type }}</option>
            </select>

            <!--Details-->
            <div class="item-details" v-if="itemType">

                <!--Label-->
                <h3 class="stat-label">Stats</h3>

                <!--Details-->
                <div
                    v-for="(key, i) in Object.keys(details)"
                    :key="i"
                    class="detail">

                    <label :for="key">{{ uppercase(key) }}</label>
                    <nested-input type="text" v-model="details[key]"/>

                </div>

            </div>

        </div>

        <button class="export" @click="exportItem">Download Item</button>

    </section>

</template>

<script>
/* global JSZip */
import Vue from 'vue'
import saveAs from 'file-saver'
import defaults from './items'
import toCapitalCase from 'to-capital-case'

export default {
    data() {
        return {
            // values to be serialized
            name: '',
            icon: '',
            prefabGuid: Date.now(),
            description: '',
            value: 0,
            useLimit: -1,
            itemType: '',
            details: {},
            meta: [],

            // other values
            dataString: '',
            itemTypes: Object.keys(defaults).sort(),
            defaults
        }
    },
    methods: {
        uppercase(val) {
            return toCapitalCase(val)
        },
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
            delete toSave.itemTypes
            delete toSave.defaults

            // delete any non-text
            delete toSave.icon

            // save the text
            zip.file(`${this.name}.json`, JSON.stringify(toSave))

            // save the icon
            const imgString = this.icon.replace(
                /^data:image\/(png|jpg|jpeg);base64,/,
                ''
            )
            zip.file(`${this.prefabGuid}.png`, imgString, { base64: true })

            // create the zip
            const res = await zip.generateAsync({ type: 'blob' })

            // download!
            saveAs(res, `${this.name}.zip`)
        }
    },
    watch: {
        itemType(newVal) {
            this.details = { ...this.defaults[newVal] }
        }
    }
}
</script>

<style lang="scss">
.item-builder {
    margin-top: 20px;

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
        .stat-label {
            margin: 5px 0 10px;
        }
        .detail {
            display: grid;
            grid-template-columns: repeat(2, 50%);
        }
    }

    .export {
        margin-top: 15px;
    }
}
</style>
