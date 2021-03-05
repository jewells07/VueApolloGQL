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

export const AUTHENTICATE_USER = gql`
  query AUTHENTICATE_USER($username: String!, $password: String!) {
    authenticateUser(username: $username, password: $password) {
      user {
        id
        username
        avatarImage
        email
        lastName
        firstName
      }
      token
    }
  }
`;
