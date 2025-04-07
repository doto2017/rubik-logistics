<template>
  <div class="w-full h-full flex flex-col">
    <h1 class="text-2xl font-bold text-gray-700">Danh sách khách hàng đã book</h1>
    <div class="w-full h-full mt-4 overflow-auto border-t border-gray-300">
      <Table :data="bookedCustomers" :headers="customerHeaders" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Table from '@/components/kits/table/index.vue'
import { customerHeaders } from '@/components/functions/data/total/'

const user = JSON.parse(localStorage.getItem('user'))
const bookedCustomers = ref(user.bookedCustomer ? user.bookedCustomer : [])
</script>
