import { gql } from '@apollo/client';

export const API_GetPortfolioFilterCategory = gql`
  query GetPortfolioFilterCategory {
    room_type(order_by: { name: asc }) {
      id
      name
    }

    style_type(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const API_GetPortfolio = gql`
  query ($where: portfolio_bool_exp = {}, $offset: Int = 0, $limit: Int = 12) {
    portfolio(where: $where, order_by: { name: asc }, limit: $limit, offset: $offset) {
      id
      name
      image
    }
    portfolio_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const API_GetPortfolioDetail = gql`
  query ($id: Int!) {
    portfolio(where: { id: { _eq: $id } }) {
      name
      image
      portfolio_link
      seo_title
      seo_description
    }
  }
`;
