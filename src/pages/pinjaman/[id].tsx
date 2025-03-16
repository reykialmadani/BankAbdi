import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Sidebar from "./section/sidebar";
import Content from "./section/content";
import TableSection from "./section/tableSection";
import LoanProductsSlider from "./section/LoanProductSlider";
import CreditRequitment from "./section/tabelRequitment";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import { getAllContents, getContentBySubMenuUrl, Content as ContentType } from "@/pages/api/fetching/routes";

interface LoanProduct {
  title: string;
  description: string;
  icon: string;
  href: string;
}

// Data default untuk tampilan jika data dari backend belum tersedia
const defaultData: Record<string, { title: string, description: string, image: string, icon: string }> = {
  "kredit-modal-kerja": {
    title: "Kredit Modal Kerja",
    description: "Fasilitas pembiayaan yang diperuntukkan sebagai modal usaha untuk meningkatkan produksi dalam kegiatan operasional.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png",
  },
  "kredit-investasi": {
      title: "Kredit Investasi",
      description:
        "Fasilitas pembiayaanyang diberikan untuk membiayai kebutuhan dalam jangka panjang dalam mengembangkan/memperluas usaha anda.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-ki.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png",
    },
    "kredit-multiguna": {
      title: "Kredit Multiguna",
      description:
        "Fasilitas pembiayaan yang diberikan kepada pegawai/pengusaha yang memiliki penghasilan/profesi tetap, untuk membiayai berbagai macam kebutuhannya.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-km.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_km.png",
    },
    "kredit-kepemilikan-rumah": {
      title: "Kredit Kepemilikan Rumah (KPR)",
      description:
        "Fasilitas pembiayaan untuk membeli rumah / rumah toko / rumah kantor.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpr.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpr.png",
    },
    "kredit-kepemilikan-mobil": {
      title: "Kredit Kepemilikan Mobil (KPM)",
      description:
        "Fasilitas pembiayaan untuk pembelian kendaraan roda empat / mobil baik baru maupun bekas.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpm.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpm.png",
    },
    "kredit-kendaraan-bermotor": {
      title: "Kredit Kendaraan Bermotor (KKB)",
      description:
        "Faslititas pembiayaan untuk pembelian kendaraan bermotor roda dua untuk nasabah perseorangan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kkb.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kkb.png",
    },
    "kredit-tanpa-agunan": {
      title: "Kredit Tanpa Agunan (KTA)",
      description:
        "Fasilitas pembiayaan yang merupakan pinjaman tanpa adanya jaminan atau agunan atas pinjaman yang diajukan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kta.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kta.png",
    },
    "form-pengajuan-kredit": {
      title: "Formulir Pengajuan Pinjaman",
      description: "",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kta.png",
    },
  };

const PinjamanDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<ContentType[]>([]);
  const [menuItems, setMenuItems] = useState<{ href: string; label: string }[]>([]);
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!id) return;
        
        // Normalisasi ID untuk pencarian
        const normalizedId = typeof id === 'string' ? id : '';
        console.log("Current URL ID:", normalizedId);
        
        // Ambil semua konten dari backend
        console.log("Fetching all contents...");
        const allContents = await getAllContents();
        console.log("API Response (all contents):", JSON.stringify(allContents, null, 2));
        setContents(allContents);

        // Mengumpulkan menu items dari semua konten
        const uniqueSubMenus = new Map();
        allContents.forEach(content => {
          if (content.sub_menu && content.status) {
            const url = content.sub_menu.url.startsWith('/') ? content.sub_menu.url.substring(1) : content.sub_menu.url;
            const href = `/pinjaman/${url.replace('/pinjaman/', '')}`;
            if (!uniqueSubMenus.has(url)) {
              uniqueSubMenus.set(url, { href, label: content.sub_menu.name || content.sub_menu.sub_menu_name });
            }
          }
        });

        if (uniqueSubMenus.size === 0) {
          console.log("Tidak ada data dari backend, menggunakan data default");
          const defaultMenuItems = Object.keys(defaultData).map(key => ({
            href: `/pinjaman/${key}`,
            label: defaultData[key].title,
          }));
          setMenuItems(defaultMenuItems);
          setLoanProducts(Object.keys(defaultData).map(key => ({
            title: defaultData[key].title,
            description: defaultData[key].description,
            icon: defaultData[key].icon,
            href: `/pinjaman/${key}`,
          })));
        } else {
          console.log("Menggunakan data dari backend");
          setMenuItems(Array.from(uniqueSubMenus.values()));
          setLoanProducts(Array.from(uniqueSubMenus.values()).map(item => {
            const urlPath = item.href.replace('/pinjaman/', '');
            const relatedContent = allContents.find(content => 
              content.sub_menu && (
                content.sub_menu.url === urlPath || 
                content.sub_menu.url === `/${urlPath}` ||
                content.sub_menu.url.endsWith(`/${urlPath}`)
              )
            );
            const defaultIcon = defaultData[urlPath]?.icon || "/img/icon/placeholder-icon.png";
            return {
              title: item.label,
              description: relatedContent?.description || "",
              icon: relatedContent?.thumbnail || defaultIcon,
              href: item.href,
            };
          }));
        }

        // PERBAIKAN: Cara pencarian konten yang lebih fleksibel
        console.log("Mencari konten untuk ID:", normalizedId);
        
        // Metode 1: Cari berdasarkan berbagai format URL yang mungkin
        let contentForCurrentPage = allContents.find(content => {
          if (!content.sub_menu || !content.status) return false;
          
          const subMenuUrl = content.sub_menu.url;
          
          // Ekstrak bagian terakhir dari URL untuk perbandingan
          const urlParts = subMenuUrl.split('/');
          const lastUrlPart = urlParts[urlParts.length - 1];
          
          // Bandingkan dengan berbagai kemungkinan format
          return (
            lastUrlPart === normalizedId || 
            subMenuUrl === `/${normalizedId}` || 
            subMenuUrl === normalizedId ||
            subMenuUrl === `/pinjaman/${normalizedId}` ||
            subMenuUrl.endsWith(`/${normalizedId}`)
          );
        });
        
        // Jika masih tidak ditemukan, coba dengan getContentBySubMenuUrl
        if (!contentForCurrentPage) {
          console.log("Konten tidak ditemukan dengan pencarian langsung, mencoba getContentBySubMenuUrl");
          try {
            // Coba berbagai format URL untuk API call
            let specificContents = await getContentBySubMenuUrl(normalizedId);
            
            // Jika kosong, coba format lain
            if (!specificContents || specificContents.length === 0) {
              specificContents = await getContentBySubMenuUrl(`/pinjaman/${normalizedId}`);
            }
            
            console.log("Specific contents response:", specificContents);
            if (specificContents && specificContents.length > 0) {
              contentForCurrentPage = specificContents[0];
            }
          } catch (err) {
            console.error("Error fetching specific content:", err);
          }
        }

        console.log("Content for current page:", contentForCurrentPage);
        setCurrentContent(contentForCurrentPage || null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMenuItems(Object.keys(defaultData).map(key => ({
          href: `/pinjaman/${key}`,
          label: defaultData[key].title,
        })));
        setLoanProducts(Object.keys(defaultData).map(key => ({
          title: defaultData[key].title,
          description: defaultData[key].description,
          icon: defaultData[key].icon,
          href: `/pinjaman/${key}`,
        })));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getPinjamanData = () => {
    if (!id) return null;
    
    const normalizedId = typeof id === 'string' ? id : '';
    
    // Selalu prioritaskan data default untuk title, description, image, dan icon
    // Ini memastikan tampilan Hero selalu konsisten dengan desain yang diinginkan
    const defaultHeroData = defaultData[normalizedId];
    
    if (!defaultHeroData) {
      return null; // Jika tidak ada data default, kembalikan null
    }
    
    // Metode pencarian untuk data lain dari backend (jika diperlukan)
    const content = contents.find(c => {
      if (!c.sub_menu || !c.status) return false;
      
      const subMenuUrl = c.sub_menu.url;
      const urlParts = subMenuUrl.split('/');
      const lastUrlPart = urlParts[urlParts.length - 1];
      
      return (
        lastUrlPart === normalizedId || 
        subMenuUrl === `/${normalizedId}` || 
        subMenuUrl === normalizedId ||
        subMenuUrl === `/pinjaman/${normalizedId}` ||
        subMenuUrl.endsWith(`/${normalizedId}`)
      );
    });
    
    return {
      title: defaultHeroData.title,
      description: defaultHeroData.description,
      image: defaultHeroData.image,
      icon: defaultHeroData.icon,
    };
  };

  const pinjamanData = getPinjamanData();

  useEffect(() => {
    console.log("Current content state:", currentContent);
  }, [currentContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {pinjamanData ? (
        <>
          <Hero
            imageSrc={pinjamanData.image}
            title={pinjamanData.title}
            paragraph={pinjamanData.description}
            showButton={false}
          />
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 py-8">
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />
              <div className="lg:w-3/4 w-full">
                <Content contentData={currentContent} isLoading={loading} />
              </div>
            </div>
            <TableSection />
            <LoanProductsSlider loanProducts={loanProducts} />
            <CreditRequitment />
          </div>
          <Blog />
          <Footer />
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">Silakan pilih jenis pinjaman yang tersedia.</p>
        </div>
      )}
    </div>
  );
};

export default PinjamanDetail;