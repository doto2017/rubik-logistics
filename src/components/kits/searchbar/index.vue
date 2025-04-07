<template>
  <form
    action="#"
    method="GET"
    class="flex items-center gap-x-4 rounded-md border border-gray-300 h-9 px-4 w-80 shadow-sm"
  >
    <MagnifyingGlassIcon
      class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
      aria-hidden="true"
    />
    <input
      type="search"
      v-model="model"
      placeholder="Search"
      class="w-full outline-none"
      aria-label="Search"
    />
  </form>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const model = defineModel()
</script>
