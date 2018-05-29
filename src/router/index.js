import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import ThreadPage from '@/pages/ThreadPage'
import CategoryPage from '@/pages/CategoryPage'
import ForumPage from '@/pages/ForumPage'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/thread/:id',
      name: 'ThreadPage',
      component: ThreadPage,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'ForumPage',
      component: ForumPage,
      props: true
    },
    {
      path: '/category/:id',
      name: 'CategoryPage',
      component: CategoryPage,
      props: true
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage
    }
  ],
  mode: 'history'
})
