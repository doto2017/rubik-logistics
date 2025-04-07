<template>
  <div v-if="department === 'Accountant'" class="bg-slate-100 max-w-5xl rounded-lg">
    <h1 class="text-slate-700 text-2xl font-bold px-8 py-4">Update Billing/Cost</h1>
    <div class="max-h-96 overflow-auto px-8 py-4">
      <div class="flex items-center space-x-4 py-4">
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 font-bold">Billing/Cost</span>
          <Select v-model="bookingEdit.billingCost" :options="billingCostOptions" />
        </div>
        <div class="flex flex-col flex-1">
          <span class="text-sm text-gray-500 font-bold">For</span>
          <input
            v-model="bookingEdit.fileNumber"
            class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 text-sm"
            disabled
          />
        </div>
        <div class="flex flex-col">
          <span class="text-sm text-gray-500 font-bold">Credit term</span>
          <Select v-model="bookingEdit.creditTerm" :options="creditTermOptions" />
        </div>
      </div>
      <div class="mt-8">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 font-bold uppercase">Account</span>
          <span class="w-full block border-b border-gray-300"></span>
        </div>
        <div class="flex items-center space-x-10 py-2">
          <div class="w-1/2 flex items-center space-x-8">
            <div class="flex flex-col flex-1">
              <span class="text-sm text-gray-500 font-bold">Payment term</span>
              <Select v-model="paymentTermOptions[0].value" :options="paymentTermOptions" />
            </div>
            <div class="flex flex-col flex-1">
              <span class="text-sm text-gray-500 font-bold">Bill to</span>
              <Select v-model="billTo" :options="billToOptions" />
            </div>
          </div>
          <div class="w-1/2">
            <span class="text-sm text-gray-500 font-bold">{{ objectTitle }}</span>
            <Select v-model="billObject" :options="billObjectOptions" />
          </div>
        </div>
        <div class="flex items-center space-x-12 py-2">
          <div class="w-1/2">
            <span class="text-sm text-gray-500 font-bold block">PP</span>
            <input
              v-model="bookingEdit.pp"
              class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm w-full"
            />
          </div>
          <div class="w-1/2">
            <div class="flex items-center space-x-2">
              <input
                v-model="ob"
                type="checkbox"
                class="border border-gray-300 rounded-md px-2 outline-indigo-500 scale-125 text-sm"
              />
              <span class="text-sm text-gray-500 font-bold">O/B</span>
            </div>
            <input
              :disabled="!ob"
              class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm w-full"
            />
          </div>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600 font-bold uppercase">Charge</span>
          <span class="w-full block border-b border-gray-300"></span>
        </div>
        <div class="flex flex-col justify-center py-2">
          <div class="flex items-center space-x-10 w-full">
            <div class="w-1/2">
              <span class="text-sm text-gray-500 font-bold">Description</span>
              <Select v-model="bookingEdit.charge" :options="descriptionCodeOptions" />
            </div>
            <div class="w-1/2 flex items-center">
              <div class="flex-1">
                <span class="text-sm text-gray-500 font-bold">Quantity</span>
                <input
                  type="number"
                  min="0"
                  class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm w-full"
                />
              </div>
              <Button class="h-8 self-end ml-4 flex items-center">Count</Button>
            </div>
          </div>
          <div class="flex items-center space-x-10 w-full">
            <div class="w-1/2">
              <span class="text-sm text-gray-500 font-bold">Unit price</span>
              <div class="flex items-center space-x-2">
                <Select
                  v-model="unitPriceOptions[0].value"
                  :options="unitPriceOptions"
                  :style="'!min-w-20'"
                />
                <input
                  type="number"
                  class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 text-sm flex-1"
                />
              </div>
            </div>
            <div class="w-1/2">
              <span class="text-sm text-gray-500 font-bold">Total</span>
              <input
                class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm w-full"
              />
            </div>
          </div>
          <div class="flex items-center space-x-10">
            <div class="flex-1">
              <span class="text-sm text-gray-500 font-bold">Charge per</span>
              <Select v-model="chargePerOptions[0].value" :options="chargePerOptions" />
            </div>
            <div class="flex-1">
              <span class="text-sm text-gray-500 font-bold">ROE</span>
              <input
                type="number"
                class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm w-full"
              />
            </div>
          </div>
          <div class="flex items-center space-x-10 mt-2">
            <div class="w-1/2 flex items-center space-x-4">
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 font-bold">VAT</span>
                <Select v-model="vatCodeOptions[0].value" :options="vatCodeOptions" />
              </div>
              <div class="flex flex-col">
                <span class="text-sm text-gray-500 font-bold">Allocation type</span>
                <Select v-model="allocationTypeOptions[0].value" :options="allocationTypeOptions" />
              </div>
            </div>
            <div class="flex items-center w-1/2 space-x-4">
              <div class="flex flex-col flex-1">
                <span class="text-sm text-gray-500 font-bold">Min Amount</span>
                <input
                  type="number"
                  min="0"
                  class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm"
                />
              </div>
              <div class="flex flex-col flex-1">
                <span class="text-sm text-gray-500 font-bold">Max Amount</span>
                <input
                  type="number"
                  min="0"
                  class="border border-gray-300 rounded-md px-2 h-8 outline-indigo-500 mt-1 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <span class="text-sm text-gray-500 font-bold">Note</span>
          <textarea
            class="border border-gray-300 rounded-md p-2 h-20 resize-none outline-indigo-500 mt-1 text-sm w-full"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-x-6 px-8 py-4 mt-4 bg-slate-200 rounded-b-lg">
      <Button :variant="'primary'" class="w-28" @click="emit('submitAccountantEdit')"
        >Cập nhật</Button
      >
      <Button :variant="'secondary'" class="w-28" @click="emit('cancelEdit')">Huỷ</Button>
    </div>
  </div>
  <div v-else class="bg-slate-100 rounded-lg">
    <h1 class="text-slate-700 text-2xl font-bold px-8 py-4">Cập nhật booking</h1>
    <div class="max-h-96 w-full overflow-auto mt-8 grid grid-cols-3 gap-x-20 gap-y-6 px-8">
      <div v-for="header in fields" :key="header.key" class="flex flex-col">
        <span class="text-sm text-gray-600 font-bold">{{ header.label }}</span>
        <input
          v-model="bookingEdit[header.key]"
          class="border border-gray-300 rounded-md px-2 py-1 outline-indigo-500 mt-1 text-sm"
        />
      </div>
    </div>
    <div class="flex justify-end gap-x-6 px-8 py-4 mt-4">
      <Button :variant="'primary'" class="w-28" @click="emit('submitRegularEdit')">Cập nhật</Button>
      <Button :variant="'secondary'" class="w-28" @click="emit('cancelEdit')">Huỷ</Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { generalFields, docsFields, logsFields } from '@/mockdata'
