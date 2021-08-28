<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="primary"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon left>mdi-account-plus</v-icon>
        Add user
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <v-icon left>mdi-account-plus-outline</v-icon> Create user
      </v-card-title>

      <v-form @submit.prevent="store" ref="createUserForm">              
        <v-card-text>
          <v-text-field
            v-model="form.username"
            outlined
            label="Username"
            :rules="rules.username"
            :error-messages="form.errors && form.errors.username"
            :counter="30"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            outlined
            label="Password"  
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="rules.password"
            :error-messages="form.errors && form.errors.password"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-switch
            v-model="form.admin"
            label="Administrator"
            color="error"
            class="mt-0"
          ></v-switch>
        </v-card-text>

        <v-card-actions class="justify-center stripe">
          <v-btn 
            type="submit"
            color="primary"
            width="40%"
            :loading="form.processing"
          >Create</v-btn>

          <v-btn
            text
            width="40%"
            @click="dialog = !dialog"
          >Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api"
import { passwordRules, usernameRules } from '@/rules'
import useForm from '@/composables/useForm'

export default defineComponent({
  setup () {    
    const dialog = ref(false)
    const showPassword = ref(false)
    const createUserForm: any = ref(null)
    const form = useForm({
      username: null,
      password: null,
      admin: false
    })
    const rules = reactive({
      username: usernameRules, 
      password: passwordRules,
    })

    const store = async () => {
      if (createUserForm.value.validate()) {
        form.post('/users', {
          onSuccess: () => {
            form.reset()
            dialog.value = false
          }
        })        
      }      
    }

    return {
      dialog,
      showPassword,
      createUserForm,
      form,
      rules,
      store
    }
  }
})
</script>