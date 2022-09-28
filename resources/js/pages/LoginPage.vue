<template>
  <el-row class="login-row" justify="center">
    <el-col :span="6">
      <el-card>
        <template #header>
          <h1 class="login-card__header">Login</h1>
        </template>

        <el-form ref="ruleFormRef" :model="loginForm" :rules="rules">
          <el-form-item>
            <el-input
              v-model="loginForm.username"
              size="large"
              placeholder="Username"
              prop="username"
            >
              <template #prepend>
                <i class="gg-user"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              placeholder="Password"
              prop="password"
              show-password
            >
              <template #prepend>
                <i class="gg-lock"></i>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              class="login-card__button"
              type="primary"
              plain
              size="large"
              @click="submitForm()"
              >Login</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = $ref<FormInstance>()
const loginForm = $ref({
  username: '',
  password: '',
})
const rules = $ref<FormRules>({
  username: [
    { required: true, message: 'Required field', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [{ required: true, message: 'Required field', trigger: 'blur' }],
})

const submitForm = async () => {
  if (!ruleFormRef) return

  await ruleFormRef.validate((valid, fields) => {
    console.log(fields)

    if (valid) {
      console.log('submit')
    } else {
      console.log('error submit', fields)
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

.login-card__header {
  text-align: center;
}

.login-card__button {
  width: 100%;
}
</style>
