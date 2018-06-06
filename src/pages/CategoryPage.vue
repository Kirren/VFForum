<template>
  <div v-if="category">
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
    },
    created () {
      this.$store.dispatch('fetchCategory', {id: this.id})
        .then(category => {
          this.$store.dispatch('fetchForums', {ids: category.forums})
        })
    }
  }
</script>

<style scoped>

</style>
