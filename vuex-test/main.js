import Vue from 'vue';
import App from './components';

import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 路由模块和HTTP模块
Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter();

router.map({
    '/index': {
        component: components
    }
});

router.redirect({
    '*': '/index'
});

router.start(components, '#v-app');