<template>
	<div class='symbin-order-main-ui lt-full' v-show='show'>
		<div>
			<header class="symbin-order-header">
				<div class="symbin-order-paylist">
					<div>支付方式</div>
					<div>免费</div>
				</div>
			</header>

			<div class="symbin-order-content">
				<ul>
					<li v-for='(goods,i) in goodsList' :key="i">
						<div>
							<img :src="goods.imagepath" alt="">
							{{goods.goodsname}}
						</div>
						<div>
							￥<span class="symbin-goodsprice">{{goods.goodsprice}}</span>
						</div>
						<div>
							x{{goods.goodscount}}
						</div>
						<div>
							￥<span class="symbin-goodsallprice">{{goods.goodscount * goods.goodsprice}}</span>
						</div>
					</li>
					<li>
						<div>运费</div>
						<div>￥<span class="symbin-express-price">200</span></div>
						<div class="symbin-express">1张快递券可用</div>
					</li>
				</ul>
			</div>

		</div>
		<div class="symbin-order-pay-bar">
			<div>合计 ￥{{allPrice}}</div>
			<div>立即支付</div>
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
				show:false,
				allPrice:0,
				goodsList: [
					
				]
			}
		},
		components: {},
	
		methods: {

		},
		mounted() {
		
			var {obserable} = Vue;

			obserable.on('showOrder',(data)=>{
				this.show = true;
				this.goodsList = data.goodsList;
				this.goodsList.map((goods,i)=>{
					this.allPrice += goods.goodsprice * goods.goodscount;
				})
			});
		}
	}
</script>
 