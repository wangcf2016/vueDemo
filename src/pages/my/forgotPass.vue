<template>
  <div class="container">
  		<header class="mui-bar mui-bar-nav">
  			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
  			<h1 class="mui-title">找回密码</h1>
  		</header>
  		<div class="maskTop"></div>
  		<div class="mui-content">
  			<div class="phone-form">
  				<p class="phoneTitle">手机号</p>
  				<div class="mui-input-row">
  					<input v-model="phone" type="number" class="mui-input-clear" placeholder="请输入要绑定的手机号">
					<span class="getCodeClass">获取验证码</span>
  				</div>
  				<div class="phoneCodeList">
					<div v-text="numberOne"></div>
					<div v-text="numberTwo"></div>
					<div v-text="numberThree"></div>
					<div v-text="numberFour"></div>
					<input v-model="code" class="codeInput" @input="inputValue($event)" />
				</div>
				<div class="phone-tip-wrap">
					<span class="phoneTip-one">收不到验证码</span><span class="phoneTip-two"></span>
					<span class="phoneTip-three">重新发送</span>
				</div>
  			</div>
			<div class="password-form">
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
  name: 'changePhone',
  data () {
    return {
      numberOne: '',
	  numberTwo: '',
	  numberThree: '',
	  numberFour: '',
	  phone: '',
	  code: '',
	  newPassword: '',
	  newPasswordTwo: ''
    }
  },
  computed: {
	  //...mapState('index', ['indexData'])
  },
	methods:{
		//...mapActions('index', ['getData'])
		inputValue: function (e) {
			console.log(e.target.value)
			var that = this;
			var num = e.target.value;
			if (num.length == 1) {
				that.numberOne = num;
			} else if(num.length == 2) {
				that.numberTwo = num.split('')[1];
			} else if(num.length == 3) {
				that.numberThree = num.split('')[2];
			} else if(num.length == 4) {
				that.numberFour = num.split('')[3];
				that.code = num;
			} else {
				return;
			}
		},
		sumitFn: function () {
			var that = this;
			var phone = that.phone,
				code = that.code,
				newPassword = that.newPassword,
				newPasswordTwo = that.newPasswordTwo;
			var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
			var param = {
				phone: that.phone,
				code: that.code,
				newPassword: that.newPassword,
				newPasswordTwo: that.newPasswordTwo
			};
			if (!phone || !reg.test(phone)) {
				mui.alert('请输入正确的手机号码');
				return;
			} else if (!code) {
				mui.alert('请输入验证码');
				return;
			} else if (newPassword.length > 12 || newPassword.length < 6) {
				mui.alert('请输入6-12位长度密码');
				return;
			} else if (newPassword !== newPasswordTwo) {
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
