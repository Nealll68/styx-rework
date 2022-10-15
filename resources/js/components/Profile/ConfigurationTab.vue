<template>
  <div class="px-5 relative">
    <a
      class="fixed bottom-5 right-12 z-10"
      href="https://community.bistudio.com/wiki/Arma_3:_Dedicated_Server#CONFIG_server.cfg"
      target="_blank"
    >
      <el-button
        type="primary"
        size="large"
        circle
      >
        <el-icon>
          <font-awesome-icon icon="fa-solid fa-question" />
        </el-icon>
      </el-button>
    </a>

    <el-alert
      v-if="error"
      title="An error occured while trying to fetch the configuration file"
      :description="error"
      type="error"
      show-icon
      :closable="false"
    />

    <el-skeleton
      v-if="skeleton"
      :rows="5"
      animated
    />

    <el-input
      v-if="!skeleton && !error"
      v-model="modelValue"
      class="font-mono"
      type="textarea"
      spellcheck="false"
      resize="none"
      autosize
      @input="$emit('update:modelValue', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import type { ProfileInterface } from '@/interfaces'

const props = defineProps<{
  modelValue: string | null
  profile: ProfileInterface
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', content: string): void
}>()

let skeleton = $ref(true)
let error = $ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await fetch(`/api/${props.profile.name}/server`)
    emit('update:modelValue', (await response.json()).content)
  } catch (ex) {
    error = ex as string
  } finally {
    skeleton = false
  }
})
</script>
