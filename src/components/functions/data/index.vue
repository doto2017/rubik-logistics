<template>
  <div>
    <h1>Data</h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

router.push({ name: 'data-total' })
</script>
