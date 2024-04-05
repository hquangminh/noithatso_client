import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { Input } from 'antd';

import { SearchOutlinedIcon } from 'components/Fragments/Icons';

const Wrapper = styled.div`
  padding: 37px 0;
  .ant-input-affix-wrapper {
    padding: 4px 0;
    .ant-input-prefix {
      margin-right: 8px;
      font-size: 18px;
    }
    .ant-input[type='text'] {
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.textColor};
      &::placeholder {
        color: #94949c;
      }
    }
  }
`;

const SearchBox = () => {
  const router = useRouter();

  const [keywords, setKeywords] = useState<string | undefined>();

  useEffect(() => {
    setKeywords(router.query.keywords?.toString());
  }, [router]);

  const onSearch = () => {
    if (keywords && keywords.trim()) {
      router.push({ query: { keywords: keywords.trim() } }, undefined, { shallow: true });
    }
  };

  return (
    <Wrapper>
      <Input
        bordered={false}
        prefix={<SearchOutlinedIcon />}
        placeholder='Tìm kiếm'
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        onPressEnter={onSearch}
      />
    </Wrapper>
  );
};

export default SearchBox;
