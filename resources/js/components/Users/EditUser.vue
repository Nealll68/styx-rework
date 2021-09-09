<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        small
        v-on="on"
        v-bind="attrs"
      >
        <v-icon left>mdi-account-remove</v-icon>Edit
      </v-btn>
    </template>
    
    <v-card>
      <v-card-title>
        <v-icon left>mdi-account-plus-outline</v-icon> Edit user
      </v-card-title>

      <v-form @submit.prevent="update" ref="editUserForm">              
        <v-card-text>
          <v-text-field
            v-model="editForm.username"
            outlined
            label="Username"
            :rules="rules.username"
            :error-messages="editForm.errors && editForm.errors.username"
            :counter="30"
          ></v-text-field>

          <v-switch
            v-model="editForm.admin"
            :error-messages="editForm.errors && editForm.errors.admin"
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
            :loading="editForm.processing"
          >Validate</v-btn>

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
import { defineComponent, PropType, reactive, ref } from "@vue/composition-api"
import { usernameRules } from '@/rules'
import { UserInterface } from "@/interfaces/user"
import useForm from "@/composables/useForm"

export default defineComponent({
  props: {
    user:  {
      type: Object as PropType<UserInterface>,
      required: true
    }
  },

  setup ({ user }) {
    const dialog = ref(false)
    const showPassword = ref(false)
    const editUserForm: any = ref(null)
    const editForm = useForm({
      username: user.username,
      admin: user.admin
    })

    const rules = reactive({
      username: usernameRules
    })

    const update = () => {
      if (editUserForm.value.validate()) {
        editForm.put(`/users/${user.id}`, {
          onSuccess: () => {
            editForm.reset()
            dialog.value = false
          }
        })
      }      
    }

    return {
      showPassword,
      editUserForm,
      rules,
      update,
      editForm,
      dialog
    }
  }
})
</script>