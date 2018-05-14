<template>
	<div class="symbin-login-ui lt-full">
		<div>
			<div class="symbin-logo">
				<img :src="imgs.logo" alt="">
			</div>
			<div class="symbin-login-form">
				<div>
					<span>手机号</span>
					<input v-model='mobile' type="text" placeholder="请输入手机号" />
				</div>
				<div>
					<span>验证码</span>
					<input v-model="code" type="text" placeholder="请输入验证码" />
					<span v-tap='[getCode]'>{{isSend?seconds+'s后重新获取':'获取验证码'}}</span>
				</div>
				<div class="symbin-tip">
					未注册手机验证后自动登录
				</div>
				<div class="symbin-login-btn" v-tap='[login]'>登录</div>
				<div class="symbin-agree">
					<input v-model="isAgree" id='agree' type='checkbox' /><label for="agree">我看过并同意</label><a href="#">《云耕农夫协议》</a>
				</div>
			</div>
		</div>
		<Toast :msg="toastMsg"></Toast>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import Toast from '../toast/toast';
	export default {
		props: ['obserable'],
		data() {
			return {
				imgs,
				viewW: window.innerWidth,
				toastMsg: '',
				mobile: '',
				code: "",
				seconds:60,
				isSend:false,
				isAgree:false
	
			}
		},
		components: {
			Toast
		},
	
		methods: {
			toast(msg, time = 1500) {
				this.toastMsg = msg;
				setTimeout(() => {
					this.toastMsg = '';
				}, time);
			},
			getCode() {

				if(this.isSend){
					return;
				}
				if (!this.mobile || !this.isPoneAvailable()) {
					this.toast('请输入正确的手机号');
					return;
				}
				var {mobile} = this;
				this.isSend = true;
				var t = setInterval(()=>{
					this.seconds--;
					if(this.seconds<=0){
						clearInterval(t);
						this.isSend = false;
						this.seconds = 60;
					}
				},1000);
				

				symbinUtil.ajax({
					url:window.config.baseUrl+'/user/send_mobilecode/',
					data:{
						setmobile:mobile,
						usertype:1,//用户注册类型：1, 注册地主,2: 注册农夫
						smstype:1 //短信类型：1,注册；2,登陆；
					},
					fn(data){
						console.log(data);
						if(data.getret === 0){
						}
					}
				})

			},
			login(){
				var {mobile,code} = this;
				if (!this.mobile || !this.isPoneAvailable()) {
					this.toast('请输入正确的手机号');
					return;
				}
				if(!code){
					this.toast('验证码不正确');
					return;
				}
				if(!this.isAgree){
					this.toast('请先同意云耕农夫协议');
					return;
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+'/user/login/',
					data:{
						usermobile:mobile,
						verifycode:code,
						usertype:1
					},
					success(data){
						console.log(data);
					}
				})
			},
			isPoneAvailable() {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(this.mobile)) {
					return false;
				} else {
					return true;
				}
			}
	
		},
		mounted() {
	
		}
	}
</script>
 