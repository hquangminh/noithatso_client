import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from 'graphql-request';
import { graphqlClient } from 'server/configs/graphqlClient';
import { orderSuccess } from 'lib/email-templates/order';

import { ProductCart } from 'interface/Cart';
import { ProductDetail } from 'interface/Product';
import { MaxIntegerPostgreSQL } from 'lib/constants';

const API_GetReferrer = `
  query MyQuery($code: String!) {
    referrer(where: {code: {_eq: $code}}) {
      id
    }
  }
`;

const API_GetProduct = gql`
  query MyQuery($ids: [Int!]!) {
    product(
      where: {
        id: { _in: $ids }
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
      preparation_time
      product_variations(order_by: { combUnicode: asc }) {
        id
        price
        promotion_price
        stock
        type
      }
    }
  }
`;

const API_AddOrder = `
  mutation CreateOrder ($order: order_insert_input!) {
    insert_order_one(object: $order) {
      id
      order_no
      created_at
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
        product_info
        purchase_quantity
      }
    }

    {{update_product}}
  }
`;

const API_UpdateStock = `
  {{api_name}}: update_product_variation(where: {product_id: {_eq: {{productID}}}, id: {_eq: "{{variationID}}"}}, _inc: {stock: {{stock}}}) {
    affected_rows
  }
`;

type ProductOrder = {
  product_id: number;
  variation_id: number;
  purchase_quantity: number;
  delivery_quantity: number;
  product_info: { name: string; image: string; price: number; variation?: string };
};
type OrderData = {
  order_no: string;
  amount: number;
  order_products: { data: ProductOrder[] };
  order_delivery: { data: Record<string, string> };
  order_logs: { data: Record<string, string | number> };
  referrer_id?: number;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { shipping_info, products }: { shipping_info: Record<string, string>; products: ProductCart[] } =
      JSON.parse(req.body);

    const order_no = 'NTS' + new Date().getTime();

    const productList = await graphqlClient.request<{ product: ProductDetail[] }>(API_GetProduct, {
      ids: products.map((i) => i.product_id),
    });

    const isValidProduct = products.every((prod: ProductCart) => {
      const product = productList.product.find((i) => i.id === prod.product_id);
      const variation = product?.product_variations.find((i) => i.id === prod.variation_id);
      return (
        product &&
        variation &&
        (product.preparation_time ? MaxIntegerPostgreSQL : variation.stock) >= prod.quantity &&
        prod.price === (variation.promotion_price ?? variation.price)
      );
    });
    if (!isValidProduct) {
      const message = 'Unable to create an order because a product has been changed';
      return res.status(400).json({ error: true, error_code: 'PRODUCT_CHANGED', message });
    }

    const amount = products.reduce((total: number, prod: ProductCart) => {
      const product = productList.product.find((i) => i.id === prod.product_id);
      const variation = product?.product_variations.find((i) => i.id === prod.variation_id);
      return total + (variation ? (variation.promotion_price ?? variation.price) * prod.quantity : 0);
    }, 0);

    const orderProducts: ProductOrder[] = products.map(({ product_id, variation_id, ...i }) => {
      const purchase_quantity = i.quantity,
        delivery_quantity = i.quantity;
      const product_info = { name: i.name, image: i.image, price: i.price, variation: i.variation_name };
      return { product_id, variation_id, purchase_quantity, delivery_quantity, product_info };
    });

    const productsUpdate: string[] = products.map(
      ({ product_id, variation_id, quantity }: ProductCart, index: number) => {
        const product = productList.product.find((i) => i.id === product_id);
        return product
          ? API_UpdateStock.replace('{{api_name}}', 'update_stock_product_' + (index + 1))
              .replace('{{productID}}', product.id.toString())
              .replace('{{variationID}}', variation_id.toString())
              .replace('{{stock}}', '-' + quantity.toString())
          : '';
      },
    );

    const referrer_id = await graphqlClient
      .request<{ referrer: [{ id: number }] }>(API_GetReferrer, { code: req.cookies.referrer })
      .then(({ referrer }) => referrer[0].id)
      .catch(() => undefined);

    const order: OrderData = {
      order_no,
      amount,
      referrer_id,
      order_delivery: { data: shipping_info },
      order_products: { data: orderProducts },
      order_logs: { data: {} },
    };

    const api = API_AddOrder.replace('{{update_product}}', productsUpdate.join(''));
    const orderResponse = await graphqlClient.request<any>(api, { order });
    const { id, order_delivery } = orderResponse.insert_order_one;

    await fetch(`${process.env.NEXT_PUBLIC_URL_ROOT}/api/send-mail`, {
      method: 'POST',
      body: JSON.stringify({
        receiverEmail: order_delivery.email,
        title: `Xác nhận đơn hàng ${order_no} của bạn!`,
        content: orderSuccess
          .replaceAll('{{name}}', order_delivery.name)
          .replaceAll('{{order_no}}', order_no),
      }),
    });

    if (process.env.APP_ENV === 'production') {
      fetch('https://hooks.slack.com/services/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', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `\n>*Đơn hàng mới*\n>Mã đơn hàng: <https://cms.noithatso.com.vn/order/${id}|${order_no}>\n>Khách hàng: ${order_delivery.name}\n>Số điện thoại: ${order_delivery.phone}`,
              },
            },
          ],
        }),
      });
    }

    return res.status(200).json({ error: false, data: orderResponse.insert_order_one });
  } catch (error) {
    return res.status(400).json({ error: true, message: error });
  }
}
