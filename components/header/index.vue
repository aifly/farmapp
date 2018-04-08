<template>
	<div  class="symbin-header-main-ui">
		<slot name='back'>
			<div></div>
		</slot>
		<slot name='title'>
			<div>养殖档案</div>
		</slot>
		<slot>
			<div></div>
		</slot>
	</div>
</template>

<script>
	import './index.css';

	import Vue from "vue";

	export default {
		props:['title'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			

		},
		mounted(){

 			
		}
	}
</script>
 