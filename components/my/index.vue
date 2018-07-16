<template>
	<div  class="symbin-my-main-ui lt-full">
		<header>
			<div>
				<img :src="imgs.homeIco1" alt="">
			</div>
			<div>
				<img :src="imgs.settingIco1" alt="">
			</div>
		</header>
		<section class="symbin-my-main-content">
			<div class="symbin-my-head">
				<div><img :src="imgs.logo1" alt=""></div>
				<div>慕容农场</div>
			</div>

			<div class="symbin-my-goods">
				<div>
					<img :src="imgs.myStore" alt="">
					我的仓库
				</div>
				<div>
					<img :src="imgs.tanwei" alt="">
					我的摊位
				</div>
				<div>
					<img :src="imgs.myOrder" alt="">
					 我的订单
				</div>
			</div>
			<div class="symbin-fill"></div>

			<div class="symbin-my-package">
				<div>
					<img :src="imgs.lipinka" alt="">
					礼品卡
				</div>
				<div>
					<img :src="imgs.youhuiquan" alt="">
					优惠券
				</div>
				<div>
					<img :src="imgs.kuaidiquan" alt="">
					 快递券
				</div>
				<div>
					<img :src="imgs.addressIco" alt="">
					地址管理
				</div>
			</div>

			<div class="symbin-my-package">
				<div>
					<img :src="imgs.fapiao" alt="">
					发票
				</div>
				<div>
					<img :src="imgs.fankui" alt="">
					意见反馈
				</div>
				<div style="opacity:0">
					<img :src="imgs.kuaidiquan" alt="">
					 快递券
				</div>
				<div style="opacity:0">
					<img :src="imgs.addressIco" alt="">
					地址管理
				</div>
			</div>

			<div class="symbin-contact">
				<div>
					<div>联系我们</div>
					<div class="symbin-tel">
						400-400-400
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import './index.css';

	import symbinUtil from '../lib/util';

	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				stepIndex:0,
				transX:0,
				translateX:0,
				showCharts:true,
				baseInfo:{

				}
			}
		},
		components:{
		},
		
		methods:{
		},
		mounted(){
		}
	}
</script>
 