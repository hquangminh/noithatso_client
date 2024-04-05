import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { senderEmail, receiverEmail, title, content } = JSON.parse(req.body);
    const params = {
      Destination: { ToAddresses: typeof receiverEmail === 'string' ? [receiverEmail] : receiverEmail },
      Message: {
        Body: { Html: { Charset: 'UTF-8', Data: content } },
        Subject: { Charset: 'UTF-8', Data: title },
      },
      Source: senderEmail ?? 'Nội Thất Số <no-reply@noithatso.com.vn>',
      // ReplyToAddresses: ['marketing@noithatso.com.vn'],
    };

    const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();
    const resEmail = await sendPromise;

    return res.status(200).json({ error: false, data: resEmail });
  } catch (error) {
    res.status(400).json({ error: true, message: error });
  }
}
