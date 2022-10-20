<template>
  <el-tabs
    v-if="form"
    v-model="activeTabs"
    stretch
  >
    <el-tab-pane
      label="Parameters"
      name="parameters"
    >
      <parameters-tab />
    </el-tab-pane>
    <el-tab-pane
      label="Configuration"
      name="configuration"
      lazy
    >
      <configuration-tab
        v-model="form.server"
        :profile="profile"
      />
    </el-tab-pane>
    <el-tab-pane
      label="Difficulty"
      name="difficulty"
      lazy
    >
      <difficulty-tab
        v-model="form.difficulty"
        :profile="profile"
      />
    </el-tab-pane>
    <el-tab-pane
      label="Performance"
      name="perfomance"
      lazy
    >
      <performance-tab
        v-model="form.performance"
        :profile="profile"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import type { ProfileInterface } from '@/interfaces'
import { ProfilePageFormKey } from '@/injectKey'

defineProps<{
  profiles: ProfileInterface[]
  profile: ProfileInterface
}>()

const form = inject(ProfilePageFormKey)

const activeTabs = $ref('parameters')
</script>
