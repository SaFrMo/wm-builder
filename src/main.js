// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/utils/router'
import store from '@/utils/store'
import Case from 'case'
import board from '@/board'
const { entities } = board

Vue.config.productionTip = false

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

// UID for each el
// https://stackoverflow.com/a/43692973/3856675
Vue.use({
    install: function(Vue, options) {
        Object.defineProperty(Vue.prototype, 'uniqId', {
            get: function uniqId() {
                return this._uid
            }
        })
    }
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
