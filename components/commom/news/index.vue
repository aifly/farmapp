<template>
	<div class='symbin-news-main-ui lt-full'>
		<ul>
			<li v-for='(item,i) in newsList' :key="i" v-tap='[toggleNews,item]' :class="{'active':item.open}">
				<div>
					<img :src="imgs.logo" alt="">
				</div>
				<div>
					<div>
						<aside>系统消息</aside>
						<aside><span>{{item.createtime}}</span></aside>
					</div>
					<div>{{item.content}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../../lib/util';
	import IScroll from 'iscroll';
	import Vue from 'vue';
	export default {
		props: ['obserable','list'],
		name: 'zmitiindex',
		data() {
			return {
				imgs,
				show:true,
				newsList:[]
			}
		},
		beforeMount(){
			
		},
		components: {

		},
		watch:{
			list(list){
				this.newsList = this.list.concat([]);
			}
		},
	
		methods: {
			toggleNews(item){
				item.open = !item.open;
				this.newsList = this.newsList.concat([]);
			}
		},
		mounted() {
			
		}
	}
</script>
 