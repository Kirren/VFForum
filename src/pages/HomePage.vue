<template>
  <div>
    <CategoryList :categories="categories"/>
  </div>
</template>

<script>
  import CategoryList from '@/components/CategoryList'

  export default {
    components: {CategoryList},
    computed: {
      categories () {
        return Object.values(this.$store.state.categories)
      }
    }
  }
</script>

<style scoped lang="scss"></style>
