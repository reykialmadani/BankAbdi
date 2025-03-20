import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from "react";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from 'uuid';  // Pastikan menginstal paket ini

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Periksa apakah session_id ada, jika tidak buat yang baru
    if (!Cookie.get('session_id')) {
      // Menggunakan UUID untuk keunikan yang lebih baik daripada timestamp
      const sessionId = uuidv4();
      
      // Set cookie untuk kedaluwarsa dalam 30 hari
      Cookie.set('session_id', sessionId, { expires: 30 });
      console.log("ID sesi baru dibuat:", sessionId);
    } else {
      console.log("Menggunakan ID sesi yang sudah ada:", Cookie.get('session_id'));
    }
  }, []);

  return <Component {...pageProps} />;
}