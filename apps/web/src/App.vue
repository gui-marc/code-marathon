<script setup>
import { RouterView } from 'vue-router'
import ProgressBar from './components/ProgressBar.vue'
</script>

<template>
  <div class="h-full bg-gray-50">
    <ProgressBar />
    <RouterView />
  </div>
</template>
