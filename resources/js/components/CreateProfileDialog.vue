<template>
  <el-button
    :class="buttonClass"
    type="primary"
    :size="buttonSize"
    @click="dialog = true"
  >
    <el-icon class="el-icon--left">
      <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
    </el-icon>
    Add profile
  </el-button>

  <el-dialog
    v-model="dialog"
    title="Add new profile"
    width="30%"
  >
    <el-form
      ref="ruleFormRef"
      :model="addProfileForm"
      :rules="rules"
    >
      <el-form-item prop="name">
        <el-input
          v-model="addProfileForm.name"
          size="large"
          placeholder="Profile name"
        />
      </el-form-item>

      <el-form-item>
        <el-checkbox
          v-model="addProfileForm.isDefault"
          label="Set as default"
          border
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="dialog = false">Cancel</el-button>

        <el-button
          type="primary"
          :loading="addProfileForm.processing"
          @click="submitForm"
        >
          Create
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/inertia-vue3'
import type { ProfileInterface } from '@/interfaces'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  profiles: ProfileInterface[]
  buttonSize: string
  buttonClass: string
}>()

let dialog = $ref(false)
const ruleFormRef = $ref<FormInstance>()
const addProfileForm = useForm({
  name: '',
  isDefault: false,
})

const checkName = (
  rule: object,
  value: string,
  callback: (e?: Error) => void
) => {
  if (!value) {
    return callback(new Error('Required field'))
  }

  if (
    props.profiles.find(
      (profile) => profile.name.toLowerCase() === value.toLowerCase()
    )
  ) {
    return callback(new Error('This profile name is already used'))
  }

  callback()
}

const rules: FormRules = {
  name: [{ validator: checkName, trigger: 'blur' }],
}

const submitForm = async () => {
  if (!ruleFormRef) return

  await ruleFormRef.validate((valid) => {
    if (valid) {
      addProfileForm.post('/profiles', {
        preserveScroll: true,
        onSuccess: () => (dialog = false),
      })
    }
  })
}
</script>
