<template>
	<div class='symbin-select-main-ui lt-full' v-show='show'>
		 <ul>
			 <li v-for='(item,i) in list' :key="i">
				 {{item.name}}
			 </li>
		 </ul>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../../lib/util';
	import Vue from 'vue';
	export default {
		props: ['obserable'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				show:false,
				list:[

				]
				
			}
		},
		components: {},
	
		methods: {
		},
		mounted() {
			var {obserable} = Vue;
			obserable.on('showSelect',(data)=>{
				this.show = true;
				this.list = data.list;
			})
			
		}
	}
</script>
 