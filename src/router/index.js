import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
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
    path: '/userData',
    component: Layout,
    redirect: '/userData/userBasics',
    name: '客户数据管理',
    meta: {
      title: '客户数据管理',
      icon: 'product'
    },
    children: [{
        path: 'userBasics',
        name: 'userBasics',
        component: () => import('@/views/userData/userBasics/index'),
        meta: {
          title: '个人基础信息',
          icon: 'product-list'
        }
      },
      {
        path: 'addPersion',
        name: 'addPersion',
        component: () => import('@/views/userData/userBasics/add'),
        meta: {
          title: '添加用户'
        },
        hidden: true
      },
      {
        path: 'existBasics',
        name: 'existBasics',
        component: () => import('@/views/userData/existBasics/index'),
        meta: {
          title: '生活基础信息',
          icon: 'product-add'
        }
      },
      {
        path: 'houseBasics',
        name: 'houseBasics',
        component: () => import('@/views/userData/houseBasics/index'),
        meta: {
          title: '房屋基础信息',
          icon: 'product-add'
        }
      }
    ]
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
    children: [
      {
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

export const asyncRouterMap = [{
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
    path: '/user',
    component: Layout,
    redirect: '/user/userlist',
    name: 'user',
    meta: {
      title: '用户',
      icon: 'product'
    },
    children: [{
      path: 'userlist',
      name: 'userlist',
      component: () => import('@/views/user/userlist/index'),
      meta: {
        title: '用户',
        icon: 'user-icon'
      }
    }]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {
      title: '商品',
      icon: 'product'
    },
    children: [{
        path: 'product',
        name: 'product',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品列表',
          icon: 'product-list'
        }
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {
          title: '添加商品',
          icon: 'product-add'
        }
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {
          title: '修改商品',
          icon: 'product-add'
        },
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品回收站',
          icon: 'product-recycle'
        },
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        component: () => import('@/views/pms/product/index'),
        meta: {
          title: '商品评价',
          icon: 'product-comment'
        },
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {
          title: '商品分类',
          icon: 'product-cate'
        }
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {
          title: '添加商品分类'
        },
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {
          title: '修改商品分类'
        },
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {
          title: '商品类型',
          icon: 'product-attr'
        }
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {
          title: '商品属性列表'
        },
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {
          title: '添加商品属性'
        },
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {
          title: '修改商品属性'
        },
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {
          title: '品牌管理',
          icon: 'product-brand'
        }
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {
          title: '添加品牌'
        },
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {
          title: '编辑品牌'
        },
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {
      title: '订单',
      icon: 'order'
    },
    children: [{
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {
          title: '订单列表',
          icon: 'product-list'
        }
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {
          title: '订单详情'
        },
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {
          title: '发货列表'
        },
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {
          title: '订单设置',
          icon: 'order-setting'
        }
      },
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {
      title: '营销',
      icon: 'sms'
    },
    children: [{
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {
          title: '优惠券列表',
          icon: 'sms-coupon'
        }
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {
          title: '添加优惠券'
        },
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {
          title: '修改优惠券'
        },
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {
          title: '优惠券领取详情'
        },
        hidden: true
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {
          title: '广告列表',
          icon: 'sms-ad'
        }
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {
          title: '添加广告'
        },
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {
          title: '编辑广告'
        },
        hidden: true
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

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
// export default router

//实例化vue的时候只挂载constantRouter
// export default new Router({
//   scrollBehavior: () => ({y: 0}),
//   routes: constantRouterMap
// })
//
export default router
