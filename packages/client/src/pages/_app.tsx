import { Jost } from 'next/font/google';
import { Router } from 'next/router';
import nprogress from 'nprogress';

import CommonLayout from '@components/layout/CommonLayout';
import UiContainer from '@components/uiContainer/UiContainer';
import ContextProvider from '@src/contexts/ContextProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import '@src/styles/globals.scss';
import 'nprogress/nprogress.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import HooksContainer from '@src/components/hooksContainer/HooksContainer';
import { NextComponentType, NextPageContext } from 'next';
const jost = Jost({ subsets: ['latin'] });

Router.events.on('routeChangeStart', nprogress.start);
Router.events.on('routeChangeError', nprogress.done);
Router.events.on('routeChangeComplete', nprogress.done);

export type NextApplicationPage = NextComponentType<
  NextPageContext,
  any,
  any
> & {
  noLayout?: boolean;
};

export default function App({
  Component,
  pageProps,
}: {
  Component: NextApplicationPage;
  pageProps: any;
}) {
  return (
    <ContextProvider>
      <div className={jost.className}>
        {Component.noLayout ? (
          <Component {...pageProps} />
        ) : (
          <CommonLayout>
            <Component {...pageProps} />
          </CommonLayout>
        )}

        <UiContainer />
        <HooksContainer />
        <ReactQueryDevtools />
      </div>
    </ContextProvider>
  );
}
