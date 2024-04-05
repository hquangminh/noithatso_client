import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { styled } from 'styled-components';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Spin } from 'antd';

import {
  API_Search,
  API_SearchBlog,
  API_SearchPortfolio,
  API_SearchProduct,
  API_UpdateHashtagCount,
} from 'graphql/search/query';

import SearchBox from 'components/Pages/Search/SearchBox';
import SearchPortfolioContainer from './SearchPortfolio';
import SearchProductContainer from './SearchProduct';
import SearchBlogContainer from './SearchBlog';
import ResultFragment from 'components/Fragments/Result';

import { BlogType } from 'interface/Blog';
import { PortfolioType } from 'interface/Portfolio';
import { ProductType } from 'interface/Product';
import { SearchHistoryItem } from 'interface/Search';

import { Container } from 'lib/styles';

const Wrapper = styled.div`
  border: solid 1px #e3e3e8;
`;

type DataSearchPortfolio = {
  portfolio: PortfolioType[];
  portfolio_aggregate: { aggregate: { count: number } };
};

type DataSearchProduct = {
  product: ProductType[];
  product_aggregate: { aggregate: { count: number } };
};

type DataSearchBlog = {
  blog: BlogType[];
  blog_aggregate: { aggregate: { count: number } };
};

type DataSearch = DataSearchPortfolio & DataSearchProduct & DataSearchBlog;

const InitialData: DataSearch = {
  portfolio: [],
  portfolio_aggregate: { aggregate: { count: 0 } },
  product: [],
  product_aggregate: { aggregate: { count: 0 } },
  blog: [],
  blog_aggregate: { aggregate: { count: 0 } },
};

