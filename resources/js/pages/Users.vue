<template>
  <section>
    <v-row class="my-5" align="center">
      <v-col cols="1" class="text-center">        
        <h1>
          <v-icon left>mdi-account-group-outline</v-icon>Users
        </h1>
      </v-col>

      <v-col :class="authUser.is_admin ? 'stripe' : 'stripe mr-3'">
      </v-col>

      <v-col cols="2" class="text-center" v-if="authUser.is_admin">
        <create-user/>
      </v-col>
    </v-row>

    <v-card>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
        >
          <template v-slot:[`item.is_admin`]="{ item }">
            <v-chip 
              v-if="item.is_admin"
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

          <template v-slot:[`item.actions`]="{ item }" v-if="authUser.is_admin">
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

<script>
import CreateUser from '@/components/CreateUser.vue'

export default {
  props: {
    users: Array,
    authUser: Object
  },

  components: {
    CreateUser
  },

  data () {
    return {
      headers: [
        { text: 'Username', value: 'username' },
        { text: 'Created at', value: 'created_at' },
        { text: 'Authorization', value: 'is_admin' },
        { text: '', value: 'actions', sortable: false }
      ]
    }
  },

  methods: {
    deleteUser (user) {
      this.$inertia.delete(`/users/${user.id}`, user)
    }
  }
}
</script>