import { gql } from '@apollo/client';

export const API_GetProductFilterCategory = gql`
  query GetProductFilterCategory {
    style_type(order_by: { name: asc }) {
      id
      name
    }

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

export const API_GetProduct = gql`
  query FilterProduct(
    $filter: product_bool_exp = {}
    $order_by: [product_order_by!] = { name: asc }
    $offset: Int = 0
    $page_size: Int = 30
  ) {
    product(where: $filter, offset: $offset, limit: $page_size, order_by: $order_by) {
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

export const API_GetProductDetail = gql`
  query ($id: Int!) {
    product(
      where: {
        id: { _eq: $id }
        status: { _eq: true }
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
      description
      material
      status
      preparation_time
      product_category_relations(
        where: {
          product_category: {
            status: { _eq: true }
            _or: [{ product_category: { status: { _eq: true } } }, { parent_id: { _is_null: true } }]
          }
        }
      ) {
        category_id
        product_category {
          name
        }
      }
      product_rooms {
        room_id
        room_type {
          id
          name
        }
      }
      product_options(order_by: { index: asc }) {
        id
        index
        name
        options
      }
      product_variations(order_by: { combUnicode: asc }) {
        id
        combName
        combUnicode
        link
        price
        promotion_price
        size
        sku
        stock
        type
      }
    }
  }
`;

export const API_GetProductRelate = gql`
  query ($productID: Int!, $categories: [product_category_relation_bool_exp!]!) {
    product(
      where: {
        id: { _neq: $productID }
        product_category_relations: { _or: $categories }
        status: { _eq: true }
      }
      limit: 10
      order_by: { name: asc }
    ) {
      id
      name
      image
      background_color
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
  }
`;
