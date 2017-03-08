import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Log from 'loglevel'; // eslint-disable-line no-unused-vars
import App from './App.vue';
import routes from './routes';
import store from './store';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({ // eslint-disable-line no-new
    router,
    store,
    render: h => h(App)
}).$mount('#app');
