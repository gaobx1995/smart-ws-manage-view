import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
import Cookies from 'js-cookie'
import Layout from '@/layout'
const _import = require('./router/_import_' + process.env.NODE_ENV) // 获取组件的方法
// import axios from 'axios'
import store from './store'

var getRouter // 用来获取后台拿到的路由
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist
// const token = store.getters.token
// console.log(store.getters.token)
router.beforeEach((to, from, next) => {
  NProgress.start()
  Cookies.set('SameSite', 'None')
  Cookies.set('Secure', true)
  // if (token) {
  if (!getRouter) { // 不加这个判断，路由会陷入死循环
    if (!getObjArr('router')) {
      store.dispatch('user/getMenus').then(res => {
        getRouter = res// 后台拿到路由
        saveObjArr('router', getRouter) // 存储路由到localStorage
        routerGo(to, next)// 执行路由跳转方法
      })
    } else { // 从localStorage拿到了路由
      getRouter = getObjArr('router')// 拿到路由
      routerGo(to, next)
    }
  } else {
    next()
  }
  // } else {
  //   next()
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) // 过滤路由
  router.addRoutes(getRouter) // 动态添加路由
  global.antRouter = getRouter // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
  console.log(router)
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { // localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { // localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name))
}
