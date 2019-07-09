import $https from '../../utils/request.js';
//存储状态
const state = {
	indexData: '',
	screenStatus: false,
	screenStarTime: '',
	screenEndTime: '',
	screenTabOne: [
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
}
//commit改变状态
const mutations = {
	// indexData(state, data){
	// 	state.indexData = data.data;
	// },
	screenTabOne(state, data){
		state.screenTabOne = data.data;
	},
	screenStatus(state, data){
		state.screenStatus = data.data;
	},
	screenStarTime(state, data){
		state.screenStarTime = data.data;
	},
	screenEndTime(state, data){
		state.screenEndTime = data.data;
	}
}
//异步请求
const actions = {
	async commitScreenTabOne({ commit }, data) {
		commit('screenTabOne', {data:data})
	},
	async commitScreenStatus({ commit }, data) {
		commit('screenStatus', {data:data})
	},
	async commitScreenStarTime({ commit }, data) {
		commit('screenStarTime', {data:data})
	},
	async commitScreenEndTime({ commit }, data) {
		commit('screenEndTime', {data:data})
	}
	// async getStation({ commit }, data) {
	// 	return new Promise((resolve, reject) => {
	// 		request({
	// 			url: baseUrl + "index/attendancesite",
	// 			type: "get",
	// 			success: function (res) {
	// 				commit('getStation', { data: res }),
	// 				resolve(res)
	// 			}
	// 		})
	// 	})
	// }
}

export default {
	state,
	mutations,
	actions
}