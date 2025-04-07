<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex items-center justify-between mt-4">
      <div class="flex flex-row gap-x-4 items-center">
        <h1 class="text-2xl font-bold text-slate-700">Báo giá</h1>
        <Select v-model="quotationType" :options="quotationTypes" />
      </div>
      <div class="flex flex-row gap-x-4">
        <Button
          variant="primary"
          class="flex flex-row items-center px-4 py-2 gap-2 shadow-sm"
          @click="handleOpenModal"
        >
          <PlusIcon class="w-4 h-4" />
          New
        </Button>
        <Button variant="danger" class="flex flex-row items-center px-4 py-2 gap-2 shadow-sm">
          <TrashIcon class="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4 mt-4">
      <div class="flex flex-col gap-y-1">
        <label for="quotation-no" class="text-sm font-medium text-blue-700">Quotation No</label>
        <input
          v-model="quotationNo"
          id="quotation-no"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="pol" class="text-sm font-medium text-blue-700">POL</label>
        <input
          v-model="pol"
          id="pol"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="dest" class="text-sm font-medium text-blue-700">Dest</label>
        <input
          v-model="dest"
          id="dest"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="shipper" class="text-sm font-medium text-blue-700">Shipper</label>
        <input
          v-model="shipper"
          id="shipper"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="consignee" class="text-sm font-medium text-blue-700">Consignee</label>
        <input
          v-model="consignee"
          id="consignee"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="via" class="text-sm font-medium text-blue-700">Via</label>
        <input
          v-model="via"
          id="via"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="creator" class="text-sm font-medium text-blue-700">Creator</label>
        <input
          v-model="creator"
          id="creator"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col gap-y-1">
        <label for="customer" class="text-sm font-medium text-blue-700">Customer</label>
        <input
          v-model="customer"
          id="customer"
          type="text"
          class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
        />
      </div>
      <div class="flex items-center gap-x-4 col-span-2">
        <div class="flex flex-col gap-y-1 flex-1">
          <label for="from" class="text-sm font-medium text-blue-700">From</label>
          <input
            v-model="from"
            id="from"
            type="date"
            class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
          />
        </div>
        <div class="flex flex-col gap-y-1 flex-1">
          <label for="to" class="text-sm font-medium text-blue-700">To</label>
          <input
            v-model="to"
            id="to"
            type="date"
            class="text-slate-600 border border-slate-300 rounded-md px-2 py-1 outline-indigo-500"
          />
        </div>
        <div class="flex items-end h-full">
          <Button variant="primary" class="flex flex-row items-center px-4 py-2 gap-2 shadow-sm">
            <MagnifyingGlassIcon class="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
    <div class="flex items-center mt-4">
      <span class="font-medium text-slate-700 block min-w-36">Danh sách báo giá</span>
      <hr class="w-full border-slate-300" />
    </div>
    <div class="mt-4 overflow-auto">
      <Table
        :headers="headers"
        :data="quotations"
        :dblClickEvent="true"
        @rowDblClick="handleRowDblClick"
      />
    </div>
  </div>
  <Modal :open="openModal">
    <AirFreight
      v-if="quotationType === 'air'"
      :quotation="newQuotation"
      @closeModal="handleCloseModal"
    />
    <SeaFreight
      v-if="quotationType === 'sea'"
      :quotation="newQuotation"
      @closeModal="handleCloseModal"
    />
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/kits/button/index.vue'
import { PlusIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import Modal from '@/components/kits/modal/index.vue'
import SeaFreight from './sea-freight/index.vue'
import AirFreight from './air-freight/index.vue'
import Select from '@/components/kits/select/index.vue'
import { quotationDBHeaders } from './index.js'
import Table from '@/components/kits/table/table3.vue'
import { db } from '@/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { toast } from 'vue-sonner'
const quotationNo = ref('')
const pol = ref('')
const dest = ref('')
const shipper = ref('')
const consignee = ref('')
const via = ref('')
const creator = ref('')
const customer = ref('')
const from = ref(null)
const to = ref(null)
const openModal = ref(false)
const newQuotation = ref({})

const handleOpenModal = () => {
  openModal.value = true
}

const handleCloseModal = () => {
  openModal.value = false
}

const handleRowDblClick = (idx) => {
  newQuotation.value = quotations.value[idx]
  openModal.value = true
}

const quotationTypes = [
  {
    value: 'air',
    label: 'Air Freight',
  },
  {
    value: 'sea',
    label: 'Sea Freight',
  },
]

const quotationType = ref(quotationTypes[0].value)
const quotations = ref([])

const headers = computed(() => {
  fetchQuotations()
  return quotationDBHeaders[quotationType.value]
})

const fetchQuotations = async () => {
  try {
    const q = query(collection(db, 'quotations'), where('quotationType', '==', quotationType.value))
    const querySnapshot = await getDocs(q)
    quotations.value = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
  } catch (error) {
    toast.error('Error fetching quotations:', error.message)
  }
}

fetchQuotations()
</script>
