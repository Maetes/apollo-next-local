import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../apollo/useApollo';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;
