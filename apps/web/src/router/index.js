import { createRouter, createWebHistory } from 'vue-router'
import { useProgressStore } from '../store/progress'

const SignInPage = () => import('@/pages/SignInPage.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'SignInPage',
      path: '/',
      component: SignInPage,
    },
  ],
})

router.beforeEach(async (to, from, next) => {
    const progressStore = useProgressStore()

  if (to.path === from.path) {
    next()
    return
  }

  await progressStore.setProgress(10)

  // todo: add auth here
})

router.afterEach(async (to, from) => {
    const progressStore = useProgressStore()

  await progressStore.complete()
})

export default router
