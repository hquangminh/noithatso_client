import { Fragment, ReactNode, useState } from 'react';

import { useDevice } from 'lib/hooks';

import HeaderGlobal from './HeaderGlobal';
import FooterGlobal from './FooterGlobal';
import MobileMenu from './MobileMenu';
import SearchDrawer from 'components/Fragments/SearchDrawer';
import OfflineNotification from 'components/Fragments/OfflineNotification';

import { MenuKey } from 'interface/Layout';

export type LayoutProps = {
  header?: { menuActive: MenuKey };
  footer?: { isShow?: boolean };
};
type Props = LayoutProps & { children: ReactNode };

const LayoutPage = ({ children, ...props }: Props) => {
  const { viewport } = useDevice();
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const isMobile = viewport.width && viewport.width < 992;

  return (
    <Fragment>
      <HeaderGlobal menuActive={props.header?.menuActive} handelOpenSearch={() => setOpenSearch(true)} />
      {isMobile && <MobileMenu menuActive={props.header?.menuActive} />}
      <main>{children}</main>
      {props.footer?.isShow !== false && <FooterGlobal />}

      <SearchDrawer isOpen={openSearch} onClose={() => setOpenSearch(false)} />
      <OfflineNotification />
    </Fragment>
  );
};

export default LayoutPage;
