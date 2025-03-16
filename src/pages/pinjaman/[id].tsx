// pages/pinjaman/[id].tsx
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
// import LoadingSpinner from "../components/ui/LoadingSpinner";

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
    description: "Fasilitas pembiayaan yang diberikan untuk membiayai kebutuhan dalam jangka panjang dalam mengembangkan/memperluas usaha anda.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-ki.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png",
  },
  "kredit-multiguna": {
    title: "Kredit Multiguna",
    description: "Fasilitas pembiayaan yang diberikan kepada pegawai/pengusaha yang memiliki penghasilan/profesi tetap, untuk membiayai berbagai macam kebutuhannya.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-km.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_km.png",
  },
  "kredit-kepemilikan-rumah": {
    title: "Kredit Kepemilikan Rumah (KPR)",
    description: "Fasilitas pembiayaan untuk membeli rumah / rumah toko / rumah kantor.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpr.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_kpr.png",
  },
  "kredit-kepemilikan-mobil": {
    title: "Kredit Kepemilikan Mobil (KPM)",
    description: "Fasilitas pembiayaan untuk pembelian kendaraan roda empat / mobil baik baru maupun bekas.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpm.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_kpm.png",
  },
  "kredit-kendaraan-bermotor": {
    title: "Kredit Kendaraan Bermotor (KKB)",
    description: "Faslititas pembiayaan untuk pembelian kendaraan bermotor roda dua untuk nasabah perseorangan.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kkb.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_kkb.png",
  },
  "kredit-tanpa-agunan": {
    title: "Kredit Tanpa Agunan (KTA)",
    description: "Fasilitas pembiayaan yang merupakan pinjaman tanpa adanya jaminan atau agunan atas pinjaman yang diajukan.",
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
        console.log("Current URL ID:", id);
        
        // Mengambil semua konten dari backend
        const allContents = await getAllContents();
        console.log("API Response (all contents):", allContents);
        setContents(allContents);

        // Membuat menu items dan loan products dari konten yang diperoleh
        const uniqueSubMenus = new Map();
        
        allContents.forEach(content => {
          if (content.sub_menu && content.status) {
            const url = content.sub_menu.url;
            // Pastikan format URL konsisten dengan slash
            const href = url.startsWith('/') ? `/pinjaman${url}` : `/pinjaman/${url}`;
            
            if (!uniqueSubMenus.has(url)) {
              uniqueSubMenus.set(url, {
                href: href,
                label: content.sub_menu.name
              });
            }
          }
        });

        // Jika tidak ada data dari backend, gunakan data default
        if (uniqueSubMenus.size === 0) {
          console.log("Tidak ada data dari backend, menggunakan data default");
          const defaultMenuItems = Object.keys(defaultData).map((key) => ({
            href: `/pinjaman/${key}`,
            label: defaultData[key].title,
          }));
          setMenuItems(defaultMenuItems);

          const defaultLoanProducts = Object.keys(defaultData).map((key) => ({
            title: defaultData[key].title,
            description: defaultData[key].description,
            icon: defaultData[key].icon,
            href: `/pinjaman/${key}`,
          }));
          setLoanProducts(defaultLoanProducts);
        } else {
          // Gunakan data dari backend
          console.log("Menggunakan data dari backend");
          setMenuItems(Array.from(uniqueSubMenus.values()));
          
          const products = Array.from(uniqueSubMenus.values()).map(item => {
            // Ambil URL dari href untuk pencarian konten
            const urlPath = item.href.replace('/pinjaman', '');
            
            const relatedContent = allContents.find(content => 
              content.sub_menu && content.sub_menu.url === urlPath.replace('/', '')
            );
            
            console.log("URL Path:", urlPath);
            console.log("Related Content:", relatedContent);
            
            // Fix untuk menghindari error "Cannot read properties of undefined"
            const key = item.href.split('/').pop() || "";
            const defaultIcon = defaultData[key] ? defaultData[key].icon : "";
            
            return {
              title: item.label,
              description: relatedContent?.description || "",
              icon: relatedContent?.thumbnail || defaultIcon || "/img/icon/placeholder-icon.png",
              href: item.href
            };
          });
          
          setLoanProducts(products);
        }

        // Set konten saat ini berdasarkan ID URL
        if (id) {
          console.log("Mencari konten untuk ID:", id);
          
          // Coba cara 1: Mencari di allContents
          let contentForCurrentPage = allContents.find(
            content => content.sub_menu && 
            (content.sub_menu.url === id || content.sub_menu.url === `/${id}`) && 
            content.status
          );
          
          // Jika tidak ditemukan dengan cara 1, coba cara 2: Menggunakan API langsung
          if (!contentForCurrentPage) {
            console.log("Konten tidak ditemukan dengan pencarian langsung, mencoba getContentBySubMenuUrl");
            try {
              const specificContents = await getContentBySubMenuUrl(id as string);
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
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        // Gunakan data default jika terjadi kesalahan
        const defaultMenuItems = Object.keys(defaultData).map((key) => ({
          href: `/pinjaman/${key}`,
          label: defaultData[key].title,
        }));
        setMenuItems(defaultMenuItems);

        const defaultLoanProducts = Object.keys(defaultData).map((key) => ({
          title: defaultData[key].title,
          description: defaultData[key].description,
          icon: defaultData[key].icon,
          href: `/pinjaman/${key}`,
        }));
        setLoanProducts(defaultLoanProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Tambahkan id ke dependency array agar useEffect dijalankan ulang saat id berubah

  // Menentukan data pinjaman berdasarkan ID
  const getPinjamanData = () => {
    if (!id) return null;

    // Coba cari dari data backend
    const content = contents.find(c => 
      c.sub_menu && 
      (c.sub_menu.url === id || c.sub_menu.url === `/${id}`) && 
      c.status
    );
    
    if (content) {
      return {
        title: content.title,
        description: content.description || "",
        image: content.thumbnail || defaultData[id as string]?.image || "/img/banner/placeholder-image.jpg",
        icon: content.thumbnail || defaultData[id as string]?.icon || "/img/icon/placeholder-icon.png",
      };
    }

    // Jika tidak ditemukan, gunakan data default
    return defaultData[id as string] || null;
  };

  const pinjamanData = getPinjamanData();

  useEffect(() => {
    console.log("Current content state:", currentContent);
  }, [currentContent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        {/* <LoadingSpinner /> */}
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
            imageSrc={pinjamanData.image || "/img/banner/placeholder-image.jpg"} 
            title={pinjamanData.title}
            paragraph={pinjamanData.description}
            showButton={false}
          />
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 py-8">
              {/* Sidebar Section */}
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />
              
              {/* Main Content */}
              <div className="lg:w-3/4 w-full">
                <Content 
                  contentData={currentContent} 
                  isLoading={loading} 
                />
              </div>
            </div>
            
            <TableSection />
            
            {/* Slider Section */}
            <LoanProductsSlider loanProducts={loanProducts} />
            
            {/* Credit Requirement Section */}
            <CreditRequitment />
          </div>
          
          <Blog />
          <Footer />
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">
            Silakan pilih jenis pinjaman yang tersedia.
          </p>
        </div>
      )}
    </div>
  );
};

export default PinjamanDetail;