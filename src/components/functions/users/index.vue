<template>
  <div class="p-4 mt-4">
    <div class="flex items-center justify-between gap-x-4">
      <h1 class="text-2xl font-bold">Users</h1>
      <div class="flex items-center gap-x-4">
        <Searchbar />
        <Button
          v-if="userPermission >= 2"
          :variant="'primary'"
          class="flex items-center"
          @click="router.push('/users/add')"
        >
          <PlusIcon class="size-5 mr-2" />
          Create user
        </Button>
      </div>
    </div>
    <div class="mt-8">
      <Table :headers="headers" :data="users" />
    </div>
  </div>
</template>

<script setup>
import Searchbar from '@/components/kits/searchbar/index.vue'
import Button from '@/components/kits/button/index.vue'
import { PlusIcon } from '@heroicons/vue/24/outline'
import Table from '@/components/kits/table/index.vue'
import { headers } from './user'
import { users } from '@/mockdata'
import { useRouter } from 'vue-router'
import { permissions } from '@/mockdata'

const router = useRouter()
const userRole = JSON.parse(localStorage.getItem('user')).role
const userPermission = permissions.find((permission) => permission.key === userRole).value
console.log(userPermission)
</script>
