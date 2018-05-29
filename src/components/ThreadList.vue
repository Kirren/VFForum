<template>
  <b-list-group>
    <ThreadListItem
      v-for="thread in threads"
      :thread="thread"
      :key="thread['.key']"
    />
  </b-list-group>
</template>

<script>
  import ThreadListItem from './ThreadListItem'

  export default {
    name: 'ThreadList',
    components: {ThreadListItem},
    props: {
      threads: {
        required: true,
        type: Array
      }
    }
  }
</script>
