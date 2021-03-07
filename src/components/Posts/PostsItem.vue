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
    <td>
      <button
        class="btn btn-info mr-2 btn-sm"
        @click="$router.push(`/dashboard/add-post?edit=${post.id}`)"
      >
        Edit
      </button>
    </td>
    <td>
      <button class="btn btn-danger btn-sm" @click="deletePost">Delete</button>
    </td>
  </tr>
</template>

<script>
  import gql from "graphql-tag";
  import DateTimeMixins from "@/mixins/DateFilters";
  export default {
    mixins: [DateTimeMixins],
    props: {
      sno: {
        type: Number,
        required: true,
      },
      post: {
        type: Object,
        required: true,
      },
    },
    data: () => ({
      deleteMutation: `
      mutation DeletePost($id: ID!){
          deletePostById(id: $id){
            message
            success
          }
        }
        `,
    }),
    methods: {
      async deletePost() {
        let { data } = await this.$apollo.mutate({
          mutation: gql`
            ${this.deleteMutation}
          `,
          variables: { id: this.post.id },
        });

        // eslint-disable-next-line
        Toast.fire({ icon: "success", title: data.deletePostById.message });
        this.$emit("delete-post");
      },
    },
  };
</script>
