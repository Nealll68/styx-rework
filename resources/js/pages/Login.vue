<template>
  <h1>Login</h1>
	<!--<v-container 
    class="fill-height" 
    fluid
  >
    <h1>Login</h1>
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
                @click="login"                
                :loading="loading"
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
	</v-container>-->
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
   username: string
   password: string
   rememberMe: boolean = false
   formIsValid: boolean = false
   showPassword: boolean = false
   loading: boolean = false

   async login (): Promise<void> {
     console.log('login')
   }
}
</script>