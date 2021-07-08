<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="accent"
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
            :error-messages="form.errors.username"
            :counter="30"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            outlined
            label="Password"  
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :rules="rules.password"
            :error-messages="form.errors.password"  
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-checkbox
            v-model="form.is_admin"
            label="Administrator"
            color="error"
          ></v-checkbox>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn 
            type="submit"
            color="accent"
            :loading="form.processing"
          >Create</v-btn>

          <v-btn
            text
            color="error"
            @click="dialog = !dialog"
          >Cancel</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      showPassword: false,

      form: this.$inertia.form({
        username: null,
        password: null,
        is_admin: false
      }),

      rules: {
        username: [
          v => !!v || 'Required',
          v => (v || '').length <= 30 || 'Maximum 30 characters authorized'
        ],
        password: [
          v => !!v || 'Required',
          v => (v || '').length >= 8 || 'Minimum 8 characters required',
          v => /^(?=.*[a-z])/.test(v) || 'Must contain at least 1 lowercase character',
          v => /^(?=.*[A-Z])/.test(v) || 'Must contain at least 1 uppercase character',
          v => /^(?=.*[0-9])/.test(v) || 'Must contain at least 1 numeric character',
          v => /(?=.*?[#?!@$%^&*-])/.test(v) || 'Must contain at least 1 special character'
        ],
      }
    }
  },

  methods: {
    store () {
      if (this.$refs.createUserForm.validate()) {
        this.form.post('/users', {
          onSuccess: () => { 
            this.dialog = false
            this.form.reset()
          }
        })
      }
    }
  }
}
</script>