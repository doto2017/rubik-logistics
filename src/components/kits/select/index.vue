<template>
  <div>
    <div class="grid grid-cols-1">
      <select
        id="location"
        name="location"
        v-model="model"
        :class="style"
        class="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1 pl-3 pr-8 text-base text-gray-700 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      >
        <option v-for="option in options" :value="option.value" :key="option.value">
          {{ option.label }}
        </option>
      </select>
      <ChevronDownIcon
        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
        aria-hidden="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/16/solid'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  style: {
    type: String,
    default: '',
  },
})

const model = defineModel()
</script>
