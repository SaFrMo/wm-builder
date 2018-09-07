<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import autosave from '@/mixins/autosave'

export default {
    name: 'App',
    mixins: [autosave]
}
</script>

<style lang="scss">
@import 'src/styles/vars';

body {
    margin: 0;
}
#app {
    font-family: $font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

button {
    background-color: transparent;
    font-family: $font-family;
    border: none;
    padding: 0;
    font-size: 16px;
    cursor: pointer;
}
</style>
