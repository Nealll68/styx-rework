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

        <el-menu
          class="side-nav"
          :default-active="$page.url"
        >
          <inertia-link href="/">
            <el-menu-item index="/">
              <el-icon>
                <font-awesome-icon icon="fa-solid fa-house-fire" />
              </el-icon>
              <span>Dashboard</span>
            </el-menu-item>
          </inertia-link>

          <inertia-link href="/users">
            <el-menu-item index="/users">
              <el-icon>
                <font-awesome-icon icon="fa-solid fa-users" />
              </el-icon>
              <span>Users</span>
            </el-menu-item>
          </inertia-link>

          <inertia-link href="/configuration">
            <el-menu-item index="/configuration">
              <el-icon>
                <font-awesome-icon icon="fa-solid fa-gear" />
              </el-icon>
              <span>Configuration</span>
            </el-menu-item>
          </inertia-link>
        </el-menu>

        <div class="side-nav__bottom">
          <inertia-link href="/user">
            <el-button
              class="side-nav__button"
              size="large"
              text
            >
              {{ user.username }}
            </el-button>
          </inertia-link>

          <inertia-link href="/logout">
            <el-button
              class="side-nav__button"
              type="danger"
              size="large"
              text
            >
              <el-icon class="el-icon--left">
                <font-awesome-icon
                  icon="fa-solid fa-arrow-right-from-bracket"
                />
              </el-icon>
              Logout
            </el-button>
          </inertia-link>
        </div>
      </aside>
    </el-col>

    <el-col :span="21">
      <el-row class="page-header__container">
        <header class="page-header z-10">
          <el-tag
            v-if="user.admin"
            type="danger"
          >
            Administrator
          </el-tag>
        </header>
      </el-row>

      <el-row class="page-container">
        <el-col>
          <slot />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Link as InertiaLink } from '@inertiajs/inertia-vue3'
import type { UserInterface } from './interfaces/user'

defineProps<{
  user: UserInterface
}>()
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

  svg {
    display: inline-block;
  }
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
  padding: 70px 20px 0 20px;
}
</style>
