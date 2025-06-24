import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// URL API backend
const API_URL = 'http://localhost:5000/api/admin/track-visit';
const TRACKING_INTERVAL = 10 * 60 * 1000; // 10 menit

interface VisitorTrackerProps {
  subMenuId: string | number;
  subMenuName?: string;
}

const VisitorTracker: React.FC<VisitorTrackerProps> = ({ subMenuId, subMenuName }) => {
  const [, setIpAddress] = useState<string | null>(null);

  useEffect(() => {
    // ✅ PERBAIKAN: Validasi awal subMenuId
    if (!subMenuId) {
      console.warn("VisitorTracker: subMenuId tidak valid:", subMenuId);
      return;
    }

    // Fungsi untuk mendapatkan IP address pengunjung
    const getIpAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setIpAddress(data.ip);
        return data.ip;
      } catch (error) {
        console.error("Gagal mendapatkan alamat IP:", error);
        return null;
      }
    };

    // Fungsi untuk mengelola session ID di localStorage
    const getOrCreateSessionId = () => {
      const storageKey = 'visitor_session_id';
      let sessionId = localStorage.getItem(storageKey);
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem(storageKey, sessionId);
        console.log("Session ID baru dibuat:", sessionId);
      }
      return sessionId;
    };

    // Fungsi untuk melacak kunjungan
    const trackVisit = async () => {
      const sessionId = getOrCreateSessionId();
      const visitorIp = await getIpAddress();

      if (!sessionId && !visitorIp) {
        console.error("Tidak dapat melacak pengunjung: Session ID dan IP tidak tersedia");
        return;
      }

      // ✅ PERBAIKAN: Normalisasi subMenuId
      let finalSubMenuId: string | number = subMenuId;
      
      // Jika string dan berisi angka, convert ke number
      if (typeof subMenuId === 'string' && !isNaN(parseInt(subMenuId, 10))) {
        finalSubMenuId = parseInt(subMenuId, 10);
      }
      
      // ✅ PERBAIKAN: Buat kunci yang lebih unik
      const sessionStorageKey = `visited_${finalSubMenuId}_${typeof finalSubMenuId}`;

      // Cek apakah halaman sudah dilacak dan apakah sudah lewat interval waktu
      const lastVisitTime = sessionStorage.getItem(sessionStorageKey);
      const shouldTrack = !lastVisitTime || 
        (new Date().getTime() - new Date(lastVisitTime).getTime() >= TRACKING_INTERVAL);

      if (!shouldTrack) {
        console.log(`Halaman ${finalSubMenuId} sudah dilacak dalam interval ${TRACKING_INTERVAL/60000} menit. Menunggu interval berikutnya.`);
        return;
      }

      try {
        console.log(`🔍 Melacak kunjungan untuk subMenu: ${finalSubMenuId} (${typeof finalSubMenuId}) - ${subMenuName || 'Tidak ada nama'}`);
        
        const requestBody = {
          sessionId,
          ipAddress: visitorIp,
          subMenuId: finalSubMenuId,
          timestamp: new Date().toISOString(),
        };

        console.log("📤 Data yang dikirim:", requestBody);

        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody)
        });

        if (response.ok) {
          // Catat waktu kunjungan saat ini
          sessionStorage.setItem(sessionStorageKey, new Date().toISOString());
          
          try {
            const data = await response.json();
            console.log("✅ Respons tracking kunjungan:", data);
          } catch (jsonError) {
            console.log("✅ Kunjungan berhasil dilacak! (Tidak dapat parse respons)", jsonError);
          }
        } else {
          console.error("❌ Gagal melacak kunjungan:", response.status, response.statusText);
          try {
            const textResponse = await response.text();
            console.error("📄 Respons server:", textResponse.substring(0, 200));
          } catch (textError) {
            console.error("❌ Tidak dapat membaca respons server", textError);
          }
        }
      } catch (error) {
        console.error("❌ Error mengirim data pelacakan:", error);
      }
    };

    // ✅ PERBAIKAN: Logging untuk debugging
    console.log(`🚀 VisitorTracker dimount untuk subMenuId: ${subMenuId} (${typeof subMenuId}), subMenuName: ${subMenuName}`);
    
    trackVisit();
  }, [subMenuId, subMenuName]);

  // Komponen ini tidak merender apapun, hanya melacak kunjungan
  return null;
};

export default VisitorTracker;