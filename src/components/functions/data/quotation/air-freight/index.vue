<template>
  <div class="h-full w-full bg-white p-4 flex flex-col gap-y-4 relative">
    <div class="flex justify-between mt-4">
      <h1 class="text-2xl font-bold text-slate-700">Air Freight Quotation</h1>
      <div class="flex items-center gap-x-4">
        <button
          class="flex items-center gap-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-md duration-300 shadow-sm"
        >
          <PaperAirplaneIcon class="w-6 h-6" />
          Internal Booking
        </button>
        <button
          @click="handlePrint"
          class="flex items-center gap-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-md duration-300 shadow-sm"
        >
          <PrinterIcon class="w-6 h-6" />
          Print
        </button>
        <button
          class="flex items-center gap-x-2 bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded-md duration-300 shadow-sm"
          @click="handleSave"
        >
          <CheckCircleIcon class="w-6 h-6" />
          Save
        </button>
        <button
          @click="closeModal"
          class="flex items-center gap-x-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md duration-300 shadow-sm"
        >
          <XCircleIcon class="w-6 h-6" />
          Cancel
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-y-4 flex-1 overflow-auto">
      <div class="flex flex-col gap-y-2 p-2 rounded-md">
        <span class="font-bold text-slate-700 text-lg">Thông tin chứng từ</span>
        <div class="grid grid-cols-4 gap-x-6 gap-y-2 bg-gray-100 p-2 rounded-md">
          <div v-if="quotation.qNo">
            <span class="text-sm font-semibold text-slate-900">Quotation No.</span>
            <input
              type="text"
              class="w-full border border-slate-300 rounded-md px-2 h-8 outline-indigo-500 text-slate-700"
              disabled
              :value="quotation.qNo"
            />
          </div>
          <div class="col-span-2">
            <span class="text-sm font-semibold text-slate-900">Customer</span>
            <div class="flex items-center gap-x-2 border border-slate-300 rounded-md h-8 bg-white">
              <input
                type="text"
                class="w-full text-slate-700 outline-none px-2 bg-white"
                v-model="customer"
                disabled
              />
              <button
                @click="handleFetch('customer')"
                class="h-full hover:bg-gray-300 px-2 rounded-r-md bg-gray-200"
              >
                <UserGroupIcon class="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Customer Tel/Fax</span>
            <input
              type="text"
              class="w-full border border-slate-300 bg-white rounded-md px-2 h-8 outline-indigo-500 text-slate-700"
              v-model="customerPhone"
              disabled
            />
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Commondity</span>
            <div class="flex items-center gap-x-2 border border-slate-300 rounded-md h-8 bg-white">
              <input
                type="text"
                class="w-full text-slate-700 outline-none px-2"
                v-model="commondity"
              />
              <button
                @click="handleFetch('commondity')"
                class="h-full hover:bg-gray-300 px-2 rounded-r-md bg-gray-200"
              >
                <ShoppingCartIcon class="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">PIC</span>
            <input
              v-model="PICName"
              type="text"
              class="w-full border border-slate-300 rounded-md px-2 h-8 outline-indigo-500 text-slate-700"
            />
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Shipper</span>
            <div class="flex items-center gap-x-2 border border-slate-300 rounded-md h-8 bg-white">
              <input
                type="text"
                class="w-full text-slate-700 outline-none px-2 bg-white"
                v-model="shipper"
                disabled
              />
              <button
                @click="handleFetch('shipper')"
                class="h-full hover:bg-gray-300 px-2 rounded-r-md bg-gray-200"
              >
                <GlobeAltIcon class="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Consignee</span>
            <div class="flex items-center gap-x-2 border border-slate-300 rounded-md h-8 bg-white">
              <input
                type="text"
                class="w-full text-slate-700 outline-none px-2 bg-white"
                v-model="consignee"
                disabled
              />
              <button
                @click="handleFetch('consignee')"
                class="h-full hover:bg-gray-300 px-2 rounded-r-md bg-gray-200"
              >
                <UserIcon class="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Term</span>
            <input
              v-model="term"
              type="text"
              class="w-full border border-slate-300 rounded-md px-2 h-8 outline-indigo-500 text-slate-700"
            />
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Date of Q</span>
            <input
              v-model="dateOfQ"
              type="date"
              class="w-full border border-slate-300 rounded-md px-2 h-8 outline-indigo-500 text-slate-700"
            />
          </div>
          <div>
            <span class="text-sm font-semibold text-slate-900">Valid In</span>
            <input
              v-model="validIn"
              type="date"
              class="w-full border border-slate-300 rounded-md px-2 h-8 outline-indigo-500 text-slate-700"
            />
          </div>
        </div>
      </div>
      <div class="flex items-end gap-x-8 bg-gray-100 p-2 rounded-md">
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-slate-900">Unit Charge</span>
          <Select :options="chargePerOptions" v-model="containerType" />
        </div>
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-x-2">
            <input
              type="radio"
              id="selling"
              name="buy-sell"
              checked
              class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 scale-125 mt-1"
            />
            <label for="selling" class="text-sm font-semibold text-slate-900">Selling</label>
          </div>
          <div class="flex items-center gap-x-2">
            <input
              type="radio"
              id="buying"
              name="buy-sell"
              class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 scale-125 mt-1"
            />
            <label for="buying" class="text-sm font-semibold text-slate-900">Buying</label>
          </div>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-slate-900">Conversion Rate</span>
          <input
            type="number"
            class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 min-w-24 w-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            v-model="transferRate"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-slate-900">GW</span>
          <input
            type="number"
            class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 min-w-24 w-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            v-model="gw"
          />
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-slate-900">CW</span>
          <input
            type="number"
            class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 min-w-24 w-28 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            v-model="cw"
          />
        </div>
        <div class="flex flex-col justify-between gap-y-2">
          <div class="flex items-center gap-x-2 w-full">
            <input
              type="checkbox"
              id="nominate"
              class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 scale-125 mt-1"
            />
            <label for="nominate" class="text-sm font-semibold text-slate-900"
              >Nominated Shipment</label
            >
          </div>
          <div class="flex items-center gap-x-2 w-full">
            <input
              type="checkbox"
              id="general"
              class="border border-slate-300 rounded-md px-2 py-1 outline-indigo-500 text-slate-700 scale-125 mt-1"
            />
            <label for="general" class="text-sm font-semibold text-slate-900">General Mode</label>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <span class="font-bold text-slate-700 text-lg">Air Freight</span>
        <div class="w-full overflow-auto">
          <SecondaryTable
            :headers="airfreightHeaders"
            :data="airFreightRows"
            :type="'airFreight'"
          />
          <div class="flex items-center gap-x-2 py-2">
            <button
              @click="handleAddRow('airFreight')"
              class="bg-indigo-500 hover:bg-indigo-600 text-white p-1 rounded-md duration-300 shadow-sm mt-2"
            >
              <PlusIcon class="w-4 h-4" />
            </button>
            <button
              @click="handleDeleteRow('airFreight')"
              class="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md duration-300 shadow-sm mt-2"
            >
              <MinusIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <span class="font-bold text-slate-700 text-lg">Local Charges</span>
        <div class="w-full overflow-auto">
          <SecondaryTable
            :headers="localChargesHeaders"
            :data="localChargesRows"
            :type="'localCharges'"
          />
          <div class="flex items-center gap-x-2 py-2">
            <button
              @click="handleAddRow('localCharges')"
              class="bg-indigo-500 hover:bg-indigo-600 text-white p-1 rounded-md duration-300 shadow-sm mt-2"
            >
              <PlusIcon class="w-4 h-4" />
            </button>
            <button
              @click="handleDeleteRow('localCharges')"
              class="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md duration-300 shadow-sm mt-2"
            >
              <MinusIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-y-2">
        <span class="font-bold text-slate-700 text-lg">Inland Charges</span>
        <div class="w-full overflow-auto">
          <SecondaryTable
            :headers="otherChargesHeaders"
            :data="otherChargesRows"
            :type="'otherCharges'"
          />
          <div class="flex items-center gap-x-2 py-2">
            <button
              @click="handleAddRow('otherCharges')"
              class="bg-indigo-500 hover:bg-indigo-600 text-white p-1 rounded-md duration-300 shadow-sm mt-2"
            >
              <PlusIcon class="w-4 h-4" />
            </button>
            <button
              @click="handleDeleteRow('otherCharges')"
              class="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md duration-300 shadow-sm mt-2"
            >
              <MinusIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Dialog :open="openDialog" @close="closeDialog" :target="target" @select="handleSelect" />
    <QuotationForm
      v-if="openQuotationForm"
      @cancelExportQuotation="handleCancel"
      :data="airFreightQuotationObject"
      :quotationType="'air'"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import {
  XCircleIcon,
  CheckCircleIcon,
  PrinterIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  ShoppingCartIcon,
  GlobeAltIcon,
  UserIcon,
  PlusIcon,
  MinusIcon,
} from '@heroicons/vue/24/outline'
import Select from '@/components/kits/select/index.vue'
import SecondaryTable from '@/components/kits/table/secondary.vue'
import Dialog from '@/components/kits/modal/dialog.vue'
import QuotationForm from '@/components/functions/bookings/quotation-form/type3/index.vue'
import {
  headersLocalCharges,
  dataLocalCharges,
  headersAirFreight,
  dataAirFreight,
  headersOtherCharges,
  dataOtherCharges,
} from './index.js'
import {
  customers,
  commondities,
  shippers,
  consignees,
} from '@/components/functions/data/quotation/index.js'
import { unitPriceOptions, chargePerOptions } from '@/components/functions/bookings/edit/index.js'
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { toast } from 'vue-sonner'
const props = defineProps({
  quotation: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['closeModal', 'print'])

const customer = ref(props.quotation.customer ? props.quotation.customer : null)
const customerMST = ref(props.quotation.customerMST ? props.quotation.customerMST : null)
const customerPhone = ref(props.quotation.customerPhone ? props.quotation.customerPhone : null)
const commondity = ref(props.quotation.commondity ? props.quotation.commondity : null)
const shipper = ref(props.quotation.shipper ? props.quotation.shipper : null)
const consignee = ref(props.quotation.consignee ? props.quotation.consignee : null)
const containerType = ref(
  props.quotation.containerType ? props.quotation.containerType : chargePerOptions[0].value,
)
const transferRate = ref(null)
const cw = ref(null)
const gw = ref(null)
const openDialog = ref(false)
const target = ref('')
const openQuotationForm = ref(false)
const airfreightHeaders = ref(headersAirFreight())
const localChargesHeaders = ref(headersLocalCharges())
const otherChargesHeaders = ref(headersOtherCharges())
const validIn = ref(props.quotation.validIn ? props.quotation.validIn : null)
const dateOfQ = ref(
  props.quotation.dateOfQ ? props.quotation.dateOfQ : format(new Date(), 'yyyy-MM-dd'),
)
const PICName = ref(props.quotation.PICName ? props.quotation.PICName : null)
const PICPhone = ref(props.quotation.PICPhone ? props.quotation.PICPhone : null)
const PICEmail = ref(props.quotation.PICEmail ? props.quotation.PICEmail : null)
const term = ref(props.quotation.term ? props.quotation.term : null)

const airFreightRows = ref(props.quotation.airfreight ? props.quotation.airfreight : [])
const localChargesRows = ref(props.quotation.localcharge ? props.quotation.localcharge : [])
const otherChargesRows = ref(props.quotation.othercharges ? props.quotation.othercharges : [])
const user = localStorage.getItem('user')
const username = ref(user ? JSON.parse(user).username : null)

const handleFetch = (tg) => {
  openDialog.value = true
  target.value = tg
}

const closeDialog = () => {
  openDialog.value = false
  target.value = ''
}

const closeModal = () => {
  emit('closeModal')
}

const handleSelect = (data) => {
  if (target.value === 'customer') {
    customer.value = data.name
    customerMST.value = data.mst
    customerPhone.value = data.phone
    PICName.value = data.PICName
    PICPhone.value = data.PICPhone
    PICEmail.value = data.PICEmail
    console.log(data)
  } else if (target.value === 'commondity') {
    commondity.value = data.name
    console.log(commondity.value)
  } else if (target.value === 'shipper') {
    shipper.value = data.name
  } else if (target.value === 'consignee') {
    consignee.value = data.name
  }
}

const handleSave = () => {
  handleSaveQuotation()
  emit('closeModal')
}

const handlePrint = () => {
  openQuotationForm.value = true
}

const handleCancel = () => {
  openQuotationForm.value = false
}

const handleAddRow = (type) => {
  if (type === 'airFreight') {
    airFreightRows.value.push(dataAirFreight()[0])
    console.log(airFreightRows.value)
  } else if (type === 'localCharges') {
    localChargesRows.value.push(dataLocalCharges()[0])
    console.log(localChargesRows.value)
  } else if (type === 'otherCharges') {
    otherChargesRows.value.push(dataOtherCharges()[0])
    console.log(otherChargesRows.value)
  }
}

const handleDeleteRow = (type) => {
  if (type === 'airFreight') {
    airFreightRows.value.pop()
  } else if (type === 'localCharges') {
    localChargesRows.value.pop()
  } else if (type === 'otherCharges') {
    otherChargesRows.value.pop()
  }
}

const airFreightQuotationObject = computed(() => ({
  airfreight: airFreightRows.value||[],
  localcharge: localChargesRows.value||[],
  othercharges: otherChargesRows.value||[],
  product: commondity.value||null,
  containerType: containerType.value||null,
  transferRate: transferRate.value||null,
  gw: gw.value||null,
  cw: cw.value||null,
  validIn: validIn.value||null,
  dateOfQ: dateOfQ.value||null,
  PICName: PICName.value||null,
  PICPhone: PICPhone.value||null,
  PICEmail: PICEmail.value||null,
  customer: customer.value||null,
  customerMST: customerMST.value||null,
  customerPhone: customerPhone.value||null,
  shipper: shipper.value||null,
  consignee: consignee.value||null,
  term: term.value||null,
}))

const quotationCollection = collection(db, 'quotations')

const handleSaveQuotation = async () => {
  try {
    const ts = new Date().getTime()
    await addDoc(quotationCollection, {
      ...airFreightQuotationObject.value,
      timestamp: ts,
      quotationType: 'air',
      quotationNo: `QAF${ts}`,
      creator: username.value,
      origin: airFreightQuotationObject.value.airfreight[0]?.origin||null,
      destination: airFreightQuotationObject.value.airfreight[0]?.destination||null,
    })
    toast.success('Quotation saved successfully')
  } catch (error) {
    toast.error('Error saving quotation:', error.message)
    console.log(error)
  }
}
</script>
