<template>
  <div
    v-if="open"
    class="h-screen w-screen bg-gray-700 bg-opacity-70 p-4 flex justify-center items-center gap-y-4 absolute top-0 left-0"
  >
    <div class="min-h-64 min-w-[480px] bg-gray-100 rounded-md p-4 shadow-md flex flex-col gap-y-4">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold">{{ `Data ${target}` }}</h1>
        <button @click="close" class="hover:bg-red-200 rounded-full p-1">
          <XMarkIcon class="w-6 h-6 text-red-600" />
        </button>
      </div>

      <div class="flex justify-center items-center gap-2 flex-1">
        <div v-if="isLoading">
          <Loading class="w-10 h-10 text-indigo-600" />
        </div>

        <div v-else class="w-full max-h-[400px] overflow-y-auto">
          <Table
            :data="data"
            :headers="headers[props.target]"
            :clickEvent="true"
            class="w-full"
            @rowClick="handleRowClick"
          />
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button class="bg-indigo-600 text-white px-4 py-2 rounded-md" @click="selectedCustomer">
          Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Loading from '@/components/icons/loading.vue'
import Table from '@/components/kits/table/table3.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { db } from '@/firebase'
import { getDocs, collection, query, where } from 'firebase/firestore'

const isLoading = ref(false)
const data = ref([])
const selectedData = ref(null)
const customerPool = ref([])
const customers = ref([])
const commodities = ref([
  {
    name: 'Commondity 1',
  },
  {
    name: 'Commondity 2',
  },
  {
    name: 'Commondity 3',
  },
])
const shippers = ref([
  {
    name: 'Shipper 1',
  },
  {
    name: 'Shipper 2',
  },
  {
    name: 'Shipper 3',
  },
])
const consignees = ref([
  {
    name: 'Consignee 1',
  },
  {
    name: 'Consignee 2',
  },
  {
    name: 'Consignee 3',
  },
])
const props = defineProps({
  open: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  target: {
    type: String,
    required: true,
    default: () => '',
  },
})

const mockData = {
  customer: customers.value,
  commodity: commodities.value,
  shipper: shippers.value,
  consignee: consignees.value,
}

const headers = {
  customer: [
    {
      label: 'Name',
      key: 'name',
    },
    {
      label: 'MST',
      key: 'mst',
    },
  ],
  commondity: [
    {
      label: 'Name',
      key: 'name',
    },
  ],
  shipper: [
    {
      label: 'Name',
      key: 'name',
    },
  ],
  consignee: [
    {
      label: 'Name',
      key: 'name',
    },
  ],
}

const fetchData = async () => {
  isLoading.value = true
  const username = JSON.parse(localStorage.getItem('user')).username
  const q = query(collection(db, 'customers'), where('pickedUp', '==', username))
  const snapshot = await getDocs(q)
  const cus = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  customerPool.value = cus
  customers.value = customerPool.value.map((item) => ({
    name: item.buyerName,
    mst: item.mst,
    phone: item.buyerMobile,
    PICName: item.PICName,
    PICPhone: item.PICPhone,
    PICEmail: item.PICEmail,
  }))
  mockData['commodity'] = commodities.value
  mockData['shipper'] = shippers.value
  mockData['consignee'] = consignees.value
  mockData['customer'] = customers.value
  data.value = mockData[props.target]
  headers.value = headers[props.target]
  isLoading.value = false
}

const emit = defineEmits(['close', 'select'])

const close = () => {
  data.value = []
  isLoading.value = false
  emit('close')
}

const handleRowClick = (idx) => {
  selectedData.value = data.value[idx]
}

const selectedCustomer = () => {
  emit('select', selectedData.value)
  close()
}

watch(
  () => props.open,
  (newVal) => {
    if (newVal) {
      fetchData()
    }
  },
)
</script>
