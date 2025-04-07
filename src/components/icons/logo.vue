<template>
  <div class="flex items-center gap-x-2 opacity-80">
    <div class="grid grid-cols-3 gap-1 scale-105 mr-2">
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
      <span class="block w-1 h-1 bg-white"></span>
    </div>
    <span class="text-white text-2xl font-bold uppercase">Rubik Logistic</span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: '10',
  },
})
</script>
