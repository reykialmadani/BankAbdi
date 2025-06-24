import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Sidebar from "./section/sidebar";
import Content from "./section/content";
import FormulirPinjaman from "./section/FormulirPinjaman";
import TableSection from "./section/tableSection";
import LoanProductsSlider from "./section/LoanProductSlider";
import CreditRequitment from "./section/tabelRequitment";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import VisitorTracker from "../components/visitorTracker";
import {
  getAllContents,
  getContentBySubMenuUrl,
  Content as ContentType,
} from "@/pages/config/axiosConfig";

// Types
interface LoanProduct {
  title: string;
  description: string;
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

interface DefaultLoanData {
  title: string;
  description: string;
  image: string;
  icon: string;
}

type PinjamanData = DefaultLoanData

// Constants
const TRACKING_ID_MAP: Record<string, string> = {
  "kredit-modal-kerja": "1",
  "kredit-investasi": "2",
  "kredit-multiguna": "3",
  "kredit-kepemilikan-rumah": "4",
  "kredit-kepemilikan-mobil": "5",
  "kredit-kendaraan-bermotor": "6",
  "kredit-tanpa-agunan": "7",
};

const DEFAULT_LOAN_DATA: Record<string, DefaultLoanData> = {
  "kredit-modal-kerja": {
    title: "Kredit Modal Kerja",
    description: "Fasilitas pembiayaan yang diperuntukkan sebagai modal usaha untuk meningkatkan produksi dalam kegiatan operasional.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png",
  },
  "kredit-investasi": {
    title: "Kredit Investasi",
    description: "Fasilitas pembiayaanyang diberikan untuk membiayai kebutuhan dalam jangka panjang dalam mengembangkan/memperluas usaha anda.",
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

const ORDER_KEYS = [
  "kredit-modal-kerja",
  "kredit-investasi",
  "kredit-multiguna",
  "kredit-kepemilikan-rumah",
  "kredit-kepemilikan-mobil",
  "kredit-kendaraan-bermotor",
  "kredit-tanpa-agunan",
  "form-pengajuan-kredit",
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
  return Object.keys(DEFAULT_LOAN_DATA).map(key => ({
    href: `/pinjaman/${key}`,
    label: DEFAULT_LOAN_DATA[key].title,
  }));
};

const createDefaultLoanProducts = (): LoanProduct[] => {
  return Object.keys(DEFAULT_LOAN_DATA).map(key => ({
    title: DEFAULT_LOAN_DATA[key].title,
    description: DEFAULT_LOAN_DATA[key].description,
    icon: DEFAULT_LOAN_DATA[key].icon,
    href: `/pinjaman/${key}`,
  }));
};

const findContentByUrl = (contents: ContentType[], targetId: string): ContentType | null => {
  return contents.find(content => {
    if (!content.sub_menu || !content.status) return false;
    
    const subMenuUrl = content.sub_menu.url;
    const urlParts = subMenuUrl.split('/');
    const lastUrlPart = urlParts[urlParts.length - 1];
    
    return (
      lastUrlPart === targetId ||
      subMenuUrl === `/${targetId}` ||
      subMenuUrl === targetId ||
      subMenuUrl === `/pinjaman/${targetId}` ||
      subMenuUrl.endsWith(`/${targetId}`)
    );
  }) || null;
};

const extractRouteIdFromUrl = (subMenuUrl: string): string => {
  const urlParts = subMenuUrl.split('/');
  const lastUrlPart = urlParts[urlParts.length - 1];
  
  if (lastUrlPart) return lastUrlPart;
  
  return subMenuUrl.replace(/^\//g, '').replace(/^pinjaman\//g, '');
};

// Custom hooks
const useSubMenuData = (id: string | string[] | undefined) => {
  const [subMenuData, setSubMenuData] = useState<SubMenuData | null>(null);
  
  useEffect(() => {
    if (!id || Array.isArray(id)) {
      setSubMenuData(null);
      return;
    }

    const findSubMenuId = async () => {
      try {
        const allContents = await getAllContents();
        const matchingContent = findContentByUrl(allContents, id);

        if (matchingContent?.sub_menu) {
          setSubMenuData({
            id: matchingContent.sub_menu.id,
            name: matchingContent.sub_menu.name || matchingContent.sub_menu.sub_menu_name,
          });
        } else {
          // Fallback data if not found in backend
          const fallbackId = getSubMenuIdForTracking(id);
          const fallbackName = DEFAULT_LOAN_DATA[id]?.title || `Halaman ${id}`;
          
          if (fallbackId) {
            setSubMenuData({
              id: parseInt(fallbackId),
              name: fallbackName,
            });
          }
        }
      } catch (error) {
        console.error("Error finding sub-menu ID:", error);
        
        // Fallback data on error
        const fallbackId = getSubMenuIdForTracking(id);
        const fallbackName = DEFAULT_LOAN_DATA[id]?.title || `Halaman ${id}`;
        
        if (fallbackId) {
          setSubMenuData({
            id: parseInt(fallbackId),
            name: fallbackName,
          });
        }
      }
    };

    findSubMenuId();
  }, [id]);

  return subMenuData;
};

const processBackendMenuItems = (contents: ContentType[]): MenuItem[] => {
  const processedMenuItems = new Set<string>();
  const backendMenuItems: MenuItem[] = [];

  contents.forEach(content => {
    if (!content.sub_menu?.url || !content.status) return;

    const routeId = extractRouteIdFromUrl(content.sub_menu.url);
    if (!routeId) return;

    const href = `/pinjaman/${routeId}`;
    const label = content.sub_menu.name || content.sub_menu.sub_menu_name;
    const menuKey = `${href}-${label}`;

    if (!processedMenuItems.has(menuKey) && label) {
      processedMenuItems.add(menuKey);
      backendMenuItems.push({ href, label });
    }
  });

  if (backendMenuItems.length === 0) return [];

  // Create ordered menu items
  const menuItemMap = new Map<string, MenuItem>();
  backendMenuItems.forEach(item => {
    const key = item.href.replace('/pinjaman/', '');
    menuItemMap.set(key, item);
  });

  return ORDER_KEYS.map(key => 
    menuItemMap.get(key) || {
      href: `/pinjaman/${key}`,
      label: DEFAULT_LOAN_DATA[key].title,
    }
  );
};

const processLoanProducts = (contents: ContentType[], menuItems: MenuItem[]): LoanProduct[] => {
  const menuItemMap = new Map<string, MenuItem>();
  menuItems.forEach(item => {
    const key = item.href.replace('/pinjaman/', '');
    menuItemMap.set(key, item);
  });

  return ORDER_KEYS.map(key => {
    const matchingContent = findContentByUrl(contents, key);
    const defaultProduct = DEFAULT_LOAN_DATA[key];
    const menuItem = menuItemMap.get(key) || {
      href: `/pinjaman/${key}`,
      label: defaultProduct.title,
    };

    return {
      title: menuItem.label,
      description: defaultProduct?.description || "",
      icon: matchingContent?.thumbnail || defaultProduct?.icon || "/img/icon/placeholder-icon.png",
      href: `/pinjaman/${key}`,
    };
  });
};

const PinjamanDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const normalizedId = normalizeId(id);
  
  const [loading, setLoading] = useState(true);
  const [, setContents] = useState<ContentType[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);
  
  const subMenuData = useSubMenuData(id);

  // Initialize default menu items
  useEffect(() => {
    setMenuItems(createDefaultMenuItems());
  }, []);

  // Fetch and process data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setCurrentContent(null);

        const allContents = await getAllContents();
        setContents(allContents);

        if (allContents.length > 0) {
          console.log("Processing backend data for menu items");
          
          const backendMenuItems = processBackendMenuItems(allContents);
          
          if (backendMenuItems.length > 0) {
            setMenuItems(backendMenuItems);
            setLoanProducts(processLoanProducts(allContents, backendMenuItems));
          } else {
            setLoanProducts(createDefaultLoanProducts());
          }

          // Find content for current page
          if (normalizedId) {
            const contentForCurrentPage = findContentByUrl(allContents, normalizedId);
            
            if (contentForCurrentPage) {
              setCurrentContent(contentForCurrentPage);
            } else {
              // Try to fetch specific content
              try {
                let specificContents = await getContentBySubMenuUrl(normalizedId);
                if (!specificContents?.length) {
                  specificContents = await getContentBySubMenuUrl(`/pinjaman/${normalizedId}`);
                }
                
                setCurrentContent(specificContents?.[0] || null);
              } catch (err) {
                console.error("Error fetching specific content:", err);
                setCurrentContent(null);
              }
            }
          }
        } else {
          // Fallback to default data
          setMenuItems(createDefaultMenuItems());
          setLoanProducts(createDefaultLoanProducts());
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCurrentContent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [normalizedId]);

  const getPinjamanData = (): PinjamanData | null => {
    if (!normalizedId) {
      return {
        title: "Pinjaman Bank Abdi",
        description: "Beragam solusi pinjaman untuk memenuhi kebutuhan finansial Anda",
        image: "https://bankabdi.co.id/img/banner/hero-pinjaman.webp",
        icon: "",
      };
    }

    const defaultHeroData = DEFAULT_LOAN_DATA[normalizedId];
    if (!defaultHeroData) return null;

    return {
      title: defaultHeroData.title,
      description: defaultHeroData.description,
      image: defaultHeroData.image,
      icon: defaultHeroData.icon,
    };
  };

  const pinjamanData = getPinjamanData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Get visitor tracker props with proper typing
  const getVisitorTrackerProps = () => {
    if (!normalizedId) return null;
    
    const trackingId = getSubMenuIdForTracking(normalizedId);
    const subMenuId = subMenuData?.id || (trackingId ? parseInt(trackingId) : undefined);
    const subMenuName = subMenuData?.name || DEFAULT_LOAN_DATA[normalizedId]?.title || `Halaman ${normalizedId}`;
    
    return subMenuId ? { subMenuId, subMenuName } : null;
  };

  const visitorTrackerProps = getVisitorTrackerProps();

  return (
    <div className="min-h-screen bg-gray-50">
      {visitorTrackerProps && (
        <VisitorTracker
          subMenuId={visitorTrackerProps.subMenuId}
          subMenuName={visitorTrackerProps.subMenuName}
        />
      )}
      
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
                {normalizedId === "form-pengajuan-kredit" ? (
                  <FormulirPinjaman />
                ) : (
                  <Content contentData={currentContent} isLoading={loading} />
                )}
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