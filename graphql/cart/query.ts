import { gql } from '@apollo/client';

export const API_GetProductCart = gql`
  query GetProductCart($ids: [Int!]!) {
    product(
      where: {
        id: { _in: $ids }
        product_category_relations: {
          product_category: {
            status: { _eq: true }
            _or: [{ product_category: { status: { _eq: true } } }, { parent_id: { _is_null: true } }]
          }
        }
      }
    ) {
      id
      name
      image
      background_color
      status
      preparation_time
      product_options(order_by: { index: asc }) {
        index
        name
        options
      }
      product_variations(order_by: { combUnicode: asc }) {
        id
        combName
        combUnicode
        price
        promotion_price
        stock
        type
      }
    }
  }
`;
