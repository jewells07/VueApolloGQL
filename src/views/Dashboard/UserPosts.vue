<template>
  <div class="user-posts">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h2 class="card-title text-primary align-self-center">
                My Posts
              </h2>
              <button
                class="btn btn-primary align-self-center"
                @click="$router.push('/dashboard/add-post')"
              >
                Add Post
              </button>
            </div>
            <ApolloQuery
              :query="
                (gql) =>
                  gql`
                    ${query}
                  `
              "
              :variables="{ page: currentPage, limit: 6 }"
            >
              <template v-slot="{ result: { data, error, loading }, query }">
                <div v-if="loading">Loading...</div>
                <div v-else-if="data">
                  <PostsList
                    :posts="data.getAuthenticatedUsersPosts.posts"
                    @delete-post="query.refetch()"
                  />
                  <bPagination
                    v-if="data.getAuthenticatedUsersPosts.posts.length"
                    align="center"
                    v-model="currentPage"
                    :per-page="
                      data.getAuthenticatedUsersPosts.paginator.perPage
                    "
                    :total-rows="
                      data.getAuthenticatedUsersPosts.paginator.postCount
                    "
                  />
                  <div v-else><p>Sorry! there are no post in Database</p></div>
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
