import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout*/
import Layout from '../views/layout/Layout'

export const constantRouterMap = [{
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
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  },
  {
    path: '/accountManage',
    component: Layout,
    redirect: '/accountManage/account',
    name: 'accountManage',
    meta: {
      title: '账户管理',
      icon: 'product'
    },
    children: [{
        path: 'account',
        name: 'account',
        component: () => import('@/views/accountManage/account/index'),
        meta: {
          title: '账户信息管理',
          icon: 'product-list'
        }
      },
      {
        path: 'addAccount',
        name: 'addAccount',
        component: () => import('@/views/accountManage/account/add'),
        meta: {
          title: '添加账户'
        },
        hidden: true
      },
      {
        path: 'updateAccount',
        name: 'updateAccount',
        component: () => import('@/views/accountManage/account/update'),
        meta: {
          title: '编辑账户'
        },
        hidden: true
      },
      {
        path: 'userLog',
        name: 'userLog',
        component: () => import('@/views/accountManage/account/userLog'),
        meta: {
          title: '日志详情信息'
        },
        hidden: true
      },
      {
        path: 'rule',
        name: 'rule',
        component: () => import('@/views/accountManage/rule/index'),
        meta: {
          title: '规则组信息管理',
          icon: 'product-add'
        }
      },
      {
        path: 'addRule',
        name: 'addRule',
        component: () => import('@/views/accountManage/rule/add'),
        meta: {
          title: '添加规则组'
        },
        hidden: true
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/views/accountManage/roles/index'),
        meta: {
          title: '权限组信息管理',
          icon: 'product-add'
        }
      },
      {
        path: 'addRoles',
        name: 'addRoles',
        component: () => import('@/views/accountManage/roles/add'),
        meta: {
          title: '添加权限'
        },
        hidden: true
      },
    ]
  },
]

// {
//   path: '/userData',
//   component: Layout,
//   redirect: '/userData/userBasics',
//   name: '客户数据管理',
//   meta: {
//     title: '客户数据管理',
//     icon: 'sms'
//   },
//   children: [{
//       path: 'userBasics',
//       name: 'userBasics',
//       component: () => import('@/views/userData/userBasics/index'),
//       meta: {
//         title: '个人基础信息',
//         icon: 'product-list'
//       }
//     },
//     {
//       path: 'existBasics',
//       name: 'existBasics',
//       component: () => import('@/views/userData/existBasics/index'),
//       meta: {
//         title: '生活基础信息',
//         icon: 'product-add'
//       }
//     },
//     {
//       path: 'houseBasics',
//       name: 'houseBasics',
//       component: () => import('@/views/userData/houseBasics/index'),
//       meta: {
//         title: '房屋基础信息',
//         icon: 'product-add'
//       }
//     }
//   ]
// },

export const asyncRouterMap = []

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// 动态生成路由表--权限控制
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
