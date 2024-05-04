<template>
  <div>
    <h1>Dashboard</h1>
    <p>Welcome, {{ user.name }}</p>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userstore'

const userStore = useUserStore()
const router = useRouter()

function signOut() {
  userStore.signOut()
  router.push({
    name: 'SignInPage',
  })
}
</script>
