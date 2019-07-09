<template>
  <div class="container">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">修改密码</h1>
		</header>
		<div class="maskTop"></div>
		<div class="mui-content">
			<div class="password-form">
				<p class="passwordTitle">原密码</p>
				<div class="mui-input-row">
					<input v-model="password" type="password" class="mui-input-clear" placeholder="请输入原密码">
				</div>
				<p class="passwordTitle">新密码</p>
				<div class="mui-input-row">
					<input v-model="newPassword" type="password" class="mui-input-clear" placeholder="请输入6-12位长度密码">
				</div>
				<p class="passwordTitle">确认密码</p>
				<div class="mui-input-row">
					<input v-model="newPasswordTwo" type="password" class="mui-input-clear" placeholder="请输入6-12位长度密码">
				</div>
				<div @click="sumitFn" class="changeSubmit">确认</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
import request from '../../utils/request.js';
export default {
  name: 'password',
  data () {
    return {
      password: '',
	  newPassword: '',
	  newPasswordTwo: ''
    }
  },
  computed: {
	  //...mapState('index', ['indexData'])
  },
	methods:{
		//...mapActions('index', ['getData'])
		sumitFn: function () {
			var that = this;
			var password = that.password,
				newPassword = that.newPassword,
				newPasswordTwo = that.newPasswordTwo;
			var param = {
				password: password,
				newPassword: newPassword,
				newPasswordTwo: newPasswordTwo
			};
			if (!password) {
				mui.alert('请输入原密码');
				return;
			}else if (newPassword.length > 12 || newPassword.length < 6) {
				mui.alert('请输入6-12位长度密码');
				return;
			}else if (newPassword !== newPasswordTwo) {
				mui.alert('两次密码不一致');
				return;
			}
			request({
				type: 'post',
				url: '/name',
				param: param,
				callBack: function(data){
					console.log(data)
				}
			})
		}
	},
	created: function(){
		
	}
}
</script>

<style slot-scope>
	@import url("my.css");
</style>
