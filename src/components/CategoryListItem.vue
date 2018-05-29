<template>
  <div>
    <h2>
      <router-link :to="{name: 'CategoryPage', params: {id: category['.key']}}">
        {{ category.name }}
      </router-link>
    </h2>
    <ForumList :forums="categoryForums"/>
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ForumList from '@/components/ForumList'

  export default {
    name: 'CategoryListItem',
    components: {ForumList},
    props: {
      category: {
        required: true,
        type: Object
      }
    },
    computed: {
      categoryForums () {
        return Object.values(sourceData.forums).filter(forum => forum.categoryId === this.category['.key'])
      }
    }
  }
</script>

<style scoped>

</style>
