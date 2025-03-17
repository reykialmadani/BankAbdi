import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Content from "./section/content";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import { getAllContents, getContentBySubMenuUrl, Content as ContentType } from "../api/fetching/routes";

const defaultData: Record<string, { title: string, description: string, image: string, icon: string }> = {
  "2021": {
    title: "LAPORAN TAHUNAN",
    description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama tahun 2021-2025.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
    icon: "https://bankabdi.co.id/img/icon/laporan.png",
  },
};

const debugContent = (content: ContentType) => {
  if (!content) return "null";
  return {
    id: content.id,
    title: content.title,
    reportType: content.report_type,
    reportYear: content.report_year,
    reportQuarter: content.report_quarter,
    status: content.status
  };
};

const LaporanDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState<ContentType[]>([]);
  const [currentContent, setCurrentContent] = useState<ContentType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!id) return;

        const normalizedId = typeof id === 'string' ? id : '';
        const allContents = await getAllContents();

        if (Array.isArray(allContents)) {
          setContents(allContents);
          const matchingContents = findMatchingContents(allContents, normalizedId);
          if (matchingContents.length > 0) {
            setCurrentContent(matchingContents[0]);
          } else {
            const specificContents = await getContentByReportType(normalizedId);
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

  const findMatchingContents = (allContents: ContentType[], normalizedId: string) => {
    let matchingContents = [];
    if (normalizedId.includes('-')) {
      const parts = normalizedId.split('-');
      for (const year of parts) {
        matchingContents.push(...allContents.filter(content => 
          content.report_type === 'Tahunan' && content.report_year === year
        ));
        matchingContents.push(...allContents.filter(content => 
          content.report_type === 'Triwulan' && content.report_year === year
        ));
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
    const url = quarter ? 
      `/api/reports?type=Triwulan&year=${year}&quarter=${quarter}` : 
      `/api/reports?type=Tahunan&year=${year}`;
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
                contentData={currentContent} 
                isLoading={loading} 
                id={id} 
                allContents={contents} 
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
