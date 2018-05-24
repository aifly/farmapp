<template>
	<div class="symbin-game-ui lt-full" :style="{background:'url('+imgs.gameBg+') no-repeat center top',backgroundSize:'cover'}">
		<div class="symbin-game-nav">
			<div class="symbin-msg-ico">
				<img :src="imgs.msgIco" alt="">
			</div>
			<div class="symbin-shop-ico">
				<img :src="imgs.shopIco" alt="">
			</div>
			<div class="symbin-friend-ico">
				<img :src="imgs.friendIco" alt="">
			</div>
			<div class="symbin-setting-ico">
				<img :src="imgs.settingIco" alt="">
			</div>
		</div>

		<div class="symbin-game-stage">
			<img :src="imgs.gameStage" alt="">
		</div>
		<Toast :msg="toastMsg"></Toast>
		<Setting></Setting>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import Toast from '../toast/toast';
	import Setting from '../commom/setting/index';
	export default {
		props: ['obserable'],
		data() {
			return {
				imgs,
				viewW: window.innerWidth,
				toastMsg: '',
			}
		},
		components: {
			Toast,
			Setting
		},
	
		methods: {
			toast(msg, time = 1500) {
				this.toastMsg = msg;
				setTimeout(() => {
					this.toastMsg = '';
				}, time);
			}
		},
		mounted() {
	
		}
	}
</script>
 