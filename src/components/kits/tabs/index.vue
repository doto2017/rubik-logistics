<!-- Tabs.vue -->
<template>
  <div class="w-full">
    <!-- Tab Headers -->
    <div class="border-b border-slate-200 space-x-[2px]">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="px-2 py-1 bg-slate-300 text-sm text-slate-500 min-w-28"
        :class="{ 'bg-slate-700 !text-slate-50': activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.title }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <slot :name="tabs[activeTab].content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const activeTab = ref(0)
</script>
