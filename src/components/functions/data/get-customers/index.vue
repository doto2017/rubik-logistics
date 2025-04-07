<template>
  <div class="p-4 flex flex-col w-[1024px]">
    <h1 class="text-2xl font-bold text-gray-700 text-center">Thông tin khách hàng</h1>
    <div class="grid grid-cols-2 gap-4 text-sm border border-gray-300 pt-4 pb-4 px-4 mt-4">
      <div class="flex flex-col" v-for="(item, idx) in Object.entries(customer)" :key="idx">
        <h2 class="text-gray-500 font-bold">{{ customerHeaders[idx].label }}</h2>
        <span class="text-gray-700">{{ item[1] ? item[1] : '-' }}</span>
      </div>
    </div>
    <div class="flex justify-between gap-4 mt-4">
      <div class="flex items-center gap-2">
        <input
          type="checkbox"
          id="potentialCustomer"
          class="border border-gray-300 scale-110 rounded-md px-2 py-1"
          :placeholder="'Tìm kiếm khách hàng'"
        />
        <label for="potentialCustomer" class="text-slate-500">Đánh dấu khách hàng tiềm năng</label>
      </div>
      <div class="flex items-center gap-4">
        <Button :variant="'primary'" @click="emit('pickupCustomer', customer)">
          Get Customer
        </Button>
        <Button :variant="'secondary'" @click="emit('cancelPickupCustomer')"> Huỷ </Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from '@/components/kits/button/index.vue'
import { customerHeaders } from '../total/index'

const props = defineProps({
  customer: Object,
  required: true,
  default: () => {},
})
const emit = defineEmits(['pickupCustomer', 'cancelPickupCustomer'])
</script>
