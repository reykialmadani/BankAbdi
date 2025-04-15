import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from "react";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from 'uuid'; 

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (!Cookie.get('session_id')) {
      const sessionId = uuidv4();
      
      Cookie.set('session_id', sessionId, { expires: 30 });
      console.log("ID sesi baru dibuat:", sessionId);
    } else {
      console.log("Menggunakan ID sesi yang sudah ada:", Cookie.get('session_id'));
    }
  }, []);

  return <Component {...pageProps} />;
}