import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Content from "./section/content";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import VisitorTracker from "../components/visitorTracker";
import { getAllContents, getContentBySubMenuUrl, Content as ContentType } from "../api/fetching/routes";

// Define types properly to eliminate the warnings
interface SubMenu {
  id: number;
  name?: string;
  sub_menu_name?: string;
  url: string;
  menu_id?: number;
}

// Extended content type with proper property definitions
interface ExtendedContentType extends ContentType {
  report_type?: string;
  report_year?: string;
  report_quarter?: string;
  sub_menu?: SubMenu;
}

const defaultData: Record<string, { title: string, description: string, image: string, icon: string }> = {
  "2021": {
    title: "LAPORAN TAHUNAN",
    description: "Laporan tahunan dan Triwulan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama tahun 2021-2025.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
    icon: "https://bankabdi.co.id/img/icon/laporan.png",
  },
};

// Removed unused debugContent function

const LaporanDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<ExtendedContentType[]>([]);
  const [currentContent, setCurrentContent] = useState<ExtendedContentType | null>(null);
  const [subMenuData, setSubMenuData] = useState<{ id: number | string, name: string } | null>(null);

  // Find subMenu ID for VisitorTracker
  useEffect(() => {
    if (id && typeof id === 'string') {
      const findSubMenuId = async () => {
        try {
          const allContents = await getAllContents() as ExtendedContentType[];
          const matchingContent = allContents.find(content => {
            if (!content.sub_menu || !content.status) return false;
            
            // Check if the content is a report with matching year/period
            if (content.report_type === 'Tahunan' && content.report_year === id) {
              return true;
            }
            
            // For period reports like "2023-1" (year-quarter)
            if (id.includes('-')) {
              const [year, quarter] = id.split('-');
              return content.report_type === 'Triwulan' && 
                     content.report_year === year && 
                     content.report_quarter === quarter;
            }
            
            // Check URL matching as fallback
            const subMenuUrl = content.sub_menu.url;
            const urlParts = subMenuUrl.split('/');
            const lastUrlPart = urlParts[urlParts.length - 1];
            return (
              lastUrlPart === id || 
              subMenuUrl === `/${id}` || 
              subMenuUrl === id || 
              subMenuUrl === `/laporan/${id}` || 
              subMenuUrl.endsWith(`/${id}`)
            );
          });
          
          if (matchingContent && matchingContent.sub_menu) {
            setSubMenuData({ 
              id: matchingContent.sub_menu.id, 
              name: matchingContent.sub_menu.name || matchingContent.sub_menu.sub_menu_name || `Laporan ${id}`
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
        const allContents = await getAllContents() as ExtendedContentType[];
        
        if (Array.isArray(allContents)) {
          setContents(allContents);
          const matchingContents = findMatchingContents(allContents, normalizedId);
          
          if (matchingContents.length > 0) {
            setCurrentContent(matchingContents[0]);
          } else {
            const specificContents = await getContentByReportType(normalizedId) as ExtendedContentType[];
            setCurrentContent(specificContents.length > 0 ? specificContents[0] : null);
          }
        } else {
          setContents([]);
          setCurrentContent(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCurrentContent(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const findMatchingContents = (allContents: ExtendedContentType[], normalizedId: string): ExtendedContentType[] => {
    let matchingContents: ExtendedContentType[] = [];
    
    if (normalizedId.includes('-')) {
      const parts = normalizedId.split('-');
      for (const year of parts) {
        matchingContents.push(
          ...allContents.filter(content => 
            content.report_type === 'Tahunan' && content.report_year === year
          )
        );
        matchingContents.push(
          ...allContents.filter(content => 
            content.report_type === 'Triwulan' && content.report_year === year
          )
        );
      }
    } else {
      matchingContents = allContents.filter(content => 
        content.report_type === 'Tahunan' && content.report_year === normalizedId
      );
    }
    
    return matchingContents;
  };

  const getContentByReportType = async (normalizedId: string) => {
    const [year, quarter] = normalizedId.split('-');
    const url = quarter 
      ? `/api/reports?type=Triwulan&year=${year}&quarter=${quarter}` 
      : `/api/reports?type=Tahunan&year=${year}`;
    
    return await getContentBySubMenuUrl(url);
  };

  const getLaporanData = (): { title: string; description: string; image: string; icon: string } | null => {
    if (!id) return null;
    
    const normalizedId = typeof id === 'string' ? id : '';
    const defaultLaporanData = defaultData[normalizedId];
    
    if (defaultLaporanData) {
      return defaultLaporanData;
    }
    
    if (normalizedId.includes('-')) {
      const parts = normalizedId.split('-');
      return {
        title: `LAPORAN ${parts[0]}-${parts[1]}`,
        description: `Laporan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama periode ${parts[1]} hingga ${parts[0]}.`,
        image: "https://bankabdi.co.id/img/banner/hero-laporan.webp",
        icon: "https://bankabdi.co.id/img/icon/laporan.png",
      };
    } else {
      return {
        title: `LAPORAN TAHUNAN ${normalizedId}`,
        description: `Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama tahun ${normalizedId}.`,
        image: "https://bankabdi.co.id/img/banner/hero-laporan.webp",
        icon: "https://bankabdi.co.id/img/icon/laporan.png",
      };
    }
  };

  const laporanData = getLaporanData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Visitor Tracker Component */}
      {id && (
        <VisitorTracker 
          subMenuId={subMenuData?.id || id} 
          subMenuName={subMenuData?.name || (typeof id === 'string' ? 
            (id.includes('-') ? `Laporan Triwulan ${id}` : `Laporan Tahunan ${id}`) : '')} 
        />
      )}
      
      <Header />
      {laporanData ? (
        <>
          <Hero 
            imageSrc={laporanData.image} 
            title={laporanData.title} 
            paragraph={laporanData.description} 
            showButton={false} 
          />
          <div className="container mx-auto px-4">
            <div className="py-8">
              <Content
                contentData={currentContent as ContentType | null}
                isLoading={loading}
                id={id}
                allContents={contents as ContentType[]}
              />
            </div>
          </div>
          <Blog />
          <Footer />
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">Silakan pilih jenis laporan yang tersedia.</p>
        </div>
      )}
    </div>
  );
};

export default LaporanDetail;