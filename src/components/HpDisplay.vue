<template>

    <div class="hp-display">

        <div class="input-wrap">

            <input class="min" v-model="min">
            <span class="bar-wrap">
                <input
                    type="range"
                    class="bar"
                    v-model="current"
                    :min="min"
                    :max="max"
                    step="1"/>
                <input class="current" v-model="current"/>
            </span>
            <input class="max" v-model="max">

        </div>

    </div>

</template>

<script>
import _get from 'lodash/get'

export default {
    props: {
        hp: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            min: _get(this, 'hp.min', 0),
            current: _get(this, 'hp.current', 0),
            max: _get(this, 'hp.max', 0)
        }
    },
    computed: {
        cmpStyle() {}
    },
    watch: {
        current() {
            this.$emit('onHpChanged', {
                min: this.min,
                current: this.current,
                max: this.max
            })
        },
        min() {
            this.$emit('onHpChanged', {
                min: this.min,
                current: this.current,
                max: this.max
            })
        },
        max() {
            this.$emit('onHpChanged', {
                min: this.min,
                current: this.current,
                max: this.max
            })
        }
    }
}
</script>

<style lang="scss">
@import 'src/styles/vars';

.hp-display {
    .label {
        text-align: center;
        font-size: 12px;
    }
    .input-wrap {
        display: flex;
        align-items: center;
        margin: 10px 5px;
        width: calc(100% - 10px);
    }
    .min,
    .max,
    .current {
        @include input-styling;
        width: 20px;
        display: inline;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
    }

    .bar-wrap {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        height: 4px;
        background: $white;
        margin: 0 5px;
        position: relative;
        padding: 0;
        margin: 0;
        background: transparent;

        .bar {
            width: 100%;
            margin: 0;
        }
        .current {
            margin: auto;
        }
    }
    .center-line {
        @include fill;
        width: 2px;
        background: $black;
        margin: auto;
        height: calc(100% + 10px);
    }
}
</style>
