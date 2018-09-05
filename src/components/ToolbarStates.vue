<template>

    <aside class="toolbar-states">

        <h2 class="title">Board States</h2>

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
}
</style>
