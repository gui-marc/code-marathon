import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => {
    return { progress: 50 }
  },
  actions: {
    setProgress(progress) {
      this.progress = progress
    },
    complete() {
      this.progress = 100
    },
  },
})
