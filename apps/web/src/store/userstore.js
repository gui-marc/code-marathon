import { defineStore } from 'pinia'
import { login } from '../api'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  async login(istId) {
    this.user = await login(istId)
  },
  async register({ istId, name, email }) {
    this.user = await register({ istId, name, email })
  },
})
