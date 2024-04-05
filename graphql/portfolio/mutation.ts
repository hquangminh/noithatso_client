import { gql } from '@apollo/client';

export const API_AddPortfolio = gql`
  mutation ($objects: [portfolio_insert_input!]!) {
    insert_portfolio(objects: $objects) {
      returning {
        id
      }
    }
  }
`;
