<template>
  <div class="thread-list">
    <h2>Threads</h2>
    <div class="container-fluid">
      <ThreadListItem
        v-for="thread in threads"
        :thread="thread"
        :key="thread['.key']"
      />
    </div>
  </div>
</template>

<script>
  import ThreadListItem from './ThreadListItem'

  export default {
    components: {ThreadListItem},
    props: {
      threads: {
        required: true,
        type: Array
      }
    }
  }
</script>
