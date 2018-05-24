<template>
	<div class="symbin-setting-ui lt-full" v-show='show'>
		<div class="symbin-setting-main-content">
			<h2>
				<img :src="imgs.settingTitle" alt="">
			</h2>
			<div class="symbin-setting-main">
				<div class="symbin-setting-C">
					<div>
						<div>自动喂食</div>
						<div>
							<div class="symbin-auto-feed">
								<div>开启</div>
								<div>关闭</div>
							</div>
						</div>
					</div>
					<div>
						<div>自动扣款</div>
						<div>自动扣款</div>
					</div>
					<div>
						<div>提醒通知</div>
						<div>提醒通知</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				viewW:window.innerWidth,
				imgs:window.imgs,
				show:true,
				settingList:[

				]
			}
		},
		components:{
		},
		
		methods:{
			closesetting(){
				this.show = false;
			},
			toggleChecked(setting){
				setting.isChecked = !setting.isChecked;
				this.settingList = this.settingList.concat([]);
			},
			requestsetting(){
				var s = this;
				$.getJSON("./components/setting/list.json",(data)=>{
					if(data.getret === 0){

						s.settingList = data.list;
						s.settingList.forEach(item=>{
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
		}
	}
</script>
 