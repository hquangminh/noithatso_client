import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const urlRoot = process.env.NEXT_PUBLIC_URL_ROOT,
  fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

type Props = {
  name: string;
  title?: string;
  descriptions?: string;
  image?: string;
  keywords?: string;
  type?: 'website' | 'article';
  twitter_card?: 'summary' | 'summary_large_image' | 'app';
  children?: ReactNode;
};

const HeadSeo = (props: Props) => {
  const router = useRouter();

  const { name, title, descriptions, image, keywords, type, twitter_card } = props;
  const pageTitle = 'Nội Thất Số | ' + name;

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name='keywords' content={keywords} />
      <meta name='description' content={descriptions} key='desc' />

      {/* Facebook Open Graph */}
      <meta property='og:site_name' content='Nội Thất Số' />
      <meta property='og:url' content={urlRoot + router.asPath} />
      <meta property='og:type' content={type ?? 'website'} />
      <meta property='og:title' content={title ?? pageTitle} />
      <meta property='og:description' content={descriptions} />

      <meta property='fb:app_id' content={fbAppId} />

      <meta property='og:locale' content='vi_VN' />

      <meta property='og:image' content={image || urlRoot + '/static/thumbnail.jpg'} />
      {/* <meta property='og:image:height' content='500' /> */}
      {/* <meta property='og:image:width' content='500' /> */}

      {props.children}

      {/* Twitter Card data */}
      <meta name='twitter:card' content={twitter_card ?? 'summary'} />
      <meta name='twitter:site' content={urlRoot + router.asPath} />
      <meta name='twitter:title' content={title ?? pageTitle} />
      <meta name='twitter:description' content={descriptions} />
      <meta name='twitter:image' content={image || urlRoot + '/static/thumbnail.jpg'} />

      <link rel='image_src' href={image || urlRoot + '/static/thumbnail.jpg'} />
      <link rel='canonical' href={urlRoot + router.asPath} />
    </Head>
  );
};

export default HeadSeo;
