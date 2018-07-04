<template>
	<div class="zmiti-toast-main-ui" :class='{"hide":msg === ""}'>
		{{msg}}
	</div>
</template>
<script>
	export default {
		props:['msg'],
		data(){
			return {
				
			}
		},
		mounted(){
			
			
		}
	}
</script>
<style>
	.zmiti-toast-main-ui{
		position: fixed !important;
		background: rgba(0,0,0,.6);
		color:#fff !important;
		border-radius: 20px;
		padding:20px 40px;
		left: 50%;
		z-index: 111111;
		top: 50%;
		text-align: center;
		width: auto !important;
		-webkit-transform:translate3d(-50%,-50%,0);
		-webkit-transition:1s;
	}
	.zmiti-toast-main-ui.hide{
		display: none;
	}
</style>