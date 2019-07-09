<template>
  <div class="container">
	  <nav class="mui-bar mui-bar-tab navBttom">
	  	<a class="mui-tab-item" @click="goNav('1')">
	  		<span class="mui-icon mui-icon-home"></span>
	  		<span class="mui-tab-label">首页</span>
	  	</a>
	  	<a class="mui-tab-item" @click="goNav('2')">
	  		<span class="mui-icon mui-icon-extra mui-icon-extra-calendar"></span>
	  		<span class="mui-tab-label">看板</span>
	  	</a>
	  	<a class="mui-tab-item" @click="goNav('3')">
	  		<span class="mui-icon mui-icon-extra mui-icon-extra-trend"></span>
	  		<span class="mui-tab-label">报表</span>
	  	</a>
	  	<a class="mui-tab-item" @click="goNav('4')">
	  		<span class="mui-icon mui-icon-extra mui-icon-extra-rank"></span>
	  		<span class="mui-tab-label">分析</span>
	  	</a>
	  	<a class="mui-tab-item mui-active" @click="goNav('5')">
	  		<span class="mui-icon mui-icon-person"></span>
	  		<span class="mui-tab-label">我的</span>
	  	</a>
	  </nav>
		<div class="mui-content">
			<div class="tabbar-five-top">
				<p class="tabbar-five-top-name">刘萌</p>
				<p class="tabbar-five-top-company">深圳市华为技术有限公司</p>
				<p @click="changePhone" class="tabbar-five-top-phone">18877787778</p>
				<img class="tabbar-five-top-img" src="../../assets/img/defaultImg.png" />
				<input @change="changePic($event)" type="file" accept="image/*" class="uploadImg">
			</div>
			<div class="tabbar-five-list">
				<ul>
					<li @click="myListFn('password')">
						<span class="mui-icon mui-icon-locked span-left"></span>
						<p class="tabbar-five-list-name">修改密码</p>
						<span class="mui-icon mui-icon-arrowright span-right"></span>
					</li>
					<li @click="myListFn('feedback')">
						<span class="mui-icon mui-icon-compose span-left"></span>
						<p class="tabbar-five-list-name">意见反馈</p>
						<span class="mui-icon mui-icon-arrowright span-right"></span>
					</li>
					<li @click="myListFn('loginout')">
						<span class="mui-icon mui-icon-info span-left"></span>
						<p class="tabbar-five-list-name">退出登录</p>
						<span class="mui-icon mui-icon-arrowright span-right"></span>
					</li>
				</ul>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
  name: 'my',
  data () {
    return {
      
    }
  },
  computed: {
	  //...mapState('index', ['indexData'])
  },
	methods:{
		//...mapActions('index', ['getData'])
		goNav: function (num) {
			var that = this;
			if (num == '1') {
				that.$router.push('/')
			} else if (num == '2') {
				that.$router.push('/read')
			} else if (num == '3') {
				that.$router.push('/report')
			} else if (num == '4') {
				that.$router.push('/analysis')
			} else if (num == '5') {
				that.$router.push('/my')
			}
		},
		myListFn: function (type) {
			var that = this;
			if (type == 'password') {
				that.$router.push('/password')
			} else if (type == 'feedback') {
				that.$router.push('/feedback')
			} else if (type == 'loginout') {
				var btnArray = ['否', '是'];
				mui.confirm('是否退出登录？', '提示', btnArray, function(e) {
					if (e.index == 1) {
						console.log('确认')
						that.$router.push('/login')
					} else {
						console.log('取消')
					}
				})
			} 
		},
		changePhone: function () {
			this.$router.push('/changePhone')
		},
		changePic: function (e) {
			console.log(e)
			var fileObj=e.srcElement.files[0];
			var imageType = /^image\//;
			//是否是图片，如果input没加accept属性，这里也可以判断
			if (!imageType.test(fileObj.type)) {
				console.log("请选择图片！");
				return;
			}
		}
	},
	created: function(){
		
	},
	mounted: function () {
		
	}
}
</script>

<style slot-scope>
	@import url("my.css");
</style>
