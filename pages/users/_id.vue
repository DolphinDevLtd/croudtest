<template>
  <div>
    <div v-if="userExist">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="formData.name"
          :counter="50"
          :rules="nameRules"
          label="Name"
          required
        />
        <v-text-field
          v-model="formData.email"
          :rules="emailRules"
          label="E-mail"
          required
        />
        <v-text-field
          v-model="formData.company"
          :rules="companyRules"
          :counter="50"
          label="Company"
          required
        />
        <v-btn
          :disabled="!valid"
          @click="validate"
        >
          update
        </v-btn>
      </v-form>
    </div>
    <div v-else>
      No user found
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  data: () => ({
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name must be less than 50 characters'
    ],
    companyRules: [
      v => !!v || 'Company is required',
      v => (v && v.length <= 50) || 'Company must be less than 50 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    formData: {
      name: '',
      email: '',
      company: ''
    }
  }),

  computed: {
    ...mapState('users', {
      currentUser: state => state.user[0]
    }),
    ...mapGetters('users', {
      userExist: 'userExist'
    })
  },
  async created() {
    await this.getUser(this.$route.params.id)
    if (this.userExist) {
      this.formData.name = this.currentUser.name
      this.formData.email = this.currentUser.email
      this.formData.company = this.currentUser.company.name
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const payload = {
          id: this.currentUser.id,
          name: this.formData.name,
          email: this.formData.email,
          company: {
            name: this.formData.company
          }
        }
        this.updateUser(payload)
      }
    },
    ...mapActions('users', [
      'getUser',
      'updateUser'
    ])
  }
}
</script>
