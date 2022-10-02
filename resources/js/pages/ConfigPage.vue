<template>
  <el-col class="mb-8">
    <el-row justify="space-between">
      <el-col :span="4">
        <h1 class="text-4xl font-bold">Configuration</h1>
      </el-col>
    </el-row>
  </el-col>

  <el-col>
    <el-card>
      <el-form
        :model="configForm"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <h2 class="text-xl font-bold mb-5">Arma 3</h2>

            <el-form-item label="Arma 3 path">
              <el-input
                v-model="configForm.a3server_path"
                size="large"
              />
              <span class="text-slate-300 text-xs mt-1">
                Absolute path to the folder where Arma 3 is installed
              </span>
            </el-form-item>

            <el-form-item class="!mb-0">
              <el-switch
                v-model="configForm.x64"
                active-text="64bit version"
              />
            </el-form-item>
            <span class="text-slate-300 text-xs">
              This parameter is not used on Linux
            </span>
          </el-col>

          <el-col :span="12">
            <h2 class="text-xl font-bold mb-5">Steam</h2>

            <el-form-item label="SteamCMD path">
              <el-input
                v-model="configForm.steamcmd_path"
                size="large"
              />
              <span class="text-slate-300 text-xs mt-1">
                Absolute path to the folder where SteamCMD is installed
              </span>
            </el-form-item>

            <p class="leading-6">
              You can specify a steam account that will manage the download of
              workshop. If you don't specify one, it will ask for an account at
              every download
            </p>

            <el-alert
              class="!my-3"
              type="warning"
              title="To be able to use the workshop functionalities, the account must have Arma 3"
              :closable="false"
              show-icon
            />

            <el-form-item label="Username">
              <el-input
                v-model="configForm.steam_account"
                size="large"
              />
            </el-form-item>

            <el-form-item label="Password">
              <el-input
                v-model="configForm.steam_password"
                size="large"
              />
              <span class="text-slate-300 text-xs mt-1">
                The password is never displayed and is encrypted in the
                database. To modify it, specify it again
              </span>
            </el-form-item>

            <el-form-item class="!mb-0">
              <el-switch
                v-model="configForm.steam_guard"
                active-text="Steam Guard"
              />
            </el-form-item>
            <span class="text-slate-300 text-xs">
              If activated, you will be asked for the Steam Guard code before
              each download if necessary
            </span>
          </el-col>
        </el-row>

        <el-row
          class="mt-8"
          justify="center"
        >
          <el-button
            class="w-2/4"
            size="large"
            plain
            @click="submit"
          >
            Save
          </el-button>
        </el-row>
      </el-form>
    </el-card>
  </el-col>
</template>

<script lang="ts" setup>
import type { ConfigurationInterface } from '@/interfaces'
import { useForm } from '@inertiajs/inertia-vue3'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  configuration: ConfigurationInterface
}>()

const configForm = useForm({
  a3server_path: props.configuration.a3server_path,
  x64: props.configuration.x64,
  steamcmd_path: props.configuration.steamcmd_path,
  steam_account: props.configuration.steam_account,
  steam_password: '',
  steam_guard: props.configuration.steam_guard,
})

const submit = () => {
  configForm.post('/configuration', {
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
  })
}
</script>
