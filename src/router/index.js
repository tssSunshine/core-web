import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/Login'
import Department from '@/views/department/Department'
import Personnel from "../views/personnel/Personnel";
import Location from '@/views/location/Location'
import Project from "../views/project/Project";
import User from '@/views/user/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/department',
      name: 'department',
      component: Department,
      iconCls: 'el-icon-message'
    },
    {
      path: '/personnel',
      name: 'personnel',
      component: Personnel,
      iconCls: 'el-icon-message'
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
      iconCls: 'el-icon-message'
    },
    {
      path: '/location',
      name: 'Location',
      component: Location,
      iconCls: 'el-icon-message'
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      iconCls: 'el-icon-message'
    }
  ]
})
