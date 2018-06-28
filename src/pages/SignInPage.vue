<template>
  <b-row class="justify-content-center">
    <b-col cols="12" md="6">

      <b-form @submit.prevent="signIn" class="mb-3">
        <b-card>
          <h1 class="text-center">Sign In</h1>

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

          <b-form-group class="text-center">
            <b-button type="submit" variant="info" class="btn-block">Sign in</b-button>
          </b-form-group>
          <div class="text-right">
            <router-link :to="{name: 'RegisterPage'}">
              Create an account?
            </router-link>
          </div>
        </b-card>

      </b-form>

      <div class="text-center">
        <b-button variant="danger" size="sm">
          <i class="fa fa-google fa-btn"></i>
          Sign in with Google
        </b-button>
      </div>

    </b-col>
  </b-row>
</template>

<script>
  export default {
    name: 'SignInPage',
    data () {
      return {
        form: {
          email: null,
          password: null
        }
      }
    },
    methods: {
      signIn () {
        this.$store.dispatch('signInWithEmailAndPassword', {
          email: this.form.email,
          password: this.form.password
        })
          .then(() => this.$router.push('/'))
          .catch((error) => alert(error.message))
      }
    },
    created () {
      this.$emit('ready')
    }
  }
</script>

<style scoped>

</style>
