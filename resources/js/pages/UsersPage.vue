<template>
  <el-col class="mb-8">
    <el-row justify="space-between">
      <el-col :span="4">
        <h1 class="text-4xl font-bold">Users</h1>
      </el-col>
      <el-col
        :span="4"
        class="text-right"
      >
        <add-user-dialog :users="users" />
      </el-col>
    </el-row>
  </el-col>

  <el-col>
    <el-card>
      <el-table
        :data="users"
        stripe
      >
        <el-table-column
          prop="username"
          label="Username"
        />

        <el-table-column
          prop="admin"
          label="Role"
        >
          <template #default="scope">
            <el-tag :type="scope.row.admin ? 'danger' : 'info'">
              {{ scope.row.admin ? 'Administrator' : 'Member' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="created_at"
          label="Created"
        >
          <template #default="scope">
            {{ dayjs(scope.row.created_at).format('L') }}
          </template>
        </el-table-column>

        <el-table-column labe="Actions">
          <template #default="scope">
            <template v-if="scope.row.id !== user.id">
              <el-button
                type="info"
                size="small"
                plain
                :disabled="scope.row.admin && lastAdmin ? true : false"
                @click="updateAdmin(scope.row, !scope.row.admin)"
              >
                {{
                  scope.row.admin ? 'Downgrade to member' : 'Upgrade to admin'
                }}
              </el-button>

              <el-button
                type="danger"
                size="small"
                plain
                @click="deleteUser(scope.row)"
              >
                Delete
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-col>
</template>

<script lang="ts" setup>
import { Inertia } from '@inertiajs/inertia'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useDate } from '@/composables'
import type { UserInterface } from '@/interfaces/user'

const props = defineProps<{
  users: UserInterface[]
  user: UserInterface
}>()

const lastAdmin = $computed(
  () => props.users.filter((user) => user.admin).length === 1
)

const { dayjs } = useDate()

const updateAdmin = (user: UserInterface, admin: boolean) => {
  console.log('update role', user, admin)
  Inertia.put(
    `/users/${user.id}`,
    {
      ...user,
      admin,
    },
    {
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
    }
  )
}

const deleteUser = (user: UserInterface) => {
  ElMessageBox.confirm(
    `Are you sure you want to delete the user ${user.username}?`,
    'Warning',
    {
      type: 'error',
      confirmButtonText: 'Delete',
      confirmButtonClass: 'el-button--danger',
      cancelButtonText: 'Cancel',
    }
  )
    .then(() => {
      Inertia.delete(`/users/${user.id}`, {
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
    })
    .catch(() => {})
}
</script>
