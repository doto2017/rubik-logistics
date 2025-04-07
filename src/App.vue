<template>
  <div class="h-screen">
    <Toaster richColors position="top-center" />
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Toaster } from 'vue-sonner'
</script>
