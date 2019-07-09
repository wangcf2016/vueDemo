<template>
  <div class="container">
		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">用户登录</h1>
		</header>
		<div class="maskTop"></div>
		<div class="mui-content">
			<div class="formWrap">
				<p class="formLabel">登录名/手机号</p>
				<div class="mui-input-row">
					<input v-model="name" type="text" class="mui-input-clear" placeholder="请输入">
				</div>
				<p class="formLabel">登录密码</p>
				<div class="mui-input-row mui-password formWrap-password">
					<input v-model="password" :type="statusPass?'text':'password'" placeholder="请输入6-12位长度的密码">
					<span @click="clearValue" class="mui-icon mui-icon-close-filled clearIcon"></span>
					<span class="line"></span>
					<span @click="readPassword" class="mui-icon mui-icon-eye"></span>
				</div>
				<p class="forgotPassword" @click="forgotPassFn">忘记密码></p>
				<div class="loginBtn" @click="loginFn">登录</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
  name: 'login',
  data () {
    return {
      name: '',
	  password: '',
	  statusPass: false
    }
  },
  computed: {
	  //...mapState('index', ['indexData'])
  },
	methods:{
		...mapActions('login', ['login']),
		loginFn: function () {
			var that = this,
				name = that.name,
				password = that.password;
			var param = {
				name: name,
				password: password
			}
			if (!name) {
				mui.alert('请输入登录名/手机号');
				return;
			} else if (!password) {
				mui.alert('请输入6-12位长度的密码');
				return;
			}
			that.login(param);
			that.$router.push('/')
		},
		forgotPassFn: function () {
			this.$router.push('/forgotPass')
		},
		clearValue: function () {
			this.password = '';
		},
		readPassword: function () {
			var status = this.statusPass;
			this.statusPass = !status;
		}
	},
	created: function(){
		
	}
}
</script>

<style slot-scope>
	@import url("login.css");
</style>
