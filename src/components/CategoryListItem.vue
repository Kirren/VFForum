<template>
  <b-card no-body
          header-tag="header"
          class="mb-3">
    <h6 slot="header" class="mb-0">
      <router-link :to="{name: 'CategoryPage', params: {id: category['.key']}}"
                   class="black-link">
        {{ category.name }}
      </router-link>
    </h6>
    <b-list-group flush>
      <ForumList :forums="categoryForums"/>
    </b-list-group>
  </b-card>
</template>

<script>
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
        return Object.values(this.$store.state.forums).filter(forum => forum.categoryId === this.category['.key'])
      }
    }
  }
</script>

<style scoped>

</style>
