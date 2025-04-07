<template>
  <div class="flex justify-center items-center h-screen bg-indigo-50">
    <div class="flex flex-col gap-4 w-full max-w-md shadow-md p-4 rounded-md bg-white">
      <h1 class="text-xl font-bold mb-4">Khôi phục mật khẩu</h1>
      <span class="text-sm text-gray-500 text-center"
        >Nhập email bạn đã dùng để đăng ký tài khoản, mật khẩu sẽ được gửi về email này
      </span>
      <label for="email" class="text-xs text-gray-500">Địa chỉ email</label>
      <input
        type="email"
        id="email"
        class="border-b-2 border-indigo-500 px-4 py-1 outline-none"
        v-focus
      />
      <Button @click="resetPassword" :variant="'primary'" class="w-36 ml-auto mt-6">Gửi</Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/kits/button/index.vue'

const resetPassword = () => {
  console.log('resetPassword')
}

const vFocus = {
  mounted: (el) => {
    el.focus()
  },
}
</script>
