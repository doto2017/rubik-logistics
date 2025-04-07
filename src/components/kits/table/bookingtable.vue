<template>
  <div
    class="w-full p-2"
    :class="{ 'fixed z-50 bg-white top-0 left-0 h-full overflow-auto': fullScreen }"
  >
    <div class="flex items-center justify-between p-4" v-if="fullScreen">
      <span class="text-md font-semibold text-slate-700"
        >BOOKING: <span class="text-indigo-500 text-md">{{ currBkNo }}</span></span
      >
      <XMarkIcon
        @click="exitFullScreen"
        class="size-5 cursor-pointer text-red-500 bg-red-100 hover:bg-red-200 rounded-md border border-red-500"
      />
    </div>
    <div class="overflow-auto">
      <table class="w-full border border-slate-200">
        <thead>
          <tr class="divide-x divide-slate-200">
            <th
              class="text-left text-sm whitespace-nowrap font-semibold bg-slate-300 text-slate-700 px-4 py-3 group"
            >
              <PencilSquareIcon
                v-if="!headerConfig"
                :style="{ strokeWidth: 2 }"
                @click="editHeader"
                class="size-5 cursor-pointer hover:text-indigo-500"
              />
              <div v-if="headerConfig" class="flex items-center space-x-8">
                <ArrowPathIcon
                  @click="resetHeaderConfig"
                  class="size-5 cursor-pointer text-indigo-500 bg-indigo-100 hover:bg-indigo-200 rounded-md border border-indigo-500"
                />
                <div class="flex items-center space-x-2">
                  <CheckIcon
                    @click="saveHeaderConfig"
                    class="size-5 cursor-pointer text-green-500 bg-green-100 hover:bg-green-200 rounded-md border border-green-500"
                  />
                  <XMarkIcon
                    @click="cancelHeaderConfig"
                    class="size-5 cursor-pointer text-red-500 bg-red-100 hover:bg-red-200 rounded-md border border-red-500"
                  />
                </div>
              </div>
            </th>
            <th
              v-for="header in displayHeaders"
              :key="header.key"
              class="text-left text-sm whitespace-nowrap font-semibold bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 py-3"
            >
              <div class="flex items-center justify-between w-full">
                <span>{{ header.label }}</span>
                <XMarkIcon
                  v-if="headerConfig"
                  @click="hideHeader(header.key)"
                  class="size-5 cursor-pointer ml-10 text-red-500 bg-red-100 hover:bg-red-200 rounded-md border border-red-500"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, idx) in displayData"
            :key="idx"
            @click="rowClickView(row, idx)"
            class="cursor-pointer text-slate-600 border-b border-slate-200 group"
            :class="[
              idx % 2 === 0 ? 'bg-gray-50' : '',
              selectedRowIdx === null ? 'hover:bg-gray-200' : '',
              selectedRowIdx === idx ? 'bg-green-100' : '',
              currRow === idx ? '!bg-green-100' : '',
            ]"
          >
            <td
              class="text-left text-sm p-2 border-r px-4 py-2 whitespace-nowrap border-b border-slate-200 group-hover:border-slate-300"
            >
              <div class="flex items-center">
                <PencilSquareIcon
                  v-if="selectedRowIdx !== idx"
                  @click.stop="editRow(row)"
                  class="size-5 cursor-pointer hover:text-indigo-500"
                />
                <div v-if="selectedRowIdx === idx" class="flex items-center space-x-4">
                  <CheckIcon
                    @click.stop="saveRow(row)"
                    class="size-5 cursor-pointer text-green-500 bg-green-100 hover:bg-green-200 rounded-md border border-green-500"
                  />
                  <XMarkIcon
                    @click.stop="cancelRow()"
                    class="size-5 cursor-pointer text-red-500 bg-red-100 hover:bg-red-200 rounded-md border border-red-500"
                  />
                </div>
              </div>
            </td>
            <td
              v-for="header in displayHeaders"
              :key="header.key"
              class="text-left text-sm p-2 border-r px-4 py-2 whitespace-nowrap border-b border-slate-200 group-hover:border-slate-300"
            >
              <div v-if="selectedRowIdx === null">
                <span v-if="header.key === 'timestamp' || datetimeFields.includes(header.key)">{{
                  row[header.key] ? format(row[header.key], 'dd/MM/yyyy') : ''
                }}</span>
                <input
                  type="checkbox"
                  v-else-if="checkboxFields.includes(header.key)"
                  :checked="row[header.key]"
                  class="size-4"
                  disabled
                />
                <span
                  v-else
                  class="whitespace-nowrap"
                  :class="[
                    header.key.includes('signal') && row[header.key] === 'OK'
                      ? 'text-green-500 font-bold'
                      : '',
                  ]"
                  >{{ row[header.key] || '' }}</span
                >
              </div>
              <div v-else>
                <div v-if="department === 'Sale'">
                  <span v-if="header.key === 'timestamp'">{{
                    row[header.key] ? format(new Date(row[header.key]), 'dd/MM/yyyy') : ''
                  }}</span>
                  <input
                    type="checkbox"
                    v-else-if="checkboxFields.includes(header.key)"
                    :checked="row[header.key]"
                    class="size-4"
                    disabled
                  />
                  <span
                    v-else-if="(header.dep === 'Sale' || header.dep === 'all') && row[header.key]"
                    >{{ row[header.key] || '' }}</span
                  >
                  <input
                    type="text"
                    v-else-if="
                      header.dep === 'Sale' &&
                      !row[header.key] &&
                      !datetimeFields.includes(header.key)
                    "
                    v-model="saveRowState[header.key]"
                    class="px-2 py-1 border border-green-500 rounded-md outline-green-500"
                    :size="saveRowState[header.key]?.length ? saveRowState[header.key]?.length : 10"
                  />
                  <input
                    type="date"
                    v-else-if="header.dep === 'Sale' && datetimeFields.includes(header.key)"
                    v-model="saveRowState[header.key]"
                    class="px-2 py-1 border border-green-500 rounded-md outline-green-500"
                  />
                </div>

                <div v-else>
                  <span v-if="header.key === 'timestamp'">{{
                    row[header.key] ? format(new Date(row[header.key]), 'dd/MM/yyyy') : ''
                  }}</span>
                  <input
                    type="checkbox"
                    v-else-if="checkboxFields.includes(header.key)"
                    class="size-4"
                    v-model="saveRowState[header.key]"
                  />
                  <span v-else-if="header.dep === 'all' && row[header.key]">{{
                    row[header.key] || ''
                  }}</span>
                  <input
                    type="text"
                    v-else-if="header.dep === department && !datetimeFields.includes(header.key)"
                    v-model="saveRowState[header.key]"
                    class="px-2 py-1 border border-green-500 rounded-md outline-green-500"
                    :size="saveRowState[header.key]?.length ? saveRowState[header.key]?.length : 10"
                  />
                  <input
                    type="date"
                    v-else-if="header.dep === department && datetimeFields.includes(header.key)"
                    v-model="saveRowState[header.key]"
                    class="px-2 py-1 border border-green-500 rounded-md outline-green-500"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 border-t border-slate-200" v-if="costView">
      <div class="mt-2" v-if="department !== 'Sale'">
        <span class="text-slate-700 font-semibold">Cost/Billing</span>
        <div class="text-sm text-slate-700 mt-2">
          <span
            class="block font-semibold bg-slate-300 w-fit px-2 py-1 rounded-tl-md rounded-tr-md border-b border-white uppercase text-indigo-500"
            >Buying</span
          >
          <div class="w-full overflow-auto">
            <CostTable
              :headers="costHeaders"
              :data="costBuyingData"
              :edit="costEditFlag"
              ref="costTableBuying"
            />
          </div>
          <div class="flex gap-2 mt-2" v-if="costEditFlag">
            <PlusIcon
              @click="addRow(costBuyingData)"
              class="size-5 cursor-pointer bg-green-100 hover:bg-green-200 text-green-500 rounded-md border border-green-500"
              :style="{ strokeWidth: '3px' }"
            />
            <MinusIcon
              @click="removeRow(costBuyingData)"
              class="size-5 cursor-pointer bg-red-100 hover:bg-red-200 text-red-500 rounded-md border border-red-500"
              :style="{ strokeWidth: '3px' }"
            />
          </div>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center space-x-2" >
          <span
            class="block font-semibold bg-slate-300 w-fit px-2 py-1 rounded-tl-md rounded-tr-md border-b border-white uppercase text-indigo-500"
            >Selling</span
          >
          <button v-if="costEditFlag" @click="importQuotation">
            <BarsArrowDownIcon class="size-5 cursor-pointer text-indigo-500 hover:ring-1 hover:ring-indigo-500 rounded-sm ring-offset-2 hover:bg-indigo-500 hover:text-white" />
          </button>
        </div>
        <div class="w-full overflow-auto">
          <CostTable
            :headers="costHeaders"
            :data="costSellingData"
            :edit="costEditFlag"
            ref="costTableSelling"
          />
        </div>
        <div class="flex gap-2 mt-2" v-if="costEditFlag">
          <PlusIcon
            @click="addRow(costSellingData)"
            class="size-5 cursor-pointer bg-green-100 hover:bg-green-200 text-green-500 rounded-md border border-green-500"
            :style="{ strokeWidth: '3px' }"
          />
          <MinusIcon
            @click="removeRow(costSellingData)"
            class="size-5 cursor-pointer bg-red-100 hover:bg-red-200 text-red-500 rounded-md border border-red-500"
            :style="{ strokeWidth: '3px' }"
          />
        </div>
      </div>
      <div class="mt-4">
        <span
          class="block font-semibold bg-slate-300 w-fit px-2 py-1 rounded-tl-md rounded-tr-md border-b border-white uppercase text-indigo-500"
          >Profit</span
        >
        <div>
          <ProfitTable :booking="viewRow" ref="profitTable" />
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <QuotationImportModal :openDialog="openDialog" @closeDialog="closeDialog" @selectQuotation="selectQuotation" />
  </Teleport>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { PencilSquareIcon, XMarkIcon, CheckIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { db } from '@/firebase'
import { getDoc, setDoc, doc, getDocs, collection } from 'firebase/firestore'
import { toast } from 'vue-sonner'
import { format } from 'date-fns'
import { checkboxFields, datetimeFields } from '@/components/functions/bookings/data'
import CostTable from '@/components/kits/table/cost-input-table.vue'
import ProfitTable from '@/components/kits/table/profit-table.vue'
import { bookingCostFields, bookingCostData } from '@/components/functions/bookings/data'
import { PlusIcon, MinusIcon, BarsArrowDownIcon } from '@heroicons/vue/24/outline'
import QuotationImportModal from '@/components/kits/modal/quotation-import.vue'

const openDialog = ref(false)

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['refresh'])

