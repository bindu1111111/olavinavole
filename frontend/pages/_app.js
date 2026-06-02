import '../styles/globals.css';
import { useEffect } from 'react';
import { useAuthStore } from '../store';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Restore auth session on app load
    const authStore = useAuthStore();
    authStore.restoreSession();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
