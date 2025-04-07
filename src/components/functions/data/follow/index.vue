<template>
  <div class="w-full h-full flex flex-col">
    <h1 class="text-2xl font-bold mt-2 text-slate-700">Danh sách khách hàng đã follow</h1>
    <div class="mt-8 w-full overflow-auto flex-1">
      <Table
        :data="customers"
        :headers="followedCustomersHeaders"
        :sortable="sortable"
        :rowEvent="true"
        @enableSort="enableSort"
        @confirmIdxSort="confirmIdxSort"
        @rejectIdxSort="rejectIdxSort"
        @onRowClick="onRowClick"
      />
    </div>
    <Teleport to="body">
      <Modal :open="customerModal">
        <UpdateCustomer
          v-if="modalType === 'updateCustomer'"
          :customer="selectedCustomer"
          @updateCustomerWithCustomer="updateCustomerWithCustomer"
          @cancelUpdateCustomer="cancelUpdateCustomer"
        />
        <CreateBooking
          v-else-if="modalType === 'createBooking'"
          :customer="selectedCustomer"
          @cancelCreateBooking="cancelCreateBooking"
          @createBookingWithCustomer="createBookingWithCustomer"
        />
        <Choices
          v-else-if="modalType === 'choices'"
          @updateCustomer="updateCustomer"
          @createBooking="createBooking"
          @cancelChoices="cancelChoices"
        />
      </Modal>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import Table from '@/components/kits/table/index.vue'
import { followedCustomersHeaders } from '@/components/functions/data/total'
import Modal from '@/components/kits/modal/index.vue'
import Choices from '@/components/functions/bookings/quotation-form/choices/index.vue'
import CreateBooking from '@/components/functions/data/create-booking/index.vue'
import UpdateCustomer from '@/components/functions/data/follow/updateCus/index.vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'
import { db } from '@/firebase'
import { collection, query, where, getDocs, writeBatch, doc, orderBy } from 'firebase/firestore'

const router = useRouter()
const user = ref({})
const customerModal = ref(false)
const selectedCustomer = ref({})
const customers = ref([])
const modalType = ref('choices')
try {
  user.value = JSON.parse(localStorage.getItem('user')) || {}
} catch (e) {
  console.error('Failed to load user data from localStorage:', e)
}

const fetchFollowedCustomers = async () => {
  const username = JSON.parse(localStorage.getItem('user')).username
  const q1 = query(
    collection(db, 'customers'),
    where('pickedUp', '==', username),
    where('orderNo', '!=', null),
    orderBy('orderNo', 'asc'),
    orderBy('createdAt', 'desc'),
  )

  const q2 = query(
    collection(db, 'customers'),
    where('pickedUp', '==', username),
    where('orderNo', '==', null),
    orderBy('createdAt', 'desc'),
  )

  const snapshot1 = await getDocs(q1)
  const snapshot2 = await getDocs(q2)
  const docs = [...snapshot1.docs, ...snapshot2.docs]
  const cus = docs.map((doc) => {
    return { id: doc.id, ...doc.data() }
  })
  customers.value = cus
}

const sortable = ref(false)

const enableSort = (data) => {
  sortable.value = true
}

const confirmIdxSort = async (data) => {
  customers.value = customers.value.map((item, idx) => ({
    ...item,
    orderNo: data[idx],
  }))
  const batch = writeBatch(db)
  customers.value.forEach((customer) => {
    const customerRef = doc(collection(db, 'customers'), customer.id)
    if (customer.orderNo) {
      batch.update(customerRef, { orderNo: customer.orderNo })
    }
  })
  await batch.commit()

  sortable.value = false
  await fetchFollowedCustomers()
}

const rejectIdxSort = () => {
  sortable.value = false
}

const onRowClick = (row) => {
  selectedCustomer.value = row
  customerModal.value = true
}

const cancelChoices = () => {
  customerModal.value = false
  modalType.value = 'choices'
}

const createBooking = () => {
  modalType.value = 'createBooking'
}

const updateCustomer = () => {
  modalType.value = 'updateCustomer'
}

const cancelCreateBooking = () => {
  customerModal.value = false
  modalType.value = 'choices'
}

const createBookingWithCustomer = () => {
  customerModal.value = false
  modalType.value = 'choices'
  toast.success('Tạo booking thành công')
}

const cancelUpdateCustomer = () => {
  customerModal.value = false
  modalType.value = 'choices'
}

const updateCustomerWithCustomer = () => {
  customerModal.value = false
  modalType.value = 'choices'
  toast.success('Cập nhật khách hàng thành công')
  fetchFollowedCustomers()
}

onMounted(() => {
  fetchFollowedCustomers()
})
</script>
