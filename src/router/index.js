import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: false,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/department',
    hidden: false,
    children: [{
      path: 'department',
      component: () => import('@/views/department/Department'),
      name: 'Department',
      meta: {
        title: 'Department',
        icon: 'example',
        noCache: true,
        roles: ['admin']
      }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/personnel',
    hidden: false,
    children: [{
      path: 'personnel',
      component: () => import('@/views/personnel/Personnel'),
      name: 'Personnel',
      meta: {
        title: 'personnel',
        icon: 'example',
        noCache: true,
        roles: ['admin']
      }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/project',
    hidden: false,
    children: [{
      path: 'project',
      component: () => import('@/views/project/Project'),
      name: 'Project',
      meta: {
        title: 'project',
        icon: 'example',
        noCache: true,
        roles: ['admin']
      }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/location',
    hidden: false,
    children: [{
      path: 'location',
      component: () => import('@/views/location/Location'),
      name: 'Location',
      meta: {
        title: 'location',
        icon: 'example',
        noCache: true,
        roles: ['admin', 'editor']
      }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user',
    hidden: false,
    children: [{
      path: 'user',
      component: () => import('@/views/user/User'),
      name: 'User',
      meta: {
        title: 'user',
        icon: 'example',
        noCache: true,
        roles: ['admin', 'editor']
      }
    }]
  }
]
