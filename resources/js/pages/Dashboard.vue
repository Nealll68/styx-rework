<template>
  <section>
    <AppHead title="Dashboard"/>
    <h1>Dashboard</h1>
    <button @click="confirm">Test confirm</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import AppHead from '@/components/AppHead.vue'

import { UserInterface } from '@/interfaces/user'

import { useTestConfirm } from '@/composables/useTestConfirm'

export default defineComponent({
  components: {
    AppHead
  },

  props: {
    auth: Object as PropType<UserInterface>
  },

  setup() {
    // const confirm = useTestConfirm()
    const confirm = async () => {
      const confirmed = await useTestConfirm({
        title: 'test',
        message: 'blgzlgzk'
      })

      console.log(confirmed)
    }

    return {
      confirm
    }
  }
})
</script>
