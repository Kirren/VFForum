<template>
  <div>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import CategoryList from '@/components/CategoryList'

  export default {
    components: {CategoryList},
    data () {
      return {
        categories: Object.values(sourceData.categories)
      }
    }
  }
</script>

<style scoped lang="scss"></style>
