<template>
  <div class="h-full flex flex-col">
    <div class="flex items-center justify-between gap-x-4">
      <div class="flex items-center gap-x-2">
        <h1 class="text-2xl font-bold text-slate-700">Bookings list</h1>
        <Select v-model="department" :options="departments" />
      </div>
      <div class="flex items-center gap-x-4">
        <Searchbar />
        <div v-if="!actions" class="flex items-center space-x-4">
          <Button
            v-if="department === 'Sale'"
            class="flex items-center"
            @click="router.push('/bookings/add')"
          >
            <PlusIcon class="size-5 mr-2" />
            New
          </Button>
        </div>
        <div v-else class="flex items-center space-x-4">
          <Button
            :variant="'primary'"
            class="flex items-center"
            :class="[!actionModify ? 'opacity-50 cursor-not-allowed' : '']"
            :disabled="!actionModify"
            @click="onModify"
          >
            <PencilSquareIcon class="size-5 mr-2" />
            Modify
          </Button>
          <Button
            :variant="'danger'"
            class="flex items-center"
            :class="[!actionDelete ? 'opacity-50 cursor-not-allowed' : '']"
            :disabled="!actionDelete"
            @click="onDelete"
          >
            <TrashIcon class="size-5 mr-2" />
            Delete
          </Button>
          <Button class="flex items-center" @click="onCancel" :variant="'secondary'">
            <ArrowUturnLeftIcon class="size-5 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
    <div v-if="actions" class="mt-4 flex items-center justify-center gap-x-2 text-orange-500">
      <InformationCircleIcon class="size-5" />
      <span class="text-sm"
        >Lưu ý , có thể chọn nhiều booking để xoá , chỉnh sửa chỉ được phép chọn 1 booking</span
      >
    </div>

    <div class="w-full h-full mt-4">
      <BookingTable
        :headers="userConfigHeaders"
        :data="bookings"
        :username="username"
        :department="department"
        @refresh="refresh"
        ref="tableRef"
      />
    </div>
  </div>
  <Teleport to="body">
    <Modal :open="isModalOpen"> </Modal>
  </Teleport>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Searchbar from '@/components/kits/searchbar/index.vue'
import Button from '@/components/kits/button/index.vue'
import BookingTable from '@/components/kits/table/bookingtable.vue'
import Modal from '@/components/kits/modal/index.vue'
import Select from '@/components/kits/select/index.vue'
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  InformationCircleIcon,
} from '@heroicons/vue/24/outline'
import { ref, computed, onMounted, watch } from 'vue'
import { headers } from './data'
import { permissions } from '@/mockdata'
import { db } from '@/firebase'
import { collection, getDocs, query, where, setDoc, doc, getDoc } from 'firebase/firestore'

const isModalOpen = ref(false)
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
// const username = user.username
const userRole = user.role
// const userDepartment = user.department
const userPermission = permissions.find((permission) => permission.key === userRole).value
const actions = ref(false)
const actionRows = ref([])
const modalVSlot = ref(null)
const tableRef = ref(null)
const bookings = ref([])
const userConfigHeaders = ref([])

const departments = [
  { label: 'Sale', value: 'Sale' },
  { label: 'Cus', value: 'Cus' },
  { label: 'Docs', value: 'Docs' },
  { label: 'Ops', value: 'Ops' },
  { label: 'Acc', value: 'Acc' },
  { label: 'OpsDocs', value: 'OpsDocs' },
]

const department = ref(departments[0].value)
const username = computed(() => {
  if (department.value === 'Sale') return 'sale'
  if (department.value === 'Cus') return 'cus'
  if (department.value === 'Docs') return 'docs'
  if (department.value === 'Ops') return 'ops'
  if (department.value === 'Acc') return 'acc'
  if (department.value === 'OpsDocs') return 'opsdocs'
})

const tbHeaders = computed(() => {
  if (department.value === 'Sale')
    return headers.filter((header) => header.dep === 'Sale' || header.dep === 'all')
  if (department.value === 'Cus')
    return headers.filter((header) => header.dep === 'Cus' || header.dep === 'all')
  if (department.value === 'Docs')
    return headers.filter((header) => header.dep === 'Docs' || header.dep === 'all')
  if (department.value === 'Ops')
    return headers.filter((header) => header.dep === 'Ops' || header.dep === 'all')
  if (department.value === 'Acc')
    return headers.filter((header) => header.dep === 'Acc' || header.dep === 'all')
  if (department.value === 'OpsDocs')
    return headers.filter((header) => header.dep === 'OpsDocs' || header.dep === 'all')
})

const getBookings = async () => {
  try {
    const bk = collection(db, 'bookings')
    const q = query(bk, where('hrSale', '==', username.value))
    const snapshot = await getDocs(q)
    const data = snapshot.docs.map((doc) => {
      let ret = {
        ...doc.data(),
        uid: doc.id,
      }
      return ret
    })
    bookings.value = data
  } catch (error) {
    console.log(error)
  }
}

const onSelect = () => {
  actions.value = true
  userConfigHeaders()
}

const onCancel = () => {
  actions.value = false
  tableRef.value.refreshChecked()
}

const onDelete = () => {
  modalVSlot.value = 'delete'
  isModalOpen.value = true
}

const actionDelete = computed(() => {
  return actionRows.value.filter(Boolean).length > 0
})

const actionModify = computed(() => {
  return actionRows.value.filter(Boolean).length === 1
})

// const setConfigHeaders = async () => {
//   try {
//     const userConfigRef = doc(db, 'userConfig', username.value)
//     const docSnap = await getDoc(userConfigRef)
//     if (docSnap.exists()) {
//       const data = docSnap.data()
//       return data
//     } else {
//       const setHeaders = await setDoc(userConfigRef, {
//         headers: tbHeaders.value,
//       })
//       return setHeaders
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }

const getUserConfig = async () => {
  try {
    const userConfigRef = doc(db, 'userConfig', username.value)
    const docSnap = await getDoc(userConfigRef)
    if (docSnap.exists()) {
      const data = docSnap.data()
      userConfigHeaders.value = data.headers
    } else {
      userConfigHeaders.value = tbHeaders.value
    }
  } catch (error) {
    console.log(error)
  }
}

const refresh = () => {
  getBookings()
}

watch(
  () => username.value,
  () => {
    getUserConfig()
  },
)

onMounted(() => {
  getBookings()
  getUserConfig()
})
</script>
