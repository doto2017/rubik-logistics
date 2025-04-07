<template>
  <div class="h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="size-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10"
              >
                <div class="flex h-16 shrink-0 items-center">
                  <Logo />
                </div>
                <nav class="flex flex-1 flex-col">
                  <ul role="list" class="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name" class="group">
                          <router-link
                            :to="item.name === 'Data' ? '' : item.href"
                            :class="[
                              currentRoute.includes(item.href)
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'flex items-center gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                              user.role === 'staff' && item.name === 'Users' ? 'hidden' : '',
                            ]"
                            @click="item.name === 'Data' ? (subMenuOpen = !subMenuOpen) : ''"
                          >
                            <div class="flex items-center justify-between gap-x-3">
                              <component
                                :is="item.icon"
                                class="size-6 shrink-0"
                                aria-hidden="true"
                              />
                              {{ item.name }}
                            </div>
                            <ChevronUpIcon
                              v-if="item.name === 'Data'"
                              class="size-4 shrink-0 ml-auto transition-all duration-300"
                              aria-hidden="true"
                              :class="[subMenuOpen ? 'rotate-180' : 'rotate-90']"
                            />
                          </router-link>
                          <div
                            v-if="item.name === 'Data'"
                            class="mt-1 max-h-0 opacity-0 transition-all duration-500 overflow-hidden bg-gray-800 rounded-md"
                            :class="[subMenuOpen ? 'max-h-80 opacity-100' : '']"
                          >
                            <ul role="list" class="space-y-1 rounded-md">
                              <li
                                v-for="subItem in dataSubMenus"
                                :key="subItem.name"
                                class="flex items-center gap-x-2 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-700 hover:text-white pl-8"
                              >
                                <component
                                  :is="subItem.icon"
                                  class="size-6 shrink-0"
                                  aria-hidden="true"
                                />
                                <router-link
                                  :to="subItem.href"
                                  class="text-gray-400 hover:text-white block w-full"
                                >
                                  {{ subItem.name }}
                                </router-link>
                              </li>
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li class="mt-auto">
                      <a
                        href="#"
                        class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                      >
                        <Cog6ToothIcon class="size-6 shrink-0" aria-hidden="true" />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
        <div class="flex h-16 shrink-0 items-center">
          <Logo />
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name" class="group">
                  <router-link
                    :to="item.name === 'Data' ? '' : item.href"
                    :class="[
                      currentRoute.includes(item.href)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'flex items-center h-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                      user.role === 'staff' && item.name === 'Users' ? 'hidden' : '',
                    ]"
                    @click="item.name === 'Data' ? (subMenuOpen = !subMenuOpen) : ''"
                  >
                    <div class="flex items-center justify-between gap-x-3">
                      <component :is="item.icon" class="size-6 shrink-0" aria-hidden="true" />
                      {{ item.name }}
                    </div>
                    <ChevronUpIcon
                      v-if="item.name === 'Data'"
                      class="size-4 shrink-0 ml-auto transition-all duration-300"
                      aria-hidden="true"
                      :class="[subMenuOpen ? 'rotate-180' : 'rotate-90']"
                    />
                  </router-link>
                  <div
                    v-if="item.name === 'Data'"
                    class="mt-1 max-h-0 opacity-0 transition-all duration-500 overflow-hidden bg-gray-800 rounded-md"
                    :class="[subMenuOpen ? 'max-h-80 opacity-100' : '']"
                  >
                    <ul role="list" class="space-y-1 rounded-md">
                      <li
                        v-for="subItem in dataSubMenus"
                        :key="subItem.name"
                        class="flex items-center gap-x-2 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-700 hover:text-white pl-8"
                      >
                        <component :is="subItem.icon" class="size-6 shrink-0" aria-hidden="true" />
                        <router-link
                          :to="subItem.href"
                          class="text-gray-400 hover:text-white block w-full"
                        >
                          {{ subItem.name }}
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
            <li class="mt-auto">
              <a
                href="#"
                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Cog6ToothIcon class="size-6 shrink-0" aria-hidden="true" />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72 h-full flex flex-col">
      <div
        class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <button
          type="button"
          class="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>

        <!-- Separator -->
        <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

        <div v-if="user.email" class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end">
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">View notifications</span>
              <BellIcon class="size-6" aria-hidden="true" />
            </button>

            <!-- Separator -->
            <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="hidden lg:flex lg:items-center">
                  <span class="ml-4 text-sm/6 font-semibold text-gray-900" aria-hidden="true">{{
                    user.username
                  }}</span>
                  <ChevronDownIcon class="ml-2 size-5 text-gray-400" aria-hidden="true" />
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <span
                      @click="item.event"
                      :class="[
                        active ? 'bg-gray-50 outline-none' : '',
                        'block px-3 py-1 text-sm/6 text-gray-900 cursor-default select-none',
                      ]"
                      >{{ item.name }}</span
                    >
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
        <div v-else>
          <router-link to="/auth">Login</router-link>
        </div>
      </div>

      <main class="py-4 flex-1">
        <div class="px-4 sm:px-6 lg:px-8 h-[calc(100vh-100px)]">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  FolderArrowDownIcon,
  CircleStackIcon,
  ArchiveBoxArrowDownIcon,
  BanknotesIcon,
  ChevronUpIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import Bookings from '@/components/functions/bookings/index.vue'
import { useRouter, useRoute } from 'vue-router'
import Logo from '@/components/icons/logo.vue'

const navigation = [
  { name: 'Bookings Data', href: '/bookings', icon: CalendarIcon, current: false },
  { name: 'Users', href: '/users', icon: UsersIcon, current: false },
  { name: 'Data', href: '/data', icon: FolderIcon, current: false },
  // { name: 'Follow Data', href: '/data/follow', icon: FolderArrowDownIcon, current: false },
  { name: 'Accountant', href: '#', icon: DocumentDuplicateIcon, current: false },
  { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]
const dataSubMenus = [
  { name: 'Total Data', href: '/data/total', icon: CircleStackIcon, current: false },
  { name: 'Follow Data', href: '/data/follow', icon: FolderArrowDownIcon, current: false },
  { name: 'Booked Data', href: '/data/booked', icon: ArchiveBoxArrowDownIcon, current: false },
  { name: 'Quotation', href: '/data/quotation', icon: BanknotesIcon, current: false },
]
const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]
const userNavigation = [
  { name: 'Your profile', event: () => profile() },
  { name: 'Sign out', event: () => logout() },
]

const sidebarOpen = ref(false)
const subMenuOpen = ref(false)
const router = useRouter()
const route = useRoute()
const currentRoute = computed(() => {
  return route.path
})
const user = JSON.parse(localStorage.getItem('user'))
const logout = () => {
  localStorage.removeItem('user')
  router.push('/auth')
}
const profile = () => {
  // router.push('/profile')
}
</script>
