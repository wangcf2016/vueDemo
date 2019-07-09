<template>
  <div class="container">
		<header class="mui-bar mui-bar-nav">
			<h1 class="mui-title">首页</h1>
			<a @click="showScreen" class="mui-icon-extra mui-icon-extra-filter mui-icon mui-pull-right"></a>
		</header>
		<div class="maskTop"></div>
		<nav class="mui-bar mui-bar-tab navBttom">
			<a class="mui-tab-item mui-active" @click="goNav('1')">
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
			<a class="mui-tab-item" @click="goNav('5')">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">我的</span>
			</a>
		</nav>
		<!--下拉刷新容器-->
		<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
			<div class="mui-scroll">
				<div class="mui-content">
					<div id="echarts" :style="{width: '300px', height: '300px'}"></div>
				</div>
			</div>
		</div>
		<!-- 侧滑菜单开始 -->
		<div @click="hideScreen" v-show="screenStatus" class="screenMask"></div>
		<div v-show="screenStatus" class="screenWran">
			<div class="screen-content">
				<p class="screen-content-title">模板</p>
				<div class="screen-list-wrap">
					<div :class="{'activeBtn': item.status}" @click="screenOneFn(item)" v-for="item in screenOne" :key="item.id" class="screen-list">{{item.name}}</div>
				</div>
			</div>
			<div class="screen-content">
				<p class="screen-content-title">数据周期</p>
				<div class="screen-list-wrap">
					<div :class="{'activeBtn': item.status}" @click="screenTwoFn(item)" v-for="item in screenTwo" :key="item.id" class="screen-list">{{item.name}}</div>
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
//import mui from '../../assets/js/mui.js';
export default {
  name: 'index',
  data () {
    return {
      screenStatus: false,
	  screenOne: [
		  {
			  id: 0,
			  name: '模板1',
			  status: false
		  },
		  {
			  id: 1,
		  	  name: '模板2',
			  status: false
		  },
		  {
		  	  id: 2,
		  	  name: '模板3',
			  status: false
		  },
		  {
		  	  id: 3,
		  	  name: '模板4',
			  status: false
		  },
		  {
		  	  id: 4,
		  	  name: '模板5',
			  status: false
		  },
		  {
		  	  id: 5,
		  	  name: '模板6',
			  status: false
		  },
	  ],
	  screenTwo: [
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
	  ...mapState('index', ['indexData'])
  },
	methods:{
		...mapActions('index', ['getIndexData']),
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
		screenTwoFn: function (data) {
			var that = this,
				screenTwoNew = that.screenTwo;
			that.screenTwo = screenTwoNew.map(function(e,index,arr){
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
				screenOneNew = that.screenOne,
				screenTwoNew = that.screenTwo;
			var screenOneId = '';
			var screenTwoId = '';
			for (var i = 0;i<screenOneNew.length;i++) {
				if (screenOneNew[i].status) {
					screenOneId = screenOneNew[i].id;
				}
			}
			for (var j = 0;j<screenTwoNew.length;j++) {
				if (screenTwoNew[j].status) {
					screenTwoId = screenTwoNew[j].id;
				}
			}
			console.log(screenOneId)
			console.log(screenTwoId)
		},
		screenCancel: function () {
			var that = this,
				screenOneNew = that.screenOne,
				screenTwoNew = that.screenTwo;
			that.screenOne = screenOneNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
			that.screenTwo = screenTwoNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
		}
	},
	mounted() {
	  var dom = document.getElementById('echarts')
      var myChart = this.echarts.init(dom)
      // 绘制图表
      myChart.setOption({
        series: [{
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          data: [{
              value: 235,
              name: '视频广告'
            },
            {
              value: 274,
              name: '联盟广告'
            },
            {
              value: 310,
              name: '邮件营销'
            },
            {
              value: 335,
              name: '直接访问'
            },
            {
              value: 400,
              name: '搜索引擎'
            }
          ]
        }]
      });
	  //下拉刷新
	  for(var i = mui.hooks.inits.length-1,item;i>=0;i--){
		item = mui.hooks.inits[i];
		if(item.name=="pullrefresh"){
			item.repeat=true;
		}
	  }
	  console.log(111)
	  mui.init({
	  	pullRefresh: {
	  		container: '#pullrefresh',
	  		down: {
	  			style:'circle',
	  			callback: function () {
					console.log('11111xiala')
					//this.getIndexData();
					//mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
					mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
				}
	  		}
	  	}
	  });
	},
	created: function(){
		
	}
}
</script>
<style slot-scope>
	@import url("index.css");
</style>
