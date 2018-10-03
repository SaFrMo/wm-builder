<template>

    <div class="key-value-field">

        <textarea placeholder="Label" class="key" v-model="key"/>

        <textarea placeholder="Info" class="value" v-model="val"/>

        <div class="delete-wrap">
            <button
                class="delete"
                @click="$store.commit('DELETA_BOARD_META', index)">
                X
            </button>
        </div>

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
    display: grid;
    grid-template-areas:
        'key key delete'
        'value value value';
    grid-template-columns: 1fr 1fr 1fr;

    textarea {
        background: rgba($black, 0.4);
        color: $white;
        font-size: 14px;
        border: none;
        padding: 5px 5px;
        width: 100%;
        box-sizing: border-box;
        max-width: 100%;
        resize: vertical;
        font-family: $font-family;
        height: 50px;

        &:hover,
        &:focus {
            background: rgba($black, 0.6);
        }
    }
    .key {
        grid-area: key;
    }
    .value {
        grid-area: value;
    }
    .delete-wrap {
        height: 100%;
        margin: 0 0 0 10px;
        // display: flex;
        // align-items: flex-end;
        grid-area: delete;
        position: relative;
    }
    .delete {
        width: 100%;
        margin: 0;

        background: $danger;
        font-size: 14px;
    }

    & + .key-value-field {
        border-top: 2px solid $white;
        padding-top: 5px;
    }
}
</style>
