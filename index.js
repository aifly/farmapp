import Vue from "vue";
import Obserable from './components/lib/obserable';
import BaseInfo from './components/baseinfo/index';
import Home from './components/home/index';
import Login from './components/login/index';
import FError from './components/ferror/index';
import Scan from './components/scan/index';
import Game from './components/game/index';
import My from './components/my/index';
import Repertory from './components/repertory/index';
import Myaddress from './components/myaddress/index';
import MyaddressAction from './components/myaddressaction/index';
import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/lib/touch.js'
import vueTap from 'vue-js-tap';
Vue.use(vueTap);

Vue.use(VueRouter)


var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
  
  routes: [
    {path: '*', name: 'error', component: FError },
    { path: '/baseinfo/:id', name: 'baseinfo', component: BaseInfo, props: true },
    { path: '/', name: 'Home', component: Home, props: true },
    { path: '/login', name: 'Login', component: Login, props: true },
    { path: '/scan', name: 'Scan', component: Scan, props: true },
    { path: '/game', name: 'Game', component: Game, props: true },
    { path: '/myaddress', name: 'myaddress', component: Myaddress, props: true },
    { path: '/myaddressaction/:id?', name: 'myaddressaction', component: MyaddressAction, props: true },
	{
	path: '/my',
	name: 'my',
	component: My,
	props: true
	},
	{ path: '/repertory', name: 'repertory', component: Repertory, props: true },
  ]
});

new Vue({
	router,
	data: {
		obserable,
		imgs,
		viewH: document.documentElement.clientHeight,
	},
	el: '#app',
	template: `<div id="app1">
       <router-view></router-view>
    </div>`,
	methods: {
	},
	components: {
		BaseInfo,
	},
	mounted() {

		this.$router.obserable = obserable;


	}
}).$mount('#app1')