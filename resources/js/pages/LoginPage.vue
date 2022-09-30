<template>
  <el-row
    class="login-row"
    justify="center"
  >
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="login-card__header">
            <styx-logo
              width="70px"
              height="70px"
            />
          </div>
        </template>

        <el-alert
          v-if="loginForm.hasErrors"
          :title="loginForm.errors.username"
          type="error"
          show-icon
        />

        <el-form
          ref="ruleFormRef"
          :model="loginForm"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              size="large"
              placeholder="Username"
            >
              <template #prepend>
                <i class="gg-user" />
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              placeholder="Password"
              show-password
            >
              <template #prepend>
                <i class="gg-lock" />
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-checkbox
              v-model="loginForm.remember"
              label="Remember me"
              border
            />
          </el-form-item>

          <el-form-item>
            <el-button
              class="login-card__button"
              type="primary"
              plain
              size="large"
              :loading="loginForm.processing"
              @click="submitForm"
            >
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useForm } from '@inertiajs/inertia-vue3'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = $ref<FormInstance>()
const loginForm = useForm({
  username: '',
  password: '',
  remember: false,
})

const rules: FormRules = {
  username: [{ required: true, message: 'Required field', trigger: 'blur' }],
  password: [{ required: true, message: 'Required field', trigger: 'change' }],
}

const submitForm = async () => {
  if (!ruleFormRef) return

  await ruleFormRef.validate((valid) => {
    if (valid) {
      loginForm.post('/login')
    }
  })
}
</script>

<style lang="scss" scoped>
.login-row {
  margin-top: 10%;
}

.el-card {
  border: none;
  box-shadow: var(--el-box-shadow-lighter);
}

.el-alert {
  margin-bottom: 25px;
}

.login-card__header {
  text-align: center;
}

.login-card__button {
  width: 100%;
  margin-top: 25px;
}
</style>
