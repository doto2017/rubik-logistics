<template>
  <div class="p-4 rounded-lg bg-slate-100 shadow-md">
    <span class="text-lg text-slate-700 uppercase font-bold">Update customer</span>
    <div class="flex flex-col gap-2 mt-4 text-slate-700">
      <div class="flex flex-col border-b border-slate-200 pb-2">
        <span class="text-sm font-semibold">Customer name</span>
        <span class="text-sm">{{ props.customer.buyerName }}</span>
      </div>
      <div class="flex flex-col border-b border-slate-200 pb-2">
        <span class="text-sm font-semibold">MST</span>
        <span class="text-sm">{{ props.customer.mst || '-' }}</span>
      </div>
      <div class="flex flex-col border-b border-slate-200 pb-2">
        <span class="text-sm font-semibold">Origin Country</span>
        <span class="text-sm">{{ props.customer.originCountryName || '-' }}</span>
      </div>
      <div class="flex flex-col border-b border-slate-200 pb-2">
        <span class="text-sm font-semibold">Address</span>
        <span class="text-sm">{{ props.customer.buyerAddress || '-' }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-2 mt-4">
      <div class="flex flex-col">
        <span class="text-sm font-semibold">Status</span>
        <input
          v-model="status"
          type="text"
          class="w-full px-2 py-1 rounded-md border border-slate-200 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-semibold">PIC Name</span>
        <input
          v-model="picName"
          type="text"
          class="w-full px-2 py-1 rounded-md border border-slate-200 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-semibold">PIC Phone</span>
        <input
          v-model="picPhone"
          type="text"
          class="w-full px-2 py-1 rounded-md border border-slate-200 outline-indigo-500"
        />
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-semibold">PIC Email</span>
        <input
          v-model="picEmail"
          type="text"
          class="w-full px-2 py-1 rounded-md border border-slate-200 outline-indigo-500"
        />
      </div>
    </div>
    <div class="flex items-center justify-center gap-2 mt-4">
      <Button :variant="'primary'" @click="updateCustomer">Cập nhật</Button>
      <Button :variant="'secondary'" @click="emit('cancelUpdateCustomer')">Hủy</Button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateDoc, doc, collection } from 'firebase/firestore'
import { db } from '@/firebase'
import Button from '@/components/kits/button/index.vue'
import { toast } from 'vue-sonner'

const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
})

const status = ref(props.customer.customerStatus)
const picName = ref(null)
const picPhone = ref(null)
const picEmail = ref(null)

const emit = defineEmits(['updateCustomerWithCustomer', 'cancelUpdateCustomer'])

const updateCustomer = async () => {
  let updateCustomer = {}
  if (!picName.value && !picPhone.value && !picEmail.value) {
    updateCustomer = {
      ...props.customer,
      customerStatus: status.value,
    }
  } else {
    const pic = [
      { picName: picName.value, picPhone: picPhone.value, picEmail: picEmail.value },
      ...props.customer.picInfo,
    ]
    updateCustomer = {
      ...props.customer,
      customerStatus: status.value,
      picInfo: pic,
    }
  }
  const customerRef = doc(collection(db, 'customers'), props.customer.id)
  await updateDoc(customerRef, updateCustomer)
  toast.success('Cập nhật khách hàng thành công')
  emit('updateCustomerWithCustomer')
}
</script>