// const transportType = computed(() => {
//   return ['IA', 'EA', 'IB', 'EB', 'LG'].includes(saveRowState.value.transport)?"AIR":"SEA"
// })

const displayHeaders = ref([])
const savedHeaders = ref([])
const displayData = ref([])
const headerConfig = ref(false)
const selectedRowIdx = ref(null)
const selectedRow = ref(null)
const viewRow = ref(null)
const saveRowState = ref(null)
const costView = ref(false)
const currBkNo = ref(null)
const currRow = ref(null)
const costEditFlag = computed(() => {
  return selectedRowIdx.value === 0 ? true : false
})
const fullScreen = ref(false)
const costHeaders = ref(bookingCostFields())
const costBuyingData = ref([])
const costSellingData = ref([])
const costTableBuying = ref(null)
const costTableSelling = ref(null)

const hideHeader = (key) => {
  savedHeaders.value.find((header) => header.key === key).hidden = true
  displayHeaders.value = displayHeaders.value.filter((header) => header.key !== key)
}

watch(
  () => props.headers,
  () => {
    savedHeaders.value = [...props.headers]
    displayHeaders.value = [...props.headers.filter((header) => !header.hidden)]
  },
)

watch(
  () => props.data,
  () => {
    displayData.value = [...props.data]
  },
)

