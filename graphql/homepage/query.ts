import { gql } from '@apollo/client';

export const API_GetHomePage = gql`
  query GetHomePage {
    banner: homepage_banner(where: { status: { _eq: true } }, order_by: { index: asc }) {
      title
      caption
      image
      background
      link
    }
    blog(where: { status: { _eq: true } }, order_by: { created_at: desc }, limit: 4) {
      id
      title
      summary
      image
      created_at
      blog_category {
        id
        name
      }
    }
  }
`;

export const API_GetCategory = gql`
  query GetCategory {
    product_category(
      where: {
        status: { _eq: true }
        _or: [{ product_category: { status: { _eq: true } } }, { parent_id: { _is_null: true } }]
      }
      order_by: { name: asc }
    ) {
      id
      name
      parent_id
    }
  }
`;

export const API_GetPortfolioRoom = gql`
  query GetPortfolioRoom {
    room_type(
      where: { outstanding: { _eq: true }, portfolio_rooms: { room_id: { _is_null: false } } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`;

export const API_GetPortfolioStyle = gql`
  query GetPortfolioStyle {
    style_type(
      where: { outstanding: { _eq: true }, portfolio_styles: { portfolio_id: { _is_null: false } } }
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`;

export const API_GetPortfolio = gql`
  query ($where: portfolio_bool_exp = {}) {
    portfolio(where: $where, order_by: { name: asc }, limit: 9) {
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
