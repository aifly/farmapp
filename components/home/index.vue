<template>
	<div class="symbin-home-ui">
		<div class="symbin-ad" >
			<ul v-if='false' :style='{width:adList.length*viewW+"px",WebkitTransform:"translate3d("+-index*viewW+"px,0,0)"}'>
				<li v-for='ad in adList' :style="{background: 'url('+ad.url+') no-repeat center center',backgroundSize:'cover' }">
					<a :href="ad.href"></a>
				</li>
			</ul>
			
			<div  :key='ad.url+new Date().getTime()' v-for='ad in adList'  :style="{background: 'url('+ad.url+') no-repeat center center',backgroundSize:'cover' }" class="lt-full zmiti-ad-page" :class="ad.className">
				<a :href="ad.href"></a>	
				<span style='color:red'>{{ad.url}}</span>
			</div>

			<canvas ref='canvas' :width='viewW' height="60"></canvas>
			<div class="symbin-notice">
				<img :src="imgs.notice">
				<span>
					公告
				</span>
				<span>{{notice}}</span>
			</div>
		</div>

	</div>
</template>

<script>
	import './index.css';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				index:0,
				viewW:window.innerWidth,
				notice:"元宵送鸡蛋,新用户在元宵节内可免费领取",
				currentIndex:0,
				adList:[
					{
						url:'./assets/images/c-1.jpg',
						href:'#',
						className:'active '
					},
					{
						url:'./assets/images/c-2.jpg',
						href:'#',
						className:'right'
					},{
						url:'./assets/images/c-3.jpg',
						href:'#',
						className:'left'
					}
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
				/*this.bgStyle = {
					background:'url('+this.adList[this.currentIndex].url+') no-repeat center center / cover',
					backgroundSize:'cover'
				}
				console.log(this.bgStyle)*/
				//s.loadMusic(s.adList[s.currentIndex].audio);
				//this.iNow = s.currentIndex;
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
					'left',
					'left ',
					'active ',
					'right ',
					'right '
				]

				if(!this.isLeft ){
			 		classList = [
						'left ',
						'left ',
						'active ',
						'right',
						'right '
					]	
			 	}
				
				adList.forEach(function(list, i) {
					adList[i].className = classList[4];
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
					'right ',
					'right1 '
				]
				if(this.isLeft ){
			 		classList = [
						'left1 ',
						'left ',
						'active ',
						'right ',
						'right1 '
					]	
			 	}
				adList.forEach(function(list, i) {
					adList[i].className = classList[0];
					(adList[currentIndex + 1] || adList[0])['className'] = classList[3];
					(adList[currentIndex - 1] || adList[adList.length - 1])['className'] = classList[1];
				})

				adList[currentIndex].className = classList[2];
				this.isLeft = false;
			}
		},
		mounted(){
			 this.initCanvas();
			 var i = 0;
			this.timer = setInterval(()=>{
				if(i===0){
					this.initLeft();
				}
			},3000);
		}
	}
</script>
 