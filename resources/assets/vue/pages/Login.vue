<template>
<el-row 
  type="flex" 
  justify="center" 
  align="middle" 
  class="login-row"
>
  <el-col :span="8">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h1>Login</h1>
        </div>
      </template>

      <el-form ref="loginForm" :model="loginForm">
        <el-form-item>
          <el-input 
            v-model="loginForm.username"
            type="text"
            placeholder="Username"        
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-input 
            v-model="loginForm.password"
            type="text"
            placeholder="Password"        
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="Remember me">
          <el-switch v-model="loginForm.remember"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button style="width: 100%" type="primary" plain>Login</el-button>
        </el-form-item>
      </el-form>      
    </el-card>
  </el-col>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      }
    }
  }  
}
</script>

<style lang="scss" scoped>
.login-row {
  height: 100%;
}

.card-header {
  text-align: center;
}
</style>