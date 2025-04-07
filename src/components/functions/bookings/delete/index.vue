<template>
  <div class="px-4 py-2 w-96 rounded-lg bg-white">
    <h1 class="text-gray-600 text-lg font-bold">Xác nhận</h1>
    <div class="mt-4">
      <span class="text-gray-600 text-sm">Bạn có chắc chắn muốn xóa booking này không?</span>
    </div>
    <div class="flex justify-end gap-x-6 mt-8">
      <Button @click="$emit('submitDelete')" :variant="'primary'" class="w-28">Xác nhận</Button>
      <Button @click="$emit('closeDelete')" :variant="'secondary'" class="w-28">Hủy</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/kits/button/index.vue'
const emit = defineEmits(['submitDelete', 'closeDelete'])
</script>
