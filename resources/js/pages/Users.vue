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
import CreateUser from '@/components/CreateUser.vue'
import { AuthInterface } from '@/interfaces/auth'

export default defineComponent({
  props: {
    users: Array,
    auth: Object as PropType<AuthInterface>
  },

  components: {
    CreateUser
  },

  setup() {
    const headers = ref([
      { text: 'Username', value: 'username' },
      { text: 'Created at', value: 'created_at' },
      { text: 'Authorization', value: 'is_admin' },
      { text: '', value: 'actions', sortable: false }
    ])

    const deleteUser = () => {
      console.log('delete user')
    }

    return {
      headers,
      deleteUser
    }
  }
})
</script>