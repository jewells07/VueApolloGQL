<template>
  <div class="posts-page">
    <button class="btn btn-primary mb-3" @click="$router.go(-1)">
      Go Back
    </button>
    <h2 class="text-primary">
      <div class="row">
        <div class="col-12">
          <ApolloQuery
            :query="
              (gql) =>
                gql`
                  ${query}
                `
            "
            :variables="{ id: $route.params.id }"
          >
            <template v-slot="{ result: { data, error, loading } }">
              <div v-if="loading"><p>Loading...</p></div>
              <div v-else-if="data">
                <div class="card mb-3">
                  <img
                    :src="data.getPostById.featuredImage"
                    class="card-img-top"
                    :alt="data.getPostById.title"
                  />
                  <div class="card-body">
                    <h2 class="card-title text-primary">
                      {{ data.getPostById.title }}
                    </h2>
                    <div class="post-content">
                      <p
                        class="card-text"
                        v-html="data.getPostById.content"
                      ></p>
                    </div>
                    <p class="card-text">
                      <small class="text-muted">
                        Last updated on
                        {{ data.getPostById.updatedAt | dateTime }}
                      </small>
                    </p>
                    <p class="card-text">
                      <small class="text-muted"
                        >Created on
                        {{ data.getPostById.createdAt | dateTime }}
                      </small>
                    </p>
                    <p class="card-text">
                      <small class="text-muted"
                        >By
                        {{ data.getPostById.author.username }}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <div v-else-if="error">
                Something happend please try again...
              </div>
              <div v-else>No Result</div>
            </template>
          </ApolloQuery>
        </div>
      </div>
    </h2>
  </div>
</template>

<script>
  import DateFilter from "@/mixins/DateFilters";
  export default {
    mixins: [DateFilter],
    data: () => ({
      query: `query GetPostById($id:ID!){
          getPostById(id: $id){
            title
            content
            createdAt
            updatedAt
            featuredImage
            author {
              id
              username
            }
          }
        }`,
    }),
  };
</script>

<style lang="scss" scoped>
  .post-content {
    overflow: auto !important;
  }
</style>
