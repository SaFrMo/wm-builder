<template>

    <aside class="entity-expanded-meta">

        <h3 class="title">{{ entity.name }} Meta</h3>

        <button class="close" aria-label="close" @click="$emit('onClose')">X</button>

        <div class="entry" v-for="(entry, i) in entity.meta">

            <input aria-label="key" type="text" v-model="entity.meta[i].key">

            <button class="toggle-presets" @click="showPresetsOn = showPresetsOn == i ? -1 : i">
                {{ showPresetsOn == i ? 'X' : '...' }}
            </button>

            <div class="presets" v-if="showPresetsOn == i">
                <button v-for="(preset, j) in presets" @click="entity.meta[i].key = preset.value; showPresetsOn = -1">
                    {{ preset.name }}
                </button>
            </div>

            <input aria-label="value" type="text" v-if="entity.meta[i].key != 'sequences'" v-model="entity.meta[i].value">
            <ul class="sequence-selection-wrap" v-else>
                <li v-for="(sequence, j) in $store.state.boardState.sequences" :key="j">
                    <input
                        type="checkbox"
                        :id="`seq${j}`"
                        :key="`seq${j}`"
                        :value="sequence.id"
                        @change="updateList($event, i)"
                        v-model="checkedSequences"/>
                    <label :for="`seq${j}`">{{ sequence.name }}</label>
                </li>
            </ul>

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
    mounted() {
        const sequencesItem = this.entity.meta.filter(x => x.key == 'sequences')
        if (sequencesItem.length) {
            this.checkedSequences = sequencesItem[0].value.split(',')
        }
    },
    data() {
        return {
            showPresetsOn: -1,
            presets: [
                { name: 'HP', value: 'hp' },
                { name: 'AP', value: 'ap' },
                { name: 'Name', value: 'name' },
                {
                    name: 'Description',
                    value: 'description'
                },
                { name: 'Sequences', value: 'sequences' }
            ],
            checkedSequences: []
        }
    },
    computed: {
        sortedMeta() {
            return entity.meta
        }
    },
    methods: {
        updateList(evt, index) {
            this.entity.meta[index].value = this.checkedSequences.join(',')
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

    .entry {
        display: grid;
        grid-template-columns: [key] 1fr [button] auto [value] 1fr [delete] auto;
        grid-auto-flow: dense;

        .toggle-presets {
            padding: 0 5px;
            background: rgba($black, 0.2);

            &:hover,
            &:focus {
                background: rgba($black, 0.1);
            }
        }
        .presets {
            grid-column: key / value;
            padding: 5px 0;

            button {
                padding: 2px 8px;
                background: rgba($black, 0.2);
                border-radius: 10px;

                &:hover,
                &:focus {
                    background: rgba($black, 0.1);
                }
            }
        }
    }

    // Sequence selection for drops
    .sequence-selection-wrap {
        margin-left: 5px;
        list-style: none;
        margin-top: 0;
        margin-bottom: 0;
        padding: 0;
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
