<template>
  <div class="container">
		<div class="top-tab">
			<div @click="tabFn('one')" :class="{'tabIsTrue' : tabStatus}" class="top-tab-btn">同比分析</div>
			<div @click="tabFn('two')" :class="{'tabIsTrue' : !tabStatus}" class="top-tab-btn">综合分析</div>
			<span @click="showScreen" class="top-tab-icon mui-icon-extra mui-icon-extra-filter mui-icon"></span>
		</div>
		<div class="maskTop"></div>
		<div v-if="tabStatus" class="my-content">
			<div class="my-content-topBtn">
				<div @click="contentTabFn(btn)" :class="{'activeBtn': btn.status}" v-for="btn in btnArr" :key="btn.id" class="ana-content-topBtn-list">{{btn.name}}</div>
			</div>
			<div v-if="btnArr[0].status" class="chart-wrap">我是同比分析</div>
			<div v-else class="chart-wrap">我是环比分析</div>
		</div>
		<div v-else class="my-content">
			<div class="my-content-topBtn">
				<div @click="contentTabFnTwo(btnTwo)" :class="{'activeBtn': btnTwo.status}" v-for="btnTwo in btnArrTwo" :key="btnTwo.id" class="ana-content-topBtn-list">{{btnTwo.name}}</div>
			</div>
			<div v-if="btnArrTwo[0].status" class="chart-wrap">我是柱状图</div>
			<div v-if="btnArrTwo[1].status" class="chart-wrap">我是折线图</div>
			<div v-if="btnArrTwo[2].status" class="chart-wrap">我是散点图</div>
			<div v-if="btnArrTwo[3].status" class="chart-wrap">我是饼状图</div>
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
			<a class="mui-tab-item" @click="goNav('3')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-trend"></span>
				<span class="mui-tab-label">报表</span>
			</a>
			<a class="mui-tab-item mui-active" @click="goNav('4')">
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
		<div v-if="tabStatus && screenStatus" class="screenWran">
			<div class="screen-content">
				<p class="screen-content-title">指标选择</p>
				<div @click="selectFn" class="screen-selectReport-wrap">
					<p>{{nowData['text'] || '请选择报表'}}</p>
					<span class="mui-icon mui-icon-arrowright span-right"></span>
				</div>
			</div>
			<div class="screen-content">
				<p class="screen-content-title">时间维度</p>
				<div class="screen-list-wrap">
					<div :class="{'activeBtn': item.status}" @click="screenTabOneFn(item)" v-for="item in screenTabOne" :key="item.id" class="screen-list">{{item.name}}</div>
				</div>
			</div>
			<div class="screen-content">
				<p class="screen-content-title">时间选择</p>
				<div class="screen-selectTime-wrap">
					<div @click="selectStarTimeOne" class="select-start-time">{{screenStarTime || '开始时间'}}</div>
					<span class="selectTime-line"></span>
					<div @click="selectEndTimeOne" class="select-end-time">{{screenEndTime || '结束时间'}}</div>
				</div>
			</div>
			<div class="screen-foot">
				<div @click="screenYesOne" class="screen-foot-yes">确定</div>
				<div @click="screenCancelOne" class="screen-foot-no">重置</div>
			</div>
		</div>
		<!-- 第二个筛选 -->
		<div v-if="!tabStatus && screenStatus" class="screenWran">
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
			<div class="screen-content">
				<p class="screen-content-title">时间选择</p>
				<div class="screen-selectTime-wrap">
					<div @click="selectStarTimeTwo" class="select-start-time">{{screenFormTwo.startTime || '开始时间'}}</div>
					<span class="selectTime-line"></span>
					<div @click="selectEndTimeTwo" class="select-end-time">{{screenFormTwo.endTime || '结束时间'}}</div>
				</div>
			</div>
			<div class="screen-foot">
				<div @click="screenYesTwo" class="screen-foot-yes">确定</div>
				<div @click="screenCancelTwo" class="screen-foot-no">重置</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
