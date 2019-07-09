import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index/index'
import login from '@/pages/login/login'
import read from '@/pages/read/read'
import report from '@/pages/report/report'
import analysis from '@/pages/analysis/analysis'
import my from '@/pages/my/my'
import feedback from '@/pages/my/feedback'
import password from '@/pages/my/password'
import changePhone from '@/pages/my/changePhone'
import selectPage from '@/pages/select/selectPage'
import forgotPass from '@/pages/my/forgotPass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
		{
		  path: '/login',
		  name: 'login',
		  component: login
		},
		{
		  path: '/read',
		  name: 'read',
		  component: read
		},
		{
		  path: '/report',
		  name: 'report',
		  component: report
		},
		{
		  path: '/analysis',
		  name: 'analysis',
		  component: analysis
		},
		{
		  path: '/my',
		  name: 'my',
		  component: my
		},
		{
		  path: '/feedback',
		  name: 'feedback',
		  component: feedback
		},
		{
			path: '/password',
			name: 'password',
			component: password
		},
		{
			path: '/changePhone',
			name: 'changePhone',
			component: changePhone
		},
		{
			path: '/selectPage',
			name: 'selectPage',
			component: selectPage
		},
		{
			path: '/forgotPass',
			name: 'forgotPass',
			component: forgotPass
		}
  ]
})
