<template>
	<div  class="symbin-baseinfo-main-ui lt-full">
		<div v-if='exists'>
			<Header></Header>

			<div class='symbin-test' v-tap='[refresh]'>
				刷新
			</div>
			<section class="symbin-baseinfo-wrap" :style='{height: viewH-108 + "px"}' ref='page'>
				<div>
					<div class="symbin-main-title">
						<div>
							<img :src="imgs.demo" />
						</div>
						<div>
							<div class="symbin-id">
								{{baseInfo.Id}}
							</div>
							<img :src="imgs.cInfo" />
							<div class="symbin-baseinfo-date">
								<div class="symbin-birthday">
									生于：{{baseInfo.birthday}}
								</div>
								<div class="symbin-dieday">
									卒于：{{baseInfo.dieday}}
								</div>
							</div>
						</div>
					</div>

					<div class="symbin-grass">
						<img :src="imgs.grass" />
					</div>

					<div class="symbin-baseinfo-main" :style="{background: ' url('+imgs.infoBg+') no-repeat center top',backgroundSize:'contain'}">
						<div class="symbin-baseinfo-tag">
							<img :src="imgs.cTag">
							<span>
								{{baseInfo.type}}
							</span>
						</div>
						
						<div class="symbin-allstep">
							<h1>总步数</h1>
							<div>
								{{format(baseInfo.totalstep)}}
							</div>
						</div>

						<div class="symbin-c-info">
							<div>
								<div><span>{{baseInfo.mileage}}</span>km</div>
								<div>总里程数</div>
							</div>
							<div>
								<div><span>{{baseInfo.eggCount}}</span>枚/季度</div>
								<div>平均产蛋数</div>
							</div>
							<div>
								<div>不详</div>
								<div>重量</div>
							</div>
						</div>
						<div class="symbin-baseinfo-chart" :class='{"hide":!showCharts}'>
							<div class="symbin-chart-tags">
								<div>湿度</div>
								<div>温度</div>
								<div>步数</div>
							</div>

							<div class="symbin-baseinfo-date">
								{{baseInfo.steps && baseInfo.steps[stepIndex].date}}
							</div>

							<div class="symbin-baseinfo-step" v-if='baseInfo.steps'>
								{{format(baseInfo.steps[stepIndex].step)}} <span>步</span>
								<label> <em>{{(baseInfo.steps[stepIndex].step*.001*(baseInfo.type ===0?.11:baseInfo.steps[stepIndex].status === 0 ? .05:.1)).toFixed(2)}}</em> km</label>
							</div>

							<div class="symbin-temp-humidity"  v-if='baseInfo.steps'>
								<div>
									<span>温度</span>
									<img :src="imgs.temperature">
									<span>{{baseInfo.steps[stepIndex].temperature}}℃</span>
								</div>
								<div>
									<span>湿度</span>
									<img :src="imgs.humidity">
									<span>{{baseInfo.steps[stepIndex].humidity}}RH%</span>
								</div>
							</div>
							
							<div class="symbin-chart">
								
								<canvas @touchend='touchend($event)' @touchmove='touchmove($event)' @touchstart='touchstart($event)' ref='canvas' width="620" height="400"></canvas>

								<div class="symbin-line">
									<img :src="imgs.line">
								</div>

							</div>
							
						</div>

						<div class="symbin-open" v-tap='[toggleCharts]'>
							{{showCharts?'收起':'展开'}}
						</div>

						<div class="symbin-life-pic-title">
							<img :src="imgs.lifePic" />
							<span>更多</span>
						</div>

						<div class="symbin-life-pic-list">
							<div :key='i' v-for='(pic,i) in baseInfo.lifepic' v-if='i<2' :style='{background: "url("+pic.url+") no-repeat center center",backgroundSize:"cover"}'>
								<img :src='pic.url'/>
							</div>
						</div>

						<div class="symbin-address">
							<div>
								<div>所属地</div>
								<div>{{baseInfo.dependency}}</div>
							</div>
							<div class="symbin-qrcode" v-if='baseInfo.qrcode'>
								<img :src="baseInfo.qrcode">
							</div>
						</div>

					</div>

				</div>
			</section>
		</div>
		<div v-else>
			当前计步器无效
		</div>

	</div>
</template>

