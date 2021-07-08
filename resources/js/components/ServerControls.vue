<template>
  <article>
    <v-btn
      text
      color="success"
      :disabled="disabled"
      :loading="startLoading"
      @click="start()"
    >
      <v-icon left>mdi-play</v-icon>Start
    </v-btn>

    <v-btn
      text
      color="warning"
      :loading="restartLoading"
      :disabled="disabled"
      @click="restart()"
    >
      <v-icon left>mdi-restart</v-icon>Restart
    </v-btn>

    <v-btn
      text
      color="error"
      :loading="stopLoading"
      :disabled="disabled"
      @click="stop()"
    >
      <v-icon left>mdi-stop</v-icon>Stop
    </v-btn>
  </article>
</template>

<script>
export default {
  data () {
    return {
      startLoading: false,
      restartLoading: false,
      stopLoading: false,
    }
  },

  computed: {
    disabled: function () {
      return this.startLoading || this.restartLoading || this.stopLoading
    }
  },

  methods: {
    async start () {
      this.startLoading = true

      await axios.get('/server/start')

      this.startLoading = false
    },

    async restart () {
      
    },

    async stop () {
      this.stopLoading = true

      axios.get('/server/stop')

      this.stopLoading = false
    }
  }
}
</script>