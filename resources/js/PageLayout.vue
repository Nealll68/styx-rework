<template>
  <main class="flex">
    <nav
      v-if="!lg"
      class="side-nav"
    >
      <div class="side-nav__logo">
        <styx-logo
          :width="xl ? '45px' : '60px'"
          :height="xl ? '45px' : '60px'"
        />
      </div>

      <div class="side-nav__content">
        <nav-menu
          class="side-nav__menu flex flex-col justify-between h-full"
          :user="user"
          :xl="xl"
          :lg="lg"
        />
      </div>
    </nav>

    <article class="page w-full">
      <header class="page__header z-10">
        <el-button
          v-if="lg"
          class="mr-5"
          link
          size="large"
          @click="mobileSideNav = true"
        >
          <el-icon>
            <font-awesome-icon
              icon="fa-solid fa-bars"
              size="lg"
            />
          </el-icon>
        </el-button>

        <el-tag
          v-if="user.admin"
          type="danger"
        >
          Administrator
        </el-tag>
      </header>

      <section
        class="page__content"
        v-auto-animate
      >
        <slot />
      </section>
    </article>
  </main>

  <el-drawer
    v-if="lg"
    v-model="mobileSideNav"
    :with-header="false"
    direction="ltr"
    size="85%"
    custom-class="mobile-side-nav"
  >
    <nav-menu
      class="flex flex-col justify-between h-full"
      :user="user"
      :xl="xl"
      :lg="lg"
      style="border: none"
    />
  </el-drawer>
</template>

<script lang="ts" setup>
import { Inertia } from '@inertiajs/inertia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import type { UserInterface } from './interfaces/user'

defineProps<{
  user: UserInterface
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)

const xl = breakpoints.smaller('xl')
const lg = breakpoints.smaller('lg')

let mobileSideNav = $ref(false)

const sideNavWidth = $computed(() => {
  if (lg.value) return '0px'
  return xl.value ? '64px' : '235px'
})

Inertia.on('navigate', () => {
  mobileSideNav = false
})
</script>

<style lang="scss" scoped>
$bgColor: #1d1e1f;

.side-nav {
  position: fixed;
  width: v-bind(sideNavWidth);
  height: 100%;
  max-height: 100vh;
  background-color: $bgColor;
  transition: all 0.3s ease;
}

.side-nav .el-menu {
  border: none;
}

.side-nav__logo {
  text-align: center;
  margin: 15px 0;

  svg {
    display: inline-block;
  }
}

.side-nav__content {
  height: calc(100% - 91px);
}

.side-nav__logout {
  color: var(--el-color-error);
}

.page {
  padding-left: v-bind(sideNavWidth);
  transition: all 0.3s ease;
}

.page__header {
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

.page__content {
  padding: 70px 20px 0 20px;
}
</style>
