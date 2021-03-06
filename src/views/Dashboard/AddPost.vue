<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-primary">Add Post</h3>
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
                <button class="btn btn-primary" @click="addNewPost">
                  Add Post
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
    data: () => ({
      newPost: {
        title: "",
        content: "",
        featuredImage: "",
      },
      imageMutation: `
        mutation UploadImage($file:Upload!){
        imageUploader(file:$file)
      }`,
      newPostMutation: `
      mutation NewPost($title:String!, $content:String!, $featuredImage: String){
        createNewPost(newPost:{
          title:$title,
          content: $content,
          featuredImage: $featuredImage
        }){
          id
        }
      }`,
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
        let { data } = await this.$apollo.mutate({
          mutation: gql`
            ${this.newPostMutation}
          `,
          variables: this.newPost,
        });
        console.log("DATA", data);
        this.$router.push("/dashboard/my-posts");
      },
    },
  };
</script>

<style></style>
