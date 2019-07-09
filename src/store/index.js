import Vue from 'vue'
import Vuex from 'vuex'

import index from './modules/index'
import login from './modules/login'
import read from './modules/read'
import report from './modules/report'
import analysis from './modules/analysis'
import my from './modules/my'
import selectPage from './modules/selectPage'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		index:{
			namespaced: true,
			...index
		},
		login:{
			namespaced: true,
			...login
		},
		read:{
			namespaced: true,
			...read
		},
		report:{
			namespaced: true,
			...report
		},
		analysis:{
			namespaced: true,
			...analysis
		},
		my:{
			namespaced: true,
			...my
		},
		selectPage:{
			namespaced: true,
			...selectPage
		}
	}
})

export default store