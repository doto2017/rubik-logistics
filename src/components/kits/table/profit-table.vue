<template>
  <div class="w-full">
    <table class="w-full border border-slate-400">
      <thead class="divide-y divide-slate-400 text-sm border-b border-slate-400">
        <tr
          v-for="(header, idx) in headers"
          :key="idx"
          class="divide-x divide-slate-400 text-sm"
          :class="idx === 0 ? 'bg-slate-300' : 'bg-slate-200'"
        >
          <th
            v-for="(cell, cellIdx) in header"
            :key="cell.key"
            class="text-slate-600 px-1 py-2"
            :colspan="cell.key === 'polpod' || cell.key === 'etdeta' ? 3 : 1"
          >
            {{ cell.label }}
          </th>
        </tr>
      </thead>

      <!-- 1st section table -->
      <tbody class="text-sm text-center bg-yellow-50">
        <tr class="divide-x divide-slate-400 text-sm border-b border-slate-400">
          <td class="text-slate-600 px-1 py-2">{{ booking.fileNo || '' }}</td>
          <td class="text-slate-600 px-1 py-2">{{ booking.obl || '' }}</td>
          <td class="text-slate-600 px-1 py-2">{{ booking.agent || '' }}</td>
          <td class="text-slate-600 px-1 py-2">{{ booking.vessel || '' }}</td>
          <td class="text-slate-600 px-1 py-2">{{ booking.voy || '' }}</td>
          <td colspan="3" class="text-slate-600 px-1 py-2">
            {{ `${booking.pol || ''} - ${booking.pod || ''}` }}
          </td>
          <td colspan="3" class="text-slate-600 px-1 py-2">
            {{
              `${booking.etd ? formatDate(booking.etd) : ''} - ${booking.eta ? formatDate(booking.eta) : ''}`
            }}
          </td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
        </tr>
        <tr
          v-for="cost in costBuying"
          :key="cost.key"
          class="divide-x divide-slate-400 text-sm"
        >
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ cost.costDesc || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ vndCurrency(cost.unitPrice) || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ vndCurrency((cost.tax * cost.unitPrice) / 100) || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">{{ cost.roe || '' }}</td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ cost.currency || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ cost.postingDate ? formatDate(cost.postingDate) : '' }}
          </td>
        </tr>
        <tr
          v-for="cost in costSelling"
          :key="cost.key"
          class="divide-x divide-slate-400 text-sm"
        >
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ cost.costDesc || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ vndCurrency(cost.unitPrice) || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ vndCurrency((cost.tax * cost.unitPrice) / 100) || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">{{ cost.roe || '' }}</td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ cost.currency || '' }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400">
            {{ cost.postingDate ? formatDate(cost.postingDate) : '' }}
          </td>
        </tr>
        <tr class="text-sm border-t border-slate-400 bg-blue-100">
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400">Sub total</td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400 font-semibold">
            {{ vndCurrency(subTotalBuying) }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400 font-semibold">
            {{ vndCurrency(subTotalBuyingTax) }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400 font-semibold">
            {{ vndCurrency(subTotalSelling) }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400 font-semibold">
            {{ vndCurrency(subTotalSellingTax) }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
        </tr>
        <tr class="text-sm border-t border-slate-400 bg-blue-200">
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400">Sub balance</td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400 font-semibold">
            {{ vndCurrency(subTotalSelling - subTotalBuying) }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400 font-semibold">
            {{ vndCurrency(subTotalSellingTax - subTotalBuyingTax) }}
          </td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
          <td class="text-slate-600 px-1 py-2 border-b border-r border-slate-400"></td>
        </tr>
      </tbody>

      <!-- 2nd section table -->
      <tbody class="divide-y divide-slate-200 text-sm"></tbody>

      <!-- 3rd section table -->
      <tbody class="divide-y divide-slate-200 text-sm"></tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { formatDate, vndCurrency } from '@/utils'

const headers = ref([
  [
    { key: 'fileNo', label: 'File No.(Svc)' },
    { key: 'obl', label: 'O.B/L' },
    { key: 'agent', label: 'Agent' },
    { key: 'vslFlight', label: 'Vsl./Flight' },
    { key: 'voy', label: 'Voy' },
    { key: 'polpod', label: 'POL/POL' },
    { key: 'etdeta', label: 'ETD/ETA' },
    { key: 'nulsdfgl', label: '' },
    { key: 'nullsdfg', label: '' },
  ],
  [
    { key: 'carrier', label: 'Carrier' },
    { key: 'hbl', label: 'H.B/L' },
    { key: 'shipperConsignee', label: 'Shipper/Cnee' },
    { key: 'volume', label: 'Volume' },
    { key: 'charge', label: 'Charge' },
    { key: 'buying', label: 'Buying' },
    { key: 'vatBuying', label: '+VAT' },
    { key: 'roeBuying', label: 'ROE' },
    { key: 'selling', label: 'Selling' },
    { key: 'vatSelling', label: '+VAT' },
    { key: 'roeSelling', label: 'ROE' },
    { key: 'currency', label: 'Currency' },
    { key: 'postingDate', label: 'Posting Date' },
  ],
])

const props = defineProps({
  booking: {
    type: Object,
    default: () => ({}),
  },
})

const costBuying = computed(() => {
  return props.booking.billingCost?.buying || []
})

const subTotalBuying = computed(() => {
  return costBuying.value.reduce((total, cost) => {
    return total + (cost.unitPrice || 0)
  }, 0)
})

const subTotalBuyingTax = computed(() => {
  return costBuying.value.reduce((total, cost) => {
    return total + ((cost.tax * cost.unitPrice) / 100 || 0)
  }, 0)
})

const costSelling = computed(() => {
  return props.booking.billingCost?.selling || []
})

const subTotalSelling = computed(() => {
  return costSelling.value.reduce((total, cost) => {
    return total + (cost.unitPrice || 0)
  }, 0)
})

const subTotalSellingTax = computed(() => {
  return costSelling.value.reduce((total, cost) => {
    return total + ((cost.tax * cost.unitPrice) / 100 || 0)
  }, 0)
})
</script>
