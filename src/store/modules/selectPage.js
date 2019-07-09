import $https from '../../utils/request.js';
//存储状态
const state = {
	nowData: '',
	selectData: [
		{
			id: 1,
			name: '原料工序',
			status: true,
			chileArr: [
				{
					cid: 1,
					text: '原料墨韵状态'
				},
				{
					cid: 2,
					text: '原料台时产量'
				},
				{
					cid: 3,
					text: '原料工序电耗'
				}
			]
		},
		{
			id: 2,
			name: '原料工序2',
			status: false,
			chileArr: [
				{
					cid: 1,
					text: '原料墨韵状态'
				},
				{
					cid: 2,
					text: '原料台时产量'
				},
				{
					cid: 3,
					text: '原料工序电耗'
				}
			]
		},
		{
			id: 3,
			name: '原料工序3',
			status: false,
			chileArr: [
				{
					cid: 1,
					text: '原料墨韵状态'
				},
				{
					cid: 2,
					text: '原料台时产量'
				},
				{
					cid: 3,
					text: '原料工序电耗'
				}
			]
		}
	]
}
//commit改变状态
const mutations = {
	// indexData(state, data){
	// 	state.indexData = data.data;
	// },
	selectData(state, data){
		console.log(data)
		state.selectData = data.data;
	},
	nowData(state, data){
		state.nowData = data.data;
	}
}
//异步请求
const actions = {
	async refreshData({ commit }, data) {
		commit('selectData', { data: data })
	},
	async getNowData({ commit }, data) {
		commit('nowData', { data: data })
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