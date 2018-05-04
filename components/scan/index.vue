<template>
	<div class="symbin-scan-ui lt-full">
		<div class="symbin-scan-search-C">
			<div><input type="text" name="" placeholder="请输入查询编码" /></div>
			<div>查询</div>
		</div>
		<div class="symbin-scan-main">
			<div>
				<div class="symbin-logo">
					<img :src="imgs.logo">
				</div>

				<div class="symbin-text">
					<div>二维码查询</div>
					<div>请对准鸡脚环上的二维码进行识别</div>
				</div>
			</div>


			<div class="symbin-scan-C">
				<div class="symbin-scan-btn">
					<img :src="imgs.scanBtn">
					<span class="lt-full"></span>
					<span class="lt-full"></span>
					<span class="lt-full"></span>
				</div>

				<div class="symbin-copyright">
					&copy; 小彬科技有限公司
				</div>

				<div class="symbin-help">
					<img :src="imgs.help">
				</div>
			</div>
		</div>

		<canvas :width='viewW' height="250" ref='canvas' class="symbin-canvas"></canvas>
	</div>
</template>

<script>
	import './index.css';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				viewW:window.innerWidth,
				imgs:window.imgs,
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
				context.lineWidth = 20;
				context.strokeStyle = '#cef1d4';
				//context.strokeStyle = 'red';
				context.bezierCurveTo(0,0,canvas.width/2.2,250,canvas.width+30,0);
				context.lineTo(canvas.width,canvas.height);
				context.lineTo(0,canvas.height);
				context.closePath()
				context.stroke();
				context.fillStyle = '#fff';
				context.fill();


			}

		},
		mounted(){
 			this.initCanvas();
		}
	}
</script>
 