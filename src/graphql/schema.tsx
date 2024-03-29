import { gql } from "@apollo/client";
export const SIGNUP = gql`
  mutation SIGNUP(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      first_name: $firstName
      last_name: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        email_verification_token
        email_verified_at
        email
        last_name
        first_name
        uuid
        _id
        created_at
        updated_at
      }
    }
  }
`;
export const LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        _id
        uuid
        first_name
        last_name
        email
        email_verified_at
        email_verification_token
        created_at
        updated_at
      }
      token
    }
  }
`;
export const GETME = gql`
  query GETME {
    getMe {
      uuid
      _id
      first_name
      last_name
      email_verification_token
      email_verified_at
    }
  }
`;
export const GETITEMS = gql`
  query GETITEMS {
    getItems {
      items {
        name
        description
        _id
        uuid
      }
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;
export const VERIFYME = gql`
  mutation verifyme($token: String!) {
    verifyMe(token: $token) {
      email_verified_at
      email_verification_token
    }
  }
`;
export const CREATEITEM = gql`
  mutation createItem($name: String!, $description: String) {
    createItem(name: $name, description: $description) {
      _id
      created_at
    }
  }
`;

export const DELETEITEM = gql`
  mutation deleteItem($uuid: ID!) {
    deleteItem(uuid: $uuid) {
      _id
      name
    }
  }
`;
export const UPDATEITEM =gql`mutation updateItem($uuid: ID!, $name: String, $description: String) {
  updateItem(uuid: $uuid, name: $name, description: $description) {
    _id
    name
  }
}`