import { gql } from '@apollo/client';

export const API_GetHashtags = gql`
  query GetHashtags {
    product: hashtag(where: { type: { _eq: 1 } }, order_by: [{ count: desc }, { name: asc }], limit: 20) {
      id
      name
    }
    portfolio: hashtag(where: { type: { _eq: 2 } }, order_by: [{ count: desc }, { name: asc }], limit: 20) {
      id
      name
    }
    blog: hashtag(where: { type: { _eq: 3 } }, order_by: [{ count: desc }, { name: asc }], limit: 20) {
      id
      name
    }
  }
`;

export const API_UpdateHashtagCount = gql`
  mutation UpdateHashtagCount($name: String!) {
    update_hashtag(where: { name: { _ilike: $name } }, _inc: { count: 1 }) {
      affected_rows
    }
  }
`;

export const API_Search = gql`
  query Search(
    $filterPortfolio: portfolio_bool_exp!
    $filterProduct: product_bool_exp!
    $filterBlog: blog_bool_exp!
  ) {
    portfolio(where: $filterPortfolio, offset: 0, limit: 3) {
      id
      image
      name
    }
    portfolio_aggregate(where: $filterPortfolio) {
      aggregate {
        count
      }
    }

    product(where: $filterProduct, offset: 0, limit: 5) {
      id
      name
      image
      background_color
      status
      variation_price: product_variations {
        price
        promotion_price
      }
      price_min_max: product_variations_aggregate {
        aggregate {
          min {
            price
            promotion_price
          }
          max {
            price
            promotion_price
          }
        }
      }
    }
    product_aggregate(where: $filterProduct) {
      aggregate {
        count
      }
    }

    blog(where: $filterBlog, order_by: { created_at: desc }, limit: 4, offset: 0) {
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
    blog_aggregate(where: $filterBlog) {
      aggregate {
        count
      }
    }
  }
`;

export const API_SearchPortfolio = gql`
  query SearchPortfolio($filter: portfolio_bool_exp!, $offset: Int!) {
    portfolio(where: $filter, limit: 6, offset: $offset) {
      id
      image
      name
    }
    portfolio_aggregate(where: $filter) {
      aggregate {
        count
      }
    }
  }
`;

export const API_SearchProduct = gql`
  query SearchProduct($filter: product_bool_exp!, $offset: Int!) {
    product(where: $filter, offset: $offset, limit: 10) {
      id
      name
      image
      background_color
      status
      variation_price: product_variations {
        price
        promotion_price
      }
      price_min_max: product_variations_aggregate {
        aggregate {
          min {
            price
            promotion_price
          }
          max {
            price
            promotion_price
          }
        }
      }
    }

    product_aggregate(where: $filter) {
      aggregate {
        count
      }
    }
  }
`;

export const API_SearchBlog = gql`
  query SearchBlog($filter: blog_bool_exp!, $offset: Int!) {
    blog(where: $filter, order_by: { created_at: desc }, limit: 8, offset: $offset) {
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
    blog_aggregate(where: $filter) {
      aggregate {
        count
      }
    }
  }
`;
