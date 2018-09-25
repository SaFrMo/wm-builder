// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/utils/router'
import store from '@/utils/store'
import Case from 'case'
import entities from '@/board/entities'

Vue.config.productionTip = false
Vue.config.devtools = true

// Register directives
Vue.directive('keydown', require('fh-components/v-keydown'))
Vue.directive('interact', require('fh-components/v-interact'))

// Register components in src/
// ===============================
const components = require.context('./components', true)
components.keys().map(component => {
    // turn './ComponentName.vue' into 'component-name'
    const componentName = Case.kebab(
        component.replace(/^\.\//, '').replace(/\.vue$/, '')
    )
    // register new component globally
    Vue.component(componentName, components(component).default)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    data() {
        return {
            entities
        }
    }
})
