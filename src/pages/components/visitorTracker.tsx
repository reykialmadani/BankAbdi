import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

// URL API backend
const API_URL = 'http://localhost:5000/api/admin/track-visit';

interface VisitorTrackerProps {
  subMenuId: string | number;
  subMenuName?: string;
}

const VisitorTracker: React.FC<VisitorTrackerProps> = ({ subMenuId, subMenuName }) => {
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  useEffect(() => {
    // Fungsi untuk mendapatkan IP address pengunjung
    const getIpAddress = async () => {
      try {
        // Menggunakan layanan publik untuk mendapatkan IP
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

      // Pastikan subMenuId adalah angka yang valid
      let finalSubMenuId: string | number = subMenuId;
      if (typeof subMenuId === 'string' && !isNaN(parseInt(subMenuId, 10))) {
        finalSubMenuId = parseInt(subMenuId, 10);
      }

      // Buat kunci unik untuk halaman ini untuk sessionStorage
      // Ini untuk mencegah permintaan berulang selama sesi browser saat ini
      const sessionStorageKey = `visited_${finalSubMenuId}`;

      // Periksa apakah halaman ini sudah dilacak dalam sesi browser ini
      if (sessionStorage.getItem(sessionStorageKey)) {
        console.log("Halaman ini sudah dilacak dalam sesi browser ini.");
        return;
      }

      try {
        console.log(`Melacak kunjungan untuk subMenu: ${finalSubMenuId} - ${subMenuName || 'Tidak ada nama'}`);
        
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            ipAddress: visitorIp,
            subMenuId: finalSubMenuId,
            timestamp: new Date().toISOString(),
          })
        });

        if (response.ok) {
          // Tandai halaman ini sebagai sudah dilacak untuk sesi browser ini
          sessionStorage.setItem(sessionStorageKey, new Date().toISOString());
          
          try {
            const data = await response.json();
            console.log("Respons tracking kunjungan:", data);
          } catch (jsonError) {
            console.log("Kunjungan berhasil dilacak! (Tidak dapat parse respons)");
          }
        } else {
          console.error("Gagal melacak kunjungan:", response.status, response.statusText);
          try {
            const textResponse = await response.text();
            console.error("Respons server:", textResponse.substring(0, 100));
          } catch (textError) {
            console.error("Tidak dapat membaca respons server");
          }
        }
      } catch (error) {
        console.error("Error mengirim data pelacakan:", error);
      }
    };

    // Hanya melacak jika subMenuId valid
    if (subMenuId) {
      trackVisit();
    }
  }, [subMenuId, subMenuName]); // Dependency array untuk useEffect, hanya jalan ulang jika subMenuId atau subMenuName berubah

  // Komponen ini tidak merender apapun, hanya melacak kunjungan
  return null;
};

export default VisitorTracker;