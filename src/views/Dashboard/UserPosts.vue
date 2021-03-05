<template>
  <div class="user-posts">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-primary">My Posts</h2>
            <ApolloQuery
              :query="
                (gql) =>
                  gql`
                    ${query}
                  `
              "
              :variables="{ page: currentPage, limit: 6 }"
            >
              <template v-slot="{ result: { data, error, loading } }">
                <div v-if="loading">Loading...</div>
                <div v-else-if="data">
                  <PostsList :posts="data.getAuthenticatedUsersPosts.posts" />
                  <bPagination
                    align="center"
                    v-model="currentPage"
                    :per-page="
                      data.getAuthenticatedUsersPosts.paginator.perPage
                    "
                    :total-rows="
                      data.getAuthenticatedUsersPosts.paginator.postCount
                    "
                  />
                </div>
                <div v-else-if="error">
                  Something went wrong :-(
                </div>
                <div v-else>No Result</div>
              </template>
            </ApolloQuery>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Scroller from "@/mixins/Scroller";
  import PostsList from "@/components/Posts/PostsList";
  export default {
    components: {
      PostsList,
    },
    mixins: [Scroller],
    data: () => ({
      currentPage: 1,
      query: `query GetAuthenticatedUsersPosts($page:Int!, $limit:Int!) {
          getAuthenticatedUsersPosts(page: $page, limit: $limit) {
              posts {
                  id
                  title
                  featuredImage
                  createdAt
                  updatedAt
              }
              paginator {
                  currentPage
                  postCount
                  perPage
              }
          }
      }`,
    }),
  };
</script>

<style></style>
