import request from '../../utils/request.js';
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
	async login({ commit }, data) {
		return new Promise((resolve, reject) => {
			request({
				type: 'post',
				url: '/home',
				param: data,
				callBack: function (res) {
					console.log(res);
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