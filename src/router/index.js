import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloWorld2 from "../components/HelloWorld2";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/:id',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: ':file',
          component: HelloWorld2,
          name: 'HelloWorld2',
          beforeEnter(to, from, next) {
            console.log('beforeEnter')
            if (true) {
              next()
            } else {
              next(false)
            }
          },
        }
      ]
    }
  ]
})
