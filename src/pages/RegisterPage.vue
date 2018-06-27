<template>
  <b-row class="justify-content-center">
    <b-col cols="12" md="6">
      <form @submit.prevent="register">
        <h1 class="text-center">Register</h1>

        <b-form-group label="Full Name"
                      label-for="name">
          <b-form-input v-model="form.name"
                        id="name"
                        type="text"
                        class="form-input"/>
        </b-form-group>

        <b-form-group label="Username"
                      label-for="username">
          <b-form-input v-model="form.username"
                        id="username"
                        type="text"
                        class="form-input"/>
        </b-form-group>

        <b-form-group label="Email"
                      label-for="email">
          <b-form-input v-model="form.email"
                        id="email"
                        type="email"
                        class="form-input"/>
        </b-form-group>

        <b-form-group label="Password"
                      label-for="email">
          <b-form-input v-model="form.password"
                        id="password"
                        type="password"
                        class="form-input"/>
        </b-form-group>

        <b-form-group label="Avatar"
                      label-for="avatar">
          <b-form-input v-model="form.avatar"
                        id="avatar"
                        type="text"
                        class="form-input"/>
        </b-form-group>

        <b-button-group class="text-center">
          <b-button type="submit" variant="info">Register</b-button>
          <b-button variant="danger">Sign up with Google</b-button>
        </b-button-group>
      </form>
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
          .then(() => this.$router.push('/'))
      }
    },
    created () {
      this.$emit('ready')
    }
  }
</script>

<style scoped>

</style>
