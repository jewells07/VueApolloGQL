<template
  ><table class="table mt-4">
    <thead>
      <tr>
        <th scope="col">#Sno</th>
        <th scope="col">Featured Image</th>
        <th scope="col">Title</th>
        <th scope="col">Created At</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <PostsItem
        v-for="(post, i) in posts"
        @delete-post="$emit('delete-post')"
        :key="post.id"
        :post="post"
        :sno="i"
      />
    </tbody>
  </table>
</template>

<script>
  import PostsItem from "./PostsItem";
  export default {
    components: {
      PostsItem,
    },
    props: {
      posts: {
        type: Array,
        required: true,
      },
    },
  };
</script>
