<template>
  <div
    v-if="progressStore.progress > 0"
    class="w-full h-1 relative bg-gray-100"
  >
    <div
      class="absolute top-0 h-1 bg-blue-700 animate-pulse transition-all duration-300 ease-in-out"
      :style="{ width: `${progressStore.progress}%` }"
    ></div>
  </div>
</template>

<script setup>
import { useProgressStore } from '../store/progress'

const progressStore = useProgressStore()
</script>
