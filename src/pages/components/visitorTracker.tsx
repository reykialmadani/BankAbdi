import { useEffect } from "react";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from 'uuid';

// Tetapkan URL backend yang benar
const BACKEND_URL = 'http://localhost:5000';

interface VisitorTrackerProps {
  subMenuId: string | number;
  subMenuName?: string;
}

const VisitorTracker: React.FC<VisitorTrackerProps> = ({ subMenuId, subMenuName }) => {
  useEffect(() => {
    // Fungsi untuk membuat session ID jika belum ada
    const ensureSessionId = () => {
      if (!Cookie.get('session_id')) {
        const sessionId = uuidv4();
        Cookie.set('session_id', sessionId, { expires: 30 });
        console.log("Session ID baru dibuat:", sessionId);
      }
      return Cookie.get('session_id');
    };

    // Fungsi untuk melacak kunjungan
    const trackVisit = async () => {
      const sessionId = ensureSessionId();
      
      if (!sessionId) {
        console.error("Session ID tidak ditemukan!");
        return;
      }
      
      // Pastikan subMenuId adalah angka yang valid
      let finalSubMenuId: string | number = subMenuId;
      
      if (typeof subMenuId === 'string' && !isNaN(parseInt(subMenuId, 10))) {
        finalSubMenuId = parseInt(subMenuId, 10);
      }
      
      try {
        console.log(`Melacak kunjungan untuk subMenu: ${finalSubMenuId} - ${subMenuName || 'Tidak ada nama'}`);
        
        // Gunakan URL backend yang benar
        const response = await fetch(`${BACKEND_URL}/api/admin/track-visit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            subMenuId: finalSubMenuId,
            timestamp: new Date().toISOString(),
          }),
          // Penting untuk permintaan lintas origin
          credentials: 'include',
        });
        
        if (response.ok) {
          try {
            const data = await response.json();
            console.log("Kunjungan berhasil dilacak!", data);
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
  }, [subMenuId, subMenuName]);

  // Komponen ini tidak merender apapun, hanya melacak kunjungan
  return null;
};

export default VisitorTracker;