<template>
	<div  class="symbin-myaddressaction-main-ui lt-full">
		<header v-if='consigneeid !== -1'>
			<div>{{consigneeid ? '编辑我的收货地址':'添加我的收货地址'}}</div>
			<div style="opacity:0">管理</div>
		</header>

		<div class='symbin-myaddressaction-main-content'>
			 <div class="symbin-myaddressaction-item">
				 <div>收货人</div>
				 <div><input placeholder="请输入收货人姓名" type="text" v-model="addressForm.username"></div>
			 </div>

			 <div class="symbin-myaddressaction-item">
				 <div>联系电话</div>
				 <div><input placeholder="请输入联系电话" type="text" v-model="addressForm.mobile"></div>
			 </div>

			 <div class="symbin-myaddressaction-item">
				 <div>所在地区</div>
				 <div>
					 <select>
						 <option value='-1'>--请选择--</option>
					 </select>
					 <div>北京 北京市 昌平区</div>
				 </div>
			 </div>
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
				consigneeid:-1,
				addressForm:{},
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
		beforeCreate() {
			
		},
		mounted(){

			this.getMyAddress();

			this.consigneeid = this.$route.params.id;

			/* this.scroll = new IScroll(this.$refs['page'],{scrollbars:true});

			setTimeout(()=>{
				this.scroll.refresh();
				this.scroll.scrollTo(0,-1400,1)
			},500)
 			 */
		}
	}
</script>
 