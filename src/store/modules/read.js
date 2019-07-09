import $https from '../../utils/request.js';
//存储状态
const state = {
	indexData: ''
}
//commit改变状态
const mutations = {
	// indexData(state, data){
	// 	state.indexData = data.data;
	// },
}
//异步请求
const actions = {
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