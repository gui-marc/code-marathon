<template>
  <div class="grid w-full h-full px-5 place-items-center">
    <form
      action=""
      class="p-4 border rounded-lg max-w-[350px] w-full grid gap-4 bg-white"
      @submit="createUser"
    >
      <h1 class="text-2xl font-bold">Create Account</h1>
      <input
        class="input"
        v-model="name"
        type="text"
        placeholder="Name"
        required
      />
      <input
        class="input"
        v-model="istId"
        type="text"
        placeholder="Ist ID"
        required
      />
      <input
        class="input"
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />
      <button class="w-full btn btn--primary">Sign In</button>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { register } from '../api'
import { useProgressStore } from '../store/progress'
import { useUserStore } from '../store/userstore'
import { ref } from 'vue';

const name = ref('Guilherme')
const istId = ref('104147')
const email = ref('guilherme@gmail.com')

const userStore = useUserStore()
const progressStore = useProgressStore()
const router = useRouter()

async function createUser() {
  progressStore.setProgress(10)

  const user = await register({
    name: name.value,
    istId: istId.value,
    email: email.value,
  })

  userStore.setUser(user)

  await router.push({
    name: 'DashboardPage',
  })
}
</script>
