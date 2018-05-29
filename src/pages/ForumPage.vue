<template>
  <div>

    <!--<ul class="breadcrumbs">
      <li><a href="/index.html"><i class="fa fa-home fa-btn"></i>Home</a></li>
      <li><a href="/category.html">Discussions</a></li>
      <li class="active"><a href="#">Cooking</a></li>
    </ul>-->

    <b-row class="mb-5" align-v="center">
      <b-col>
        <h1>{{forum.name}}</h1>
        <p class="text-lead">
          {{forum.description}}
        </p>
      </b-col>
      <b-col class="text-right">
        <button class="btn btn-success btn-small">Start a thread</button>
      </b-col>
    </b-row>

    <ThreadList :threads="threads"/>


    <!--<div class="pagination">
			<button class="btn-circle" disabled=""><i class="fa fa-angle-left"></i></button>
			1 of 3
			<button class="btn-circle"><i class="fa fa-angle-right"></i></button>
		</div>-->
  </div>
</template>

<script>
  import sourceData from '@/data'
  import ThreadList from '@/components/ThreadList'

  export default {
    name: 'ForumPage',
    components: { ThreadList },
    props: {
      id: {
        required: true,
        type: String
      }
    },
    computed: {
      forum () {
        return sourceData.forums[this.id]
      },
      threads () {
        return Object.values(sourceData.threads)
          .filter(thread => thread.forumId === this.id)
      }
    }
  }
</script>

<style scoped>

</style>
