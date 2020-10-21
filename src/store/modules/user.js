// import request from '@/utils/request'
import * as utils from '@/utils/auth'
// import { resetRouter } from '@/router'
import fetch from '@/utils/fetch'
import md5 from 'js-md5'

const getDefaultState = () => {
  return {
    token: utils.getToken(),
    name: '',
    menus: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    const encPass = md5(password)
    const date = new Date()
    const timestamp =
      '' +
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
      (date.getMinutes() < 10
        ? '0' + date.getMinutes()
        : date.getMinutes()) +
      (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return new Promise((resolve, reject) => {
      fetch('/plat/auth/token', {
        loginName: username,
        password: timestamp + encPass,
        captcha: 'string' })
        .then(response => {
          if (response.code === '200') {
            commit('SET_NAME', response.data.username)
            commit('SET_TOKEN', response.data.token)
            if (username !== utils.getLoginInfo('zy-netuser-id')) {
              sessionStorage.clear()
            }
            utils.setToken(response.data.token)
            utils.setLoginInfo({
              tempFlag: '1',
              zy_token: response.data.token,
              'zy-user-id': response.data.userId,
              'zy-user-type': response.data?.userType || '',
              'zy-netuser-id': response.data.netuserId,
              'zy-prv-id': response.data?.prvId || '',
              'zy-prv-name': response.data?.prvName || '',
              'zy-prv-code': response.data?.defaultProv?.prvCode || '',
              'zy-reg-id': response.data?.regId || '',
              'zy-reg-name': response.data?.regName || '',
              'zy-region-full-code': response.data?.defaultRegion?.regFullCode || '',
              'zy-region-full-name': response.data?.defaultRegion?.regFullName || '',
              'zy-team-full-code': response.data?.defaulteam?.teamFullCode || '',
              'zy-factory-code':
                response.data.teams &&
                response.data.teams.length &&
                response.data.teams.some(item => {
                  return item.typecode === 'factory'
                })
                  ? response.data.teams.filter(item => {
                    return item.typecode === 'factory'
                  })[0].code
                  : '',
              'zy-user-email': response.data?.email || '',
              'zy-user-mobile': response.data?.mobilephone || '',
              'zy-user-teams': response.data.teams
                ? JSON.stringify(response.data.teams)
                : '',
              'zy-user-groupList': response.data.grps
                ? JSON.stringify(response.data.grps)
                : '',
              'zy-company-name': response.data.companyName,
              'zy-company-code': response.data.companyCode,
              'zy-dept-id': response?.defaultDept?.depId || '',
              'zy-dept-name': response?.defaultDept?.depName || ''
            })
            fetch('/plat/auth/user/getUserByNetuserid', { netuserid: username })
              .then(res => {
                if (res.code === '200') {
                  utils.setLoginInfo({
                    'zy-user-name': res.data.username
                  })
                  resolve()
                } else {
                  reject(res.msg)
                }
              })
              .catch(error => {
                reject(error)
              })
          } else {
            reject(response.msg)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  loginByToken({ commit }, { token, device }) {
    return new Promise((resolve, reject) => {
      const url = device === 'mobile' ? '/plat/app/auth/getUserInfoByAppToken/verifyCode' : '/plat/auth/getUserInfoByToken/verifyCode'
      fetch(url, { token: token }, 'get')
        .then(response => {
          utils.setLoginInfo({
            tempFlag: '1',
            zy_token: token,
            'zy-user-id': response.data.userid,
            'zy-user-type': response.data?.userType || '',
            'zy-netuser-id': response.data.netuserid,
            'zy-prv-id': response.data?.prvId || '',
            'zy-prv-name': response.data?.prvName || '',
            'zy-prv-code': response.data?.defaultProv?.prvCode || '',
            'zy-reg-id': response.data?.regId || '',
            'zy-reg-name': response.data?.regName || '',
            'zy-region-full-code': response.data?.defaultRegion?.regFullCode || '',
            'zy-region-full-name': response.data?.defaultRegion?.regFullName || '',
            'zy-team-full-code': response.data?.defaulteam?.teamFullCode || '',
            'zy-factory-code':
              response.data.teams &&
              response.data.teams.length &&
              response.data.teams.some(item => {
                return item.typecode === 'factory'
              })
                ? response.data.teams.filter(item => {
                  return item.typecode === 'factory'
                })[0].code
                : '',
            'zy-user-email': response.data?.email || '',
            'zy-user-mobile': response.data?.mobilePhone || '',
            'zy-user-teams': response.data.teams
              ? JSON.stringify(response.data.teams)
              : '',
            'zy-user-groupList': response.data.grps
              ? JSON.stringify(response.data.grps)
              : '',
            'zy-company-name': response.data.companyName,
            'zy-company-code': response.data.companyCode,
            'zy-user-name': response.data.username,
            'zy-dept-id': response?.defaultDept?.depId || '',
            'zy-dept-name': response?.defaultDept?.depName || ''
          })
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  loginByUserName({ commit }, username) {
    return new Promise((resolve, reject) => {
      fetch('/plat/auth/token/faultySystem/ssoLogin', { username: username }, 'get')
        .then(response => {
          utils.setLoginInfo({
            tempFlag: '1',
            zy_token: response.data.token,
            'zy-user-id': response.data.userId,
            'zy-user-type': response.data?.userType || '',
            'zy-netuser-id': response.data.netuserId,
            'zy-prv-id': response.data?.prvId || '',
            'zy-prv-name': response.data?.prvName || '',
            'zy-prv-code': response.data?.defaultProv?.prvCode || '',
            'zy-reg-id': response.data?.regId || '',
            'zy-reg-name': response.data?.regName || '',
            'zy-region-full-code': response.data?.defaultRegion?.regFullCode || '',
            'zy-region-full-name': response.data?.defaultRegion?.regFullName || '',
            'zy-team-full-code': response.data?.defaulteam?.teamFullCode || '',
            'zy-factory-code':
              response.data.teams &&
              response.data.teams.length &&
              response.data.teams.some(item => {
                return item.typecode === 'factory'
              })
                ? response.data.teams.filter(item => {
                  return item.typecode === 'factory'
                })[0].code
                : '',
            'zy-user-email': response.data?.email || '',
            'zy-user-mobile': response.data?.mobilephone || '',
            'zy-user-teams': response.data.teams
              ? JSON.stringify(response.data.teams)
              : '',
            'zy-user-groupList': response.data.grps
              ? JSON.stringify(response.data.grps)
              : '',
            'zy-company-name': response.data.companyName,
            'zy-company-code': response.data.companyCode,
            'zy-user-name': response.data.username
          })
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  // user logout
  logout({ commit }) {
    utils.removeToken() // must remove  token  first
    // resetRouter()
    commit('SET_MENUS', [])
    commit('RESET_STATE')
    window.localStorage.removeItem('router')
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      utils.removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  getMenus({ commit }) {
    // return new Promise(resolve => {
    //   fetch('/api/eoms/wsDesign/deploy/menuList', { }, 'get')
    //     .then(res => {
    //       commit('SET_MENUS', res.data)
    //       resolve(res.data)
    //     })
    //     .catch(() => {
    //       commit('SET_MENUS', [])
    //       resolve([])
    //     })
    // })

    const menus =
    [{
      path: '/userManage',
      component: 'Layout',
      children: [
        {
          path: 'index',
          name: 'Form',
          component: '/userManage/index',
          meta: {
            'title': '用户管理',
            'icon': 'user'
          }
        }
      ]
    },
    {
      path: '/form',
      component: 'Layout',
      children: [
        {
          path: 'index',
          name: 'Form',
          component: '/form/index',
          meta: {
            'title': '表单',
            'icon': 'form'
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }]
    // menus[menus.length] = { path: '*', redirect: '/404', hidden: true }
    return new Promise(resolve => {
      commit('SET_MENUS', menus)
      resolve(menus)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
