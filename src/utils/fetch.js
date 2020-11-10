import axios from 'axios'
import { getToken, getCsrfToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import { getParentUrl } from '@/utils/auth'
import store from '@/store'
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // config.headers['zy_token'] = getToken()
    config.headers['x-csrf-token'] = getCsrfToken()
    config.headers['Cache-Control'] = 'no-cache'
    config.headers['Pragma'] = 'no-cache'
    return config
  },
  error => {
    // eslint-disable-next-line no-empty
    if (error.response.status === 401) {
    } else {
      return Promise.reject(error)
    }
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(new Error('网络异常'))
    }
  },
  error => {
    if (error.response?.data?.code.includes('1005')) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '提示', {
        customClass: store.getters.device === 'mobile' ? 'mobileConfirmClass' : '',
        confirmButtonText: '重新登陆',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.error(store.getters.isExternalSource + '')
        if (store.getters.device !== 'mobile') {
          window.parent.location.href = `${getParentUrl()}/views/login.html`
        } else {
          if (store.getters.isExternalSource === 1) {
            /* eslint-disable */
            moaBridge.backToHome()
          } else {
            try {
              window.WebViewJavascriptBridge.callHandler('clickClose', null, null)
            } catch (error) {
              // todo
              // window.location.href = `/eoms-app-view/workOrderList?state=${store.getters.workOrderState}`
              moaBridge.backToHome()
            }
          }
        }
      }).catch(() => {
      })
    }
  }
)

// 请求方法
export default function fetch(
  url = '',
  data = {},
  type = 'post',
  ContentType = 'application/json;charset=UTF-8'
) {
  const config = {
    method: type,
    url: url,
    timeout: 300000,
    headers: {'Content-Type': ContentType}
  }
  if (type.toLowerCase() === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  return new Promise((resolve, reject) => {
    axios(config)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}
