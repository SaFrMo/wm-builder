<template>

    <aside class="entity-expanded-meta">

        <h3 class="title">{{ entity.name }} Meta</h3>

        <button class="close" aria-label="close" @click="$emit('onClose')">X</button>

        <div class="entry" v-for="(entry, i) in entity.meta">

            <input aria-label="key" type="text" v-model="entity.meta[i].key">

            <input aria-label="value" type="text" v-model="entity.meta[i].value">

            <button class="delete" @click="entity.meta.splice(i, 1)">X</button>

        </div>

        <button class="add" @click="entity.meta.push({ key: '', value: '' })">+</button>

    </aside>

</template>

<script>
export default {
    props: {
        entity: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        sortedMeta() {
            return entity.meta
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.entity-expanded-meta {
    background-color: $white;
    padding: 10px;
    z-index: 15;
    position: fixed;

    .title {
        margin-top: 0;
    }

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

    // Add entry
    .add {
        background: $safe;
        padding: 0 5px;
        color: $white;

        &:hover,
        &:focus {
            background: $dark-safe;
        }
    }

    // Delete entry
    .delete {
        background: $danger;
        color: $white;
        padding: 0 5px;

        &:hover,
        &:focus {
            background: $dark-danger;
        }
    }
}
</style>
