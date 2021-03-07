<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">
            {{ editMode ? "Edit Post" : "Add Post" }}
          </h3>
          <hr />
          <div class="row">
            <div class="col-md-7">
              <div class="form-group">
                <label for="title" class="text-primary font-weight-bold"
                  >Title</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model="newPost.title"
                />
              </div>
              <div class="form-group">
                <label for="content" class="text-primary font-weight-bold"
                  >Content</label
                >
                <VueEditor v-model="newPost.content" />
              </div>
              <div class="form-group">
                <input type="hidden" v-model="newPost.featuredImage" />
              </div>
              <div class="form-group">
                <button
                  :disabled="isLoading"
                  v-if="!editMode"
                  class="btn btn-primary"
                  @click="addNewPost"
                >
                  Add Post
                </button>
                <button
                  :disabled="isLoading"
                  v-else
                  class="btn btn-primary"
                  @click="updatePost"
                >
                  Update Post
                </button>
              </div>
            </div>
            <div class="col-md-5">
              <div class="form-group">
                <input
                  type="file"
                  class="form-control"
                  ref="imageUploader"
                  @change="uploadImage"
                />
              </div>
              <div class="form-group" v-if="newPost.featuredImage">
                <img
                  class="img-thumbnail img-fuild"
                  :src="newPost.featuredImage"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from "graphql-tag";
  import { VueEditor } from "vue2-editor";
  export default {
    components: {
      VueEditor,
    },
    computed: {
      editMode() {
        return !!this.$route.query.edit;
      },
    },
    data: () => ({
      newPost: {
        title: "",
        content: "",
        featuredImage: "",
      },
      isLoading: false,
      updatePostMutation: `
        mutation EditPost(
          $id: ID!
          $title: String!
          $content: String!
          $featuredImage: String
          ) {
            editPostByID(
              id:$id
              updatedPost: {
                title:$title
                content: $content
                featuredImage: $featuredImage
            }
          ) {
            id
          }
        }
      `,
      getPostByIdQuery: `
      query GetPostById($id:ID!){
          getPostById(id: $id){
            title
            content
            featuredImage
          }
        }
        `,
      imageMutation: `
        mutation UploadImage($file:Upload!){
        imageUploader(file:$file)
      }
      `,
      newPostMutation: `
      mutation NewPost($title:String!, $content:String!, $featuredImage: String){
        createNewPost(newPost:{
          title:$title,
          content: $content,
          featuredImage: $featuredImage
        }){
          id
        }
      }
      `,
    }),
    methods: {
      async uploadImage() {
        let { data } = await this.$apollo.mutate({
          mutation: gql`
            ${this.imageMutation}
          `,
          variables: { file: this.$refs["imageUploader"].files[0] },
        });
        console.log("DATA", data);
        this.newPost.featuredImage = data.imageUploader;
        this.$refs["imageUploader"] = null;
      },
      async addNewPost() {
        this.isLoading = true;
        // eslint-disable-next-line
        let { data } = await this.$apollo.mutate({
          mutation: gql`
            ${this.newPostMutation}
          `,
          variables: this.newPost,
        });
        this.isLoading = false;
        // eslint-disable-next-line
        Toast.fire({ icon: "success", title: "Post added successfully" });
        this.$router.push("/dashboard/my-posts");
      },
      async getPost() {
        this.isLoading = true;
        let { data } = await this.$apollo.query({
          query: gql`
            ${this.getPostByIdQuery}
          `,
          variables: {
            id: this.$route.query.edit,
          },
        });
        this.isLoading = false;
        this.newPost = data.getPostById;
      },
      async updatePost() {
        this.isLoading = true;
        // eslint-disable-next-line
        let { data } = await this.$apollo.mutate({
          mutation: gql`
            ${this.updatePostMutation}
          `,
          variables: {
            ...this.newPost,
            id: this.$route.query.edit,
          },
        });
        this.isLoading = false;
        // eslint-disable-next-line
        Toast.fire({ icon: "success", title: "Post updated successfully" });
        this.$router.push("/dashboard/my-posts");
      },
    },
    created() {
      if (this.editMode) {
        // Fetch that post from the backend using GQS
        this.getPost();
      }
    },
  };
</script>

<style></style>