const editHeader = () => {
  headerConfig.value = true
}

const cancelHeaderConfig = () => {
  try {
    const docRef = doc(db, 'userConfig', props.username)
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        displayHeaders.value = docSnap.data().headers.filter((header) => !header.hidden)
      }
    })
  } catch (error) {
    console.error('Error canceling header config:', error)
    toast.error('Error canceling header config')
  }
  headerConfig.value = false
}

const saveHeaderConfig = async () => {
  try {
    const docRef = doc(db, 'userConfig', props.username)
    await setDoc(docRef, { headers: savedHeaders.value })
    headerConfig.value = false
    toast.success('Header config saved successfully')
  } catch (error) {
    console.error('Error saving header config:', error)
    toast.error('Error saving header config')
  }
}

const resetHeaderConfig = async () => {
  try {
    const docRef = doc(db, 'userConfig', props.username)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const result = docSnap.data().headers.map((header) => ({ ...header, hidden: false }))
      await setDoc(docRef, { headers: result })
      toast.success('Header config reset successfully')
      cancelHeaderConfig()
    }
  } catch (error) {
    console.error('Error resetting header config:', error)
    toast.error('Error resetting header config')
  }
}

const editRow = (row) => {
  viewRow.value = row
  currBkNo.value = row.bkNo
  costView.value = true
  fullScreen.value = true
  selectedRowIdx.value = 0
  selectedRow.value = { ...row }
  saveRowState.value = { ...row }
  costBuyingData.value = row.billingCost?.buying || [bookingCostData()[0]]
  costSellingData.value = row.billingCost?.selling || [bookingCostData()[0]]
  displayData.value = []
  displayData.value.push({ ...selectedRow.value })
}