const SearchContainer = () => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [dataSearch, setDataSearch] = useState<DataSearch>(InitialData);

  const [fetchSearchResult] = useLazyQuery<DataSearch>(API_Search, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setLoading(false);
      setDataSearch({
        portfolio: data.portfolio,
        portfolio_aggregate: data.portfolio_aggregate,
        product: data.product,
        product_aggregate: data.product_aggregate,
        blog: data.blog,
        blog_aggregate: data.blog_aggregate,
      });
    },
  });

  const [loadMorePortfolio, { loading: fetchingPortfolio }] = useLazyQuery<DataSearchPortfolio>(
    API_SearchPortfolio,
    {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) =>
        setDataSearch(({ portfolio, ...currentData }) => ({
          ...currentData,
          portfolio: portfolio.concat(data.portfolio),
        })),
    },
  );

  const [loadMoreProduct, { loading: fetchingProduct }] = useLazyQuery<DataSearchProduct>(API_SearchProduct, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) =>
      setDataSearch(({ product, ...currentData }) => ({
        ...currentData,
        product: product.concat(data.product),
      })),
  });

  const [loadMoreBlog, { loading: fetchingBlog }] = useLazyQuery<DataSearchBlog>(API_SearchBlog, {
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) =>
      setDataSearch(({ blog, ...currentData }) => ({ ...currentData, blog: blog.concat(data.blog) })),
  });

  const [updateHashtagCount] = useMutation(API_UpdateHashtagCount);

  useEffect(() => {
    const hashtag = router.query.hashtag?.toString().trim();
    const keyword = router.query.keywords?.toString().trim();
    if (hashtag || keyword) updateHashtagCount({ variables: { name: (hashtag ?? keyword)?.split('--')[0] } });
  }, [router.query.hashtag, router.query.keywords, updateHashtagCount]);

  const saveSearchHistory = useCallback(() => {
    const searchHistoryStorage = localStorage.getItem('search_history');
    const searchHistory: SearchHistoryItem[] = searchHistoryStorage ? JSON.parse(searchHistoryStorage) : [];

    const { hashtag, keywords } = router.query;

    if (hashtag?.toString().trim()) {
      const indexExist = searchHistory.findIndex(
        (i) => i.value.split('--')[0] === hashtag?.toString().split('--')[0],
      );

      if (indexExist !== -1) searchHistory.splice(indexExist, 1);
      searchHistory.unshift({
        key: searchHistory[indexExist]?.key ?? 'hashtag',
        value:
          searchHistory[indexExist]?.key === 'keywords'
            ? hashtag.toString().split('--')[0]
            : hashtag.toString(),
      });
    } else if (keywords?.toString().trim()) {
      const indexExist = searchHistory.findIndex(
        (i) => i.value.split('-')[0] === keywords?.toString().split('-')[0],
      );
      if (indexExist !== -1) searchHistory.splice(indexExist, 1);
      searchHistory.unshift({ key: 'keywords', value: keywords.toString().split('-')[0] });
    }

    localStorage.setItem('search_history', JSON.stringify(searchHistory.slice(0, 30)));
  }, [router.query]);

  const onGetFilter = useCallback((): { filterPortfolio: any; filterProduct: any; filterBlog: any } => {
    let filterPortfolio: Record<string, any> = {};
    let filterProduct: Record<string, any> = {
      status: { _eq: true },
      product_category_relations: {
        product_category: {
          status: { _eq: true },
          _or: [{ product_category: { status: { _eq: true } } }, { parent_id: { _is_null: true } }],
        },
      },
    };
    let filterBlog: Record<string, any> = {};

    const keyword = router.query.keywords?.toString().trim()
      ? `%${router.query.keywords?.toString().trim()}%`
      : null;
    const hashtag = router.query.hashtag ? `%${router.query.hashtag.toString().split('--')[0]}%` : null;

    if (keyword || hashtag) {
      filterPortfolio['_or'] = [
        keyword ? { name: { _ilike: keyword } } : undefined,
        { portfolio_hashtags: { hashtag: { name: { _ilike: hashtag ?? keyword } } } },
      ].filter((i) => i);
      filterProduct['_or'] = [
        keyword ? { name: { _ilike: keyword } } : undefined,
        { product_hashtags: { hashtag: { name: { _ilike: hashtag ?? keyword } } } },
      ].filter((i) => i);
      filterBlog['_or'] = [
        keyword ? { title: { _ilike: keyword } } : undefined,
        { blog_hashtags: { hashtag: { name: { _ilike: hashtag ?? keyword } } } },
      ].filter((i) => i);
    }

    return { filterPortfolio, filterProduct, filterBlog };
  }, [router.query.hashtag, router.query.keywords]);

  useEffect(() => {
    saveSearchHistory();
  }, [saveSearchHistory]);

  const onSearch = useCallback(() => {
    const filter = onGetFilter();
    setLoading(true);
    setDataSearch(InitialData);
    fetchSearchResult({ variables: filter });
  }, [fetchSearchResult, onGetFilter]);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  const onLoadMore = async (type: 'portfolio' | 'product' | 'blog') => {
    const { filterPortfolio, filterProduct, filterBlog } = onGetFilter();

    if (type === 'portfolio')
      await loadMorePortfolio({
        variables: { filter: filterPortfolio, offset: dataSearch.portfolio.length },
      });
    else if (type === 'product')
      await loadMoreProduct({ variables: { filter: filterProduct, offset: dataSearch.product.length } });
    else if (type === 'blog')
      await loadMoreBlog({ variables: { filter: filterBlog, offset: dataSearch.blog.length } });
  };

  const isNoResult =
    dataSearch.portfolio.length === 0 && dataSearch.product.length === 0 && dataSearch.blog.length === 0;

  return (
    <Wrapper>
      <Container>
        <SearchBox />

        {isNoResult && !loading && <ResultFragment title='Không tìm thấy kết quả phù hợp' />}
        {isNoResult && loading && (
          <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spin size='large' />
          </div>
        )}

        {dataSearch.portfolio.length > 0 && (
          <SearchPortfolioContainer
            data={dataSearch.portfolio}
            total={dataSearch.portfolio_aggregate.aggregate.count}
            loading={fetchingPortfolio}
            onLoadMore={() => onLoadMore('portfolio')}
          />
        )}
        {dataSearch.product.length > 0 && (
          <SearchProductContainer
            data={dataSearch?.product}
            total={dataSearch?.product_aggregate.aggregate.count}
            loading={fetchingProduct}
            onLoadMore={() => onLoadMore('product')}
          />
        )}
        {dataSearch.blog.length > 0 && (
          <SearchBlogContainer
            data={dataSearch.blog}
            total={dataSearch.blog_aggregate.aggregate.count}
            loading={fetchingBlog}
            onLoadMore={() => onLoadMore('blog')}
          />
        )}
      </Container>
    </Wrapper>
  );
};

export default SearchContainer;
