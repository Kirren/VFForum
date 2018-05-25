<template>
  <span :title="timestamp | date">
    {{timestamp | timeSince}}
  </span>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'BaseDate',
    props: {
      timestamp: {
        required: true,
        type: Number
      }
    },
    filters: {
      date (d) {
        return moment.unix(d).format('MMMM Do YYYY, h:mm:ss a')
      },
      timeSince (d) {
        return moment.unix(d).fromNow()
      }
    }
  }
</script>

<style scoped>

</style>
