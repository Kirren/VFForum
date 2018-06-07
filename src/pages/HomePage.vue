<template>
  <div>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import CategoryList from '@/components/CategoryList'

  export default {
    components: {CategoryList},
    computed: {
      categories () {
        return Object.values(this.$store.state.categories)
      }
    },
    methods: {
      ...mapActions(['fetchAllCategories', 'fetchForums'])
    },
    created () {
      this.fetchAllCategories()
        .then(categories => {
          categories.forEach(category => {
            this.fetchForums({ids: Object.keys(category.forums)})
          })
        })
    }
  }
</script>

<style scoped lang="scss"></style>
