<template>
  <Head :title="title ? `${title} - Styx` : 'Styx'">
    <slot />
  </Head>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Head } from '@inertiajs/inertia-vue'

export default defineComponent({
  components: {
    Head
  },

  props: {
    title: String
  }
})
</script>
