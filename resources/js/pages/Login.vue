<template>
  <v-container 
    class="fill-height" 
    fluid
  >
		<v-row 
      align="center" 
      justify="center"
    >
			<v-col 
        cols="12" 
        sm="8" 
        md="5"
      >
				<v-card>
          <v-card-title class="d-flex flex-column">
            <Logo width="150px" height="150px" />
            <div class="font-weight-thin display-1">STYX</div>
          </v-card-title>

          <v-form 
            v-model="formIsValid" 
            ref="form"
            @submit.prevent="login()"
          >
            <v-card-text>

              <v-text-field 
                v-model="username"
                label="Username"
                name="username"
                prepend-inner-icon="mdi-account"
                filled
                required
                :rules="[v => !!v || 'Username is required']"
              ></v-text-field>

              <v-text-field 
                v-model="password"
                label="Password"
                name="password"
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword" 
                filled
                required
                :rules="[v => !!v || 'Password is required']"
              ></v-text-field>

              <v-checkbox
                v-model="remember"
                label="Remember me"
                color="primary"
                class="mt-0"
              ></v-checkbox>

            </v-card-text>
            <v-card-actions>
              <v-btn 
                type="submit"
                color="primary"
                block            
                :loading="loading"
                :disabled="!formIsValid"
              >Sign in</v-btn>
            </v-card-actions>
					</v-form>
				</v-card>
        <v-card class="mt-3">
          <v-card-text class="text-center">
            Created by <a href="https://www.github.com/Nealll68/styx" target="_blank" rel="noopener noreferrer">Nealll</a>
          </v-card-text>
        </v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/Logo.vue'

import axios from '@/plugins/axios'

@Component({
  components: {
    Logo
  }
})
export default class Login extends Vue {
  username: string = ''
  password: string = ''
  remember: boolean = false
  formIsValid: boolean = false
  showPassword: boolean = false
  loading: boolean = false

  async login (): Promise<void> {
    /*try {
      this.loading = true

      await axios.post('/api/login', {
        username: this.username,
        password: this.password,
        remember: this.remember
      })
      
      console.log("logged")
    } catch (ex) {
      console.log(ex.message)
    } finally {
      this.loading = false
    }*/
    Vue.toast('success', 'Test')
  }
}
</script>