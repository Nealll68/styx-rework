<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row align="center" justify="center">
          <v-col md="4" sm="12">
            <v-card>
              <v-card-title class="d-flex flex-column">
                <logo width="150px" height="150px"/>
              </v-card-title>

              <v-form v-model="formValid" @submit.prevent="login">              
                <v-card-text>
                  <v-alert 
                    v-if="errors && errors.credentials"
                    type="error"
                    border="left"
                    dense
                    text
                  >
                    {{ errors.credentials }}
                  </v-alert>

                  <v-text-field
                    v-model="form.username"
                    outlined
                    label="Username"
                    :rules="[rules.required]"
                  ></v-text-field>

                  <v-text-field
                    v-model="form.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    outlined
                    label="Password"  
                    :rules="[rules.required]"      
                  ></v-text-field>

                  <v-switch
                    v-model="form.remember"
                    inset
                    label="Remember me"
                    class="mt-0"
                  ></v-switch>
                </v-card-text>

                <v-card-actions>
                  <v-btn 
                    type="submit"
                    color="accent" 
                    block
                    :disabled="!formValid"
                    :loading="form.processing"
                  >Sign in</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>  
</template>

<script>
import Logo from '@/components/Logo.vue'

export default {
  props: {
    errors: Object
  },

  components: {
    Logo
  },

  data () {
    return {
      form: this.$inertia.form({
        username: null,
        password: null,
        remember: false
      }),
      formValid: false,
      showPassword: false,

      rules: {
        required: value => !!value || 'Required'
      }
    }
  },

  methods: {
    async login () {
      if (this.formValid) {
        this.form.post('/login')
      }
    }
  }
}
</script>