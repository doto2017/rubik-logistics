<template>
  <button
    class="rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    :class="[
      variant === 'primary' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : '',
      variant === 'secondary'
        ? 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'
        : '',
      variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-500' : '',
    ]"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
})
</script>
