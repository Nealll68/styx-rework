<template>
  <section>
    <AppHead title="Dashboard"/>
    <h1>Dashboard</h1>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import AppHead from '@/components/AppHead.vue'

import { UserInterface } from '@/interfaces/user'

export default defineComponent({
  components: {
    AppHead
  },

  props: {
    auth: Object as PropType<UserInterface>
  },

  setup(props) {
    console.log(props)
  },
})
</script>
