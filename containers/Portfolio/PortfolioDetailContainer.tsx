import { useEffect, useRef, useState } from 'react';

import { styled } from 'styled-components';
import { Spin } from 'antd';

import { PortfolioDetail } from 'interface/Portfolio';

import { minMedia } from 'lib/styles';

const PortfolioDetail = styled.div`
  height: calc(100vh - 70px);

  .ant-spin-nested-loading {
    .ant-spin-spinning.ant-spin {
      height: calc(100vh - 70px);
      max-height: unset;
    }
    .ant-spin-container {
      overflow-x: hidden;
    }
  }
  iframe {
    margin-top: -48px;
    margin-left: -2px;
    width: calc(100% + 4px);
    height: calc(100vh - 70px + 48px);

    ${minMedia.medium} {
      width: calc(100% + 19px);
    }
  }
`;

type Props = { data: PortfolioDetail };

const PortfolioDetailContainer = ({ data }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && data) iframeRef.current.src = data.portfolio_link;
  }, [iframeRef, data]);

  return (
    <PortfolioDetail>
      <Spin spinning={!loaded}>
        <iframe ref={iframeRef} style={{ opacity: loaded ? 1 : 0 }} onLoad={() => setLoaded(true)} />
      </Spin>
    </PortfolioDetail>
  );
};

export default PortfolioDetailContainer;
