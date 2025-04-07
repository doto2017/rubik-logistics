<template>
  <div class="flex flex-col gap-4 w-[1024px] max-h-[600px] bg-white rounded-md shadow-md">
    <h1 class="text-2xl font-bold capitalize p-4">Tạo booking mới</h1>
    <div class="grid grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto p-4">
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Khách hàng</h1>
        <input
          type="text"
          class="w-full rounded-md border border-gray-300 p-2 text-sm h-8 text-gray-500"
          disabled
          :value="customer.buyerName"
        />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Mã số thuế</h1>
        <input
          type="text"
          class="w-full rounded-md border border-gray-300 p-2 text-sm h-8 text-gray-500"
          disabled
          :value="customer.mst"
        />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Mã điều kiện giá hoá đơn</h1>
        <input
          type="text"
          class="w-full rounded-md border border-gray-300 p-2 text-sm h-8 text-gray-500"
          disabled
          :value="customer.invoicePriceCondition"
        />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Loại booking</h1>
        <Select v-model="typeOptions[0].value" :options="typeOptions" />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Dịch vụ</h1>
        <Select v-model="serviceOptions[0].value" :options="serviceOptions" />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Cảng đi-POL</h1>
        <Select v-model="POL[0].value" :options="POL" />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Cảng đến - POD</h1>
        <Select v-model="POD[0].value" :options="POD" />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">PIC email</h1>
        <input
          type="email"
          class="w-full rounded-md border border-gray-300 focus:outline focus:outline-indigo-500 p-2 text-sm h-8 text-gray-500"
        />
      </div>
      <div class="flex gap-x-4 justify-between">
        <div>
          <h1 class="text-sm text-gray-700 font-bold">Phương thức vận chuyển</h1>
          <Select v-model="transportMethod" :options="transportOptions" />
        </div>
        <div class="w-32">
          <h1 class="text-sm text-gray-700 font-bold">Khối lượng(GW)</h1>
          <input
            type="text"
            class="w-full rounded-md border border-gray-300 p-2 text-sm h-8 text-gray-500 outline-indigo-500"
          />
        </div>
        <div class="w-28">
          <h1 class="text-sm text-gray-700 font-bold">Số khối(CBM)</h1>
          <input
            type="text"
            class="w-full rounded-md border border-gray-300 p-2 text-sm h-8 text-gray-500 outline-indigo-500"
          />
        </div>
      </div>
      <div v-if="transportMethod === 'sea'">
        <h1 class="text-sm text-gray-700 font-bold">SEA option</h1>
        <Select v-model="seaOptions[0].value" :options="seaOptions" />
      </div>
      <div v-else></div>
      <div class="col-span-2">
        <h1 class="text-sm text-gray-700 font-bold">Người phụ trách bộ phận</h1>
        <div class="flex items-center justify-between gap-x-4 mt-2">
          <div v-for="department in departmentOfficer" :key="department.department.value">
            <h1 class="text-sm text-gray-500 font-semibold">{{ department.department.label }}</h1>
            <Select v-model="department.officer[0].value" :options="department.officer" />
          </div>
        </div>
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Địa chỉ nhận hàng</h1>
        <textarea
          v-model="customer.buyerAddress"
          class="w-full h-32 resize-none rounded-md border border-gray-300 p-2 focus:outline focus:outline-indigo-500 text-sm text-gray-500"
          disabled
        />
      </div>
      <div>
        <h1 class="text-sm text-gray-700 font-bold">Ghi chú</h1>
        <textarea
          v-model="note"
          class="w-full h-32 resize-none rounded-md border border-gray-300 p-2 focus:outline focus:outline-indigo-500 text-sm"
        />
      </div>
    </div>
    <div class="flex flex-1 items-end justify-end gap-x-6 mt-4 p-4">
      <Button :variant="'primary'" class="w-28" @click="emit('createBookingWithCustomer')"
        >Tạo booking</Button
      >
      <Button :variant="'secondary'" class="w-28" @click="emit('cancelCreateBooking')">Huỷ</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  typeOptions,
  serviceOptions,
  transportOptions,
  termOptions,
  POL,
  POD,
  seaOptions,
} from '@/components/functions/bookings/add/add.js'
import { departmentOfficer } from '.'
import Select from '@/components/kits/select/index.vue'
import Button from '@/components/kits/button/index.vue'

const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['cancelCreateBooking', 'createBookingWithCustomer'])

const transportMethod = ref(transportOptions[0].value)

const note = ref('')
</script>