<script>
	import './index.css';
	import Header from '../header/index';

	import symbinUtil from '../lib/util';
	import IScroll from 'iscroll';
	import {Step,Line} from './step';

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
				exists:true,
				translateX:0,
				showCharts:true,
				baseInfo:{

				}
			}
		},
		components:{
			Header
		},
		
		methods:{

			toggleCharts(){
				this.showCharts = !this.showCharts;
				setTimeout(()=>{
					this.scroll.refresh();
				},700);
			},

			refresh(){
				var id = this.$route.params.id;
				this.loadInfoById(id);
			},

			loadInfoById(id){
				var s = this;


				symbinUtil.ajax({
					url:'./assets/js/data.json',
					url:window.config.baseUrl+'/user/getstepdetail',
					isNeedLogin:false,
					type:"post",
					data:{
						farmproduceid:id
					},
					type:'get',
					success(data){
						console.log(data);
						if(data.getret === 0){

							var allCount =  0;
							var steps = [];


	
							var dt = data.detail;
							
							
							if(dt.steps.length<14){
								s.translateX =  620 / 2;
							}
							dt.steps.map((s,i)=>{
								allCount+=s.step
								steps.push(s.step);
							})
	
							s.baseInfo = dt;
							s.baseInfo.maxStep = Math.max.apply(Array,steps);
							s.baseInfo.allCount = allCount;
	
							s.initCanvas();
						}
						else if(data.getret === 1000 ){
							s.exists = false;
						}
					}
				});
			},
			format(num){
				return parseFloat(num).toLocaleString()
			},
			initCanvas(){
				var canvas = this.$refs['canvas'];
			
				var context = canvas.getContext('2d');
				
				var maxStep = this.baseInfo.maxStep ,
					height = canvas.height;

				this.context = context;
				this.steps = [];
				var minX = 0,
					maxX = 0,
					maxWidth = this.baseInfo.steps.length * 24 -4;
				this.maxWidth = maxWidth;
				context.clearRect(0,0,canvas.width,canvas.height);
				this.drawTemperature();
				this.baseInfo.steps.forEach((step,i)=>{
					if(i === this.baseInfo.steps.length -1){
						minX =(i*20+4*i  -( 620 - 20 )) + 600 / 2 - 10;
					}
					if(i === 0){
						maxX = 620 / 2;
					}
					
					
				});

				context.fillStyle = '#45c75d';
				this.baseInfo.steps.forEach((step,i)=>{

					var h = step.step/maxStep*height/2;
					var s = new Step({
						context,
						x:i*20+4*i+this.translateX,
						y:height*(1-step.step/maxStep)+h,
						height:h
					});
					s.minX =i*20+4*i - minX;
					s.maxX = i*20+4*i + maxX;
					s.render();
					this.steps.push(s);
				});

				

			},
			drawHumidity(){//绘制湿度

				var {context,maxWidth } = this;
				maxWidth =  maxWidth - 10;
				context.strokeStyle = '#3eb1f3';

				context.save();
				context.translate(this.translateX,0);

				this.context.beginPath();
				var maxHumidity = 70;
				var height = context.canvas.height;


				this.baseInfo.steps.forEach((step,i)=>{
					context[ i=== 0 ? 'moveTo' : 'lineTo'](i*24+10,(1-step.humidity/maxHumidity) * height);
				});

				
				context.lineTo(maxWidth,(1-this.baseInfo.steps[this.baseInfo.steps.length-1].humidity/maxHumidity)*height);
				/*context.lineTo(maxWidth,height);
				context.lineTo(0,height);
				context.closePath();*/
				context.restore();
				context.stroke();
				
			},
			drawTemperature(){

				
				var {context,maxWidth } = this;
				maxWidth =  maxWidth - 10;
				context.strokeStyle = '#f6c109';

				context.save();
				//context.translate(this.translateX,0);


				this.context.beginPath();
				var maxTemperature = 42;
				var height = context.canvas.height;
				
				this.baseInfo.steps.forEach((step,i)=>{
					
					context[i===0?'moveTo':'lineTo'](i*24+10+this.translateX,(1-step.temperature/maxTemperature) * height/2);
				});

				var grd = context.createLinearGradient(0,0,0,height/1.2);
				grd.addColorStop(0,"rgba(246,193,9,.1)");
				grd.addColorStop(1,"white");
				context.lineTo(maxWidth+this.translateX,(1-this.baseInfo.steps[this.baseInfo.steps.length-1].temperature/maxTemperature)*height);
				context.lineTo(maxWidth+this.translateX,height);
				context.lineTo(this.translateX,height);
				context.closePath();

				context.fillStyle = grd;
				context.fill();

				context.stroke();
				context.restore();

				this.drawHumidity()
				
			},
			touchstart(e){
				var e =  e.changedTouches[0];
				this.startX = e.pageX;
			},
			touchmove(e){
				e.preventDefault();
				var e =  e.changedTouches[0];
				this.transX =  e.pageX - this.startX;
				var height = this.context.canvas.height;
				
				this.context.clearRect(0,0,365*24,height);


				this.lastX = this.lastX || 0;
				this.drawTemperature();

				this.steps.forEach((step,i)=>{
					//

					step.x += this.transX/10;
					if(step.x >= step.maxX){
						step.x = step.maxX;
					}
					step.x <= step.minX && (step.x = step.minX);
					if(i === 0){
						this.stepIndex = Math.abs(((step.x - step.maxX) / 24) | 0);
					}
					step.render();
				});

				this.translateX = this.steps[0].x;
				
				this.lastX = this.transX;

				this.touchend(e);
 
			},
			touchend(e){
				var height = this.context.canvas.height;
				
				this.context.clearRect(0,0,365*24,height);
				this.drawTemperature();
				this.steps.forEach((step,i)=>{
					step.render();
				});
			}
			

		},
		mounted(){

			var id = this.$route.params.id;
			this.loadInfoById(id);



			this.scroll = new IScroll(this.$refs['page'],{scrollbars:true});

			setTimeout(()=>{
				this.scroll.refresh();
				this.scroll.scrollTo(0,-1400,1)
			},500)
 			
		}
	}
</script>
 