<template>
  <section>
    <v-row class="my-5" align="center">
      <v-col cols="1" class="text-center">        
        <h1>
          <v-icon left>mdi-account-group-outline</v-icon>Users
        </h1>
      </v-col>

      <v-col :class="auth.admin ? 'stripe' : 'stripe mr-3'">
      </v-col>

      <v-col cols="2" class="text-center" v-if="auth.admin">
        <create-user/>
      </v-col>
    </v-row>

    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :loading="usersLoading"
        >
          <template v-slot:[`item.admin`]="{ item }">
            <v-chip 
              v-if="item.admin"
              outlined
              label
              color="error"
            >
              Administrator
            </v-chip>

            <v-chip 
              v-else
              outlined
              label
            >
              User
            </v-chip>
          </template>

          <template v-slot:[`item.actions`]="{ item }" v-if="auth.admin">
            <v-btn
              text
              small
              color="error"
              :disabled="usersLoading"
              @click="deleteUser(item)"
            >
              <v-icon left>mdi-account-remove</v-icon>Delete
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api'
import { injectStrict } from '@/composables/injectStrict'
import CreateUser from '@/components/CreateUser.vue'

import { UserInterface } from '@/interfaces/user'
import { useConfirmKey } from '@/composables/useConfirm'
import { Inertia } from '@inertiajs/inertia'

export default defineComponent({
  props: {
    users: Array as PropType<UserInterface[]>,
    auth: Object as PropType<UserInterface>
  },

  components: {
    CreateUser
  },

  setup () {
    const headers = [
      { text: 'Username', value: 'username' },
      { text: 'Created at', value: 'created_at' },
      { text: 'Authorization', value: 'admin' },
      { text: '', value: 'actions', sortable: false }
    ]
    const usersLoading = ref(false)

    const confirm = injectStrict(useConfirmKey)

    const deleteUser = async (user: UserInterface) => {
      const confirmed = await confirm({
        title: 'Delete user?',
        message: 'This action is ireversible'
      })

      if (confirmed) {
        Inertia.delete(`/users/${user.id}`, {
          onStart: () => usersLoading.value = true,
          onFinish: () => usersLoading.value = false
        })
      }
    }

    return {
      headers,
      usersLoading,
      deleteUser
    }
  }
})
</script>