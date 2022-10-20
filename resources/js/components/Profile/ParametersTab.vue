<template>
  <div
    v-if="form"
    class="px-5"
  >
    <span>Startup parameters</span>
    <el-input
      v-model="form.parameters.startup_parameters"
      size="large"
    />
    <span class="text-slate-300 text-xs">
      You can customize startup parameters in this field.
      <strong>
        Do not use parameters '-name', '-config', '-profiles' and '-cfg' as
        there automatically configurated. For '-cfg' check the Performance tab
      </strong>
      - See
      <el-link
        type="primary"
        href="https://community.bistudio.com/wiki/Arma_3:_Startup_Parameters#Server_Options"
        target="_blank"
      >
        Arma wiki
      </el-link>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ProfilePageFormKey } from '@/injectKey'
import { inject } from 'vue'

const form = inject(ProfilePageFormKey)
</script>
