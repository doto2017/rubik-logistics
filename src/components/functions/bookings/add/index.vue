<template>
  <div class="w-full h-full flex flex-col">
    <h1 class="text-2xl font-bold capitalize">Tạo booking mới</h1>
    <div class="mt-4 px-8 py-4 grid grid-cols-3 gap-x-4">
      <div class="col-span-2">
        <span class="text-sm text-indigo-500 block mb-2">Customer</span>
        <div class="flex items-center gap-x-2 border border-slate-300 rounded-md h-8 bg-white">
          <input
            type="text"
            class="w-full text-slate-700 outline-none px-2 bg-white"
            v-model="objForm.customerName"
            disabled
          />
          <button
            @click="openDialog = true"
            class="h-full hover:bg-gray-300 px-2 rounded-r-md bg-gray-200"
          >
            <UserGroupIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500">Loại booking</span>
        <Select v-model="bookingType" :options="typeOptions" />
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500">Dịch vụ</span>
        <Select v-model="service" :options="serviceOptions" />
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500">Phương thức vận chuyển</span>
        <Select v-model="transport" :options="transportOptions" />
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500">Term</span>
        <Select v-model="term" :options="termOptions" />
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500">Cảng đi-POL</span>
        <Select v-model="pol" :options="POL" />
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500">Cảng đến - POD</span>
        <Select v-model="pod" :options="POD" />
      </div>
      <div class="flex flex-col gap-y-2 mb-4">
        <span class="min-w-48 text-sm text-indigo-500 block">Ngày hàng đến dự kiến</span>
        <input
          v-model="eta"
          type="date"
          class="max-w-80 w-full rounded-md border border-gray-300 h-8 px-2 focus:outline focus:outline-indigo-500 text-sm"
        />
      </div>
    </div>
    <div class="flex flex-col gap-y-2 px-8">
      <span class="min-w-48 text-sm text-indigo-500">Ghi chú</span>
      <textarea
        v-model="note"
        class="max-w-80 w-full h-32 resize-none rounded-md border border-gray-300 p-2 focus:outline focus:outline-indigo-500 text-sm"
      />
    </div>
    <div class="flex flex-1 items-end justify-end gap-x-6 mt-4">
      <Button @click="createBooking" :variant="'primary'" class="w-28">Tạo booking</Button>
      <Button :variant="'secondary'" class="w-28" @click="router.back()">Quay lại</Button>
    </div>
    <Dialog :open="openDialog" @close="closeDialog" :target="target" @select="handleSelect" />
  </div>
</template>

<script setup>
import Select from '@/components/kits/select/index.vue'
import { ref } from 'vue'
import { typeOptions, serviceOptions, transportOptions, termOptions, POL, POD } from './add.js'
import Button from '@/components/kits/button/index.vue'
import Dialog from '@/components/kits/modal/dialog.vue'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { bkNoDate } from '@/utils'
import { toast } from 'vue-sonner'
import { UserGroupIcon } from '@heroicons/vue/24/outline'
import { bookingObject } from '../data'

const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
const username = user.username

const bookingType = ref(null)
const service = ref(null)
const transport = ref(null)
const term = ref(null)
const pol = ref(null)
const pod = ref(null)
const eta = ref()
const note = ref('')
const openDialog = ref(false)
const target = ref('customer')

const bookingCollection = collection(db, 'bookings')
const objForm = ref({ ...bookingObject })

const resetForm = () => {
  objForm.value = { ...bookingObject }
  bookingType.value = null
  service.value = null
  transport.value = null
  term.value = null
  pol.value = null
  pod.value = null
  eta.value = null
  note.value = ''
}

const getCount = async () => {
  const querySnapshot = await getDocs(collection(db, 'bookings'))
  const total = querySnapshot.size // Number of documents
  return total < 10 ? `0${total}` : `${total}`
}

const createBooking = async () => {
  try {
    const ts = new Date().getTime()
    const count = await getCount()
    const bkNo = `BRB/${bkNoDate()}-${count}${bookingType.value}`
    const month = new Date().getMonth() + 1
    const docRef = await addDoc(bookingCollection, {
      ...objForm.value,
      bookingType: bookingType.value,
      fileNo:
        bookingType.value === 'LG' ? `RUBIK/${bkNoDate()}-${count}${bookingType.value}` : null,
      service: service.value,
      transport: transport.value,
      pol: pol.value,
      pod: pod.value,
      term: term.value,
      eta: new Date(eta.value).getTime(),
      note: note.value,
      timestamp: ts,
      hrSale: username,
      bkNo: bkNo,
      month: month,
    })
    toast.success('New booking created, booking number: ' + bkNo)
    resetForm()
  } catch (error) {
    console.log(error)
    toast.error('Create booking failed')
  }
}

const handleSelect = (data) => {
  if (target.value === 'customer') {
    objForm.value.customerName = data.name
    objForm.value.mst = data.mst
    objForm.value.phone = data.phone
    objForm.value.picName = data.picName || null
    objForm.value.picPhone = data.picPhone || null
    objForm.value.picEmail = data.picEmail || null
  } else if (target.value === 'commondity') {
    commondity.value = data.name
    console.log(commondity.value)
  } else if (target.value === 'shipper') {
    shipper.value = data.name
  } else if (target.value === 'consignee') {
    consignee.value = data.name
  }
  console.log(objForm.value)
}

const closeDialog = () => {
  openDialog.value = false
}
</script>
