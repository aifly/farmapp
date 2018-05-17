<template>
	<div class="symbin-home-ui">
		<div class="symbin-tip-top">
			别再滑啦，不会刷新滴 :(
		</div>
		<section  ref='page'>
			<div>
				<div class="symbin-user">
					<img :src="imgs.user" alt="">
				</div>
				<div class="symbin-msg">
					<img :src="imgs.msg" alt="">
				</div>
				<div class="symbin-ad" v-swipeleft='initLeft' v-swiperight='initRight' @touchstart='endTimer' @touchend='startTimer'>
					<div :key='ad.key' v-for='ad in adList' :style="{background: 'url('+ad.url+') no-repeat center center',backgroundSize:'cover'}" class="lt-full zmiti-ad-page" :class="ad.className">
						<a :href="ad.href"></a>
					</div>
	
					<canvas ref='canvas' :width='viewW' height="60"></canvas>
					<div class="symbin-notice">
						<img :src="imgs.notice">
						<span style='color:#ecff1c'>
										公告:
									</span>
						<span>{{notice}}</span>
					</div>
				</div>
	
				<div class="symbin-nav">
					<div>
						<img :src="imgs.ncIcon" alt="">
						<span>去农场</span>
					</div>
					<div>
						<router-link to="scan">
							<img :src="imgs.jsIcon" alt="">
							<span>去集市</span>
						</router-link>
	
					</div>
					<div>
						<router-link to="scan">
							<img :src="imgs.danganIcon" alt="">
							<span>档案</span>
						</router-link>
	
					</div>
					<div>
						<img :src="imgs.yqIcon" alt="">
						<span>邀请好友</span>
					</div>
				</div>
	
				<div class="symbin-js-C">
					<header>
						<div class="symbin-js-title">集市精选</div>
						<div>查看全部</div>
					</header>
					<div class="symbin-js-list" ref='jslist'>
						<ul :style="{width:jsList.length*(324+20)+'px'}">
							<li v-for="js in jsList" :key="js.key">
								<div class='symbin-src'>
									<img :src="js.src" alt="">
								</div>
								<div class="symbin-headimgurl">
									<img :src="js.headimgurl" alt="">
								</div>
								<div class="symbin-farmername">
									-{{js.farmer}}-
								</div>
								<div class='symbin-goodsname'>
									{{js.goodsName}}
								</div>
								<div class="symbin-price">
									¥ <span>{{js.price}}</span> 元
								</div>
							</li>
						</ul>
					</div>
	
				</div>
				<div class="symbin-index-bottom">
					<img :src="imgs.indexBottom" alt="">
					<div class="symbin-index-chiken-C">
						<div class="symbin-index-stage">
							<img :src='imgs.cStage' class="symbin-c-stage" />
							<img :src="imgs.add" alt="" class="symbin-c-add">
							<div class="symbin-progress">
								<div>幼儿期</div>
								<div>成长期</div>
								<div>产蛋期</div>
							</div>
						</div>
						<div class="symbin-money-C">
							<img :src="imgs.moneyBg" alt="">
							<div>
								<div>
									<div>资产报告</div>
									<div>5000.00元<span>(预估)</span></div>
								</div>
								<div>
									<div>
										<img :src='imgs.cIcon' /> <label>鸡</label> <label class="symbin-num">100</label>只
									</div>
									<div>
										<img style="width:30px;" :src='imgs.eggIcon' /> <label>鸡蛋</label> <label  class="symbin-num">100</label>个
									</div>
								</div>
							</div>
						</div>
						<div class="symbin-operator">
							<div>
								<img :src="imgs.newGuide" alt="">
								<span>新手指南</span>
							</div>
							<div>
								<img :src="imgs.raise" alt="">
								<span>饲养</span>
							</div>
							<div>
								<img :src="imgs.sale" alt="">
								<span>出售</span>
							</div>
						</div>
					</div>
				</div>
			</div>
	
		</section>
		<div class="symbin-tip">
			别扯了，就到这好么？
		</div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import IScroll from 'iscroll';
	import $ from 'jquery';
	export default {
		props: ['obserable'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				index: 0,
				isSlider: true,
				viewW: window.innerWidth,
				notice: "元宵送鸡蛋,新用户在元宵节内可免费领取",
				currentIndex: 0,
				adList: [
	
				],
				jsList: [ //集市列表
	
				]
			}
		},
		components: {},
	
		methods: {
			initCanvas() {
				var canvas = this.$refs['canvas'],
					context = canvas.getContext('2d');
	
				context.beginPath();
				context.moveTo(-30, 0);
				context.lineWidth = 2;
				//context.strokeStyle = '#cef1d4';
				//context.strokeStyle = 'red';
				context.bezierCurveTo(0, 0, canvas.width / 2.2, 100, canvas.width + 30, 0);
				context.lineTo(canvas.width, canvas.height);
				context.lineTo(0, canvas.height);
				context.closePath()
				context.stroke();
				context.fillStyle = '#fff';
				context.fill();
	
	
			},
			endTimer() {
				this.isSlider = false;
				clearTimeout(this.sliderTimer);
			},
			startTimer() {
				this.sliderTimer = setTimeout(() => {
					this.isSlider = true;
				}, 1000);
			},
			swipeLeft() {
				var s = this;
				if (s.currentIndex <= -1) {
					return;
				}
				this.iNow = (s.currentIndex + 1) % s.adList.length;
				this.initLeft();
			},
			swipeRight() {
	
				var s = this;
				if (s.currentIndex <= -1) {
					return;
				}
				this.iNow = s.currentIndex - 1;
				if (this.iNow < 0) {
					this.iNow = this.adList.length - 1;
				}
				this.initRight();
			},
			initLeft: function() {
				var s = this;
				s.currentIndex = (s.currentIndex + 1) % s.adList.length;
	
				var classList = [
					'left1 ',
					'left ',
					'active ',
					'right ',
					'right1 '
				]
				var adList = s.adList,
					currentIndex = s.currentIndex;
	
				adList.forEach(function(list, i) {
					adList[i].className = classList[4];
					//(adList[currentIndex - 2] || adList[adList.length - 2])['className'] = classList[0];
				})
				classList = [
					'left1 ',
					'left ',
					'active ',
					'right ',
					'right1 '
				]
	
				adList.forEach(function(list, i) {
					//adList[i].className = classList[4];
					(adList[currentIndex + 1] || adList[0])['className'] = classList[3];
					(adList[currentIndex + 2] || adList[1])['className'] = classList[4];
					(adList[currentIndex - 1] || adList[adList.length - 1])['className'] = classList[1];
					//(adList[currentIndex - 2] || adList[adList.length - 2])['className'] = classList[0];
				})
	
				adList[currentIndex].className = classList[2];
				this.isLeft = true;
			},
			initRight: function() {
	
				var s = this;
	
				s.currentIndex = s.currentIndex - 1;
	
				if (s.currentIndex < 0) {
					s.currentIndex = s.adList.length - 1;
				}
	
				var adList = s.adList,
					currentIndex = s.currentIndex;
	
				//console.log(s.currentIndex)
	
				s.currentIndex = s.currentIndex % adList.length;
				/*this.bgStyle = {
					background:'url('+this.adList[this.currentIndex].url+') no-repeat center center / cover',
					backgroundSize:'cover'
				}*/
				var classList = [
					'left1 ',
					'left ',
					'active ',
					'right transition',
					'right1 '
				]
	
				adList.forEach(function(list, i) {
					adList[i].className = classList[0];
					(adList[currentIndex + 1] || adList[0])['className'] = classList[3];
	
					(adList[currentIndex - 1] || adList[adList.length - 1])['className'] = classList[0];
				})
				adList[currentIndex].className = classList[2];
	
			},
			requestNotice() { //
				var s = this;
				
				symbinUtil.ajax({
					url: window.config.baseUrl + '/user/getnotice/',
					data: {
	
					},
					fn(data) {
						if (data.getret === 0) {
							s.notice = data.list[0].title;
						}
					}
				})
			},
			requestAd() {
				var s = this;
				symbinUtil.ajax({
					url: window.config.baseUrl + '/user/getadver/',
					data: {
						num: 5
					},
					fn(data) {
	
						if (data.getret === 0) {
							s.adList.length = 0;
	
							data.list.forEach((ad, i) => {
								var className = 'active';
								if (i > 0) {
									className = 'right'
								}
								if (i === data.list.length - 1) {
									className = 'left';
								}
	
								s.adList.push({
									key: i,
									url: ad.adimageurl,
									href: ad.adlink,
									className
								})
							})
							if (s.adList.length <= 1) {
	
								s.adList.push({});
								s.adList[1].key = s.adList.length + 2;
								s.adList[1].url = s.adList[0].url;
								s.adList[1].href = s.adList[0].href;
	
							}
						}
					}
				})
			},
			requestJishi() { //获取集市列表
				var s = this;
				$.getJSON('/components/home/jishi.json',(data)=>{
					if (data.getret === 0) {
							data.list.forEach((ls, i) => {
								ls.key = i;
							});
							s.jsList = data.list;
							s.jsScroll = new IScroll(s.$refs['jslist'], {
								scrollX: true,
								scrollY: false
							});
	
							s.mainScroll = new IScroll(s.$refs['page'],{
								preventDefault:false
							});
	
							setTimeout(() => {
								s.jsScroll.refresh();
								//s.mainScroll.scrollTo(0,-700,1);
								s.mainScroll.refresh();
								
							}, 100);
						}
				})
				/* symbinUtil.ajax({
					url: "/components/home/jishi.json",
					type: 'get',
					data: {},
					success(data) {
	
						
					}
				}) */
			}
		},
		mounted() {
			window._this = this;
			this.initCanvas();
	
			this.requestAd();
			this.requestNotice();
			this.requestJishi()
	
	
			this.timer = setInterval(() => {
				if (this.isSlider) {
					this.initLeft();
				}
	
			}, 3000);
		}
	}
</script>
 