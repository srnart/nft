import { AppProps } from 'next/dist/next-server/lib/router/router';
import Web3Provider from '../providers/Web3Provider';
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default App;
