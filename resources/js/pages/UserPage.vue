<template>
  <el-row
    class="mt-20"
    justify="center"
  >
    <el-col :span="6">
      <el-card>
        <template #header>
          <h4 class="text-xl font-bold">Edit your account</h4>
        </template>

        <el-alert
          v-if="userForm.hasErrors"
          class="!mb-5"
          :title="userForm.errors.username[0]"
          type="error"
          show-icon
        />

        <el-form
          ref="ruleFormRef"
          :model="userForm"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="userForm.username"
              size="large"
              placeholder="Username"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="userForm.password"
              type="password"
              size="large"
              placeholder="Password"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button
              class="w-full mt-5"
              type="primary"
              plain
              size="large"
              :loading="userForm.processing"
              @click="submitForm"
            >
              Confirm
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { UserInterface } from '@/interfaces/user'
import { useForm } from '@inertiajs/inertia-vue3'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  user: UserInterface
}>()

const ruleFormRef = $ref<FormInstance>()
const userForm = useForm({
  username: props.user.username,
  password: '',
})

const rules: FormRules = {
  username: [{ required: true, message: 'Required field', trigger: 'blur' }],
}

const submitForm = async () => {
  if (!ruleFormRef) return

  await ruleFormRef.validate((valid) => {
    if (valid) {
      userForm.put(`/user/${props.user.id}`, {
        onSuccess: (page) => {
          ElMessage.success({
            message: (page as InertiaPage).props.success,
            duration: 5000,
          })
        },
      })
    }
  })
}
</script>
