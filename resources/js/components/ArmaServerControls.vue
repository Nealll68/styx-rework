<template>
  <el-button
    type="success"
    plain
    @click="startServer"
  >
    <el-icon class="el-icon--left">
      <font-awesome-icon icon="fa-solid fa-play" />
    </el-icon>
    Start
  </el-button>

  <el-button
    type="warning"
    plain
  >
    <el-icon class="el-icon--left">
      <font-awesome-icon icon="fa-solid fa-rotate-left" />
    </el-icon>
    Restart
  </el-button>

  <el-button
    type="danger"
    plain
  >
    <el-icon class="el-icon--left">
      <font-awesome-icon icon="fa-solid fa-stop" />
    </el-icon>
    Stop
  </el-button>
</template>

<script lang="ts" setup>
const startServer = async () => {
  const response = await fetch('/server/start')
  console.log(response)
}
</script>
