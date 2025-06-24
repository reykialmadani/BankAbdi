import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";

// Layout and section components
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Sidebar from "./section/sidebar";
import Content from "./section/content";
import FormulirTabungan from "./section/FormulirTabungan";
import RiskManagement from "./section/riskManegement";
import CreditRequitment from "./section/tabelRequitment";
import LoanProductSlider from "./section/LoanProductSlider";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import VisitorTracker from "../components/visitorTracker";

// API fetching functions
import {
  getAllContents,
  getContentBySubMenuUrl,
  Content as ContentType,
} from "@/pages/config/axiosConfig";

// Define interfaces
interface SavingsProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  className?: string;
}

interface TabunganData {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

interface MenuItem {
  href: string;
  label: string;
}

interface SubMenuData {
  id: number;
  name: string;
}

interface TabunganDetailProps {
  tabunganData: TabunganData | null;
}


// Constants
const TRACKING_ID_MAP: Record<string, string> = {
  "tabungan-abdi": "8",
  "tabungan-abdiku": "9",
  "tabungan-abdi-simple": "10",
  "deposito-berjangka": "11",
};

const ORDER_KEYS = [
  "tabungan-abdi",
  "tabungan-abdiku",
  "tabungan-abdi-simple",
  "deposito-berjangka",
  "formulir",
] as const;

const DEFAULT_DATA: Record<string, TabunganData> = {
  "tabungan-abdi": {
    title: "Tabungan Abdi",
    description:
      "TABUNGAN ABDI merupakan tabungan yang penarikannya dapat dilakukan setiap saat dengan menggunakan sarana yang disediakan bank.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdi.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi.png",
    href: "/tabungan/tabungan-abdi",
  },
  "tabungan-abdiku": {
    title: "Tabungan Abdiku",
    description:
      "Tabungan ABDIKU merupakan produk tabungan yang dikhususkan untuk perorang dengan persyaratan mudah dan ringan. Diterbitkan secara bersama oleh bank-bank di Indonesia (TABUNGANKU), ABDIKU hadir untuk menumbuhkan budaya menabung serta meningkatkan kesejahteraan masyarakat dan tidak dikenakan biaya administrasi bulanan.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  "tabungan-abdi-simple": {
    title: "Tabungan Abdi Simple",
    description:
      "Tabungan ABDI SIMPEL (Simpanan Pelajar) merupakan tabungan khusus bagi pelajar PAUD, SD,SMP, dan SMA yang berusia dibawah 17 tahun dan belum memiliki KTP. ABDI SIMPEL dikemas untuk memberikan edukasi dan inklusi keuangan untuk belajar mengelola keuangan khususnya membentuk 'karakter' budaya menabung sejak dini dan melatih persiapan masa depan dan pengenalan perbankan lebih dini.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
  "deposito-berjangka": {
    title: "Deposito Berjangka",
    description:
      "Investasi aman dengan tingkat bunga kompetitif dan fleksibilitas jangka waktu.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/tabungan/deposito-berjangka",
  },
  formulir: {
    title: "Formulir Pengajuan Tabungan",
    description: "Formulir untuk pengajuan tabungan baru.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-formulir.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/formulir",
  },
};

const SAVINGS_PRODUCTS: SavingsProduct[] = [
  {
    title: "Tabungan Abdiku",
    description:
      "Tabungan fleksibel dengan suku bunga menarik dan biaya administrasi rendah.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  {
    title: "Tabungan Abdi Simple",
    description:
      "Tabungan dengan fitur sederhana untuk memenuhi kebutuhan transaksi harian Anda.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simpel.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
  {
    title: "Deposito Berjangka",
    description:
      "Investasi aman dengan tingkat bunga kompetitif dan fleksibilitas jangka waktu.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/tabungan/deposito-berjangka",
  },
];

// Utility functions
const getSubMenuIdForTracking = (id: string | string[] | undefined): string | null => {
  if (!id || Array.isArray(id)) return null;
  return TRACKING_ID_MAP[id] || id;
};

const normalizeId = (id: string | string[] | undefined): string => {
  return typeof id === 'string' ? id : '';
};

const createDefaultMenuItems = (): MenuItem[] => {
  return ORDER_KEYS.map((key) => ({
    href: `/tabungan/${key}`,
    label: DEFAULT_DATA[key].title,
  }));
};

// Custom hooks
const useSubMenuData = (id: string | string[] | undefined) => {
  const [subMenuData, setSubMenuData] = useState<SubMenuData | null>(null);

  useEffect(() => {
    const normalizedId = normalizeId(id);
    if (!normalizedId) {
      setSubMenuData(null);
      return;
    }

    const findSubMenuId = async () => {
      try {
        const allContents = await getAllContents();
        const matchingContent = allContents.find((content) => {
          if (!content.sub_menu || !content.status) return false;
          const subMenuUrl = content.sub_menu.url;
          const urlParts = subMenuUrl.split('/');
          const lastUrlPart = urlParts[urlParts.length - 1];
          
          return (
            lastUrlPart === normalizedId ||
            subMenuUrl === `/${normalizedId}` ||
            subMenuUrl === normalizedId ||
            subMenuUrl === `/tabungan/${normalizedId}` ||
            subMenuUrl.endsWith(`/${normalizedId}`)
          );
        });

        if (matchingContent?.sub_menu) {
          setSubMenuData({
            id: matchingContent.sub_menu.id,
            name: matchingContent.sub_menu.name || matchingContent.sub_menu.sub_menu_name,
          });
        } else {
          const fallbackId = getSubMenuIdForTracking(normalizedId);
          const fallbackName = DEFAULT_DATA[normalizedId]?.title || `Halaman ${normalizedId}`;
          
          if (fallbackId) {
            setSubMenuData({
              id: parseInt(fallbackId, 10),
              name: fallbackName,
            });
          }
        }
      } catch (error) {
        console.error("Error mencari sub-menu ID:", error);
        const fallbackId = getSubMenuIdForTracking(normalizedId);
        const fallbackName = DEFAULT_DATA[normalizedId]?.title || `Halaman ${normalizedId}`;
        
        if (fallbackId) {
          setSubMenuData({
            id: parseInt(fallbackId, 10),
            name: fallbackName,
          });
        }
      }
    };

    findSubMenuId();
  }, [id]);

  return subMenuData;
};

const useContentData = (id: string | string[] | undefined) => {
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<ContentType[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);

  const normalizedId = normalizeId(id);
  const isFormulirPage = normalizedId === "formulir";

  // Memoize default menu items to prevent unnecessary re-renders
  const defaultMenuItems = useMemo(() => createDefaultMenuItems(), []);

  // Set default menu items
  useEffect(() => {
    setMenuItems(defaultMenuItems);
  }, [defaultMenuItems]);

  const findContentForPage = useCallback((searchId: string, allContents: ContentType[]) => {
    return allContents.find((content) => {
      if (!content.sub_menu || !content.status) return false;
      const subMenuUrl = content.sub_menu.url;
      const urlParts = subMenuUrl.split('/');
      const lastUrlPart = urlParts[urlParts.length - 1];
      
      return (
        lastUrlPart === searchId ||
        subMenuUrl === `/${searchId}` ||
        subMenuUrl === searchId ||
        subMenuUrl === `/tabungan/${searchId}` ||
        subMenuUrl.endsWith(`/${searchId}`)
      );
    });
  }, []);

  const processBackendMenuItems = useCallback((allContents: ContentType[]) => {
    const processedMenuItems = new Set<string>();
    const backendMenuItems: MenuItem[] = [];

    allContents.forEach((content) => {
      if (content.sub_menu && content.status) {
        const subMenuUrl = content.sub_menu.url;
        const urlParts = subMenuUrl.split('/');
        const lastUrlPart = urlParts[urlParts.length - 1];
        const routeId = lastUrlPart || subMenuUrl.replace(/^\//g, '').replace(/^tabungan\//g, '');
        const href = `/tabungan/${routeId}`;
        const menuKey = `${href}-${content.sub_menu.name || content.sub_menu.sub_menu_name}`;

        if (!processedMenuItems.has(menuKey)) {
          processedMenuItems.add(menuKey);
          backendMenuItems.push({
            href,
            label: content.sub_menu.name || content.sub_menu.sub_menu_name,
          });
        }
      }
    });

    if (backendMenuItems.length >= ORDER_KEYS.length - 1) {
      const menuItemMap = new Map<string, MenuItem>();
      backendMenuItems.forEach((item) => {
        const key = item.href.replace('/tabungan/', '');
        menuItemMap.set(key, item);
      });

      return ORDER_KEYS.map((key) => {
        if (key === "formulir") {
          return {
            href: `/tabungan/${key}`,
            label: DEFAULT_DATA[key].title,
          };
        }
        return menuItemMap.get(key) || {
          href: `/tabungan/${key}`,
          label: DEFAULT_DATA[key].title,
        };
      });
    }

    return null;
  }, []);

  useEffect(() => {
    if (!normalizedId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setCurrentContent(null);

        if (isFormulirPage) {
          setLoading(false);
          return;
        }

        console.log("Current URL ID:", normalizedId);
        console.log("Fetching all contents...");

        const allContents = await getAllContents();
        console.log("API Response (all contents):", JSON.stringify(allContents, null, 2));
        
        setContents(allContents);

        const hasValidContent = allContents && allContents.length > 0;
        if (hasValidContent) {
          console.log("Processing backend data for menu items");
          
          const processedMenuItems = processBackendMenuItems(allContents);
          if (processedMenuItems) {
            console.log("Using backend-provided menu items:", processedMenuItems);
            setMenuItems(processedMenuItems);
          }

          const contentForCurrentPage = findContentForPage(normalizedId, allContents);
          if (contentForCurrentPage) {
            setCurrentContent(contentForCurrentPage);
            console.log("✅ Content found:", contentForCurrentPage.title);
          } else {
            console.log("Trying to fetch specific content for:", normalizedId);
            try {
              let specificContents = await getContentBySubMenuUrl(normalizedId);
              if (!specificContents || specificContents.length === 0) {
                specificContents = await getContentBySubMenuUrl(`/tabungan/${normalizedId}`);
              }

              if (specificContents && specificContents.length > 0) {
                setCurrentContent(specificContents[0]);
                console.log("✅ Specific content found:", specificContents[0].title);
              } else {
                setCurrentContent(null);
                console.log("❌ No content found for:", normalizedId);
              }
            } catch (err) {
              console.error("Error fetching specific content:", err);
              setCurrentContent(null);
            }
          }
        } else {
          setCurrentContent(null);
          console.log("❌ No valid content from backend");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCurrentContent(null);
      } finally {
        setLoading(false);
      }
    };

    console.log('🔄 ID berubah ke:', normalizedId);
    console.log('📝 Current content sebelum fetch:', currentContent?.title);
    
    fetchData();
  }, [normalizedId, isFormulirPage, findContentForPage, processBackendMenuItems, currentContent?.title]);

  return {
    loading,
    contents,
    menuItems,
    currentContent,
    isFormulirPage,
  };
};

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex justify-center items-center">
    <p>Loading...</p>
  </div>
);

// Not found component
const NotFoundPage: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Halaman Tidak Ditemukan
      </h1>
      <p className="text-gray-600 mt-4">
        Silakan pilih jenis tabungan yang tersedia.
      </p>
      <Link
        href="/tabungan"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Kembali ke Daftar Tabungan
      </Link>
    </div>
  </div>
);

// Main component
const TabunganDetail: NextPage<TabunganDetailProps> = () => {
  const router = useRouter();
  const { id } = router.query;

  const normalizedId = normalizeId(id);
  const subMenuData = useSubMenuData(id);
  const { loading, menuItems, currentContent, isFormulirPage } = useContentData(id);

  const tabunganData = useMemo(() => {
    if (!normalizedId) return null;
    const defaultHeroData = DEFAULT_DATA[normalizedId];
    return defaultHeroData || null;
  }, [normalizedId]);

  const trackingSubMenuId = useMemo(() => {
    return subMenuData?.id || getSubMenuIdForTracking(id) || normalizedId;
  }, [subMenuData?.id, id, normalizedId]);

  const trackingSubMenuName = useMemo(() => {
    return subMenuData?.name || DEFAULT_DATA[normalizedId]?.title || `Halaman ${normalizedId}`;
  }, [subMenuData?.name, normalizedId]);

  const hideRiskManagement = normalizedId === "formulir";

  if (loading) {
    return <LoadingScreen />;
  }

  if (!tabunganData && !loading) {
    return <NotFoundPage />;
  }

  if (!tabunganData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-600">Silakan pilih jenis tabungan yang tersedia.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {normalizedId && (
        <VisitorTracker
          subMenuId={trackingSubMenuId}
          subMenuName={trackingSubMenuName}
        />
      )}
      
      <Header />
      
      <Hero
        imageSrc={tabunganData.image}
        title={tabunganData.title}
        paragraph={tabunganData.description}
        showButton={false}
      />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          <Sidebar menuItems={menuItems} currentPath={router.asPath} />
          
          <div className="lg:w-3/4 w-full">
            {isFormulirPage ? (
              <FormulirTabungan />
            ) : (
              <Content contentData={currentContent} isLoading={loading} />
            )}
            
            {!hideRiskManagement && <RiskManagement />}
          </div>
        </div>
      </div>

      {!isFormulirPage && (
        <>
          <CreditRequitment />
          <LoanProductSlider savingsProducts={SAVINGS_PRODUCTS} />
        </>
      )}

      <Blog />
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(DEFAULT_DATA).map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  try {
    const defaultHeroData = DEFAULT_DATA[id];
    return {
      props: {
        tabunganData: defaultHeroData || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        tabunganData: DEFAULT_DATA[id] || null,
      },
      revalidate: 60,
    };
  }
};

export default TabunganDetail;