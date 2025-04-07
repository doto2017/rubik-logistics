<template>
  <div class="p-4 rounded-lg bg-white">
    <span class="text-lg font-semibold">Choices</span>
    <div class="flex items-center justify-center gap-2 mt-4">
      <Button :variant="'primary'" @click="emit('updateCustomer')">Update customer</Button>
      <Button :variant="'secondary'" @click="emit('createBooking')">Create booking</Button>
      <Button :variant="'danger'" @click="emit('cancelChoices')">Cancel</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/kits/button/index.vue'

const emit = defineEmits(['updateCustomer', 'createBooking', 'cancel'])
</script>