export default {
  name: 'analysis',
  data () {
    return {
	  tabStatus: true,
      btnArr: [
		  {
			  id: 0,
			  name: '同比分析',
			  status: true
		  },
		  {
		  	  id: 1,
		  	  name: '环比分析',
		  	  status: false
		  }
	  ],
	  btnArrTwo: [
	  	  {
	  		  id: 0,
	  		  name: '柱状图',
	  		  status: true
	  	  },
	  	  {
	  		  id: 1,
	  		  name: '折线图',
	  		  status: false
	  	  },
		  {
		  	  id: 2,
		  	  name: '三点图',
		  	  status: false
		  },
		  {
		  	  id: 3,
		  	  name: '饼状图',
		  	  status: false
		  }
	  ],
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
	  ],
	  screenFormTwo: {
	  	  endTime: '',
	  	  startTime: ''
	  }
    }
  },
  computed: {
	  ...mapState('selectPage', ['nowData']),
	  ...mapState('analysis', ['screenTabOne','screenStatus','screenStarTime','screenEndTime'])
  },
	methods:{
		...mapActions('selectPage', ['getNowData']),
		...mapActions('analysis', ['commitScreenTabOne','commitScreenStatus','commitScreenStarTime','commitScreenEndTime']),
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
			var that = this,
				btnArrOne = that.btnArr,
				btnArrTwo = that.btnArrTwo;
			if (type == 'one') {
				this.tabStatus = true;
			} else {
				this.tabStatus = false;
			}
			that.btnArr = btnArrOne.map(function(e,index,arr){
				if (index == 0) {
					e.status = true;
				} else {
					e.status = false;
				}
				return e;
			})
			that.btnArrTwo = btnArrTwo.map(function(e,index,arr){
				if (index == 0) {
					e.status = true;
				} else {
					e.status = false;
				}
				return e;
			})
		},
		contentTabFn: function (data) {
			var that = this,
				btnArrNew = that.btnArr;
			that.btnArr = btnArrNew.map(function(e,index,arr){
				if (data.id == index) {
					e.status = true;
				} else {
					e.status = false;
				}
				return e;
			})
		},
		contentTabFnTwo: function (data) {
			var that = this,
				btnArrNew = that.btnArrTwo;
			that.btnArrTwo = btnArrNew.map(function(e,index,arr){
				if (data.id == index) {
					e.status = true;
				} else {
					e.status = false;
				}
				return e;
			})
		},
		showScreen: function () {
			var that = this;
			that.commitScreenStatus(true)
		},
		hideScreen: function () {
			var that = this;
			that.commitScreenStatus(false)
		},
		screenTabOneFn: function (data) {
			var that = this,
				screenTabOneNew = that.screenTabOne,
				newArr = [];
			newArr = screenTabOneNew.map(function(e,index,arr){
				if (data.id == index) {
					e.status = true;
				} else {
					e.status = false;
				}
				return e;
			})
			that.commitScreenTabOne(newArr);
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
		screenYesOne: function () {
			var that = this,
				screenTabOneNew = that.screenTabOne;
			var screenTabOneId = '';
			for (var i = 0;i<screenTabOneNew.length;i++) {
				if (screenTabOneNew[i].status) {
					screenTabOneId = screenTabOneNew[i].id;
				}
			}
			console.log(screenOneId)
			console.log(screenTwoId)
		},
		screenYesTwo: function () {
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
		screenCancelOne: function () {
			var that = this,
				screenTabOneNew = that.screenTabOne,
				newArr = [];
			newArr = screenTabOneNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
			that.commitScreenTabOne(newArr);
			that.getNowData({
				id: '',
				text: ''
			});
			that.commitScreenStarTime();
			that.commitScreenEndTime();
		},
		screenCancelTwo: function () {
			var that = this,
				screenOneNew = that.screenOne,
				screenTwoNew = that.screenTwo;
			that.screenFormTwo.startTime = '';
			that.screenFormTwo.endTime = '';
			that.screenOne = screenOneNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
			that.screenTwo = screenTwoNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
		},
		selectStarTimeOne: function () {
			var that = this;
			that.picker = new mui.DtPicker({"type":"date"});
			that.picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				console.log(rs.text)
				that.commitScreenStarTime(rs.text)
				that.picker.dispose();
				that.picker = null;
			});
		},
		selectEndTimeOne: function () {
			var that = this;
			that.picker = new mui.DtPicker({"type":"date"});
			that.picker.show(function(rs) {
				console.log(rs.text)
				that.commitScreenEndTime(rs.text)
				that.picker.dispose();
				that.picker = null;
			});
		},
		selectStarTimeTwo: function () {
			var that = this;
			that.picker = new mui.DtPicker({"type":"date"});
			that.picker.show(function(rs) {
				console.log(rs.text)
				that.screenFormTwo.startTime = rs.text;
				that.picker.dispose();
				that.picker = null;
			});
		},
		selectEndTimeTwo: function () {
			var that = this;
			that.picker = new mui.DtPicker({"type":"date"});
			that.picker.show(function(rs) {
				console.log(rs.text)
				that.screenFormTwo.endTime = rs.text;
				that.picker.dispose();
				that.picker = null;
			});
		},
		selectFn: function () {
			this.$router.push('/selectPage')
		}
	},
	created: function(){
		
	},
	beforeRouteLeave: function (to, from, next) {
		var that = this;
		if (to.name !== 'selectPage') {
				var screenTabOneNew = that.screenTabOne,
					newArr = [];
			newArr = screenTabOneNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
			that.commitScreenTabOne(newArr);
			that.getNowData({
				id: '',
				text: ''
			});
			that.commitScreenStarTime();
			that.commitScreenEndTime();
		}
		next();
	}
}
</script>

<style slot-scope>
	@import url("analysis.css");
	@import url("../../assets/css/mui.picker.min.css");
</style>
