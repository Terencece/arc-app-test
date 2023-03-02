import Vue from 'vue';
import App from './App.vue';
import * as filters from './utils/filters';
Vue.config.productionTip = false;
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
