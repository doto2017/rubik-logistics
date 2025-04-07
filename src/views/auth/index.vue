<template>
  <div class="flex flex-col items-center justify-center h-screen bg-indigo-100">
    <h1
      class="text-2xl font-bold bg-slate-700 text-center uppercase text-white px-4 py-1 shadow-md w-1/2 rounded-tl-lg rounded-tr-lg"
    >
      Rubik Logistics
    </h1>
    <div class="w-1/2 min-h-96 h-fit flex justify-center shadow-md">
      <div class="w-full rounded-bl-lg overflow-hidden bg-white">
        <img src="/images/bglogin.png" alt="" class="w-full h-full object-cover" />
      </div>

      <div class="w-full p-4 bg-white flex flex-col rounded-br-lg px-4">
        <h1 class="text-2xl font-bold mb-4 text-center uppercase text-gray-700">Đăng nhập</h1>
        <div v-if="error" class="flex items-center py-4 space-x-2">
          <ExclamationTriangleIcon class="w-5 h-5 text-red-500" />
          <p class="text-red-500 text-sm">Email hoặc mật khẩu không đúng</p>
        </div>
        <label for="email" class="text-gray-700 text-sm mb-2">Email</label>
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-2 rounded-md border border-gray-300 mb-4 focus:outline-indigo-600 invalid:border-red-500"
        />
        <label for="password" class="text-gray-700 text-sm mb-2">Password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full p-2 rounded-md border border-gray-300 mb-4 focus:outline-indigo-600"
        />
        <div class="flex justify-end text-sm space-x-2">
          <span class="text-gray-700 text-sm">Quên mật khẩu?</span>
          <span
            @click="router.push('/auth/forgot-password')"
            class="text-indigo-600 text-sm cursor-pointer hover:underline"
          >
            Khôi phục</span
          >
        </div>
        <div class="flex justify-end items-end flex-1 pb-0">
          <Button @click="signIn" :variant="'primary'" class="w-full">Đăng nhập</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/kits/button/index.vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router'
import { users } from '@/mockdata'

const isSignedup = ref(false)
const email = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()
const user = JSON.parse(localStorage.getItem('user'))
if (user) {
  router.push('/bookings')
}

const signIn = () => {
  const user = users.find((user) => user.email === email.value && user.password === password.value)
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/bookings')
  } else {
    error.value = true
  }
}
</script>
