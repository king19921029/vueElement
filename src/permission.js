import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  Message
} from 'element-ui'
import {
  getToken,
  getUserId,
} from '@/utils/auth' // 验权
import Layout from './views/layout/Layout'

const whiteList = ['/login'] // 不重定向白名单

// 检查是否是登录态
router.beforeEach((to, from, next) => {
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {

      if (store.getters.roles.length === 0) {
        // console.log("重定向")
        // let str = "() => import('@/views/pms/product/index')".split("import")
        // let result = str[1].match(/\(([^)]*)\)/);
        // console.log(result)
        // accessedRouters = roles
        try {
          let params = new URLSearchParams();
          params.append('adminUserId', getUserId());
          store.dispatch('GetInfo', params).then(res => {
            // 拉取用户信息
            store.dispatch('GenerateRoutes', {
              "roles": res.data
            }).then(() => {
              router.addRoutes(store.getters.addRouters)
              // // hack方法 确保addRoutes已完成
              next({ ...to,
                replace: true
              })
            })
          }).catch((err) => {
            // store.dispatch('FedLogOut').then(() => {
            //   Message.error(err || 'Verification failed, please login again')
            //   next({
            //     path: '/'
            //   })
            // })
          })

        } catch (error) {
          console.log(error)
        }
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