import Button from '@/components/kits/button/index.vue'
import Select from '@/components/kits/select/index.vue'
import {
  billingCostOptions,
  creditTermOptions,
  paymentTermOptions,
  billToOptions,
  employeeList,
  partnerList,
  descriptionCodeOptions,
  unitPriceOptions,
  chargePerOptions,
  vatCodeOptions,
  allocationTypeOptions,
} from './index'

const props = defineProps({
  booking: {
    type: Object,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
})

const bookingEdit = ref(props.booking)
const fields = computed(() => {
  if (props.department !== 'Ops' && props.department !== 'Docs') {
    return generalFields
  }
  if (props.department === 'Docs') {
    return [...generalFields, ...docsFields]
  }
  if (props.department === 'Ops') {
    return [...generalFields, ...logsFields]
  }
})

const billTo = ref(billToOptions[0].value)

const objectTitle = computed(() => {
  if (billTo.value === 'employee') {
    return 'Employee '
  }
  return 'Partner'
})

const billObjectOptions = computed(() => {
  if (billTo.value === 'employee') {
    return employeeList
  }
  return partnerList
})

const billObject = ref(null)

const ob = ref(false)

const emit = defineEmits(['submitRegularEdit', 'cancelEdit', 'submitAccountantEdit'])
</script>
