import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

// Layouts dan komponen
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/tabungan/section/sidebar";
import Content from "../../pages/deposito/section/content";
import RiskManagement from "../../pages/deposito/section/riskManagement";
import CreditRequitment from "./section/tabelRequitment";
import LoanProductSlider from "../../pages/tabungan/section/LoanProductSlider";
import Footer from "../../pages/components/layout/footer";
import VisitorTracker from "../../pages/components/visitorTracker";

// API
import { getAllContents, getContentBySubMenuUrl, Content as ContentType } from "@/pages/api/fetching/routes";

// Define interfaces
interface SavingsProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

interface DepositoProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

// Savings Products Data
const savingsProducts: SavingsProduct[] = [
  {
    title: "Tabungan Abdiku",
    description: "Tabungan fleksibel dengan suku bunga menarik dan biaya administrasi rendah.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  {
    title: "Tabungan Abdi Simple",
    description: "Tabungan dengan fitur sederhana untuk memenuhi kebutuhan transaksi harian Anda.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simpel.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
  {
    title: "Deposito Berjangka",
    description: "Investasi aman dengan tingkat bunga kompetitif dan fleksibilitas jangka waktu.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/tabungan/deposito-berjangka",
  },
];

// Data Produk Deposito (default data)
const dataDeposito: Record<string, DepositoProduct> = {
  "deposito-berjangka": {
    title: "Deposito Berjangka",
    description: "Simpanan pihak ketiga yang penarikan dananya dilakukan setiap tanggal jatuh tempo yang telah disepakati dalam perjanjian pembukaan deposito berjangka (1,3,6, dan 12 bulan) . Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS)",
    image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/deposito/deposito-berjangka",
  },
  "formulir-deposito": {
    title: "Deposito Berjangka",
    description: "Simpanan pihak ketiga yang penarikan dananya dilakukan setiap tanggal jatuh tempo yang telah disepakati dalam perjanjian pembukaan deposito berjangka (1,3,6, dan 12 bulan) . Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS)",
    image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
    icon: "https://bankabdi.co.id/img/icon/formulir_deposito.png",
    href: "/deposito/formulir-deposito",
  },
  "kalkulator-deposito": {
    title: "Kalkulator Deposito",
    description: "",
    image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
    icon: "https://bankabdi.co.id/img/icon/kalkulator_deposito.png",
    href: "/deposito/kalkulator-deposito",
  },
};

const DepositoDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);
  const [subMenuData, setSubMenuData] = useState<{ id: number, name: string } | null>(null);

  // Find subMenu ID for VisitorTracker
  useEffect(() => {
    if (id && typeof id === 'string') {
      const findSubMenuId = async () => {
        try {
          const allContents = await getAllContents();
          const matchingContent = allContents.find(content => {
            if (!content.sub_menu || !content.status) return false;
            const subMenuUrl = content.sub_menu.url;
            const urlParts = subMenuUrl.split('/');
            const lastUrlPart = urlParts[urlParts.length - 1];
            return (
              lastUrlPart === id || 
              subMenuUrl === `/${id}` || 
              subMenuUrl === id || 
              subMenuUrl === `/deposito/${id}` || 
              subMenuUrl.endsWith(`/${id}`)
            );
          });
          
          if (matchingContent && matchingContent.sub_menu) {
            setSubMenuData({ 
              id: matchingContent.sub_menu.id, 
              name: matchingContent.sub_menu.name || matchingContent.sub_menu.sub_menu_name 
            });
          }
        } catch (error) {
          console.error("Error mencari sub-menu ID:", error);
        }
      };
      
      findSubMenuId();
    }
  }, [id]);

  // Dynamic content loading for 'deposito-berjangka' only
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id === "deposito-berjangka") {
          setLoading(true);
          const normalizedId = typeof id === 'string' ? id : '';
          
          // Try direct endpoint first
          console.log("Fetching content for:", normalizedId);
          let specificContent = await getContentBySubMenuUrl(normalizedId);
          
          // If not found, try with full path
          if (!specificContent || specificContent.length === 0) {
            specificContent = await getContentBySubMenuUrl(`/deposito/${normalizedId}`);
          }
          
          // If still not found, try to search in all contents
          if (!specificContent || specificContent.length === 0) {
            console.log("Fetching all contents...");
            const allContents = await getAllContents();
            console.log("Checking all contents for match with:", normalizedId);
            
            const matchingContent = allContents.find(content => {
              if (!content.sub_menu || !content.status) return false;
              const subMenuUrl = content.sub_menu.url;
              const urlParts = subMenuUrl.split('/');
              const lastUrlPart = urlParts[urlParts.length - 1];
              return (
                lastUrlPart === normalizedId || 
                subMenuUrl === `/${normalizedId}` || 
                subMenuUrl === normalizedId || 
                subMenuUrl === `/deposito/${normalizedId}` || 
                subMenuUrl.endsWith(`/${normalizedId}`)
              );
            });
            
            if (matchingContent) {
              setCurrentContent(matchingContent);
            }
          } else if (specificContent && specificContent.length > 0) {
            setCurrentContent(specificContent[0]);
          }
        } else {
          // For other pages, don't fetch from backend
          setCurrentContent(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);

  // Check if id is valid and corresponding data exists
  const depositoData = id && typeof id === "string" ? dataDeposito[id] : null;

  // If deposito data not found, show 404 page
  if (!depositoData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mt-4">
            Silakan pilih jenis deposito yang tersedia.
          </p>
          <Link href="/deposito" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kembali ke Daftar Deposito
          </Link>
        </div>
      </div>
    );
  }

  // Check if the current page is formulir-deposito or kalkulator-deposito
  const hideRiskManagement = id === "formulir-deposito" || id === "kalkulator-deposito";
  
  // Import MainPage component only for specific pages
  const MainPage = id === "formulir-deposito" || id === "kalkulator-deposito" 
    ? require("./section/main").default 
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Visitor Tracker Component */}
      {id && (
        <VisitorTracker 
          subMenuId={subMenuData?.id || id} 
          subMenuName={subMenuData?.name || (typeof id === 'string' ? id : '')} 
        />
      )}

      <Header />
      <Hero
        imageSrc={depositoData.image}
        title={depositoData.title}
        paragraph={depositoData.description}
        showButton={false}
      />
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar Section */}
          <Sidebar currentPath={router.asPath} />

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            {/* Render dynamic content or static components based on ID */}
            {(id === "formulir-deposito" || id === "kalkulator-deposito") && MainPage ? (
              <MainPage />
            ) : (
              <Content contentData={currentContent} isLoading={loading} />
            )}

            {/* Only show RiskManagement if NOT on formulir-deposito or kalkulator-deposito page */}
            {!hideRiskManagement && <RiskManagement />}
          </div>
        </div>
      </div>
      <CreditRequitment />
      <LoanProductSlider savingsProducts={savingsProducts} />
      <Footer />
    </div>
  );
};

// Static Paths for Deposito
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(dataDeposito).map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false, // fallback to 404 if id doesn't match
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const depositoData = dataDeposito[id] || null;

  return {
    props: {
      depositoData,
    },
  };
};

export default DepositoDetail;