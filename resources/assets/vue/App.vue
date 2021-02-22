<template>
<div>
  <router-link to="/">Go to Home</router-link>
  <router-link to="/about">Go to About</router-link>
  <el-button type="primary">Primary</el-button>
  <router-view></router-view>
</div>
</template>

<script>
export default {
}
</script>