<template>
	<div class='symbin-message-main-ui lt-full'>
		<div class="symbin-message-main">
			<header>
				<img :src="imgs.messageTitle" alt="">
			</header>
			<div class="symbin-message-list">
				
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../../lib/util';
	import IScroll from 'iscroll';
	import Vue from 'vue';
	export default {
		props: ['obserable'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				index: 0,
				currentIndex: 0,
				allPrice: 0,
				buyCount: 1,
				show:true,
				goodsList: [],
				paytypeList:[],
			}
		},
		components: {},
	
		methods: {

			toggleSeeding(index){
				var s = this;
				s.index = index;
				s.allPrice = s.goodsList[s.index].goodsprice * s.buyCount;
			},

			entryCart(){
				//判断用户是否登录
				if(!symbinUtil.isLogin()){
					window.location.hash = '/login';
					return;
				}

				var s = this;
				var {obserable} = Vue;

				var cart =  this.goodsList[this.index];
				if(!cart){
					return;
				}
				cart.goodscount = this.buyCount;



				obserable.trigger({
					type:'showOrder',
					data:{
						goodsList:[
							cart
						]
					}
				})
			},
	
			updateCount(flag) {
				var s = this;
				if (flag) {
					this.buyCount++;
				} else {
					this.buyCount--;
				}
				if (this.buyCount <= 1) {
					this.buyCount = 1;
				}
	
				s.allPrice = s.goodsList[s.index].goodsprice * s.buyCount;
			},
			closeShop(){
				this.show = false;
			},
			requestGoodsList(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl +'/user/getgoodslist/',
					data:{},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.goodsList = data.list;
							s.allPrice = s.goodsList[s.index].goodsprice * s.buyCount;
							s.goodsList.forEach((seed,i)=>{
								if(!seed.src){
									seed.src = s.imgs.demo
								}
							});
						}
					}
				})
			}
		},
		mounted() {
			this.requestGoodsList();
			var {obserable} = Vue;

			obserable.on('showShop',(data)=>{
				this.show = true;
			});
		}
	}
</script>
 