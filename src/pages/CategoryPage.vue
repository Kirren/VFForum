<template>
  <div>
    <h2>{{category.name}}</h2>
    <CategoryListItem :category="category"/>
    <!--<ForumList :forums="categoryForums"/>-->
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ForumList from '@/components/ForumList'
  import CategoryListItem from '@/components/CategoryListItem'

  export default {
    name: 'CategoryPage',
    components: {CategoryListItem, ForumList},
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      category () {
        return sourceData.categories[this.id]
      },
      categoryForums () {
        return Object.values(sourceData.forums).filter(forum => forum.categoryId === this.category['.key'])
      }
    }
  }
</script>

<style scoped>

</style>
