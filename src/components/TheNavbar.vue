<template>
  <b-col>
		<b-navbar toggleable="md" sticky>
      <b-navbar-toggle target="navCollapse"></b-navbar-toggle>
      <b-navbar-brand :to="{name: 'HomePage'}">Home</b-navbar-brand>
      <b-collapse is-nav id="navCollapse">
        <b-navbar-nav>
          <b-nav-item href="#">Category</b-nav-item>
          <b-nav-item href="#">Forum</b-nav-item>
          <b-nav-item href="#">Thread</b-nav-item>
          <b-nav-item class="d-none d-sm-block d-md-none" href="#">My Profile</b-nav-item>
          <b-nav-item class="d-none d-sm-block d-md-none" href="#">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="user" class="ml-auto">
          <b-nav-item-dropdown :text="user.name" right>
            <b-dropdown-item :to="{name: 'ProfilePage', props: {id: user.id}}">View profile</b-dropdown-item>
            <b-dropdown-item href="#">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
		</b-navbar>
  </b-col>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'TheNavbar',
    computed: {
      ...mapGetters({
        'user': 'authUser'
      })
    }
  }
</script>

<style scoped>

</style>
