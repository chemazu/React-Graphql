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
