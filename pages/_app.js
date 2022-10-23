import { SessionProvider } from 'next-auth/react';
import React from 'react';
import '../styles/globals.css';
import '../styles/table.css';
import 'normalize.css/normalize.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  
  return (
    <>
      <SessionProvider 
        session={pageProps.session}
        refetchInterval={5 * 60}
      >
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
