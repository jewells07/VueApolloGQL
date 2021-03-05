import gql from "graphql-tag";

export const AUTHENTICATED_USER = gql`
  query AUTH_USER {
    authUserProfile {
      id
      username
      avatarImage
      email
      lastName
      firstName
    }
  }
`;
