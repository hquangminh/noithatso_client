import { ReactNode } from 'react';
import { styled } from 'styled-components';
import { ConfigProvider, Result } from 'antd';
import { SearchEmptyIcon } from './Icons';
import { maxMedia } from 'lib/styles';

const ResultWrapper = styled(Result)`
  &.ant-result {
    padding-block: 100px;
    font-weight: 500;
    ${maxMedia.xsmall} {
      padding-inline: 56px;
      .ant-result-icon {
        margin-bottom: 12px;
        & > .anticon {
          font-size: 80px;
        }
      }
      .ant-result-title {
        font-size: 14px;
      }
    }
  }
`;

type Props = { icon?: ReactNode; title: string; subtitle?: string };

const ResultFragment = (props: Props) => {
  return (
    <ConfigProvider
      theme={{
        components: { Result: { iconFontSize: 120, titleFontSize: 16 } },
        token: { colorInfo: '#424153', colorTextHeading: '#424153' },
      }}
    >
      <ResultWrapper icon={props.icon ?? <SearchEmptyIcon />} title={props.title} subTitle={props.subtitle} />
    </ConfigProvider>
  );
};

export default ResultFragment;
