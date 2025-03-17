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

const PinjamanDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<ContentType[]>([]);
  const [menuItems, setMenuItems] = useState<{ href: string; label: string }[]>([]);
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);

  // Ensure we always have the default menu items first in the correct order
  useEffect(() => {
    // Define the exact order we want
    const orderKeys = [
      "kredit-modal-kerja",
      "kredit-investasi",
      "kredit-multiguna",
      "kredit-kepemilikan-rumah",
      "kredit-kepemilikan-mobil",
      "kredit-kendaraan-bermotor",
      "kredit-tanpa-agunan",
      "form-pengajuan-kredit"
    ];

    // Set default menu items immediately in the specified order
    const defaultMenuItems = orderKeys.map(key => ({
      href: `/pinjaman/${key}`,
      label: defaultData[key].title,
    }));
    setMenuItems(defaultMenuItems);

    // Also set default loan products in the same order
    const defaultLoanProducts = orderKeys.map(key => ({
      title: defaultData[key].title,
      description: defaultData[key].description,
      icon: defaultData[key].icon,
      href: `/pinjaman/${key}`,
    }));
    setLoanProducts(defaultLoanProducts);
  }, []);

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

        // Check if we got valid content from backend
        const hasValidContent = allContents && allContents.length > 0;

        if (hasValidContent) {
          console.log("Processing backend data for menu items");
          // Create a set to keep track of added menu items to avoid duplicates
          const processedMenuItems: Set<string> = new Set();
          const backendMenuItems: { href: string; label: string }[] = [];

          // First, go through all contents and extract valid menu items
          allContents.forEach(content => {
            if (content.sub_menu && content.status) {
              // Extract the last part of the URL to match with our route format
              const subMenuUrl = content.sub_menu.url;
              const urlParts = subMenuUrl.split('/');
              const lastUrlPart = urlParts[urlParts.length - 1];

              // Use the lastUrlPart as our route parameter
              const routeId = lastUrlPart || subMenuUrl.replace(/^\//g, '').replace(/^pinjaman\//g, '');
              const href = `/pinjaman/${routeId}`;

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
          if (backendMenuItems.length >= Object.keys(defaultData).length) {
            console.log("Using backend-provided menu items:", backendMenuItems);

            // Define the exact order we want
            const orderKeys = [
              "kredit-modal-kerja",
              "kredit-investasi",
              "kredit-multiguna",
              "kredit-kepemilikan-rumah",
              "kredit-kepemilikan-mobil",
              "kredit-kendaraan-bermotor",
              "kredit-tanpa-agunan",
              "form-pengajuan-kredit"
            ];

            // Create a map for quick lookups
            const menuItemMap = new Map();
            backendMenuItems.forEach(item => {
              const key = item.href.replace('/pinjaman/', '');
              menuItemMap.set(key, item);
            });

            // Create ordered items from backend data
            const orderedMenuItems = orderKeys
              .map(key => menuItemMap.get(key) || { href: `/pinjaman/${key}`, label: defaultData[key].title });
            setMenuItems(orderedMenuItems);

            // Update loan products based on ordered backend data
            const backendLoanProducts = orderKeys.map(key => {
              const matchingContent = allContents.find(content => {
                if (!content.sub_menu || !content.status) return false;
                
                const subMenuUrl = content.sub_menu.url;
                const urlParts = subMenuUrl.split('/');
                const lastUrlPart = urlParts[urlParts.length - 1];
                
                return (
                  lastUrlPart === key || 
                  subMenuUrl.endsWith(`/${key}`) || 
                  subMenuUrl === key || 
                  subMenuUrl === `/${key}`
                );
              });

              // Use default data as fallback
              const defaultProduct = defaultData[key];
              const menuItem = menuItemMap.get(key) || { href: `/pinjaman/${key}`, label: defaultData[key].title };
              
              return {
                title: menuItem.label,
                description: defaultProduct?.description || "", // Always use description from defaultData
                icon: matchingContent?.thumbnail || (defaultProduct?.icon || "/img/icon/placeholder-icon.png"),
                href: `/pinjaman/${key}`,
              };
            });
            
            // Make sure to update loanProducts state with backend data
            setLoanProducts(backendLoanProducts);
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
              subMenuUrl === `/pinjaman/${normalizedId}` ||
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
              specificContents = await getContentBySubMenuUrl(`/pinjaman/${normalizedId}`);
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
        // On error, keep using default data (already set in first useEffect)
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getPinjamanData = () => {
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
              {/* Sidebar with menu items - always populated */}
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />
              <div className="lg:w-3/4 w-full">
                <Content contentData={currentContent} isLoading={loading} />
              </div>
            </div>
            <TableSection />
            {/* Pass the dynamically loaded loanProducts to the LoanProductsSlider */}
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