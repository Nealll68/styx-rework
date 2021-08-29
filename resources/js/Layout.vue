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
            color="primary"
            block
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
        <!-- <v-snackbar
          v-if="$page.props.flash && $page.props.flash.success"
          app
          top
          right
          :value="$page.props.flash.success"
          :timeout="6000"
          class="snack-success"
        >
          <v-icon left color="success">mdi-check</v-icon>
          <span v-html="$page.props.flash.success"></span>
        </v-snackbar> -->

        <slot/>
      </v-container>
    </v-main>

    <confirm 
      :value="confirm.show.value" 
      :type="confirm.componentProps.type"
      :title="confirm.componentProps.title"
      :message="confirm.componentProps.message"
      :continueBtnText="confirm.componentProps.continueBtnText"
      :cancelBtnText="confirm.componentProps.cancelBtnText"
      @confirmed="confirm.inform($event)"
    />
  </v-app>
</template>

<script lang="ts">
import { defineComponent, provide, ref, toRefs, watch, inject } from '@vue/composition-api'

import Logo from '@/components/Logo.vue'
import Sidebar from '@/components/Sidebar.vue'
import ServerControls from '@/components/ServerControls.vue'
import Confirm from '@/components/Confirm.vue'

import { useConfirm, useConfirmKey } from '@/composables/useConfirm'

export default defineComponent({
  props: {
    flash: Object
  },

  components: {
    Sidebar,
    Logo,
    ServerControls,
    Confirm
  },

  setup(props) {
    const { flash } = toRefs(props)
    const sidebar = ref(null)
    const confirm = useConfirm()

    provide(useConfirmKey, confirm.confirm)
    const notyf: any = inject('notyf')

    watch(flash!, (value) => {
      if (value?.success) {
        notyf.success(value.success)
      }
    })

    return {
      sidebar,
      confirm
    }
  }
})
</script>