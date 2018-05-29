<template>
  <div>
    <CategoryListItem :category="category"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
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
        return sourceData.categories[this.id]
      }
    }
  }
</script>

<style scoped>

</style>
