<template>
  <el-button
    type="primary"
    size="large"
    @click="dialog = true"
  >
    <el-icon class="el-icon--left">
      <font-awesome-icon icon="fa-solid fa-user-plus" />
    </el-icon>
    Add user
  </el-button>

  <el-dialog
    v-model="dialog"
    title="Add user"
    width="30%"
  >
    <el-form
      ref="ruleFormRef"
      :model="addUserForm"
      :rules="rules"
    >
      <el-form-item prop="username">
        <el-input
          v-model="addUserForm.username"
          size="large"
          placeholder="Username"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="addUserForm.password"
          type="password"
          size="large"
          placeholder="Password"
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-checkbox
          v-model="addUserForm.admin"
          label="Administrator"
          border
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span>
        <el-button @click="dialog = false">Cancel</el-button>

        <el-button
          type="primary"
          :loading="addUserForm.processing"
          @click="submitForm"
        >
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useForm } from '@inertiajs/inertia-vue3'
import type { UserInterface } from '@/interfaces/user'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  users: UserInterface[]
}>()

let dialog = $ref(false)
const ruleFormRef = $ref<FormInstance>()
const addUserForm = useForm({
  username: '',
  password: '',
  admin: false,
})

const checkUsername = (
  rule: object,
  value: string,
  callback: (e?: Error) => void
) => {
  if (!value) {
    return callback(new Error('Required field'))
  }

  if (
    props.users.find(
      (user) => user.username.toLowerCase() === value.toLowerCase()
    )
  ) {
    return callback(new Error('This username is already used'))
  }

  callback()
}

const rules: FormRules = {
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ required: true, message: 'Required field', trigger: 'change' }],
}

const submitForm = async () => {
  if (!ruleFormRef) return

  await ruleFormRef.validate((valid) => {
    if (valid) {
      addUserForm.post('/users', {
        preserveScroll: true,
        onSuccess: () => (dialog = false),
      })
    }
  })
}
</script>
