<template>
  <v-dialog
    v-model="value"
    max-width="600px"
    @input="closeDialog"
  >
    <v-card>
      <v-card-title>
        <v-icon left>mdi-account-plus-outline</v-icon> Edit user
      </v-card-title>

      <v-form @submit.prevent="update" ref="editUserForm">              
        <v-card-text>
          <v-text-field
            v-model="user.username"
            outlined
            label="Username"
            :rules="rules.username"
            :error-messages="$page.props.errors && $page.props.errors.username"
            :counter="30"
          ></v-text-field>

          <v-switch
            v-model="user.admin"
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
            :loading="loading"
          >Validate</v-btn>

          <v-btn
            text
            width="40%"
            @click="closeDialog"
          >Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, toRefs } from "@vue/composition-api"
import { usernameRules } from '@/rules'
import { UserInterface } from "@/interfaces/user"
import { Inertia } from "@inertiajs/inertia"

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    user:  {
      type: Object as PropType<UserInterface>,
      required: true
    }
  },

  setup (props, { emit }) {
    const { user } = toRefs(props)
    const showPassword = ref(false)
    const loading = ref(false)
    const editUserForm: any = ref(null)
    const rules = reactive({
      username: usernameRules,
    })

    const update = async () => {
      if (editUserForm.value.validate()) {
        Inertia.put(`/users/${user.value.id}`, {
          onStart: () => loading.value = true,
          onSuccess: () => closeDialog,
          onFinish: () => loading.value = false
        })        
      }      
    }

    const closeDialog = () => {
      editUserForm.value.resetValidation()
      emit('input', false)
    }

    return {
      showPassword,
      editUserForm,
      loading,
      rules,
      update,
      closeDialog
    }
  }
})
</script>