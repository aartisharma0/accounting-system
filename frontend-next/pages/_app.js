import '../styles/globals.css';
import '../styles/layout.css';
import '../styles/table.css';
import '../styles/form.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;