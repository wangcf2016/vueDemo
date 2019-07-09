<template>
  <div class="container">
		<div class="top-tab">
			<div @click="tabFn('one')" :class="{'tabIsTrue' : tabStatus}" class="top-tab-btn">综合能效</div>
			<div @click="tabFn('two')" :class="{'tabIsTrue' : !tabStatus}" class="top-tab-btn">分项能效</div>
			<span @click="showScreen" class="top-tab-icon mui-icon-extra mui-icon-extra-filter mui-icon"></span>
		</div>
		<div class="maskTop"></div>
		<div v-if="tabStatus" class="my-content">
			<div class="my-content-topBtn">
				<div @click="contentTabFn(btn)" :class="{'activeBtn': btn.status}" v-for="btn in btnArr" :key="btn.id" class="content-topBtn-list">{{btn.name}}</div>
			</div>
			<div v-if="btnArr[0].status" class="chart-wrap">我是仪表盘</div>
			<div v-else class="chart-wrap">我是游标图</div>
		</div>
		<div v-else class="my-content">
			<div class="my-content-topBtn">
				<div @click="contentTabFnTwo(btnTwo)" :class="{'activeBtn': btnTwo.status}" v-for="btnTwo in btnArrTwo" :key="btnTwo.id" class="content-topBtn-list">{{btnTwo.name}}</div>
			</div>
			<div v-if="btnArrTwo[0].status" class="chart-wrap">
				<div class="chart-wrap-list-top">
					<p class="chart-wrap-list-top-p">熟料总产量</p>
					<span class="chart-wrap-list-top-type">国际标杆</span>
					<span class="mui-icon mui-icon-gear" @click="selectType('zhu')"></span>
				</div>
			</div>
			<div v-else class="chart-wrap">
				<div class="chart-wrap-list-top">
					<p class="chart-wrap-list-top-p">折线产量</p>
					<span class="chart-wrap-list-top-type">国际标杆</span>
					<span class="mui-icon mui-icon-gear" @click="selectType('zhe')"></span>
				</div>
			</div>
		</div>
		<nav class="mui-bar mui-bar-tab navBttom">
			<a class="mui-tab-item" @click="goNav('1')">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item mui-active" @click="goNav('2')">
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
		<!-- 侧滑菜单开始 -->
		<div @click="hideScreen" v-show="screenStatus" class="screenMask"></div>
		<div v-if="tabStatus && screenStatus" class="screenWran">
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
					<div @click="selectStarTime" class="select-start-time">{{screenForm.startTime || '开始时间'}}</div>
					<span class="selectTime-line"></span>
					<div @click="selectEndTime" class="select-end-time">{{screenForm.endTime || '结束时间'}}</div>
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
  name: 'read',
  data () {
    return {
	  tabStatus: true,
      btnArr: [
		  {
			  id: 0,
			  name: '仪表盘',
			  status: true
		  },
		  {
		  	  id: 1,
		  	  name: '游标图',
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
	  	  }
	  ],
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
	  ],
	  pickData: [{
		  value: 'ywj',
		  text: '董事长 叶文洁'
		}, {
		  value: 'aaa',
		  text: '总经理 艾AA'
		}, {
		  value: 'lj',
		  text: '罗辑'
	  }],
	  screenForm: {
		  endTime: '',
		  startTime: ''
	  }
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
			that.screenForm.startTime = '';
			that.screenForm.endTime = '';
			that.screenOne = screenOneNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
			that.screenTwo = screenTwoNew.map(function(data,index,arr){
				data.status = false;
				return data;
			})
		},
		selectType: function (type) {
			console.log(type)
			var that = this;
			var selectData = that.pickData;
			var userPicker = new mui.PopPicker();
			userPicker.setData(selectData);
			userPicker.show(function(items) {
				console.log(JSON.stringify(items[0]))
				//返回 false 可以阻止选择框的关闭
				//return false;
				document.getElementsByClassName('mui-poppicker')[0].remove();
			});
		},
		selectStarTime: function () {
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
				that.screenForm.startTime = rs.text;
				that.picker.dispose();
				that.picker = null;
			});
		},
		selectEndTime: function () {
			var that = this;
			that.picker = new mui.DtPicker({"type":"date"});
			that.picker.show(function(rs) {
				console.log(rs.text)
				that.screenForm.endTime = rs.text;
				that.picker.dispose();
				that.picker = null;
			});
		}
	},
	created: function(){
		
	},
	mounted: function () {
		
	}
}
</script>

<style slot-scope>
	@import url("read.css");
	@import url("../../assets/css/mui.picker.css");
	@import url("../../assets/css/mui.poppicker.css");
	@import url("../../assets/css/mui.picker.min.css");
</style>