const saveRow = async () => {
  try {
    let cost = null
    saveRowState.value.billingCost ??= {}

    if(props.department !== 'Sale') {
      cost = costTableBuying.value.getBillingCost()
      saveRowState.value.billingCost.buying = cost
    }
    const sellingCost = costTableSelling.value.getBillingCost()
    saveRowState.value.billingCost.selling = sellingCost
    console.log(saveRowState.value)
    const docRef = doc(db, 'bookings', saveRowState.value.uid)
    await setDoc(docRef, saveRowState.value)
    selectedRowIdx.value = null
    selectedRow.value = null
    displayData.value = [...props.data].map((row) => {
      if (row.uid === saveRowState.value.uid) {
        return saveRowState.value
      }
      return row
    })
    toast.success('Row saved successfully')
    costView.value = false
  } catch (error) {
    console.error('Error saving row:', error)
    toast.error('Error saving row')
  }
}

const cancelRow = () => {
  selectedRowIdx.value = null
  selectedRow.value = null
  emit('refresh')
  exitFullScreen()
}

const addRow = (target) => {
  target.push(bookingCostData()[0])
}

const removeRow = (target) => {
  target.pop()
}

const rowClickView = (row, idx) => {
  viewRow.value = row
  costBuyingData.value = row.billingCost?.buying || []
  costSellingData.value = row.billingCost?.selling || []
  costView.value = true
  currBkNo.value = row.bkNo
  currRow.value = idx
  fullScreen.value = true
  displayData.value = []
  displayData.value.push({ ...row })
}

const exitFullScreen = () => {
  fullScreen.value = false
  costView.value = false
  viewRow.value = null
  currBkNo.value = null
  currRow.value = null
  selectedRowIdx.value = null
  selectedRow.value = null
  saveRowState.value = null
  displayData.value = [...props.data]
}

const importQuotation = () => {
  openDialog.value = true
}

const selectQuotation = (data) => {
  openDialog.value = false
  data.map(item => {
    costSellingData.value.push({
      ...bookingCostData()[0],
      costDesc: item.desc,
      unit: item.unit || null,
      unitPrice: item.cost || null,
      tax: item.vat || null,
      currency: item.currency || null
    })
  })
}
const closeDialog = () => {
  openDialog.value = false
}
</script>
