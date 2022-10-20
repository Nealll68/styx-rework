<template>
  <el-col>
    <el-row justify="space-between">
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">Profiles</h1>

      <div class="block xs:hidden">
        <create-profile-dialog
          :profiles="profiles"
          button-class="lg:w-2/6"
          button-size="default"
        />
      </div>
    </el-row>
  </el-col>

  <el-col
    v-if="profiles.length > 0"
    class="profile-page__header-container sticky mb-8 z-50"
  >
    <el-card>
      <profile-page-header
        :profiles="profiles"
        :profile="profile"
        :disable-save-button="!profilePageForm.isDirty"
        @saveProfile="saveProfile"
      />
    </el-card>
  </el-col>

  <el-col>
    <el-card class="profile-page__card">
      <el-empty
        v-if="profiles.length === 0"
        description="No profile"
      >
        You don't have created a profile at this time!
        <br />
        A profile is a configuration set from which your Arma 3 server will
        launch.<br />You can create several profiles as you want and choose
        which one will be used to launch your server.

        <br />

        <create-profile-dialog
          :profiles="profiles"
          button-class="mt-5 w-2/4"
          button-size="large"
        />
      </el-empty>

      <profile-tabs
        v-else
        :profiles="profiles"
        :profile="profile"
        :form="profilePageForm"
      />
    </el-card>
  </el-col>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'
import { ElLoading, ElMessage } from 'element-plus'
import type { ProfileInterface } from '@/interfaces'

const props = defineProps<{
  profiles: ProfileInterface[]
  profile: ProfileInterface
}>()

const profilePageForm = useForm({
  parameters: props.profile.parameter,
  server: null,
  difficulty: null,
  performance: null,
})

const saveProfile = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Saving...',
  })

  profilePageForm.put(`/profiles/${props.profile.id}`, {
    onSuccess: (page) => {
      ElMessage.success({
        message: (page as InertiaPage).props.success,
        duration: 5000,
      })
    },
    onError: (errors) => {
      ElMessage.error({
        message: errors.message,
        duration: 10000,
        showClose: true,
      })
    },
    onFinish: () => loading.close(),
  })
}

onMounted(() => {
  const el = document.querySelector('.profile-page__header-container')

  if (el) {
    const observer = new IntersectionObserver(
      ([e]) =>
        e.target.classList.toggle(
          'profile-page__header-container--sticky',
          e.intersectionRatio < 1
        ),
      { threshold: [1] }
    )

    observer.observe(el)
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__item) {
  text-transform: uppercase;
}

:deep(.profile-page__card .el-card__body) {
  padding-left: 0;
  padding-right: 0;
}

.profile-page__header-container {
  top: -1px;
  padding-top: 50px;
}

.profile-page__header-container--sticky .el-card {
  box-shadow: rgb(0 0 0 / 10%) 0px 10px 15px -3px,
    rgb(0 0 0 / 5%) 0px 4px 6px -2px !important;
}
</style>
