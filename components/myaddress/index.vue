<template>
	<div  class="symbin-myaddress-main-ui lt-full">
		<header>
			<div>我的收货地址</div>
			<div>管理</div>
		</header>

		<div class='symbin-myaddress-main-content'>
			<ul>
				<li v-for='(item,i) in myaddressList' :key="i">
					<div>
						<div>
							<span class="symbin-username">{{item.username}}</span>
							<span class="symbin-mobile">{{item.mobile}}</span>
						</div>
						<div class="symbin-detailaddress zmiti-text-overflow">
							{{item.detailaddress}}
						</div>
					</div>
					<div>
						<span>
							<img :src="imgs.editIco" alt="">
						</span>
						<span>
							<img :src="imgs.delIco" alt="">
						</span>
					</div>
				</li>
			</ul>
		</div>
		<div class="symbin-addmyaddress">
			<span></span>
			新增收货地址
		</div>
	</div>
</template>

<script>
	import './index.css';

	import symbinUtil from '../lib/util';
	import IScroll from 'iscroll';

	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				myaddressList:[
					
				]
			}
		},
		components:{
		},
		
		methods:{
			getMyAddress(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/user/getmypostaddress/",
					data:{
						status:1
					},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.myaddressList = data.list;
						}
					}
				})
			}
		},
		mounted(){

			this.getMyAddress();

			/* this.scroll = new IScroll(this.$refs['page'],{scrollbars:true});

			setTimeout(()=>{
				this.scroll.refresh();
				this.scroll.scrollTo(0,-1400,1)
			},500)
 			 */
		}
	}
</script>
 