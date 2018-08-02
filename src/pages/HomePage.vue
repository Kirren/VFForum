<template>
  <div v-if="dataReady">
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import CategoryList from '@/components/CategoryList'
  import dataLoader from '@/mixins/dataLoader'

  export default {
    components: {CategoryList},
    mixins: [dataLoader],
    computed: {
      categories () {
        return Object.values(this.$store.state.categories.all)
      }
    },
    methods: {
      ...mapActions('categories', ['fetchAllCategories']),
      ...mapActions('forums', ['fetchForums'])
    },
    created () {
      this.fetchAllCategories()
        .then(categories => Promise.all(categories.map(category => this.fetchForums({ ids: Object.keys(category.forums) }))))
        .then(() => {
          this.dataFetched()
        })
    }
  }
</script>

<style scoped lang="scss"></style>
