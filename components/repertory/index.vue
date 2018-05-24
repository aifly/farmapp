<template>
	<div class="symbin-repertory-ui lt-full" v-show='show'>
		<div class="symbin-repertory-main-content">
			<h2>
				<img :src="imgs.repertoryTitle" alt="">
				<span v-tap='[closeRepertory]'>
					<img :src="imgs.shopClose" alt="">
				</span>
			</h2>
			<div class="symbin-repertory-main">
				<div class="symbin-repertory-list-C" ref='list'>
					<ul>
						<li :key="i" v-for='(repertory,i) in repertoryList' v-tap='[toggleChecked,repertory]'>
							<div>
								<img :src="repertory.img" alt="">
							</div>
							<div>{{repertory.name}}</div>
							<div :class="repertory.isChecked ? 'active' : ''">
								{{repertory.stock}} {{repertory.unit}}
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="symbin-repertory-send">
				<img :src="imgs.repertorySend" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';
	import IScroll from 'iscroll';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				viewW:window.innerWidth,
				imgs:window.imgs,
				show:true,
				repertoryList:[

				]
			}
		},
		components:{
		},
		
		methods:{
			closeRepertory(){
				this.show = false;
			},
			toggleChecked(repertory){
				repertory.isChecked = !repertory.isChecked;
				this.repertoryList = this.repertoryList.concat([]);
			},
			requestRepertory(){
				var s = this;
				$.getJSON("./components/repertory/list.json",(data)=>{
					if(data.getret === 0){

						s.repertoryList = data.list;
						s.repertoryList.forEach(item=>{
							item.isChecked = false;
						})

						s.scroll = new IScroll(s.$refs['list']);

						setTimeout(() => {
							s.scroll.refresh();
						}, 100);
					}
				})
			}

		},
		mounted(){
			this.requestRepertory();
		}
	}
</script>
 