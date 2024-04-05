import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from 'graphql-request';
import { graphqlClient } from 'server/configs/graphqlClient';
import { OrderDetail } from 'interface/Order';

export const API_GetOrderDetail = gql`
  query GetOrderDetail($code: String!) {
    order(where: { order_no: { _eq: $code } }) {
      id
      order_no
      amount
      status
      referrer {
        name
        code
      }
      order_delivery {
        name
        phone
        email
        street
        district
        ward
        city
        note
      }
      order_products {
        id
        product_id
        variation_id
        purchase_quantity
        delivery_quantity
        product_info
        product {
          partner {
            name
          }
        }
      }
      order_notes(order_by: { created_at: desc }) {
        id
        note
        created_at
        updated_at
      }
      order_logs(order_by: { id: desc }) {
        id
        type
        note
        created_at
      }
    }
  }
`;

export default async function handler({ method, query }: NextApiRequest, res: NextApiResponse) {
  switch (method) {
    case 'GET':
      try {
        const { order } = await graphqlClient.request<{ order: [OrderDetail] }>(API_GetOrderDetail, {
          code: query.code,
        });

        if (order[0]) return res.status(200).json(order[0]);
        else return res.status(204).json({ message: 'Not Found' });
      } catch (error) {
        return res.status(500).json({ error });
      }

    default:
      return res.status(404).json({ message: 'Not Found' });
  }
}
