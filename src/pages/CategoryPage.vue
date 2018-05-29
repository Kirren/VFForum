<template>
  <div>
    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
  import CategoryListItem from '@/components/CategoryListItem'

  export default {
    name: 'CategoryPage',
    components: {CategoryListItem},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      category () {
        return this.$store.state.categories[this.id]
      }
    }
  }
</script>

<style scoped>

</style>
