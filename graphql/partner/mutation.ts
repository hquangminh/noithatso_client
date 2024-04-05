import { gql } from '@apollo/client';

export const API_PartnerRegister = gql`
  mutation ($object: partner_insert_input!) {
    insert_partner_one(object: $object) {
      name
    }
  }
`;
