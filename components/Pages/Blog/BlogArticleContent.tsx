import { styled } from 'styled-components';
import { maxMedia } from 'lib/styles';

const BlogContent = styled.section`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.7;
  color: ${({ theme }) => theme.textColor};

  div,
  span {
    max-width: 100%;
    height: auto !important;
  }
  p {
    text-align: justify;
  }
  table {
    height: auto !important;
    td {
      padding: 0 8px;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        padding-right: 0;
      }
    }
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.common.black};
  }
  a {
    color: #0000ee;
  }
  img {
    margin: 8px 0;
    max-width: 100% !important;
    height: auto !important;
  }
  video,
  iframe {
    margin-block: 8px;
    max-width: 100% !important;
  }
  br {
    content: '';
    margin: 2em;
    display: block;
    font-size: 24%;
  }
  li {
    margin-bottom: 0.25em;
  }

  figure {
    text-align: center;
    img {
      margin-bottom: 0px;
    }
    figcaption {
      color: #999;
    }
  }

  ${maxMedia.small} {
    font-size: 14px;
    /* table {
      width: 100%;
      thead {
        display: none;
      }
      tr {
        display: flex;
        flex-direction: column;
        td {
          vertical-align: top;
          width: 100% !important;
          padding-inline: 0 !important;
        }
      }
    } */
  }
`;

type Props = { content: string };

const BlogArticleContent = ({ content }: Props) => {
  return <BlogContent dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogArticleContent;
