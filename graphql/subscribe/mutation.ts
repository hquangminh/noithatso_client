import { gql } from '@apollo/client';

export const API_SubscribeEmail = gql`
  mutation ($email: String!) {
    insert_subscribe(objects: { email: $email }) {
      returning {
        id
      }
    }
  }
`;
