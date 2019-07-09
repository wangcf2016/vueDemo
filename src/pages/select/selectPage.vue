<template>
  <div class="container">
	  <header class="mui-bar mui-bar-nav">
	  	<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	  	<h1 class="mui-title">请选择</h1>
	  </header>
		<div class="select-search">
			<input placeholder="请输入" type="text"/>
			<span class="mui-icon mui-icon-search"></span>
		</div>
		<div class="list-wrap">
			<div class="select-list" v-for="item in selectData" :key="item.id">
				<div class="select-list-title" @click="selectOne(item)">
					<p class="select-list-title-one">{{item.name}}</p>
					<span v-if="!item.status" class="mui-icon mui-icon-arrowright icon-right"></span>
					<span v-if="item.status" class="mui-icon mui-icon-arrowdown icon-down"></span>
				</div>
				<div v-show="item.status" class="select-list-ul">
					<p @click="selectTwo($event, list)" v-for="list in item.chileArr" :key="list.cid" class="select-list-ul-name">{{list.text}}</p>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
import store from '../../store/index.js'
export default {
  name: 'selectPage',
  data () {
    return {
      
    }
  },
  computed: {
	  ...mapState('selectPage', ['selectData'])
  },
	methods:{
		...mapActions('selectPage', ['refreshData', 'getNowData']),
		selectOne: function (data) {
			console.log(data)
			var that = this;
			var oldData = that.selectData;
			var status = data.status;
			oldData.map(function(now,index,arr){
				if (now.id == data.id) {
					now.status = !status;
				}
				return now;
			})
			that.refreshData(oldData)
		},
		selectTwo: function (e, cdata) {
			e.preventDefault();
			console.log(cdata)
			this.getNowData(cdata)
			history.go(-1);
		}
	},
	created: function(){
		
	}
}
</script>

<style slot-scope>
	@import url("selectPage.css");
</style>
