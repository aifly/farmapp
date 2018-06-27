<template>
	<div class='symbin-select-main-ui lt-full' v-show='show'>
		 <ul :class="{'active':showPayList}">
			 <li v-for='(item,i) in list' :key="i" @click='togglePaytype(item,i)'>
				 {{item.paytypename}}
				 <span :class="{'active':paytypeid===item.paytypeid}"></span>
			 </li>
		 </ul>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../../lib/util';
	import Vue from 'vue';
	export default {
		props: ['obserable','list'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				show:false,
				paytypeid:'',
				paytypeIndex:-1,
				showPayList:false,
			}
		},
		components: {},
	
		methods: {
			togglePaytype(item,index){

				this.paytypeid = item.paytypeid;
				this.paytypeIndex = index;
				setTimeout(() => {
					this.show = false;
				}, 400);
				var {obserable} = Vue;
				obserable.trigger({
					type:'fillPaytype',
					data:{
						paytypename:this.list[index].paytypename
					}
				})
			}
		},
		mounted() {
			var {obserable} = Vue;
			
			obserable.on('showSelect',(data)=>{
				this.show = true;
				setTimeout(() => {
					this.showPayList = true;
				}, 100);
			})
			
		}
	}
</script>
 