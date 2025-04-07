<template>
  <div>
    <h1 class="text-2xl font-bold text-center text-gray-700">Thêm người dùng</h1>
    <div class="mt-4">
      <div class="flex flex-col gap-4 max-w-96 w-fit m-auto">
        <div>
          <label for="email" class="text-sm text-gray-600">Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full rounded-md border border-gray-300 px-2 py-1 outline-indigo-500"
            required
          />
        </div>
        <div>
          <label for="name" class="text-sm text-gray-600">Tên người dùng</label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full rounded-md border border-gray-300 px-2 py-1 outline-indigo-500"
            required
          />
        </div>
        <div>
          <label for="password" class="text-sm text-gray-600">Mật khẩu</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full rounded-md border border-gray-300 px-2 py-1 outline-indigo-500"
            required
          />
        </div>
        <div>
          <label for="confirmPassword" class="text-sm text-gray-600">Nhập lại mật khẩu</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirmPassword"
            class="w-full rounded-md border border-gray-300 px-2 py-1 outline-indigo-500"
            required
          />
        </div>
        <div>
          <label for="role" class="text-sm text-gray-600">Role</label>
          <Select id="role" v-model="role" :options="roles" class="w-full" required />
        </div>
        <div>
          <label for="department" class="text-sm text-gray-600">Phòng ban</label>
          <Select
            id="department"
            v-model="department"
            :options="departments"
            class="w-full"
            required
          />
        </div>
        <div>
          <Button :variant="'primary'" class="w-full mt-4" @click="addUser">Thêm người dùng</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Select from '@/components/kits/select/index.vue'
import Button from '@/components/kits/button/index.vue'

const roles = ref([
  { label: 'BOD', value: 'bod' },
  { label: 'Leader', value: 'leader' },
  { label: 'Giam đốc', value: 'director' },
  { label: 'Nhân viên', value: 'staff' },
])
const departments = ref([
  { label: 'Docs', value: 'docs' },
  { label: 'Sale', value: 'sale' },
  { label: 'Ops', value: 'ops' },
  { label: 'Kế toán', value: 'accountant' },
])
const email = ref('')
const name = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('')
const department = ref('')

const addUser = () => {
  console.log(
    email.value,
    name.value,
    password.value,
    confirmPassword.value,
    role.value,
    department.value,
  )
}
</script>
