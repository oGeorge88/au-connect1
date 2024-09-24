// pages/_app.js
import { SessionProvider as Provider } from 'next-auth/react';
import '../app/globals.css'; // Update to match the actual path

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
