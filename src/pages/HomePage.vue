<template>
  <div v-if="ready">
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import CategoryList from '@/components/CategoryList'

  export default {
    components: {CategoryList},
    data () {
      return {
        ready: false
      }
    },
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
        .then(categories => Promise.all(categories.all(category => this.fetchForums({ ids: Object.keys(category.forums) }))))
        .then(() => {
          this.ready = true
        })
    }
  }
</script>

<style scoped lang="scss"></style>
