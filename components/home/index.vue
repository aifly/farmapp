<template>
	<div class="symbin-home-ui">
		<div class="symbin-ad" v-swipeleft='initLeft' v-swiperight='initRight' @touchstart='endTimer' @touchend = 'startTimer'>
			<div  :key='ad.key' v-for='ad in adList'  :style="{background: 'url('+ad.url+') no-repeat center center',backgroundSize:'cover'}"  class="lt-full zmiti-ad-page" :class="ad.className">
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

	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				index:0,
				isSlider:true, 
				viewW:window.innerWidth,
				notice:"元宵送鸡蛋,新用户在元宵节内可免费领取",
				currentIndex:0,
				adList:[
					 
				]	
			}
		},
		components:{
		},
		
		methods:{
			initCanvas(){
				var canvas = this.$refs['canvas'],
					context = canvas.getContext('2d');

				context.beginPath();
				context.moveTo(-30,0);
				context.lineWidth = 2;
				//context.strokeStyle = '#cef1d4';
				//context.strokeStyle = 'red';
				context.bezierCurveTo(0,0,canvas.width/2.2,100,canvas.width+30,0);
				context.lineTo(canvas.width,canvas.height);
				context.lineTo(0,canvas.height);
				context.closePath()
				context.stroke();
				context.fillStyle = '#fff';
				context.fill();


			},
			endTimer(){
				this.isSlider = false;
				clearTimeout(this.sliderTimer);
			},
			startTimer(){
				this.sliderTimer = setTimeout(() => {
					this.isSlider = true;
				}, 1000);
			},
			swipeLeft(){
				var s = this;
				if(s.currentIndex<=-1){
					return;
				}
				this.iNow = (s.currentIndex + 1) % s.adList.length;
				this.initLeft();
			},
			swipeRight(){

				var s = this;
				if(s.currentIndex<=-1){
					return;
				}
				this.iNow = s.currentIndex-1;
				if(this.iNow<0){
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
			requestNotice(){//
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/user/getnotice/',
					data:{

					},
					fn(data){
						if(data.getret === 0 ){
							s.notice = data.list[0].title;
						}
					}
				})
			},
			requestAd(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl +  '/user/getadver/',
					data:{
						num:5
					},
					fn(data){
						console.log(data);
						if(data.getret === 0){
							s.adList.length = 0;
							data.list.forEach((ad,i)=>{
								var className = 'active';
								if(i>0){
									className = 'right'
								}
								if(i=== data.list.length -1){
									className = 'left';
								}
								s.adList.push({
									key:i,
									url:ad.adimageurl,
									href:ad.adlink,
									className
								})
							})
						}
					}
				})
			}
		},
		mounted(){
			window._this = this;
			this.initCanvas();
			
			this.requestAd();
			this.requestNotice();

			
			this.timer = setInterval(()=>{
				if(this.isSlider){
					this.initLeft();
				}

			},3000);
		}
	}
</script>
 