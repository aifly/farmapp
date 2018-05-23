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
						<li v-for='seeding in seedinglist'>
							<div class="symbin-shop-product">
								<img :src="imgs.shopHen" alt="">
							</div>
							<div class="symbin-shop-breedname">{{seeding.breedname}}</div>
						</li>
					</ul>
				</aside>
				<aside>
					<div class="symbin-product-detail">
						<h3>母鸡</h3>
						<div class="symbin-product-info">土鸡，家禽的一种。有别于笼养的肉鸡。</div>
						<div class="symbin-product" v-if='seedinglist[index]'>
							<img :src='seedinglist[index].src' alt="">
						</div>
	
						<div class='symbin-store'>
							<div>库存：{{seedinglist[index]?seedinglist[index].stocknumber:0}}</div>
							<div>￥{{seedinglist[index]?seedinglist[index].price:0}}</div>
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
				<div><img :src="imgs.shopSure" alt=""></div>
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
				seedinglist: []
			}
		},
		components: {},
	
		methods: {
	
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
	
				s.allPrice = s.seedinglist[s.index].price * s.buyCount;
			},
			closeShop(){
				this.show = false;
			},
			requestSeeding() {
				var s = this;
				symbinUtil.ajax({
					url: window.config.baseUrl + '/user/getseedinglist/',
					data: {},
					success(data) {
						if (data.getret === 0) {
							s.seedinglist = data.list;
							s.allPrice = s.seedinglist[s.index].price * s.buyCount;
							s.seedinglist.forEach((seed, i) => {
								if (!seed.src) {
									seed.src = s.imgs.demo
								}
							});
						}
					}
				})
			}
		},
		mounted() {
			this.requestSeeding();
			var {obserable} = Vue;

			obserable.on('showShop',(data)=>{
				this.show = true;
			});
		}
	}
</script>
 