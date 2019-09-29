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
  {
    path: '/userData',
    component: Layout,
    redirect: '/userData/regions',
    name: 'userData',
    meta: {
      title: '客户数据管理',
      icon: 'sms'
    },
    children: [{
        path: 'regions',
        name: 'regions',
        component: () => import('@/views/userData/regions/index'),
        meta: {
          title: '小区基本信息',
          icon: 'product-add'
        }
      },
      {
        path: 'addRegions',
        name: 'addRegions',
        component: () => import('@/views/userData/regions/addReg'),
        meta: {
          title: '添加小区'
        },
        hidden: true
      },
      {
        path: 'seeRegions',
        name: 'seeRegions',
        component: () => import('@/views/userData/regions/seeReg'),
        meta: {
          title: '查看小区信息'
        },
        hidden: true
      },
      {
        path: 'updateRegions',
        name: 'updateRegions',
        component: () => import('@/views/userData/regions/updateReg'),
        meta: {
          title: '修改小区信息'
        },
        hidden: true
      },
      {
        path: 'house',
        name: 'house',
        component: () => import('@/views/userData/house/index'),
        meta: {
          title: '房屋基础信息',
          icon: 'product-add'
        }
      },
      {
        path: 'addHouse',
        name: 'addHouse',
        component: () => import('@/views/userData/house/addHouse'),
        meta: {
          title: '添加房屋'
        },
        hidden: true
      },
      {
        path: 'seeHouse',
        name: 'seeHouse',
        component: () => import('@/views/userData/house/seeHouse'),
        meta: {
          title: '查看房屋信息'
        },
        hidden: true
      },
      {
        path: 'updateHouse',
        name: 'updateHouse',
        component: () => import('@/views/userData/house/update'),
        meta: {
          title: '修改房屋信息'
        },
        hidden: true
      },
      {
        path: 'userBasics',
        name: 'userBasics',
        component: () => import('@/views/userData/userBasics/index'),
        meta: {
          title: '个人基础信息',
          icon: 'product-list'
        }
      },
      {
        path: 'addUser',
        name: 'addUser',
        component: () => import('@/views/userData/userBasics/addUser'),
        meta: {
          title: '添加用户'
        },
        hidden: true
      },
      {
        path: 'updateUser',
        name: 'updateUser',
        component: () => import('@/views/userData/userBasics/updateUser'),
        meta: {
          title: '修改用户信息'
        },
        hidden: true
      },
      {
        path: 'seeUser',
        name: 'seeUser',
        component: () => import('@/views/userData/userBasics/seeUser'),
        meta: {
          title: '查看用户信息'
        },
        hidden: true
      },
      {
        path: 'relationHouseIndex',
        name: 'relationHouseIndex',
        component: () => import('@/views/userData/userBasics/relationHouse/relationHouseIndex'),
        meta: {
          title: '关联房屋信息'
        },
        hidden: true
      },
      {
        path: 'gladdHouse',
        name: 'gladdHouse',
        component: () => import('@/views/userData/userBasics/relationHouse/addHouse'),
        meta: {
          title: '添加关联房屋信息'
        },
        hidden: true
      },
      {
        path: 'glupdateHouse',
        name: 'glupdateHouse',
        component: () => import('@/views/userData/userBasics/relationHouse/update'),
        meta: {
          title: '修改关联房屋信息'
        },
        hidden: true
      },
      {
        path: 'glseeHouse',
        name: 'glseeHouse',
        component: () => import('@/views/userData/userBasics/relationHouse/seeHouse'),
        meta: {
          title: '查看关联房屋信息'
        },
        hidden: true
      },
      // 查看房屋记录 增删改查
      {
        path: 'houseRecordIndex',
        name: 'houseRecordIndex',
        component: () => import('@/views/userData/userBasics/relationHouse/houseRecord/houseRecordIndex'),
        meta: {
          title: '查看房屋记录'
        },
        hidden: true
      },
      {
        path: 'addhouseRecord',
        name: 'addhouseRecord',
        component: () => import('@/views/userData/userBasics/relationHouse/houseRecord/addhouseRecord'),
        meta: {
          title: '添加房屋记录'
        },
        hidden: true
      },
      {
        path: 'updatehouseRecord',
        name: 'updatehouseRecord',
        component: () => import('@/views/userData/userBasics/relationHouse/houseRecord/updatehouseRecord'),
        meta: {
          title: ' 编辑房屋记录'
        },
        hidden: true
      },
      {
        path: 'seehouseRelation',
        name: 'seehouseRelation',
        component: () => import('@/views/userData/userBasics/relationHouse/houseRecord/seehouseRelation'),
        meta: {
          title: ' 编辑房屋记录'
        },
        hidden: true
      },
      {
        path: 'relationLifeIndex',
        name: 'relationLifeIndex',
        component: () => import('@/views/userData/userBasics/relationLife/relationLifeIndex'),
        meta: {
          title: '关联生活信息'
        },
        hidden: true
      },
      {
        path: 'addRelationLife',
        name: 'addRelationLife',
        component: () => import('@/views/userData/userBasics/relationLife/addRelationLife'),
        meta: {
          title: '添加关联生活信息'
        },
        hidden: true
      },
      {
        path: 'updateRelationLife',
        name: 'updateRelationLife',
        component: () => import('@/views/userData/userBasics/relationLife/updateRelationLife'),
        meta: {
          title: '修改关联生活信息'
        },
        hidden: true
      },
      {
        path: 'seeRelationLife',
        name: 'seeRelationLife',
        component: () => import('@/views/userData/userBasics/relationLife/seeRelationLife'),
        meta: {
          title: '查看关联生活信息'
        },
        hidden: true
      },
      // {
      //   path: 'existBasics',
      //   name: 'existBasics',
      //   component: () => import('@/views/userData/existBasics/index'),
      //   meta: {
      //     title: '生活基础信息',
      //     icon: 'product-add'
      //   }
      // }

    ]
  },
]



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
