import { RefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { useQuery } from '@apollo/client';
import { CloseOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  DrawerProps,
  Input,
  InputRef,
  Row,
  Skeleton,
  Space,
} from 'antd';

import { useWindowSize } from 'lib/hooks';
import { isArrayEmpty } from 'functions';
import { API_GetHashtags } from 'graphql/search/query';

import { SearchOutlinedIcon } from './Icons';

import { HashtagItem } from 'interface/Category';
import { SearchHistoryItem } from 'interface/Search';

import { maxMedia } from 'lib/styles';

const Header = styled(Row)`
  .ant-input-affix-wrapper {
    padding: 4px 0;
    .ant-input-prefix {
      margin-right: 8px;
      font-size: 18px;
    }
    .ant-input {
      font-weight: 500;
      color: ${({ theme }) => theme.palette.common.black};
      &::placeholder {
        color: #94949c;
      }
    }
  }
`;
const RecommendedSection = styled.section`
  margin-bottom: 48px;
  max-height: 148px;
  overflow: hidden;

  ${maxMedia.custom(768)} {
    margin-bottom: 32px;
    max-height: 116px;
  }
`;
const RecommendedTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: ${({ theme }) => theme.palette.common.black};
`;
const RecommendedTag = styled.div`
  padding: 11px 16px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.common.black};
  border: solid 1px #e3e3e8;
  cursor: pointer;
  &:hover {
    background-color: #f4f5f8;
  }

  ${maxMedia.custom(768)} {
    padding: 6px 4px;
    font-size: 12px;
  }
`;

type Props = { isOpen: boolean; onClose: () => void };
type Hashtag = { product: HashtagItem[]; portfolio: HashtagItem[]; blog: HashtagItem[] };

const SearchDrawer = ({ isOpen, onClose }: Props) => {
  const router = useRouter();
  const [screenWidth] = useWindowSize();
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const inputSearchRef = useRef<InputRef>(null);

  const { data: hashtags, loading } = useQuery<Hashtag>(API_GetHashtags);

  useEffect(() => {
    const searchHistoryStorage = localStorage.getItem('search_history');
    const searchHistory: SearchHistoryItem[] = searchHistoryStorage ? JSON.parse(searchHistoryStorage) : [];
    setSearchHistory(searchHistory);
  }, [router]);

  const padding = screenWidth && screenWidth < 992 ? 16 : 60,
    margin = screenWidth && screenWidth < 992 ? 26 : 35;

  const drawerProps: DrawerProps = {
    open: isOpen,
    placement: 'top',
    height: '100%',
    closable: false,
    title: <DrawerHeader inputRef={inputSearchRef} onClose={onClose} />,
    headerStyle: { paddingTop: margin, paddingBottom: margin },
    bodyStyle: { paddingTop: 0, paddingBottom: 0 },
    afterOpenChange: (open) => (open ? inputSearchRef.current?.focus() : undefined),
  };

  return (
    <ConfigProvider theme={{ token: { paddingLG: padding, colorSplit: 'transparent' } }}>
      <Drawer {...drawerProps}>
        {!isArrayEmpty(searchHistory) && (
          <SearchHistory title='Tìm kiếm gần đây' hashtags={searchHistory} onClose={onClose} />
        )}
        <RecommendedHashtag
          title='Ý tưởng thiết kế'
          hashtags={hashtags?.portfolio}
          loading={loading}
          onClose={onClose}
        />
        <RecommendedHashtag
          title='Sản phẩm'
          hashtags={hashtags?.product}
          loading={loading}
          onClose={onClose}
        />
        <RecommendedHashtag title='Bài viết' hashtags={hashtags?.blog} loading={loading} onClose={onClose} />
      </Drawer>
    </ConfigProvider>
  );
};

export default SearchDrawer;

type DrawerHeaderProps = { inputRef: RefObject<InputRef>; onClose: () => void };
const DrawerHeader = ({ inputRef, onClose }: DrawerHeaderProps) => {
  const router = useRouter();

  const [keywords, setKeywords] = useState<string | undefined>();

  useEffect(() => {
    setKeywords(router.query.keywords?.toString());
  }, [router]);

  const onSearch = () => {
    if (keywords && keywords.trim()) {
      router.push({ pathname: '/tim-kiem', query: { keywords: keywords.trim() } }, undefined, {
        shallow: router.pathname === '/search',
      });
      onClose();
    }
  };

  return (
    <Header gutter={24} align='middle'>
      <Col flex='auto'>
        <Input
          ref={inputRef}
          bordered={false}
          prefix={<SearchOutlinedIcon />}
          placeholder='Tìm kiếm'
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          onPressEnter={onSearch}
        />
      </Col>
      <Col>
        <Button type='text' icon={<CloseOutlined />} onClick={onClose} />
      </Col>
    </Header>
  );
};

type RecommendedHashtagProps = {
  hashtags?: HashtagItem[];
  title: string;
  loading?: boolean;
  onClose: () => void;
};

const RecommendedHashtag = (props: RecommendedHashtagProps) => {
  const router = useRouter();
  const [screenWidth] = useWindowSize();

  if (props.loading)
    return (
      <RecommendedSection>
        <RecommendedTitle>{props.title}</RecommendedTitle>
        <Space size={!screenWidth ? 0 : screenWidth <= 768 ? 10 : 16} wrap>
          <Skeleton.Input active />
          <Skeleton.Input active />
        </Space>
      </RecommendedSection>
    );
  else if (!props.hashtags || isArrayEmpty(props.hashtags)) return null;

  const onSearch = (hashtag: string) => {
    router.push({ pathname: '/tim-kiem', query: { hashtag } }, undefined, {
      shallow: router.pathname === '/search',
    });
    props.onClose();
  };

  return (
    <RecommendedSection>
      <RecommendedTitle>{props.title}</RecommendedTitle>
      <Space size={!screenWidth ? 0 : screenWidth <= 768 ? 10 : 16} wrap>
        {props.hashtags.map(({ id, name }) => (
          <RecommendedTag key={id} onClick={() => onSearch(`${name}--${id}`)}>
            {name}
          </RecommendedTag>
        ))}
      </Space>
    </RecommendedSection>
  );
};

const SearchHistory = (
  props: Omit<RecommendedHashtagProps, 'hashtags'> & { hashtags: SearchHistoryItem[] },
) => {
  const router = useRouter();
  const [screenWidth] = useWindowSize();

  const onSearch = (search: SearchHistoryItem) => {
    router.push({ pathname: '/tim-kiem', query: { [search.key]: search.value } }, undefined, {
      shallow: router.pathname === '/search',
    });
    props.onClose();
  };

  return (
    <RecommendedSection>
      <RecommendedTitle>{props.title}</RecommendedTitle>
      <Space size={!screenWidth ? 0 : screenWidth <= 768 ? 10 : 16} wrap>
        {props.hashtags.map((item, index) => (
          <RecommendedTag key={index} onClick={() => onSearch(item)}>
            {item.value.split('--')[0]}
          </RecommendedTag>
        ))}
      </Space>
    </RecommendedSection>
  );
};
