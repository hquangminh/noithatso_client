type SendMailProps = {
  senderEmail?: string;
  receiverEmail: string | string[];
  title: string;
  content: string;
};

const sendMailServices = {
  OrderSuccess: async (body: SendMailProps) => {
    const res = await fetch('/api/send-mail', { method: 'POST', body: JSON.stringify(body) });
    return await res.json();
  },
};
export default sendMailServices;
