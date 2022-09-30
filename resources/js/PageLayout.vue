<template>
  <el-row>
    <el-col :span="3">
      <aside class="side-nav__container">
        <div class="side-nav__logo">
          <styx-logo
            width="60px"
            height="60px"
          />
        </div>

        <el-menu class="side-nav">
          <el-menu-item index="1">
            <el-icon><i class="gg-home" /></el-icon>
            <span>Dashboard</span>
          </el-menu-item>

          <el-menu-item index="2">
            <el-icon><i class="gg-user-list" /></el-icon>
            <span>Users</span>
          </el-menu-item>
        </el-menu>

        <div class="side-nav__bottom">
          <el-button
            class="side-nav__button"
            size="large"
            text
          >
            {{ user.username }}
          </el-button>

          <el-button
            class="side-nav__button"
            type="danger"
            size="large"
            text
          >
            <el-icon class="el-icon--left">
              <i class="gg-log-out" />
            </el-icon>
            Logout
          </el-button>
        </div>
      </aside>
    </el-col>

    <el-col :span="21">
      <el-row class="page-header__container">
        <header class="page-header">
          <el-tag
            v-if="user.admin"
            type="danger"
          >
            Administrator
          </el-tag>
        </header>
      </el-row>

      <el-row class="page-container">
        <slot />
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { usePage } from '@inertiajs/inertia-vue3'
import type { UserInterface } from './interfaces/user'

const user = $computed(() => usePage().props.value.user as UserInterface)
</script>

<style lang="scss" scoped>
$bgColor: #1d1e1f;

.side-nav {
  border: none;
}

.side-nav__container {
  position: fixed;
  width: 12.5%;
  height: 100%;
  max-height: 100vh;
  background-color: $bgColor;
}

.side-nav__logo {
  text-align: center;
  margin: 15px 0;
}

.side-nav__bottom {
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 0 10px;
}

.side-nav__button {
  width: 100%;
  margin-top: 10px;

  &:last-child {
    margin-left: 0;
  }
}

.page-header__container {
  position: static;
}

.page-header {
  position: fixed;

  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 20px;

  background-image: radial-gradient(transparent 1px, $bgColor 1px);
  background-size: 4px 4px;

  backdrop-filter: saturate(50%) blur(4px);
}

.page-container {
  padding: 50px 20px 0 20px;
}
</style>
