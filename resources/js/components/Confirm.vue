<template>
  <v-dialog
    :value="value"
    max-width="500"
    persistent
  >
    <v-card>
      <v-progress-linear
        :value="100"
        :color="type"
      ></v-progress-linear>

      <v-card-title primary-title>
        <v-icon 
          v-if="type === 'error'"
          left
          color="error"
        >mdi-alert</v-icon>

        <v-icon 
          v-if="type === 'warning'"
          left
          color="warning"
        >mdi-exclamation-thick</v-icon>
        {{ title }}
      </v-card-title>

      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions class="justify-center stripe">
        <v-btn
          text
          width="40%"
          @click="cancel"
        >{{ cancelBtnText }}</v-btn>

        <v-btn
          :color="type"
          width="40%"
          @click="confirm"
        >{{ continueBtnText }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    type: {
      type: String,
      required: false,
      default: 'error'
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    continueBtnText: {
      type: String,
      required: false,
      default: 'Continue'
    },
    cancelBtnText: {
      type: String,
      required: false,
      default: 'Cancel'
    },
    confirmFunction: {
      type: Function,
      required: false
    },
    cancelFunction: {
      type: Function,
      required: false
    }
  },

  setup({}, { emit }) {
    const confirm = () => {
      emit('confirmed', true)
    }

    const cancel = () => {
      emit('confirmed', false)
    }

    return {
      confirm,
      cancel
    }
  },
})
</script>
