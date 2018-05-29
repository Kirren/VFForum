<template>
  <b-list-group>
    <ForumListItem
      v-for="forum in forums"
      :forum="forum"
      :key="forum['.key']"
    />
  </b-list-group>
</template>

<script>
  import ForumListItem from './ForumListItem'

  export default {
    name: 'ForumList',
    components: {ForumListItem},
    props: {
      forums: {
        required: true,
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>
