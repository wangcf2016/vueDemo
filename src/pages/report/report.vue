<template>
  <div class="container reportTopMargin">
		<div class="top-tab">
			<div @click="tabFn('one')" :class="{'tabIsTrue' : tabStatus}" class="top-tab-btn">固定报表</div>
			<!-- <div @click="tabFn('two')" :class="{'tabIsTrue' : !tabStatus}" class="top-tab-btn">自定义报表</div> -->
			<span @click="showScreen" class="top-tab-icon mui-icon-extra mui-icon-extra-filter mui-icon"></span>
		</div>
		<div class="my-content">
			<div class="report-content-top">
				<p>(水泥厂一)</p>
				<span>2019/3/6-2019/3/9</span>
			</div>
			<div class="report-conten-list">
				
			</div>
		</div>
		<nav class="mui-bar mui-bar-tab navBttom">
			<a class="mui-tab-item" @click="goNav('1')">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" @click="goNav('2')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-calendar"></span>
				<span class="mui-tab-label">看板</span>
			</a>
			<a class="mui-tab-item mui-active" @click="goNav('3')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-trend"></span>
				<span class="mui-tab-label">报表</span>
			</a>
			<a class="mui-tab-item" @click="goNav('4')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-rank"></span>
				<span class="mui-tab-label">分析</span>
			</a>
			<a class="mui-tab-item" @click="goNav('5')">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">我的</span>
			</a>
		</nav>
		<!-- 侧滑菜单开始 -->
		<div @click="hideScreen" v-show="screenStatus" class="screenMask"></div>
		<div v-show="screenStatus" class="screenWran">
			<div class="screen-content">
				<p class="screen-content-title">筛选条件</p>
				<div class="screen-selectReport-wrap">
					<p>请选择报表</p>
					<span class="mui-icon mui-icon-arrowright span-right"></span>
				</div>
			</div>
			<div class="screen-content">
				<p class="screen-content-title">时间维度</p>
				<div class="screen-list-wrap">
					<div :class="{'activeBtn': item.status}" @click="screenOneFn(item)" v-for="item in screenOne" :key="item.id" class="screen-list">{{item.name}}</div>
				</div>
			</div>
			<div class="screen-content">
				<p class="screen-content-title">时间选择</p>
				<div class="screen-selectTime-wrap">
					<div class="select-start-time">开始时间</div>
					<span class="selectTime-line"></span>
					<div class="select-end-time">结束时间</div>
				</div>
			</div>
			<div class="screen-foot">
				<div @click="screenYes" class="screen-foot-yes">确定</div>
				<div @click="screenCancel" class="screen-foot-no">重置</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
  name: 'report',
  data () {
    return {
      tabStatus: true,
	  screenStatus: false,
	  screenOne: [
	  		  {
	  			  id: 0,
	  			  name: '15分钟',
	  			  status: false
	  		  },
	  		  {
	  			  id: 1,
	  		  	  name: '小时',
	  			  status: false
	  		  },
	  		  {
	  		  	  id: 2,
	  		  	  name: '班次',
	  			  status: false
	  		  },
	  		  {
	  		  	  id: 3,
	  		  	  name: '日',
	  			  status: false
	  		  },
	  		  {
	  		  	  id: 4,
	  		  	  name: '月',
	  			  status: false
	  		  },
	  		  {
	  		  	  id: 5,
	  		  	  name: '年',
	  			  status: false
	  		  },
	  ]
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
		tabFn: function (type) {
			if (type == 'one') {
				this.tabStatus = true;
			} else {
				this.tabStatus = false;
			}
		},
		showScreen: function () {
			var that = this;
			that.screenStatus = true;
		},
		hideScreen: function () {
			var that = this;
			that.screenStatus = false;
		},
		screenOneFn: function (data) {
			var that = this,
				screenOneNew = that.screenOne;
			that.screenOne = screenOneNew.map(function(e,index,arr){
				if (data.id == index) {
					e.status = true;
				} else {
					e.status = false;
				}
				return e;
			})
		},
		screenYes: function () {
			var that = this,
				screenOneNew = that.screenOne;
			var screenOneId = '';
			for (var i = 0;i<screenOneNew.length;i++) {
				if (screenOneNew[i].status) {
					screenOneId = screenOneNew[i].id;
				}
			}
			console.log(screenOneId)
		},
		screenCancel: function () {
			var that = this,
				screenOneNew = that.screenOne;
			that.screenOne = screenOneNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
		}
	},
	created: function(){
		
	}
}
</script>

<style slot-scope>
	@import url("report.css");
</style>
