<template>
	<div  class="symbin-baseinfo-main-ui lt-full">
		<Header></Header>

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
					{{baseInfo.type === 1 ? '母鸡':'公鸡'}}
				</span>
			</div>
			
			<div class="symbin-allstep">
				<h1>总步数</h1>
				<div>
					{{format(baseInfo.allCount)}}
				</div>
			</div>

			<div class="symbin-c-info">
				<div>
					<div><span>12</span>km</div>
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

		</div>
	</div>
</template>

<script>
	import './index.css';
	import Header from '../header/index';

	import symbinUtil from '../lib/util'

	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				baseInfo:{

				}
			}
		},
		components:{
			Header
		},
		
		methods:{

			loadInfoById(id){
				var s = this;
				symbinUtil.ajax({
					url:'./assets/js/data.json',
					type:'get',
					fn(data){
						var allCount =  0;
						data.steps.map((s,i)=>{
							allCount+=s.step
						})
						s.baseInfo = data;
						s.baseInfo.allCount = allCount;
					}
				});
			},
			format(num){
				return parseFloat(num).toLocaleString()
			},
			

		},
		mounted(){

			this.loadInfoById();
 			
		}
	}
</script>
 