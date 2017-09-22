import Vue from 'vue'
import Router from 'vue-router'

import app from '@/App'

import monitor from '@/views/monitor/monitor'
import devices from '@/views/device/devices'
import friends from '@/views/friend/friends'


import addDevice from '@/views/device/addDevice'
import deviceInfo from '@/views/device/deviceInfo'
import productList from '@/views/device/productList'
import productInfo from '@/views/device/productInfo'

import addMonitor from '@/views/monitor/addMonitor'
import monitorInfo from '@/views/monitor/monitorInfo'
import newFriends from '@/views/friend/newFriends'

import me from '@/views/user/me'
import routeUserInfo from '@/views/user/routeUserInfo'
import Login from '@/views/user/login'
import Register from '@/views/user/register'
import getpassword from '@/views/user/getpwd'
import stratagy from '@/views/strategy/strategy'
import createStrategy from '@/views/strategy/createStrategy'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      component: app,
      children: [
        {
          path: '/main',
          component: app
        },
        {
          path: '/monitor',
          component: monitor,
          children: [
            {
              path: '/monitor/infor',
              name: 'monitorInfo',
              component: monitorInfo
            },
            {
              path: '/monitor/addmonitor',
              name: 'addMonitor',
              component: addMonitor
            }
          ]
        },
        {
          path: '/devices',
          component: devices,
          children: [
            {
              path: '/devices/adddevice',
              name: 'addDevice',
              component: addDevice
            },
            {
              path: '/devices/infor',
              name: 'deviceInfo',
              component: deviceInfo
            }
          ]
        },
        {
          path: '/friends',
          component: friends,
          children: [
            {
              path: '/friends/newfriends',
              name: 'newFriends',
              component: newFriends
            }
          ]
        },
        {
          path: '/strategy',
          component: stratagy,
          children: [
            {
              path: '/strategy/createStrategy',
              name: 'createStrategy',
              component: createStrategy
            }
          ]
        },
        {
          path: '/me',
          component: me
        }
      ]
    },
    {
      path: '/user/:info',
      name: 'routeUserInfo',
      component: routeUserInfo
    },
    {
      path: '/getpassword/:type',
      name: 'getpassword',
      component: getpassword
    },
    {
      path: '/devices/product/list',
      name: 'productList',
      component: productList
    },
    {
      path: '/devices/product/info',
      name: 'productInfo',
      component: productInfo
    }
  ]
})
