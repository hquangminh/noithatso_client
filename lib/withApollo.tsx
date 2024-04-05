import React from 'react';
import { NextPageContext } from 'next';

import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

interface SSRComponentElements {
  getInitialProps?: (ctx: NextPageContext) => Promise<any>;
}

const withApollo = (App: React.FC<any> & SSRComponentElements) => {
  const httpLink = createHttpLink({
    uri: `https://${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`,
    // credentials: 'same-origin',
  });

  const authLink = setContext((_, { headers }) => {
    return { headers: { ...headers } };
  });

  const client = new ApolloClient({ link: authLink.concat(httpLink), cache: new InMemoryCache() });

  function Apollo(props: any) {
    return (
      <ApolloProvider client={client}>
        {/* <App {...props} apolloClient={client} /> */}
        <App {...props} />
      </ApolloProvider>
    );
  }

  return Apollo;
};

export default withApollo;
