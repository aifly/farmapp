<template>
	<div class='symbin-shop-main-ui lt-full' v-show='show'>
		<div>
			<h2>
				<img :src="imgs.shopTitle" alt="">
				<span v-tap='[closeShop]'>
					<img :src="imgs.shopClose" alt="">
				</span>
			</h2>
			<h1 style="height:120px"></h1>
			<div class='symbin-shop-content'>
				<aside>
					<ul>
						<li :class="{'active':i === index}" v-tap='[toggleSeeding,i]' v-for='(goods,i) in goodsList' :key="i">
							<div class="symbin-shop-product">
								<div>
									<img :src="goods.imagepath" alt="">
								</div>
							</div>
							<div class="symbin-shop-breedname">{{goods.goodsname}}</div>
						</li>
					</ul>
				</aside>
				<aside>
					<div class="symbin-product-detail" v-if='goodsList[index]'>
						<h3>{{ goodsList[index].goodsname}}</h3>
						<div class="symbin-product-info">{{goodsList[index].goodsdesc}}</div>
						<div class="symbin-product" v-if='goodsList[index]'>
							<img :src='goodsList[index].imagepath' alt="">
						</div>
	
						<div class='symbin-store'>
							<div>库存：{{goodsList[index]?goodsList[index].goodsnumber:0}}</div>
							<div>￥{{goodsList[index]?goodsList[index].goodsprice:0}}</div>
						</div>
					</div>
					<div class="symbin-product-counter">
						<div>
							<img :src="imgs.shopBtnBg" alt="" v-tap='[updateCount,0]'>
						</div>
						<div>
							{{buyCount}}
						</div>
						<div>
							<img :src="imgs.shopBtnBg" alt="" v-tap='[updateCount,1]'>
						</div>
					</div>
					<div class="symbin-all-price">
						总计 <span>￥ {{allPrice}}</span>
					</div>
				</aside>
			</div>
			<div class="symbin-shop-btns">
				<div v-tap='[closeShop]'><img :src="imgs.shopCancel" alt=""></div>
				<div v-tap='[entryCart]'><img :src="imgs.shopSure" alt=""></div>
			</div>
		</div>

		<Toast :msg='errorMsg'></Toast>
		
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../../lib/util';
	import IScroll from 'iscroll';
	import Vue from 'vue';
	import Toast from '../../toast/toast';
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
				errorMsg:''
			}
		},
		components: {
			Toast
		},
	
		methods: {

			toggleSeeding(index){
				var s = this;
				s.index = index;
				s.allPrice = s.goodsList[s.index].goodsprice * s.buyCount;
			},

			entryCart(){
				//判断用户是否登录
				if(!symbinUtil.isLogin()){
					
					//window.location.hash = '/login';
					return;
				}



				var s = this;
				var {obserable} = Vue;

				var cart =  this.goodsList[this.index];
				if(!cart){
					return;
				}


				cart.goodscount = this.buyCount;

				symbinUtil.ajax({
					url:window.config.baseUrl+'/userorder/createorder/',
					data:{
						goodsid:[cart.goodsid],
						goodsnumber:[cart.goodscount],
						ordersource:1,
						total:cart.goodscount*cart.goodsprice
					},
					success(data){
						console.log(data);
						if(data.getret === 0){


							obserable.trigger({
								type:'getOrderId',
								data:{
									orderid:data.orderid
								}
							})

							obserable.trigger({
								type:'showOrder',
								data:{
									goodsList:[
										cart
									]
								}
							})
						}
						else{
							s.errorMsg = data.getmsg;
							setTimeout(() => {
								s.errorMsg = '';
							}, 2000);
						}
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
 