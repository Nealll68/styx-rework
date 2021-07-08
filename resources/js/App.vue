<template>
  <v-app>
    <snackbar
      
    ></snackbar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from '@/components/Snackbar.vue'

@Component({
  components: {
    Snackbar
  }
})
export default class App extends Vue {

}

</script>