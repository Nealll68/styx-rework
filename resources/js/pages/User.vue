<template>
  <v-row align="center" justify="center">
    <v-col md="4" sm="12">
      <v-card>
        <v-card-title>
          <v-icon left>mdi-account-edit</v-icon> Edit my account
        </v-card-title>

        <v-form @submit.prevent="update()" ref="updateUserForm">              
          <v-card-text>
            <v-text-field
              v-model="form.username"
              outlined
              label="Username"
              :rules="rules.username"
              :error-messages="form.errors.username"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              outlined
              label="Password"    
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="form.password ? rules.password : []"
              :error-messages="form.errors.password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn 
              block
              color="accent"
              type="submit" 
              :loading="form.processing"
              @click="update()"
            >Update</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    errors: Object,
    authUser: Object
  },

  data () {
    return {
      form: this.$inertia.form({
        id: this.authUser.id,
        username: this.authUser.username,
        password: null
      }),
      showPassword: false,

      rules: {
        username: [
          v => !!v || 'Required',
          v => (v || '').length <= 30 || 'Maximum 30 characters authorized'
        ],
        password: [
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
    update () {
      if (this.$refs.updateUserForm.validate()) {
        this.form.put(`/users/${this.form.id}`, this.form)
      }
    }
  }
}
</script>