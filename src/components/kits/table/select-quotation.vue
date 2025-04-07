<template>
    <div class="w-full h-full overflow-auto">
        <table class="w-full border border-slate-300 text-sm">
            <thead class="border-b border-slate-300">
                <tr class="bg-slate-200 text-left divide-x divide-slate-300">
                    <th v-for="header in headers" :key="header.key" class="px-2 py-1">{{ header.label }}</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-300">
                <tr v-for="(row, idx) in data" :key="idx" @click="handleRowClick(row)" class="cursor-pointer divide-x divide-slate-300 hover:bg-gray-200" :class="{ '!bg-green-200': row === currentRow }">
                    <td v-for="header in headers" :key="header.key" class="px-2 py-1">{{ row[header.key] }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    rowEvent: {
      type: Boolean,
      default: false
    }
  })
const emit = defineEmits(['selectRow'])
const currentRow = ref(null)

const handleRowClick = (row) => {
  if (props.rowEvent) {
    currentRow.value = row
    emit('selectRow', row)
  }
}
</script>