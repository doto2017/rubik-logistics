<template>
  <div>
    <table class="w-full border border-slate-300">
      <thead>
        <tr class="divide-x divide-slate-100 text-sm">
          <th
            v-for="header in headers"
            :key="header.key"
            class="text-left text-sm whitespace-nowrap font-semibold bg-slate-300 text-slate-700 px-4 py-3 min-w-[100px]"
          >
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody class="text-sm text-slate-700">
        <tr
          v-for="(row, idx) in rows"
          :key="idx"
          class="divide-x divide-slate-200 border-b border-slate-200"
        >
          <td v-for="header in headers" :key="header.key" class="h-8 px-2 py-1">
            <div v-if="edit">
              <input
                v-if="
                  !numberFields.includes(header.key) &&
                  !checkFields.includes(header.key) &&
                  !dateFields.includes(header.key) &&
                  header.key !== 'total' &&
                  header.key !== 'currency' &&
                  header.key !== 'unit'
                "
                type="text"
                v-model="row[header.key]"
                class="bg-white h-full px-2 py-1 outline-indigo-500 rounded-sm hover:border-2 hover:border-indigo-500"
                :size="row[header.key]?.length ? row[header.key]?.length : 10"
              />
              <span
                v-else-if="header.key === 'total'"
                class="bg-white max-w-[120px] h-full px-2 py-1 outline-indigo-500 rounded-sm hover:border-2 hover:border-indigo-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:appearance-none"
              >
                {{
                  formatNumber(
                    row.tax
                      ? (1 + parseFloat(row.tax) / 100) * parseFloat(row.unitPrice)
                      : row.unitPrice,
                  )
                }}
              </span>
              <Select
                v-else-if="header.key === 'currency'"
                :options="unitPriceOptions"
                v-model="row[header.key]"
                class="bg-white w-full h-full outline-indigo-500 rounded-sm"
              />
              <Select
                v-else-if="header.key === 'unit'"
                :options="chargePerOptions"
                v-model="row[header.key]"
                class="bg-white w-full h-full outline-indigo-500 rounded-sm"
              />
              <input
                v-else-if="checkFields.includes(header.key)"
                type="checkbox"
                v-model="row[header.key]"
                class="size-4 ml-2"
              />
              <input
                v-else-if="dateFields.includes(header.key)"
                type="date"
                v-model="row[header.key]"
                class="bg-white w-full h-full px-2 py-1 outline-indigo-500 rounded-sm hover:border-2 hover:border-indigo-500"
              />
              <input
                v-else-if="numberFields.includes(header.key)"
                type="number"
                v-model="row[header.key]"
                :disabled="header.key === 'total'"
                class="bg-white max-w-[120px] h-full px-2 py-1 outline-indigo-500 rounded-sm hover:border-2 hover:border-indigo-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-number-spin-box]:appearance-none"
              />
            </div>
            <div v-else>
              <input
                v-if="checkFields.includes(header.key)"
                type="checkbox"
                v-model="row[header.key]"
                disabled
                class="size-4 ml-2"
              />
              <span v-else-if="header.key === 'total'">
                {{
                  formatNumber(
                    row.tax
                      ? (1 + parseFloat(row.tax) / 100) * parseFloat(row.unitPrice)
                      : row.unitPrice,
                  )
                }}
              </span>
              <span
                v-else-if="numberFields.includes(header.key)"
                class="whitespace-nowrap"
                :class="[
                  header.key === 'quantity' || header.key === 'unitPrice' ? 'block text-right' : '',
                ]"
                >{{ formatNumber(row[header.key]) }}</span
              >
              <span v-else class="whitespace-nowrap">{{ row[header.key] }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import { formatNumber } from '@/utils'
import Select from '@/components/kits/select/index.vue'
import { unitPriceOptions, chargePerOptions } from '@/components/functions/bookings/edit'

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  edit: {
    type: Boolean,
    default: () => false,
  },
})

const rows = ref(props.data)
const numberFields = ['quantity', 'tax', 'unitPrice']
const checkFields = ['pp', 'ob', 'edit', 'noRev']
const dateFields = ['finishDate']

const getBillingCost = () => {
  console.log(rows.value)
  return rows.value
}

defineExpose({getBillingCost})

watch(
  () => props.data,
  () => {
    rows.value = props.data
  },
)
</script>
