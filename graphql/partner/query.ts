import { gql } from '@apollo/client';

export const API_GetPartner = gql`
  query {
    partner {
      name
      logo
    }
  }
`;
