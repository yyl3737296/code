/* global Vue */
import Router from 'vue-router'

Vue.use(Router)
const LOGIN_PAGE_NAME = 'login'

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/view/login/login.vue')
    }
  ]
})
const token = null;
router.beforeEach((to, from, next) => {
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  }
})

module.exports = router
