<template>
  <table class="min-w-full border-t-0 border border-gray-300 relative">
    <thead class="sticky top-0 z-10">
      <tr class="bg-slate-300 divide-x divide-gray-200">
        <th v-if="modifiable" scope="col" class="w-10">
          <input
            v-if="selectAllEnable"
            type="checkbox"
            class="scale-125"
            v-model="isAllSelected"
            @change="selectAllToggle"
          />
          <CheckIcon
            v-else
            class="w-5 h-5 bg-gray-100 text-gray-500 p-1 rounded-md scale-110 mx-auto"
          />
        </th>
        <th
          v-for="header in cusHeaders"
          :key="header.key"
          scope="col"
          class="py-3.5 pl-4 pr-6 text-left text-sm font-semibold text-gray-700 w-auto whitespace-nowrap relative group"
        >
          {{ header.key === 'orderNo' ? '' : header.label }}
          <XMarkIcon
            @click="colHidden(header)"
            class="hidden absolute top-1 right-1 text-red-500 border border-red-500 rounded-md bg-red-200 hover:bg-red-300 w-4 h-4 group-hover:block"
          />
          <ChevronUpDownIcon
            v-if="header.key === 'orderNo' && !sortable"
            @click="enableSort"
            class="w-6 h-6 cursor-pointer hover:text-indigo-500 bg-gray-200 p-1 rounded-md scale-110"
          />
          <div
            v-else-if="header.key === 'orderNo' && sortable"
            class="flex items-center justify-center gap-2"
          >
            <CheckIcon
              @click="emit('confirmIdxSort', sortIndex)"
              class="w-6 h-6 text-green-500 bg-white p-1 rounded-md hover:bg-green-500 hover:text-white"
            />
            <XMarkIcon
              @click="emit('rejectIdxSort')"
              class="w-6 h-6 text-red-500 bg-white p-1 rounded-md hover:bg-red-500 hover:text-white"
            />
          </div>
        </th>
      </tr>
    </thead>
    <tbody v-if="data.length > 0" class="divide-y divide-gray-200">
      <tr
        v-for="(row, idx) in data"
        :key="idx"
        @click="rowClicked(row, idx)"
        class="divide-x divide-gray-200 cursor-default"
        :class="{
          '!bg-indigo-100': rowsSelected[idx],
          'bg-gray-50': idx % 2 !== 0,
          'cursor-pointer': rowEvent,
        }"
      >
        <td v-if="modifiable" class="px-4">
          <input
            type="checkbox"
            class="scale-125"
            v-model="rowsSelected[idx]"
            @click.stop
            :disabled="
              selectedCustomers.filter((item) => item !== undefined).length >= pickLimit &&
              !rowsSelected[idx] &&
              isLimited
            "
          />
        </td>
        <td
          v-for="header in cusHeaders"
          :key="header.key"
          class="py-2 pl-4 pr-6 text-left text-sm text-gray-600 w-auto whitespace-nowrap"
          :class="{
            'font-semibold': header.key === 'bkNo',
          }"
        >
          <span v-if="header.key === 'timestamp' || header.key === 'eta'">{{
            new Date(row[header.key]).toLocaleDateString('vi-VN')
          }}</span>
          <span
            v-else-if="checkboxFields.includes(header.key)"
            class="flex items-center justify-center"
          >
            <input type="checkbox" v-model="row[header.key]" class="scale-125" disabled />
          </span>
          <ul v-else-if="header.key === 'picInfo'" class="list-disc p-2">
            <li v-for="pic in row[header.key]" :key="pic.picName">
              {{ pic.picName || '-' }} - {{ pic.picPhone || '-' }} - {{ pic.picEmail || '-' }}
            </li>
          </ul>
          <span v-else>{{ header.key === 'orderNo' && sortable ? '' : row[header.key] }}</span>
          <input
            v-if="sortable && header.key === 'orderNo'"
            type="number"
            class="scale-125 w-14 text-xs px-2 py-1"
            :class="[sortable ? 'border border-gray-500 outline-indigo-500 rounded-md ' : '']"
            v-model="row.orderNo"
            min="0"
            @click.stop
          />
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr>
        <td colspan="100%" class="text-center text-sm text-gray-600 mt-4 p-8">
          <div class="flex items-center justify-center">
            <NoSymbolIcon class="size-5 mr-2 text-red-600" /> Không có dữ liệu
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { NoSymbolIcon, ChevronUpDownIcon, CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { checkboxFields } from '@/components/functions/bookings/data'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  modifiable: {
    type: Boolean,
    default: false,
  },
  rowEvent: {
    type: Boolean,
    default: false,
  },
  sortable: {
    type: Boolean,
    default: false,
  },
  selectAllEnable: {
    type: Boolean,
    default: false,
  },
  isLimited: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'onRowClick',
  'enableSort',
  'confirmIdxSort',
  'rejectIdxSort',
  'warningPickLimit',
])

const isAllSelected = ref(false)
const rowsSelected = ref(new Array(props.data.length).fill(false))
const selectedCustomers = ref([])
const pickLimit = ref(5)
const cusHeaders = ref([])
const cusData = ref([])

cusHeaders.value = [...props.headers]
cusData.value = [...props.data]

watch(rowsSelected.value, (newVal) => {
  selectedCustomers.value = props.data.filter((item, idx) => {
    if (newVal[idx]) {
      return item
    }
  })
  if (props.isLimited) {
    if (
      selectedCustomers.value.length > 0 &&
      selectedCustomers.value.filter((item) => item !== undefined).length < pickLimit.value
    ) {
      emit('onRowClick', selectedCustomers.value)
    } else if (
      selectedCustomers.value.length > 0 &&
      selectedCustomers.value.filter((item) => item !== undefined).length === pickLimit.value
    ) {
      emit('onRowClick', selectedCustomers.value)
      emit('warningPickLimit', pickLimit.value)
    } else {
      return
    }
  } else {
    emit('onRowClick', selectedCustomers.value)
  }
})

const selectAllToggle = () => {
  rowsSelected.value.fill(isAllSelected.value)
  emit('onRowClick', selectedCustomers.value)
}

const sortIndex = computed(() => {
  return props.data.map((row, idx) => row.orderNo)
})

const refreshChecked = () => {
  rowsSelected.value.fill(false)
}

defineExpose({
  refreshChecked,
})

const rowClicked = (row) => {
  if (props.rowEvent) {
    emit('onRowClick', row)
  } else return
}

const enableSort = () => {
  if (props.rowEvent) {
    emit('enableSort', props.data)
  } else return
}

const colHidden = (col) => {
  const retCol = cusHeaders.value.filter((item) => {
    if (item.key !== col.key) {
      return item
    }
  })
  cusHeaders.value = retCol
  const retData = cusData.value.filter((item) => {
    if (item.key !== col.key) {
      return item
    }
  })
  cusData.value = retData
}

watch(
  () => props.headers,
  (newHeaders) => {
    cusHeaders.value = [...newHeaders]
  },
  { deep: true },
)

watch(
  () => props.data,
  (newData) => {
    cusData.value = [...newData]
  },
  { deep: true },
)
</script>
