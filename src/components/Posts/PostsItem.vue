<template>
  <tr>
    <th scope="row">{{ sno + 1 }}</th>
    <td>
      <img
        :src="post.featuredImage"
        :style="{ height: '80px' }"
        class="img-fluid img-thumbnail"
        :alt="post.title"
      />
    </td>
    <td>{{ post.title }}</td>
    <td>{{ post.createdAt | dateTime }}</td>
    <td>
      <button
        class="btn btn-primary mr-2 btn-sm"
        @click="$router.push(`/post/${post.id}`)"
      >
        View
      </button>
    </td>
    <td><button class="btn btn-info mr-2 btn-sm">Edit</button></td>
    <td><button class="btn btn-danger btn-sm">Delete</button></td>
  </tr>
</template>

<script>
  import DateTimeMixins from "@/mixins/DateFilters";
  export default {
    mixins: [DateTimeMixins],
    props: {
      sno: {
        type: Number,
        required: true,
      },
      posts: {
        type: Object,
        required: true,
      },
    },
  };
</script>
