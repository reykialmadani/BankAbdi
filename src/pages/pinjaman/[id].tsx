import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Sidebar from "./section/sidebar";
import Content from "./section/content";
import Main from "./section/main";
import TableSection from "./section/tableSection";
import LoanProductsSlider from "./section/LoanProductSlider";
import CreditRequitment from "./section/tabelRequitment";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import VisitorTracker from "../components/visitorTracker";
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
  const [subMenuData, setSubMenuData] = useState<{ id: number, name: string } | null>(null);

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
              subMenuUrl === `/pinjaman/${id}` || 
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!id) return;

        const normalizedId = typeof id === 'string' ? id : '';
        console.log("Current URL ID:", normalizedId);

        const allContents = await getAllContents();
        setContents(allContents);

        const hasValidContent = allContents && allContents.length > 0;
        
        if (hasValidContent) {
          console.log("Processing backend data for menu items");
          const processedMenuItems: Set<string> = new Set();
          const backendMenuItems: { href: string; label: string }[] = [];

          allContents.forEach(content => {
            if (content.sub_menu && content.status) {
              const subMenuUrl = content.sub_menu.url;
              const urlParts = subMenuUrl.split('/');
              const lastUrlPart = urlParts[urlParts.length - 1];

              const routeId = lastUrlPart || subMenuUrl.replace(/^\//g, '').replace(/^pinjaman\//g, '');
              const href = `/pinjaman/${routeId}`;

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

          if (backendMenuItems.length >= Object.keys(defaultData).length) {
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

            const menuItemMap = new Map();
            backendMenuItems.forEach(item => {
              const key = item.href.replace('/pinjaman/', '');
              menuItemMap.set(key, item);
            });

            const orderedMenuItems = orderKeys
              .map(key => menuItemMap.get(key) || { href: `/pinjaman/${key}`, label: defaultData[key].title });
            
            setMenuItems(orderedMenuItems);

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

              const defaultProduct = defaultData[key];
              const menuItem = menuItemMap.get(key) || { href: `/pinjaman/${key}`, label: defaultData[key].title };

              return {
                title: menuItem.label,
                description: defaultProduct?.description || "",
                icon: matchingContent?.thumbnail || (defaultProduct?.icon || "/img/icon/placeholder-icon.png"),
                href: `/pinjaman/${key}`,
              };
            });

            setLoanProducts(backendLoanProducts);
          }
        }

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

        if (!contentForCurrentPage && hasValidContent) {
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

    const defaultHeroData = defaultData[normalizedId];
    if (!defaultHeroData) {
      return null;
    }

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
      {id && (
        <VisitorTracker 
          subMenuId={subMenuData?.id || id} 
          subMenuName={subMenuData?.name || (typeof id === 'string' ? id : '')}
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
                {id === "form-pengajuan-kredit" ? (
                  <Main />
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
