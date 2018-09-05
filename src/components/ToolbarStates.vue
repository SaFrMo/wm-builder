<template>

    <aside class="toolbar-states">

        <h2 class="title">Board States</h2>

        <ul class="button-wrap">
            <button
                @click="addState"
                aria-label="Add board state">+</button>
        </ul>

    </aside>

</template>

<script>
export default {}
</script>

<style lang="scss">
@import 'src/styles/vars';

.toolbar-states {
    background-color: $partition;
    position: relative;

    .title {
        color: $white;
        margin: 0;
        position: absolute;
        top: calc(100% - 10px);
        left: 0;
        transform: rotate(-0.25turn);
        transform-origin: top left;
        font-size: 30px;
    }
    .button-wrap {
        display: flex;
        align-items: center;
        height: 100%;
        margin: 0 0 0 60px;
        padding: 10px 0;
        box-sizing: border-box;

        button {
            width: 100px;
            height: 100px;
            background-color: rgba($black, 0.2);
            color: $white;
            border-radius: 15px;

            &:hover,
            &:focus {
                background-color: rgba($black, 0.4);
            }
        }
        button:last-child {
        }
    }
}
</style>
