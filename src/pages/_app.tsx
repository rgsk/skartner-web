import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import createEmotionCache from 'createEmotionCache';
import { AppProps } from 'next/app';
import Head from 'next/head';
import theme from 'theme';

import { ApolloProvider } from '@apollo/client';
import Layout from 'components/Global/Layout';
import { GlobalContextProvider } from 'context/GlobalContext';
import { GreContextProvider } from 'context/GreContext';
import apolloClient from 'lib/apolloClient';

import 'styles/globals.css';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <GlobalContextProvider>
              <GreContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </GreContextProvider>
            </GlobalContextProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
