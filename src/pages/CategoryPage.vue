<template>
  <div v-if="dataReady">
    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import CategoryListItem from '@/components/CategoryListItem'
  import dataLoader from '@/mixins/dataLoader'

  export default {
    name: 'CategoryPage',
    components: {CategoryListItem},
    mixins: [dataLoader],
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
    methods: {
      ...mapActions(['fetchCategory', 'fetchForums'])
    },
    created () {
      this.fetchCategory({id: this.id})
        .then(category => this.fetchForums({ids: category.forums}))
        .then(() => { this.dataFetched() })
    }
  }
</script>

<style scoped>

</style>
