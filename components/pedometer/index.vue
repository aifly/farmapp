<template>
	<div class="symbin-pedometer-main-ui lt-full">
		<div ref='page'>
			<section>
				<div>
					<img :src="imgs.pedometer" alt="">
				</div>
				<div class='symbin-btn' v-tap='[buy]'>去购买</div>
			</section>
		</div>
	
		<div class="symbin-order-C lt-full" ref='order' v-show='showOrderDetail'>
			<div>
				<img :src="imgs.ped" alt="">
				<div class="symbin-ped-title">
					<h2>鸡用计步器</h2>
					<div>鸡用计步器需要和采集器搭配使用</div>
				</div>
	
				<section class="symbin-farmer-info">
					<div class="symbin-farmer-tip">
						您的鸡场信息
						<span>输入您的鸡场信息系统将会给出合理的购买建议</span>
					</div>
					<div class="symbin-form-item">
						鸡舍数量<input ref='house' v-model="chikenHouseNum" type="number">
					</div>
					<div class="symbin-form-item">
						鸡的数量<input ref='number' v-model='pedNum' type="number">
					</div>
					<div class="symbin-form-item">
						鸡舍平米数<input ref='area' v-model="chikenHouseArea" type="number" placeholder="按最大鸡舍面积填写">
					</div>
				</section>

				<section class="symbin-order-detail">
					<h2>选择购买数量</h2>
					<div>
						<div>计步器</div>
						<div class="symbin-price">￥<span>{{pedPrice}}</span></div>
						<div class="symbin-num">建议数量{{pedNum}}</div>
						<div class="symbin-buy-num">
							<div class="symbin-reduce"  v-tap='[reduce,0]'></div>
							<div>{{buyPedNum}}</div>
							<div class="symbin-add"  v-tap='[add,0]'></div>
						</div>
					</div>
					<div>
						<div>采集器</div>
						<div class="symbin-price">￥<span>{{collectPrice}}</span></div>
						<div class="symbin-num">建议数量{{chikenHouseNum}}</div>
						<div class="symbin-buy-num">
							<div class="symbin-reduce" v-tap='[reduce,1]'></div>
							<div>{{buyCollectNum}}</div>
							<div class="symbin-add"  v-tap='[add,1]'></div>
						</div>
					</div>
				</section>

				<section class="symbin-collect" v-tap='[openCollectInfo]'>
					<img :src='imgs.help1' />采集器作用
				</section>

				<section class='symbin-connect'>
					<div>
						<img :src="imgs.connect" alt="">
						马上联系
					</div>
					<div>
						<span>立即购买 </span>
					</div>
				</section>
	
			</div>
		</div>
		<div class="lt-full symbin-collect-help" v-if='showCollectInfo' v-tap='[closeCollectInfo]'>
			<div class="symbin-collect-mask">
				<h2>
					<span>?</span>
					<label for="">采集器作用</label>
				</h2>
				<div>
					采集器是用来收集步器的数据并且上传到云端的一个设备。
				</div>
				<section>朕知道了</section>
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import IScroll from 'iscroll';
	export default {
		props: ['obserable'],
		name: 'zmitiindex',
		data() {
			return {
				viewW: window.innerWidth,
				imgs: window.imgs,
				showCollectInfo:false,
				pedNum:'',
				pedPrice:20,
				showOrderDetail:false,
				collectPrice:99,
				chikenHouseNum:'',//鸡舍数量
				chikenHouseArea:'',
				buyCollectNum:0,
				buyPedNum:0

			}
		},
		components: {},
	
		methods: {
			closeCollectInfo(){
				this.showCollectInfo = false;
			},
			buy(){
				this.showOrderDetail = true;
				setTimeout(() => {
					this.orderScroll.refresh();
				}, 100);
			},
			openCollectInfo(){
				this.showCollectInfo = true;
			},
			add(index){
				this.$refs['house'].blur();
				this.$refs['number'].blur();
				this.$refs['area'].blur();
				if(index === 0){//计步器
					this.buyPedNum++;
				}else{
					this.buyCollectNum++;
				}
			},
			reduce(index){
				this.$refs['house'].blur();
				this.$refs['number'].blur();
				this.$refs['area'].blur();
				if(index === 0){//计步器
					
					this.buyPedNum--;
					if(this.buyPedNum <=0){
						this.buyPedNum = 0;
					}
				}else{
					this.buyCollectNum--;
					if(this.buyCollectNum <=0){
						this.buyCollectNum = 0;
					}
				}
			}
	
		},
		watch:{
			pedNum(num){
				
				this.buyPedNum = num;
			},
			chikenHouseNum(num){
				this.buyCollectNum = num;
			}
		},
		mounted() {
			this.scroll = new IScroll(this.$refs['page']);
			this.orderScroll = new IScroll(this.$refs['order']);
			setTimeout(() => {
				this.scroll.refresh();
				//this.orderScroll.scrollTo(0,-340,0);
				this.orderScroll.refresh();
			}, 100);
		}
	}
</script>
 