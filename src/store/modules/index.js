import request from '../../utils/request.js';
//存储状态
const state = {
	indexData: ''
}
//commit改变状态
const mutations = {
	indexData(state, data){
		state.indexData = data.data;
	},
}
//异步请求
const actions = {
	async getIndexData({ commit }, data) {
		return new Promise((resolve, reject) => {
			request({
				url: "index/attendancesite",
				type: "get",
				callback: function (res) {
					commit('indexData', { data: res }),
					resolve(res)
				}
			})
		})
	}
}

export default {
	state,
	mutations,
	actions
}