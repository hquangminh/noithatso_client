import gql from 'graphql-tag';

// Room Category
export const API_AddRoomType = gql`
  mutation ($name: String!) {
    insert_room_type(objects: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const API_EditRoomType = gql`
  mutation ($id: Int!, $name: String!) {
    update_room_type(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const API_DeleteRoomType = gql`
  mutation ($id: Int!) {
    delete_room_type(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

// Style Category
export const API_AddStyleType = gql`
  mutation ($name: String!) {
    insert_style_type(objects: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const API_EditStyleType = gql`
  mutation ($id: Int!, $name: String!) {
    update_style_type(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
      }
    }
  }
`;

export const API_DeleteStyleType = gql`
  mutation ($id: Int!) {
    delete_style_type(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

// Product Category
export const API_AddProductCategory = gql`
  mutation ($objects: [product_category_insert_input!]!) {
    insert_product_category(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const API_EditProductCategory = gql`
  mutation ($id: Int!, $_set: product_category_set_input!) {
    update_product_category(where: { id: { _eq: $id } }, _set: $_set) {
      returning {
        id
      }
    }
  }
`;

export const API_DeleteProductCategory = gql`
  mutation ($id: Int!) {
    delete_product_category(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;
