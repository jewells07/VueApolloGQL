<template>
  <div class="card post-card">
    <img :src="post.featuredImage" class="card-img-top" :alt="post.title" />
    <div class="card-body">
      <h4 class="text-primary">{{ post.title }}</h4>
      <p class="card-text">
        By {{ post.author.firstName }} {{ post.author.lastName }}
      </p>
      <p class="card-text">Published On {{ post.createdAt | dateTime }}</p>
      <button
        class="btn btn-primary mr-2"
        @click="$router.push(`/post/${post.id}`)"
      >
        Read More
      </button>
    </div>
  </div>
</template>

<script>
  import DateTimeMixins from "@/mixins/DateFilters";
  export default {
    mixins: [DateTimeMixins],
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  };
</script>
