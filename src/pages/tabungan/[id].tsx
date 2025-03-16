import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

// Layout and section components
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Sidebar from "./section/sidebar";
import Content from "./section/content";
import RiskManagement from "./section/riskManegement";
import CreditRequitment from "./section/tabelRequitment";
import LoanProductSlider from "./section/LoanProductSlider";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";

// API fetching functions
import { getAllContents, getContentBySubMenuUrl, Content as ContentType } from "@/pages/api/fetching/routes";

// Define the interface for Savings Product
interface SavingsProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  className?: string;
}

// Default data for fallback display
const defaultData: Record<string, { title: string; description: string; image: string; icon: string; href: string }> = {
  "tabungan-abdi": {
    title: "Tabungan Abdi",
    description: "TABUNGAN ABDI merupakan tabungan yang penarikannya dapat dilakukan setiap saat dengan menggunakan sarana yang disediakan bank.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdi.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi.png",
    href: "/tabungan/tabungan-abdi",
  },
  "tabungan-abdiku": {
    title: "Tabungan Abdiku",
    description: "Tabungan ABDIKU merupakan produk tabungan yang dikhususkan untuk perorang dengan persyaratan mudah dan ringan. Diterbitkan secara bersama oleh bank-bank di Indonesia (TABUNGANKU), ABDIKU hadir untuk menumbuhkan budaya menabung serta meningkatkan kesejahteraan masyarakat dan tidak dikenakan biaya administrasi bulanan..",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  "tabungan-abdi-simple": {
    title: "Tabungan Abdi Simple",
    description: "Tabungan ABDI SIMPEL (Simpanan Pelajar) merupakan tabungan khusus bagi pelajar PAUD, SD,SMP, dan SMA yang berusia dibawah 17 tahun dan belum memiliki KTP. ABDI SIMPEL dikemas untuk memberikan edukasi dan inklusi keuangan untuk belajar mengelola keuangan khususnya membentuk 'karakter' budaya menabung sejak dini dan melatih persiapan masa depan dan pengenalan perbankan lebih dini.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
  "deposito-berjangka": {
    title: "Deposito Berjangka",
    description: "Investasi aman dengan tingkat bunga kompetitif dan fleksibilitas jangka waktu.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/tabungan/deposito-berjangka",
  },
  "formulir": {
    title: "Formulir Pengajuan Tabungan",
    description: "Formulir untuk pengajuan tabungan baru.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-formulir.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/formulir",
  },
};

// Savings Products Data for slider
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

interface TabunganDetailProps {
  tabunganData: {
    title: string;
    description: string;
    image: string;
    icon: string;
  } | null;
}

const TabunganDetail: NextPage<TabunganDetailProps> = ({ tabunganData: initialData }) => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<ContentType[]>([]);
  const [menuItems, setMenuItems] = useState<{ href: string; label: string }[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);

  // Define the exact order we want for menu items
  const orderKeys = [
    "tabungan-abdi",
    "tabungan-abdiku",
    "tabungan-abdi-simple",
    "deposito-berjangka",
    "formulir"
  ];

  // Set default menu items on mount
  useEffect(() => {
    // Set default menu items immediately in the specified order
    const defaultMenuItems = orderKeys.map(key => ({
      href: `/tabungan/${key}`,
      label: defaultData[key].title,
    }));
    setMenuItems(defaultMenuItems);
  }, []);

  // Fetch data when ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!id) return;

        // Normalize ID for search
        const normalizedId = typeof id === 'string' ? id : '';
        console.log("Current URL ID:", normalizedId);

        // Fetch all contents from backend
        console.log("Fetching all contents...");
        const allContents = await getAllContents();
        console.log("API Response (all contents):", JSON.stringify(allContents, null, 2));
        setContents(allContents);

        // Check if we got valid content from backend
        const hasValidContent = allContents && allContents.length > 0;
        if (hasValidContent) {
          console.log("Processing backend data for menu items");
          // Create a set to keep track of added menu items to avoid duplicates
          const processedMenuItems: Set<string> = new Set();
          const backendMenuItems: { href: string; label: string }[] = [];

          // Process all contents and extract valid menu items
          allContents.forEach(content => {
            if (content.sub_menu && content.status) {
              // Extract the last part of the URL to match with our route format
              const subMenuUrl = content.sub_menu.url;
              const urlParts = subMenuUrl.split('/');
              const lastUrlPart = urlParts[urlParts.length - 1];

              // Use the lastUrlPart as our route parameter
              const routeId = lastUrlPart || subMenuUrl.replace(/^\//g, '').replace(/^tabungan\//g, '');
              const href = `/tabungan/${routeId}`;

              // Make sure we don't add duplicates
              const menuKey = `${href}-${content.sub_menu.name || content.sub_menu.sub_menu_name}`;
              if (!processedMenuItems.has(menuKey)) {
                processedMenuItems.add(menuKey);
                backendMenuItems.push({
                  href: href,
                  label: content.sub_menu.name || content.sub_menu.sub_menu_name
                });
              }
            }
          });

          // If we have backend items, only use them if we have all expected items
          // Otherwise we'll stick with our ordered default items
          if (backendMenuItems.length >= orderKeys.length) {
            console.log("Using backend-provided menu items:", backendMenuItems);
            // Create a map for quick lookups
            const menuItemMap = new Map();
            backendMenuItems.forEach(item => {
              const key = item.href.replace('/tabungan/', '');
              menuItemMap.set(key, item);
            });

            // Create ordered items from backend data
            const orderedMenuItems = orderKeys
              .map(key => menuItemMap.get(key) || { href: `/tabungan/${key}`, label: defaultData[key].title });
            setMenuItems(orderedMenuItems);
          }
        }

        // Find content for current page
        const findContentForPage = (normalizedId: string) => {
          return contents.find(content => {
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
        };

        const contentForCurrentPage = findContentForPage(normalizedId);

        // If not found directly, try API call
        if (!contentForCurrentPage && hasValidContent) {
          console.log("Trying to fetch specific content for:", normalizedId);
          try {
            let specificContents = await getContentBySubMenuUrl(normalizedId);
            if (!specificContents || specificContents.length === 0) {
              specificContents = await getContentBySubMenuUrl(`/tabungan/${normalizedId}`);
            }
            if (specificContents && specificContents.length > 0) {
              setCurrentContent(specificContents[0]);
            }
          } catch (err) {
            console.error("Error fetching specific content:", err);
          }
        } else {
          setCurrentContent(contentForCurrentPage || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // On error, keep using default data
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, contents.length]);

  // Get tabungan data consistently with default data priority
  const getTabunganData = () => {
    if (!id) return null;
    const normalizedId = typeof id === 'string' ? id : '';
    
    // Always prioritize default data for visual consistency
    const defaultHeroData = defaultData[normalizedId];
    if (!defaultHeroData) {
      return null;
    }
    
    // Try to find matching backend content for additional data if needed
    const content = contents.find(c => {
      if (!c.sub_menu || !c.status) return false;
      const subMenuUrl = c.sub_menu.url;
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
    
    return {
      title: defaultHeroData.title,
      description: defaultHeroData.description,
      image: defaultHeroData.image,
      icon: defaultHeroData.icon,
    };
  };

  const tabunganData = getTabunganData();

  // Check if the current page is the formulir page
  const isFormulirPage = id === "formulir";

  // If no data and not loading, show 404
  if (!tabunganData && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mt-4">
            Silakan pilih jenis tabungan yang tersedia.
          </p>
          <Link href="/tabungan" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kembali ke Daftar Tabungan
          </Link>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Check if we should hide risk management
  const hideRiskManagement = id === "formulir";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {tabunganData ? (
        <>
          <Hero
            imageSrc={tabunganData.image}
            title={tabunganData.title}
            paragraph={tabunganData.description}
            showButton={false}
          />
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 py-8">
              {/* Sidebar Section */}
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />
              {/* Main Content */}
              <div className="lg:w-3/4 w-full">
                <Content contentData={currentContent} isLoading={loading} />
                {!hideRiskManagement && <RiskManagement />}
              </div>
            </div>
          </div>
          {/* Conditionally render additional sections */}
          {!isFormulirPage && (
            <>
              <CreditRequitment />
              <LoanProductSlider savingsProducts={savingsProducts} />
            </>
          )}
          <Blog />
          <Footer />
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">Silakan pilih jenis tabungan yang tersedia.</p>
        </div>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Define the paths for pre-rendering
  const paths = Object.keys(defaultData).map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: true, // Allow paths not returned from getStaticPaths to render on-demand
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  try {
    // For SSG, we'll just use the default data directly
    // This matches the behavior of the getPinjamanData function on the client
    const defaultHeroData = defaultData[id];
    
    return {
      props: {
        tabunganData: defaultHeroData || null,
      },
      revalidate: 60, // Revalidate the page every 60 seconds
    };
  } catch (error) {
    // On error, use default data
    return {
      props: {
        tabunganData: defaultData[id] || null,
      },
      revalidate: 60,
    };
  }
};

export default TabunganDetail;