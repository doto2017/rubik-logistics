<template>
  <table class="w-full relative border border-slate-300">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.key"
          class="text-left font-semibold text-white bg-gray-500 p-2 sticky top-0 z-10"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, idx) in data"
        :key="idx"
        @click="handleRowClick(idx)"
        @dblclick="handleRowDblClick(idx)"
        class="hover:bg-gray-200 cursor-pointer text-slate-700 border-b border-slate-300"
        :class="{ '!bg-indigo-200': itemIdx === idx }"
      >
        <td
          v-for="header in headers"
          :key="header.key"
          class="text-left p-2 border-r border-slate-300"
        >
          {{ row[header.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  headers: {
    type: Array,
    required: true,
    default: () => [],
  },
  clickEvent: {
    type: Boolean,
    default: () => false,
  },
  dblClickEvent: {
    type: Boolean,
    default: () => false,
  },
})

console.log(props.data)

const itemIdx = ref(null)

const emit = defineEmits(['rowClick', 'rowDblClick'])

const handleRowClick = (idx) => {
  if (props.clickEvent) {
    itemIdx.value = idx
    emit('rowClick', idx)
  } else {
    return
  }
}

const handleRowDblClick = (idx) => {
  if (props.dblClickEvent) {
    itemIdx.value = idx
    emit('rowDblClick', idx)
  } else {
    return
  }
}
</script>
