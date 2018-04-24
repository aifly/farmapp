<template>
	<div class="symbin-home-ui">
		<div class="symbin-ad">
			<ul :style='{width:adList.length*viewW+"px"}'>
				<li v-for='ad in adList' :style="{background: 'url('+ad.url+') no-repeat center center',backgroundSize:'cover' }">
					<a :href="ad.href"></a>
				</li>
			</ul>
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
				adList:[
					{
						url:'./assets/images/c-1.jpg',
						href:'#'
					},
					{
						url:'./assets/images/c-2.jpg',
						href:'#'
					},{
						url:'./assets/images/c-1.jpg',
						href:'#'
					}
				]	
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
 