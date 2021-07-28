import Head from 'next/head';
import { formatAddress, useWeb3 } from '../providers/Web3Provider';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { makeRequest } from '../services/http';
import { SIGNATURE_MESSAGE } from '../constants';
import { Button } from 'react-bootstrap';
//import { CUSTOM_SIZES, pxToRem } from '../themes';
//import { Box, Button, Container, Flex, useThemeUI } from 'theme-ui';


export default function Home() {
  const {
    query: { code },
  } = useRouter();
  const { address, initWeb3, web3 } = useWeb3();
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [errMsg, setMsg] = useState("")

  const signMessage = () => {
    //@ts-ignore
    web3.currentProvider.sendAsync({
      method: 'personal_sign',
      params: [SIGNATURE_MESSAGE + address, address],
      from: address,
    }, async (err, res) => {
      const endpointData = {
        signature: res,
        address,
        code,
      };
      const { status, data } = await makeRequest('/api/subscribe', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(endpointData),
      });
      setSuccess(data.verified);
      if (!data.verified && data.msg.length > 0){
        setMsg(data.msg)
        setErr(true)
      }
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <h1 className="title">
          Welcome to the NFT42 verify page!
        </h1>

        <p className="description">
          Get started by connecting your wallet then signing a message
        </p>

        {!web3 &&<Button onClick={initWeb3} sx={{ fontSize: 3, ml: 3, minWidth: '10.5em' }}>
                  Connect Wallet
                </Button>}
        {address && (
          <>
            <p>Connected with {address}</p>
            <Button onClick={signMessage}sx={{ fontSize: 3, ml: 3, minWidth: '10.5em' }}>Sign message</Button>
          </>
        )}
        {success && (
          <>
          <p> Authentification successful, you may return to discord!</p>
          </>
        )}
        {err && (
          <>
          <p> Error: {errMsg}</p>
          </>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #363b48;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background: gray;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
