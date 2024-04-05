import Script from 'next/script';

const ZaloWidgetChat = () => {
  return (
    <>
      <Script src='https://sp.zalo.me/plugins/sdk.js' />
      <div
        className='zalo-chat-widget'
        data-oaid={process.env.NEXT_PUBLIC_ZALO_OAID}
        data-welcome-message='Rất vui khi được hỗ trợ bạn!'
        data-autopopup='0'
        data-width='350'
        data-height='300'
      />
    </>
  );
};

export default ZaloWidgetChat;
