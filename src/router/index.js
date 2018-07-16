import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import HomePage from '@/pages/HomePage'
import CategoryPage from '@/pages/CategoryPage'
import ForumPage from '@/pages/ForumPage'
import ThreadPage from '@/pages/ThreadPage'
import EditThreadPage from '@/pages/EditThreadPage'
import CreateThreadPage from '@/pages/CreateThreadPage'
import ProfilePage from '@/pages/ProfilePage'
import RegisterPage from '@/pages/RegisterPage'
import SignInPage from '@/pages/SignInPage'
import NotFoundPage from '@/pages/NotFoundPage'

Vue.use(Router)

const router = new Router({
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
      path: '/thread/new/:forumId',
      name: 'CreateThreadPage',
      component: CreateThreadPage,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/thread/:id',
      name: 'ThreadPage',
      component: ThreadPage,
      props: true
    },
    {
      path: '/thread/edit/:id',
      name: 'EditThreadPage',
      component: EditThreadPage,
      props: true
    },
    {
      path: '/me',
      name: 'ProfilePage',
      component: ProfilePage,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/me/edit',
      name: 'ProfileEditPage',
      component: ProfilePage,
      props: {edit: true},
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage,
      props: true
    },
    {
      path: '/signin',
      name: 'SignInPage',
      component: SignInPage,
      props: true
    },
    {
      path: '/signout',
      name: 'SignOut',
      beforeEnter (to, from, next) {
        store.dispatch('signOut')
          .then(() => next({name: 'HomePage'}))
      }
    },
    {
      path: '*',
      name: 'NotFoundPage',
      component: NotFoundPage
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log(`navigating from ${from.name} to ${to.name}`)

  store.dispatch('initAuthentication')
    .then(user => {
      if (to.matched.some(route => route.meta.requiresAuth)) {
        if (user) {
          next()
        } else {
          next({name: 'HomePage'})
        }
      } else {
        next()
      }
    })
})

export default router
