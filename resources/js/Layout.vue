<template>
  <v-app>
    <v-navigation-drawer
      v-model="sidebar"
      app
      color="#272727"
      floating
    >
      <sidebar />

      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            block
            color="accent"
            depressed
            @click="$inertia.visit('/users/show')"
            class="mb-2"
          >
            <v-icon left>mdi-account</v-icon>
            Account
          </v-btn>

          <v-btn
            block
            color="error"
            plain
            @click="$inertia.visit('/logout')"
          >
            <v-icon left>mdi-logout-variant</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      dense
    >
      <v-app-bar-nav-icon class="d-lg-none" @click="sidebar = !sidebar"></v-app-bar-nav-icon>

      <v-app-bar-title class="pl-0 pt-1">
        <logo width="50px" height="50px"/>
      </v-app-bar-title>

      <v-spacer></v-spacer>
  
      <server-controls/>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-snackbar
          app
          top
          right
          :value="flash.success"
          :timeout="6000"
          class="snack-success"
        >
          <v-icon left color="success">mdi-check</v-icon>{{ flash.success }}
        </v-snackbar>

        <slot/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Logo from '@/components/Logo.vue'
import Sidebar from '@/components/Sidebar.vue'
import ServerControls from '@/components/ServerControls.vue'

export default {
  props: {
    flash: Object,
  },

  components: {
    Sidebar,
    Logo,
    ServerControls
  },

  data () {
    return {
      sidebar: null
    }
  },
}
</script>