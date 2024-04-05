import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DisconnectOutlined } from '@ant-design/icons';
import { Button, Modal, Result } from 'antd';

import { NetworkOffline } from 'store/reducer/web';
import { AppState } from 'store/type';

const OfflineNotification = () => {
  const dispatch = useDispatch();
  const isOffline = useSelector((state: AppState) => state.web.offline);

  useEffect(() => {
    window.addEventListener('offline', () => dispatch(NetworkOffline()));
    return () => window.removeEventListener('offline', () => undefined);
  }, [dispatch]);

  return (
    <Modal open={isOffline} width={500} footer={null} closable={false}>
      <Result
        icon={<DisconnectOutlined />}
        status='warning'
        title='Không có Internet'
        subTitle='Hãy thử kiểm tra cáp mạng, modem và bộ định tuyến sau đó kết nối lại với Wi-Fi'
        extra={
          <Button type='primary' onClick={() => location.reload()}>
            Tải lại trang
          </Button>
        }
      />
    </Modal>
  );
};

export default OfflineNotification;
