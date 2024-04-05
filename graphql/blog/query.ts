import gql from 'graphql-tag';

export const API_GetBlogCategory = gql`
  query {
    blog_category(where: { status: { _eq: true } }, order_by: { name: asc }) {
      id
      name
      status
    }
  }
`;

export const API_CountBlogByCategory = gql`
  query ($cateID: Int!) {
    blog_aggregate(where: { category_id: { _eq: $cateID } }) {
      aggregate {
        count
      }
    }
  }
`;

export const API_GetBlog = gql`
  query ($title: String = "%%", $category: Int_comparison_exp = {}, $offset: Int = 0, $limit: Int!) {
    blog(
      where: { title: { _ilike: $title }, category_id: $category }
      order_by: { created_at: desc }
      offset: $offset
      limit: $limit
    ) {
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

    blog_aggregate(where: { title: { _ilike: $title }, category_id: $category }) {
      aggregate {
        count
      }
    }
  }
`;

export const API_GetBlogDetail = gql`
  query ($id: Int!) @cached(ttl: 30) {
    blog(where: { id: { _eq: $id }, status: { _eq: true }, blog_category: { status: { _eq: true } } }) {
      id
      title
      summary
      content
      image
      publish_date
      blog_category {
        id
        name
      }
      blog_products(
        where: {
          product: {
            status: { _eq: true }
            product_category_relations: { product_category: { status: { _eq: true } } }
            product_variations: { stock: { _gt: 0 } }
          }
        }
      ) {
        product {
          id
          name
          image
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
      seo_title
      seo_description
    }
  }
`;

export const APT_GetBlogRelate = gql`
  query MyQuery($blogID: Int!, $categoryID: Int!) {
    blog(
      where: { status: { _eq: true }, category_id: { _eq: $categoryID }, id: { _neq: $blogID } }
      order_by: { created_at: desc }
      limit: 2
    ) {
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
