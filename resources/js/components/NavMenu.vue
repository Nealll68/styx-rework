<template>
  <el-menu
    :default-active="$page.url"
    :collapse="xl && !lg"
  >
    <div>
      <inertia-link href="/">
        <el-menu-item index="/">
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-house-fire" />
          </el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>
      </inertia-link>

      <inertia-link href="/profiles">
        <el-menu-item index="/profiles">
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-folder-open" />
          </el-icon>
          <template #title>Profiles</template>
        </el-menu-item>
      </inertia-link>

      <inertia-link href="/users">
        <el-menu-item index="/users">
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-users" />
          </el-icon>
          <template #title>Users</template>
        </el-menu-item>
      </inertia-link>

      <inertia-link href="/configuration">
        <el-menu-item index="/configuration">
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-gear" />
          </el-icon>
          <template #title>Configuration</template>
        </el-menu-item>
      </inertia-link>
    </div>

    <div>
      <inertia-link href="/user">
        <el-menu-item index="/user">
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-user" />
          </el-icon>
          <template #title>{{ user.username }}</template>
        </el-menu-item>
      </inertia-link>
      <inertia-link href="/logout">
        <el-menu-item
          class="side-nav__logout"
          index="/logout"
        >
          <el-icon>
            <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
          </el-icon>
          <template #title>Logout</template>
        </el-menu-item>
      </inertia-link>
    </div>
  </el-menu>
</template>

<script lang="ts" setup>
import { Link as InertiaLink } from '@inertiajs/inertia-vue3'
import type { UserInterface } from '@/interfaces'

defineProps<{
  user: UserInterface
  lg: boolean
  xl: boolean
}>()
</script>
