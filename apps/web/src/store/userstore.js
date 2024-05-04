import { defineStore } from 'pinia'
import { login } from '../api'
import client from '../api/client'

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
  signOut() {
    this.user = null
    client.defaults.headers.common['Authorization'] = ''
  }
})
