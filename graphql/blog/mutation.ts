import { gql } from '@apollo/client';

export const API_AddBlogCategory = gql`
  mutation ($objects: [blog_category_insert_input!]!) {
    insert_blog_category(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const API_EditBlogCategory = gql`
  mutation ($id: Int!, $set: blog_category_set_input!) {
    update_blog_category(where: { id: { _eq: $id } }, _set: $set) {
      returning {
        id
      }
    }
  }
`;

export const API_DeleteBlogCategory = gql`
  mutation ($id: Int!) {
    delete_blog_category(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`;

export const API_AddBlog = gql`
  mutation ($objects: [blog_insert_input!]!) {
    insert_blog(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const APT_EditBlog = gql`
  mutation ($id: Int!, $_set: blog_set_input!) {
    update_blog(where: { id: { _eq: $id } }, _set: $_set) {
      returning {
        id
      }
    }
  }
`;

export const APT_DeleteBlog = gql`
  mutation ($id: Int!) {
    delete_blog(where: { id: { _eq: $id } }) {
      returning {
        image
      }
    }
  }
`;
