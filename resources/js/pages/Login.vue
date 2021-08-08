<template>  
  <v-app>
    <AppHead title="Login"/>
    
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
                    v-if="$page.props.errors && $page.props.errors.credentials"
                    type="error"
                    border="left"
                    dense
                    text
                  >
                    {{ $page.props.errors.credentials }}
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
                    color="primary"
                    block
                    :disabled="!formValid"
                    :loading="false"
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

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api'
import { Inertia } from '@inertiajs/inertia'
import AppHead from '@/components/AppHead.vue'
import Logo from '@/components/Logo.vue'

export default defineComponent({
  components: {
    Logo,
    AppHead
  },

  setup() {
    const form = reactive({
      username: null,
      password: null,
      remember: false
    }) 
    const rules = reactive({
      required: (value: string) => !!value || 'Required'
    })
    const formValid = ref(false)
    const showPassword = ref(false)

    function login (): void {
      if (formValid) {
        Inertia.post('/login', form)        
      }
    }

    return {
      form, 
      rules,
      formValid,
      showPassword,
      login,
    }
  }
})
</script>