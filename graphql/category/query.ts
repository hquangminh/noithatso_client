import gql from 'graphql-tag';

export const API_GetRoomType = gql`
  query {
    room_type(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const API_GetStyleType = gql`
  query {
    style_type(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const API_GetProductCategory = gql`
  query {
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
