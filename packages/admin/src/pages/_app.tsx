import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextComponentType, NextPageContext } from 'next';
import { Public_Sans } from 'next/font/google';
import Router from 'next/router';
import nprogress from 'nprogress';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '@src/styles/globals.scss';
import 'nprogress/nprogress.css';
import ContextProvider from '@src/contexts/ContextProvider';

// src
import CommonLayout from '@components/layout/CommonLayout';
import RequireAdmin from '@components/requireAdmin/RequireAdmin';
import UiContainer from '@components/uiContainer/UiContainer';

import type { AppProps } from 'next/app';

const publicSans = Public_Sans({ subsets: ['latin'] });

Router.events.on('routeChangeStart', nprogress.start);
Router.events.on('routeChangeError', nprogress.done);
Router.events.on('routeChangeComplete', nprogress.done);

export type NextApplicationPage = NextComponentType<
  NextPageContext,
  any,
  any
> & {
  requireAdmin?: boolean;
};

function App(props: AppProps): JSX.Element {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <ContextProvider>
      <main className={publicSans.className}>
        {Component.requireAdmin === false ? (
          <Component {...pageProps} />
        ) : (
          <RequireAdmin>
            <CommonLayout>
              <Component {...pageProps} />
            </CommonLayout>
          </RequireAdmin>
        )}
        <UiContainer />
        <ReactQueryDevtools />
      </main>
    </ContextProvider>
  );
}

export default App;
