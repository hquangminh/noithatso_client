import { styled } from 'styled-components';
import { Button, ConfigProvider } from 'antd';

const Wrapper = styled.div`
  margin-top: 32px;
  text-align: center;
  .ant-btn {
    font-weight: 500;
  }
`;

type Props = { loading: boolean; onLoadMore: () => void };

const SearchButtonSeeMore = ({ loading, onLoadMore }: Props) => {
  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#181818',
            colorText: '#181818',
            colorBorder: '#181818',
            borderRadius: 0,
            controlHeight: 43,
            fontSize: 12,
            paddingContentHorizontal: 32,
          },
        }}
      >
        <Button loading={loading} onClick={onLoadMore}>
          XEM THÊM
        </Button>
      </ConfigProvider>
    </Wrapper>
  );
};

export default SearchButtonSeeMore;
