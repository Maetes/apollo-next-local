import NProgress from 'nprogress';
import { SingletonRouter } from 'next/router';

export const fancyLoadingBar = (Router: SingletonRouter) => {
  if (typeof window !== 'undefined') {
    NProgress.configure({ showSpinner: false });

    Router.events.on('routeChangeStart', () => {
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', () => {
      NProgress.done();
    });

    Router.events.on('routeChangeError', () => {
      NProgress.done();
    });
  }
};
