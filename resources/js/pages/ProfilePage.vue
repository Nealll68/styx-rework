<template>
  <el-col class="mb-8">
    <el-row justify="space-between">
      <el-col :span="4">
        <h1 class="text-4xl font-bold">Profiles</h1>
      </el-col>
    </el-row>
  </el-col>

  <el-col
    v-if="profiles.length > 0"
    class="mb-8"
  >
    <el-card>
      <el-row justify="space-between">
        <el-col :span="12">
          <el-dropdown>
            <el-button type="primary">
              RHS
              <el-icon class="el-icon--right">
                <font-awesome-icon icon="fa-solid fa-chevron-down" />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>AMF</el-dropdown-item>
                <el-dropdown-item>Vanilla</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <el-button
            class="ml-3"
            type="info"
            plain
          >
            <el-icon class="el-icon--left">
              <font-awesome-icon icon="fa-solid fa-star" />
            </el-icon>
            Set as default
          </el-button>

          <el-button
            type="danger"
            plain
          >
            <el-icon class="el-icon--left">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </el-icon>
            Delete
          </el-button>
        </el-col>

        <el-col
          :span="3"
          class="text-right"
        >
          <el-button
            type="primary"
            class="w-full"
          >
            <el-icon class="el-icon--left">
              <font-awesome-icon icon="fa-solid fa-file-circle-plus" />
            </el-icon>
            Add profile
          </el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>

  <el-col>
    <el-card>
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

      <div v-else>
        <pre>{{ profiles }}</pre>

        <pre>{{ profile }}</pre>
      </div>
    </el-card>
  </el-col>
</template>

<script lang="ts" setup>
import type { ProfileInterface } from '@/interfaces'

defineProps<{
  profiles: ProfileInterface[]
  profile: ProfileInterface
}>()
</script>
