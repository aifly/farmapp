<template>
	<div class="symbin-login-ui lt-full">
		<div>
			<div class="symbin-logo">
				<img :src="imgs.logo" alt="">
			</div>
			<div class="symbin-login-form">
				<div>
					<span>手机号</span>
					<input type="text" placeholder="请输入手机号" />
				</div>
				<div>
					<span>验证码</span>
					<input type="text" placeholder="请输入验证码" />
					<span>获取验证码</span>
				</div>
				<div>登录</div>
				<div>
					<input type='checkbox'/>我看过并同意<a href="#">《云耕农夫协议》</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	export default {
		props:['obserable'],
		data(){
			return{
				imgs,
				viewW:window.innerWidth,
				
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
 