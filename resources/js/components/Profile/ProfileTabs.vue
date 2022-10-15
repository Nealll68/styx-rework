<template>
  <el-tabs
    v-model="activeTabs"
    stretch
  >
    <el-tab-pane
      label="Parameters"
      name="parameters"
    >
      <parameters-tab :parameters="form.parameters" />
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
import type { ParameterInterface, ProfileInterface } from '@/interfaces'
import type { InertiaForm } from '@inertiajs/inertia-vue3'

defineProps<{
  profiles: ProfileInterface[]
  profile: ProfileInterface
  form: InertiaForm<{
    parameters: ParameterInterface
    server: null
    difficulty: null
    performance: null
  }>
}>()

const activeTabs = $ref('parameters')
</script>
