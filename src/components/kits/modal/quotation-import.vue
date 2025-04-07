<template>
    <div v-if="openDialog" class=" z-1000 h-screen w-screen bg-gray-700 bg-opacity-70 p-4 flex justify-center items-center gap-y-4 absolute top-0 left-0">
        <div class="min-h-64 min-w-[480px] bg-gray-100 rounded-md p-4 shadow-md flex flex-col gap-y-4 w-full h-full text-slate-700">
            <div class="flex justify-between">
                <h1 class="text-2xl font-bold text-slate-700">Quotation Import</h1>
                <button @click="closeDialog" class="hover:bg-red-200 rounded-full p-1">
                    <XMarkIcon class="w-6 h-6 text-red-600" />
                </button>
            </div>
            <div class="flex flex-col gap-2 flex-1">
                <div v-if="isLoading">
                    <Loading class="w-10 h-10 text-indigo-600" />
                </div>
                <div v-else class="w-full min-h-32 max-h-[400px] overflow-y-auto">
                    <Table
                        :data="data"
                        :headers="headers"
                        :rowEvent="true"
                        @selectRow="handleRowClick"
                    />
                </div>
                <div class="mt-4 border-t border-slate-300 p-2" v-if="currRow">
                  <span class="text-sm text-slate-700">Quotation <span class="font-bold text-indigo-600">{{ currRow?.quotationNo }}</span> information</span>
                  <Table
                    :data="currData"
                    :headers="currHeaders"
                    :rowEvent="true"
                    @selectRow="handleRowClick"
                    class="mt-2"
                  />
                </div>
            </div>
            <div class="flex justify-end mt-4">
                <button class="bg-indigo-600 text-white px-4 py-2 rounded-md" @click="importQuotation">
                    Select
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, watch, computed } from 'vue'
    import { XMarkIcon } from '@heroicons/vue/24/outline'
    import Table from '@/components/kits/table/select-quotation.vue'
    import Loading from '@/components/icons/loading.vue'
    import { db } from '@/firebase'
    import { collection, getDocs, query } from 'firebase/firestore'
    
    const props = defineProps({
        openDialog: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['closeDialog', 'selectQuotation'])

    const isLoading = ref(false)
    const data = ref([])
    const headers = [
    {
      label: 'Quotation No',
      key: 'quotationNo',
    },
    {
      label: 'Customer',
      key: 'customer',
    },
    {
      label: 'Terms',
      key: 'terms',
    },
    {
      label: 'Shipper',
      key: 'shipper',
    },
    {
      label: 'Consignee',
      key: 'consignee',
    },
    {
      label: 'Modify',
      key: 'modify',
    },
    {
      label: 'Created At',
      key: 'dateOfQ',
    },
    {
      label: 'Valid Until',
      key: 'validIn',
    },
    {
      label: 'Creator',
      key: 'creator',
    },
  ]

  const currRow = ref(null)
  const currHeaders = [
    { label: 'Description', key: 'desc'},
    { label: 'Unit', key: 'unit'},
    { label: 'Unit Price', key: 'cost'},
    { label: 'Tax(%)', key: 'vat'},
  ]

  const currData = computed(() => {
    let ret = []
    if (currRow.value) {
      if (currRow.value.airfreight) {
        currRow.value.airfreight.forEach(item => {
          ret.push({
            desc: 'Air Freight',
            unit: item.unit || null,
            cost: item.cost || null,
            vat: item.vat || null,
            currency: item.currency || null
          })
        })
      }
      if (currRow.value.seaFreight) {
        currRow.value.seaFreight.forEach(item => {
          ret.push({
            desc: 'Sea Freight',
            unit: item.unit || null,
            cost: item.cost || null,
            vat: item.vat || null,
            currency: item.currency || null
          })
        })
      }
      if (currRow.value.localcharge) {
        currRow.value.localcharge.forEach(item => {
          ret.push({
            desc: item.desc,
            unit: item.unit || null,
            cost: item.cost || null,
            vat: item.vat || null,
            currency: item.currency || null
          })
        })
      }
      if (currRow.value.othercharges) {
        currRow.value.othercharges.forEach(item => {
          ret.push({
            desc: item.desc,
            unit: item.unit || null,
            cost: item.cost || null,
            vat: item.vat || null,
            currency: item.currency || null
          })
        })
      }
      if (currRow.value.disbursementfee) {
        currRow.value.disbursementfee.forEach(item => {
          ret.push({
            desc: item.desc,
            unit: item.unit || null,
            cost: item.cost || null,
            vat: item.vat || null,
            currency: item.currency || null
          })
        })
      }
    }
    return ret
  })

  const fetchData = async () => {
    isLoading.value = true
    const q = query(collection(db, 'quotations'))
    const snapshot = await getDocs(q)
    data.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    isLoading.value = false
  }

    const closeDialog = () => {
        emit('closeDialog')
    }

    const handleRowClick = (row) => {
      currRow.value = row
    }

    const importQuotation = () => {
      emit('selectQuotation', currData.value)
    }
    
    watch(() => props.openDialog, (newVal) => {
      if (newVal) {
        fetchData()
      }
    })
    
    onMounted(() => {
      if (props.openDialog) {
        fetchData()
      }
    })
  
</script>
