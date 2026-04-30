// src/graphql/queries.js
import { gql } from '@apollo/client';


export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $phone: String!
    $password: String!
  ) {
    insert_users_one(
      object: {
        name: $name
        email: $email
        phone: $phone
        password: $password
      }
    ) {
      id
      name
      email
      phone
    }
  }
`;

export const LOGIN_USER = gql`
  query LoginUser($email: String!, $password: String!) {
    users(
      where: { email: { _eq: $email }, password: { _eq: $password } }
      limit: 1
    ) {
      id
      name
      email
      phone
    }
  }
`;


export const GET_IMAGES = gql`
  query GetImages {
    images(order_by: { created_at: desc }) {
      id
      title
      author
      description
      image_url
      likes
    }
  }
`;

export const LIKE_IMAGE = gql`
  mutation LikeImage($id: uuid!, $likes: Int!) {
    update_images_by_pk(pk_columns: { id: $id }, _set: { likes: $likes }) {
      id
      likes
    }
  }
`;
