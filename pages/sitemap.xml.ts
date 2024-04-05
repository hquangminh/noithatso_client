import { GetServerSideProps } from 'next';

import dayjs from 'dayjs';
import { gql } from 'graphql-request';

import { graphqlClient } from 'server/configs/graphqlClient';
import { convertToSlug } from 'functions';

import { ProductType } from 'interface/Product';
import { BlogCategory, BlogType } from 'interface/Blog';

const URL_ROOT = process.env.NEXT_PUBLIC_URL_ROOT;

const API_DataSitemap = gql`
  query GetProductSitemap {
    product(
      where: {
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
      created_at
      updated_at
    }
    blog_category(where: { status: { _eq: true } }, order_by: { name: asc }) {
      id
      name
    }
    blog(where: { status: { _eq: true } }) {
      id
      title
      image
      publish_date
      blog_category {
        name
      }
    }
  }
`;

type SiteMapData = { products: ProductType[]; blogs: BlogType[]; blogCategories: BlogCategory[] };
function generateSiteMap(data: SiteMapData) {
  const { products, blogs, blogCategories } = data;
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    >
      <url>
        <loc>${URL_ROOT}/</loc>
      </url>
      <url>
        <loc>${URL_ROOT}/y-tuong-thiet-ke</loc>
      </url>
      <url>
        <loc>${URL_ROOT}/san-pham</loc>
      </url>
  
      ${products
        .map(({ id, name, image, created_at, updated_at }) => {
          return `
            <url>
              <loc>${`${URL_ROOT}/san-pham/${convertToSlug(name)}--${id}`}</loc>
              <lastmod>${dayjs(updated_at ?? created_at).format('YYYY-MM-DD')}</lastmod>
              <image:image>
                <image:loc>${image}</image:loc>
              </image:image>
            </url>
          `;
        })
        .join('')}

      <url>
        <loc>${URL_ROOT}/bai-viet/tat-ca</loc>
      </url>
      ${blogCategories
        .map(({ id, name }) => {
          return `
            <url>
              <loc>${`${URL_ROOT}/bai-viet/${convertToSlug(name)}--${id}`}</loc>
            </url>
          `;
        })
        .join('')}

      ${blogs
        .map(({ id, title, publish_date, blog_category }) => {
          const category = convertToSlug(blog_category.name);
          return `
            <url>
              <loc>${`${URL_ROOT}/bai-viet/${category}/${convertToSlug(title)}--${id}`}</loc>
              <news:news>
                <news:publication>
                  <news:name>${title.replace(/[!@#$%^&*]/g, '')}</news:name>
                  <news:language>vi</news:language>
                </news:publication>
                <news:publication_date>${dayjs(publish_date).format('YYYY-MM-DD')}</news:publication_date>
                <news:title>${title.replace(/[!@#$%^&*]/g, '')}</news:title>
              </news:news>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const {
    product: products,
    blog: blogs,
    blog_category: blogCategories,
  } = await graphqlClient.request<{
    product: ProductType[];
    blog_category: BlogCategory[];
    blog: BlogType[];
  }>(API_DataSitemap);

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap({ products, blogs, blogCategories });

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default SiteMap;
