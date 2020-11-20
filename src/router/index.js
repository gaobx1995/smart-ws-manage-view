import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/login',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/adminManage/users',
    hidden: true,
    component: Layout,
    children: [{
      path: 'index',
      name: 'UsersIndex',
      component: () => import('@/views/users/index'),
      meta: { title: '用户管理' }
    }, {
      path: 'form',
      name: 'UsersForm',
      component: () => import('@/views/users/form'),
      meta: { title: '用户表单' }
    }, {
      path: 'edit',
      name: 'UsersEdit',
      component: () => import('@/views/users/edit'),
      meta: { title: '用户编辑' }
    }]
  },
  {
    path: '/adminManage/groups',
    hidden: true,
    component: Layout,
    children: [{
      path: 'index',
      name: 'GroupsIndex',
      component: () => import('@/views/groups/index'),
      meta: { title: '组管理' }
    }, {
      path: 'form',
      name: 'GroupsForm',
      component: () => import('@/views/groups/form'),
      meta: { title: '组表单' }
    }, {
      path: 'edit',
      name: 'GroupsEdit',
      component: () => import('@/views/groups/edit'),
      meta: { title: '组编辑' }
    }]
  },
  {
    path: '/adminManage/tenants',
    hidden: true,
    component: Layout,
    children: [{
      path: 'index',
      name: 'TenantsIndex',
      component: () => import('@/views/tenants/index'),
      meta: { title: '租户管理' }
    }, {
      path: 'form',
      name: 'TenantsForm',
      component: () => import('@/views/tenants/form'),
      meta: { title: '租户表单' }
    }, {
      path: 'edit',
      name: 'TenantsEdit',
      component: () => import('@/views/tenants/edit'),
      meta: { title: '租户编辑' }
    }]
  },
  {
    path: '/adminManage/authorizations',
    hidden: true,
    component: Layout,
    children: [{
      path: 'index',
      name: 'Authorizations',
      component: () => import('@/views/authorizations/index'),
      meta: { title: '授权管理' }
    }]
  }

  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
