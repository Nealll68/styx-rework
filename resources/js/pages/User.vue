<template>
  <v-row align="center" justify="center">
    <v-col md="4" sm="12">
      <v-card>
        <v-card-title>
          <v-icon left>mdi-account-edit</v-icon> Edit my account
        </v-card-title>

        <v-form @submit.prevent="update" ref="updateUserForm">              
          <v-card-text>
            <v-text-field
              v-model="form.username"
              outlined
              label="Username"
              :rules="rules.username"
              :error-messages="form.errors && form.errors.username"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              outlined
              label="Password"    
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="form.password ? rules.password : []"
              :error-messages="form.errors && form.errors.password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn 
              block
              color="primary"
              type="submit" 
              :disabled="!form.isDirty"
              :loading="form.processing"
            >Update</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import useForm from "@/composables/useForm"
import { UserInterface } from "@/interfaces/user"
import { passwordRules, usernameRules } from "@/rules"
import { defineComponent, PropType, reactive, ref } from "@vue/composition-api"

export default defineComponent({
  props: {
    auth: {
      type: Object as PropType<UserInterface>,
      required: true
    }
  },

  setup ({ auth }) {
    const updateUserForm: any = ref(null)
    const showPassword = ref(false)
    const form = useForm({
      username: auth.username,
      password: null
    })
    const rules = reactive({
      username: usernameRules,
      password: passwordRules
    })

    const update = () => {
      if (updateUserForm.value.validate()) {
        form.put(`/user/${auth.id}`)
      }     
    }

    return {
      updateUserForm,
      form,
      rules,
      showPassword,
      update
    }
  }
})
</script>