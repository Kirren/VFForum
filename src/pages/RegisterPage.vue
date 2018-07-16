<template>
  <b-row class="justify-content-center">
    <b-col cols="12" md="6">
      <b-form @submit.prevent="register">
        <b-card>
          <h1 class="text-center">Register</h1>

          <b-form-group label="Full Name"
                        label-for="name">
            <b-form-input v-model="form.name"
                          id="name"
                          type="text"/>
          </b-form-group>

          <b-form-group label="Username"
                        label-for="username">
            <b-form-input v-model="form.username"
                          id="username"
                          type="text"/>
          </b-form-group>

          <b-form-group label="Email"
                        label-for="email">
            <b-form-input v-model="form.email"
                          id="email"
                          type="email"/>
          </b-form-group>

          <b-form-group label="Password"
                        label-for="email">
            <b-form-input v-model="form.password"
                          id="password"
                          type="password"/>
          </b-form-group>

          <b-form-group label="Avatar"
                        label-for="avatar">
            <b-form-input v-model="form.avatar"
                          id="avatar"
                          type="text"/>
          </b-form-group>

          <b-form-group class="text-center mb-0">
            <b-button-group>
              <b-button type="submit" variant="info">Register</b-button>
              <b-button variant="danger" @click="registerWithGoogle">Sign up with Google</b-button>
            </b-button-group>
          </b-form-group>

        </b-card>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'RegisterPage',
    data () {
      return {
        form: {
          name: null,
          username: null,
          email: null,
          password: null,
          avatar: null
        }
      }
    },
    methods: {
      register () {
        this.$store.dispatch('registerUserWithEmailAndPassword', this.form)
          .then(() => this.successRedirect())
          .catch(error => alert('🤷‍️' + error.message))
      },
      registerWithGoogle () {
        this.$store.dispatch('signInWithGoogle')
          .then(() => this.successRedirect())
          .catch(error => alert('🤷‍️' + error.message))
      },
      successRedirect () {
        const redirectTo = this.$route.query.redirectTo || {name: 'HomePage'}
        this.$router.push(redirectTo)
      }
    },
    created () {
      this.$emit('ready')
    }
  }
</script>

<style scoped>

</style>
