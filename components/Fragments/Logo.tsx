import { useRouter } from 'next/router';
import Link from 'next/link';

import { styled } from 'styled-components';
import { LogoFooterIcon, LogoMainIcon } from './Icons';
import { maxMedia } from 'lib/styles';

const LogoWrapper = styled.div`
  svg {
    width: 180px;
    ${maxMedia.xsmall} {
      width: 120px;
    }
  }
`;

const Logo = ({ footer }: { footer?: boolean }) => {
  const { pathname, reload } = useRouter();

  return (
    <LogoWrapper className='Logo_Main'>
      <Link href='/' onClick={() => (pathname === '/' ? reload() : undefined)}>
        {footer ? <LogoFooterIcon /> : <LogoMainIcon />}
      </Link>
    </LogoWrapper>
  );
};

export default Logo;
