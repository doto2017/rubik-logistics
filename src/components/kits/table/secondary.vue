<template>
  <table class="w-full bg-white">
    <thead>
      <tr class="bg-gray-200 border border-slate-300">
        <th
          v-for="header in headers"
          :key="header.key"
          class="p-2 border-r border-slate-300 min-w-12 font-semibold text-slate-700 text-sm"
          :class="[
            header.key === 'PORcpt' || header.key === 'PODel'
              ? '!max-w-none whitespace-nowrap'
              : '',
          ]"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, idx) in rows" :key="idx" class="border border-slate-300">
        <td
          v-for="header in headers"
          :key="header.key"
          class="p-2 text-sm border-r border-slate-300"
          :class="[header.key === 'unit' ? 'flex items-center' : '']"
        >
          <Select
            v-if="header.key === 'currency'"
            v-model="row[header.key]"
            :options="unitPriceOptions"
            class="min-w-20"
          />
          <Select
            v-else-if="header.key === 'unit'"
            v-model="row[header.key]"
            :options="chargePerOptions"
            class="min-w-32"
          />
          <input
            v-else-if="header.key === 'gw' || header.key === 'vat' || header.key === 'cost'"
            type="number"
            v-model="row[header.key]"
            class="outline-none focus:outline-indigo-500 hover:outline-indigo-500 read-only:outline-none text-slate-700"
            :size="row[header.key]?.length ? row[header.key]?.length : 18"
            :class="[
              header.key === 'gw' || header.key === 'vat' || header.key === 'cost'
                ? 'w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                : '',
            ]"
          />
          <input
            v-else-if="header.key === 'ob'"
            type="checkbox"
            v-model="row[header.key]"
            class="scale-125"
          />
          <input
            v-else
            type="text"
            v-model="row[header.key]"
            class="outline-none focus:outline-indigo-500 hover:outline-indigo-500 read-only:outline-none text-slate-700"
            :size="row[header.key]?.length ? row[header.key]?.length : 18"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { reactive } from 'vue'
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
  type: {
    type: String,
    required: true,
  },
})

const rows = reactive(props.data)
</script>
