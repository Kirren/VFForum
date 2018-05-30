import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ForumPage from '@/pages/ForumPage'
import ThreadPage from '@/pages/ThreadPage'
import ProfilePage from '@/pages/ProfilePage'
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
      path: '/category/:id',
      name: 'CategoryPage',
      component: CategoryPage,
      props: true
    },
    {
      path: '/forum/:id',
      name: 'ForumPage',
      component: ForumPage,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadPage',
      component: ThreadPage,
      props: true
    },
    {
      path: '/user/:id',
      name: 'ProfilePage',
      component: ProfilePage,
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
