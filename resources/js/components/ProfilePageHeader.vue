<template>
  <div class="flex space-between">
    <div>
      <el-dropdown class="mr-3">
        <el-button type="primary">
          {{ profile.name }}
          <el-icon class="el-icon--right">
            <font-awesome-icon icon="fa-solid fa-chevron-down" />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="dropdownProfile in dropdownProfiles"
              :key="dropdownProfile.id"
              @click="Inertia.get(`/profiles/${dropdownProfile.id}`)"
            >
              {{ dropdownProfile.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button-group>
        <el-button
          type="success"
          plain
          :disabled="disableSaveButton"
          @click="$emit('saveProfile')"
        >
          <el-icon class="sm:mr-1.5">
            <font-awesome-icon icon="fa-solid fa-floppy-disk" />
          </el-icon>
          <span class="hidden sm:block !ml-0">Save profile</span>
        </el-button>

        <el-button
          type="warning"
          plain
          :disabled="profile.is_default"
          :loading="defaultButtonLoading"
          @click="setProfileDefault"
        >
          <template v-if="profile.is_default">
            <el-icon class="sm:mr-1.5">
              <font-awesome-icon icon="fa-solid fa-check" />
            </el-icon>
            <span class="hidden sm:block !ml-0">Default</span>
          </template>

          <template v-else>
            <el-icon class="sm:mr-1.5">
              <font-awesome-icon icon="fa-solid fa-star" />
            </el-icon>
            <span class="hidden sm:block !ml-0">Set as default</span>
          </template>
        </el-button>

        <el-button
          type="danger"
          plain
          :loading="deleteButtonLoading"
          @click="deleteProfile"
        >
          <el-icon class="sm:mr-1.5">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </el-icon>
          <span class="hidden sm:block !ml-0">Delete</span>
        </el-button>
      </el-button-group>
    </div>

    <div class="hidden xs:block grow text-right">
      <create-profile-dialog
        :profiles="profiles"
        button-class="lg:w-2/6"
        button-size="default"
        hide-label
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Inertia } from '@inertiajs/inertia'
import type { ProfileInterface } from '@/interfaces'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps<{
  profiles: ProfileInterface[]
  profile: ProfileInterface
  disableSaveButton: boolean
}>()

defineEmits<{
  (e: 'saveProfile'): void
}>()

let defaultButtonLoading = $ref(false)
let deleteButtonLoading = $ref(false)

const dropdownProfiles = $computed(() =>
  props.profiles.filter((profile) => profile.id !== props.profile.id)
)

const setProfileDefault = () => {
  defaultButtonLoading = true

  Inertia.put(
    `/profiles/${props.profile.id}`,
    {
      isDefault: true,
    },
    {
      onSuccess: (page) => {
        ElMessage.success({
          message: (page as InertiaPage).props.success,
          duration: 5000,
        })
      },
      onFinish: () => {
        defaultButtonLoading = false
      },
    }
  )
}

const deleteProfile = async () => {
  deleteButtonLoading = true

  if (props.profile.is_default) {
    ElMessage.error({
      message: 'Cannot delete a default profile',
      duration: 10000,
      showClose: true,
    })

    deleteButtonLoading = false

    return
  }

  ElMessageBox.confirm(
    `Are you sure you want to delete the profile ${props.profile.name}?`,
    'Warning',
    {
      type: 'error',
      confirmButtonText: 'Delete',
      confirmButtonClass: 'el-button--danger',
      cancelButtonText: 'Cancel',
    }
  )
    .then(() => {
      Inertia.delete(`/profiles/${props.profile.id}`, {
        onSuccess: (page) => {
          ElMessage.success({
            message: (page as InertiaPage).props.success,
            duration: 5000,
          })
        },
        onFinish: () => {
          deleteButtonLoading = false
        },
      })
    })
    .catch(() => (deleteButtonLoading = false))
}
</script>
