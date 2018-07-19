<template>
	<div  class="symbin-myaddress-main-ui lt-full">
		<header>
			<div>我的收货地址</div>
			<div>管理</div>
		</header>

		<div class='symbin-myaddress-main-content'>

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
					{
						username:'',
						mobile:'',
						
					}
				]
			}
		},
		components:{
		},
		
		methods:{
			getMyAddress(){
				symbinUtil.ajax({
					url:window.config.baseUrl+"/user/getmypostaddress/",
					data:{
						status:1
					},
					success(data){
						console.log(data);
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
 