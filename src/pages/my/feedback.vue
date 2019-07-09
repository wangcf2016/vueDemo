<template>
  <div class="container">
		<header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">意见反馈</h1>
		</header>
		<div class="maskTop"></div>
		<div class="mui-content">
			<div class="feedback-form">
				<p class="feedFormTitle">对我们说些什么吧</p>
				<textarea v-model="value" placeholder="输入"></textarea>
				<p class="feedBackTip">不超过200字</p>
				<div @click="sumitText" class="feedbackSubmit">提交</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
import request from '../../utils/request.js';
export default {
  name: 'feedback',
  data () {
    return {
      value: ''
    }
  },
  computed: {
	  //...mapState('index', ['indexData'])
  },
	methods:{
		//...mapActions('index', ['getData'])
		sumitText: function () {
			var that = this;
			var value = that.value;
			request({
				type: 'post',
				url: '/name',
				param: {
					value: value
				},
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
