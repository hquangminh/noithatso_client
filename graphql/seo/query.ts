import { gql } from '@apollo/client';

export const API_GetSeoPage = gql`
  query GetSeoPage($page: String!) {
    seo_page(where: { page: { _eq: $page } }) {
      title
      description
      image
      page
    }
  }
`;
