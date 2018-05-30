import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ForumPage from '@/pages/ForumPage'
import ThreadPage from '@/pages/ThreadPage'
import CreateThreadPage from '@/pages/CreateThreadPage'
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
      path: '/thread/new',
      name: 'CreateThreadPage',
      component: CreateThreadPage,
      props: true
    },
    {
      path: '/thread/:id',
      name: 'ThreadPage',
      component: ThreadPage,
      props: true
    },
    {
      path: '/me',
      name: 'ProfilePage',
      component: ProfilePage,
      props: true
    },
    {
      path: '/me/edit',
      name: 'ProfileEditPage',
      component: ProfilePage,
      props: {edit: true}
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage
    }
  ],
  mode: 'history'
})
