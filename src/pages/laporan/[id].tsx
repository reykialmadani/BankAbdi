import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Hero from "../components/section/hero";
import Content from "./section/content";
import Blog from "../components/section/blog";
import Footer from "../components/layout/footer";
import { getAllContents, getContentBySubMenuUrl, Content as ContentType } from "@/pages/api/fetching/routes";

const defaultData: Record<string, { title: string, description: string, image: string, icon: string }> = {
  "2021": {
    title: "LAPORAN TAHUNAN",
    description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama tahun 2021-2025.",
    image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
    icon: "https://bankabdi.co.id/img/icon/laporan.png",
  },
};

const debugContent = (content) => {
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
        
        // Normalisasi ID untuk pencarian
        const normalizedId = typeof id === 'string' ? id : '';
        console.log("Current URL ID:", normalizedId);
        
        // Ambil semua konten dari backend
        console.log("Fetching all contents...");
        const allContents = await getAllContents();
        
        // Log sample dari konten untuk troubleshooting
        if (Array.isArray(allContents) && allContents.length > 0) {
          console.log("Sample content from API:", debugContent(allContents[0]));
          console.log(`API returned ${allContents.length} contents`);
        } else {
          console.log("API returned no contents or invalid format");
        }
        
        // Pastikan data yang diterima adalah array valid
        if (Array.isArray(allContents)) {
          setContents(allContents);
        } else {
          console.error("Invalid content data format, expected array:", allContents);
          setContents([]);
        }
        
        // Check if we got valid content from backend
        const hasValidContent = Array.isArray(allContents) && allContents.length > 0;
        
        if (hasValidContent) {
          // Log semua konten dengan jenis laporan untuk troubleshooting
          console.log("All report content from API:", allContents
            .filter(c => c.report_type)
            .map(debugContent)
          );
          
          let matchingContents = [];
          if (normalizedId.includes('-')) {
            const parts = normalizedId.split('-');

            if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
  
              for (const year of parts) {
                const yearlyContents = allContents.filter(content => 
                  content.report_type === 'Tahunan' && 
                  content.report_year === year
                );
                
                if (yearlyContents.length > 0) {
                  matchingContents = [...matchingContents, ...yearlyContents];
                  console.log(`Found matching annual reports for year ${year}: ${yearlyContents.length} reports`);
                }
                
                
                const quarterlyContents = allContents.filter(content => 
                  content.report_type === 'Triwulan' && 
                  content.report_year === year
                );
                
                if (quarterlyContents.length > 0) {
                  matchingContents = [...matchingContents, ...quarterlyContents];
                  console.log(`Found matching quarterly reports for year ${year}: ${quarterlyContents.length} reports`);
                }
              }
            } 
            
            else {
              const [year, quarter] = normalizedId.split('-');
              matchingContents = allContents.filter(content => {
                const isMatch = content.report_type === 'Triwulan' && 
                               content.report_year === year && 
                               content.report_quarter === quarter;
                if (isMatch) {
                  console.log(`Found matching quarterly report: ${content.id} - ${content.title}`);
                }
                return isMatch;
              });
            }
          } 
          
          else {
            matchingContents = allContents.filter(content => {
              if (content.report_type === 'Tahunan' && content.report_year === normalizedId) {
                console.log(`Found matching annual report: ${content.id} - ${content.title}`);
                return true;
              }
              return false;
            });
          }
          
          console.log(`Found ${matchingContents.length} matching contents for ${normalizedId}`);
          
        
          if (matchingContents.length > 0) {
            setCurrentContent(matchingContents[0]);
            console.log("Setting current content:", debugContent(matchingContents[0]));
          } else {
            
            console.log("No matching content found in allContents, trying specific API");
            try {
              if (!normalizedId.includes('-')) {
                
                console.log(`Fetching Tahunan report for year: ${normalizedId}`);
                const specificContents = await getContentByReportType('Tahunan', normalizedId);
                if (specificContents && specificContents.length > 0) {
                  console.log("Found specific content via API:", debugContent(specificContents[0]));
                  setCurrentContent(specificContents[0]);
                } else {
                  console.log("No specific content found via API");
                  setCurrentContent(null);
                }
              } else {
                
                const parts = normalizedId.split('-');
                
                if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
                 
                  console.log(`Fetching Tahunan report for latest year in range: ${parts[0]}`);
                  const specificContents = await getContentByReportType('Tahunan', parts[0]);
                  if (specificContents && specificContents.length > 0) {
                    console.log("Found specific content via API:", debugContent(specificContents[0]));
                    setCurrentContent(specificContents[0]);
                  } else {
                    
                    console.log(`Fetching Tahunan report for second year in range: ${parts[1]}`);
                    const fallbackContents = await getContentByReportType('Tahunan', parts[1]);
                    if (fallbackContents && fallbackContents.length > 0) {
                      console.log("Found fallback content via API:", debugContent(fallbackContents[0]));
                      setCurrentContent(fallbackContents[0]);
                    } else {
                      console.log("No specific content found via API");
                      setCurrentContent(null);
                    }
                  }
                } else {
                 
                  const [year, quarter] = normalizedId.split('-');
                  console.log(`Fetching Triwulan report for year: ${year}, quarter: ${quarter}`);
                  const specificContents = await getContentByReportType('Triwulan', year, quarter);
                  if (specificContents && specificContents.length > 0) {
                    console.log("Found specific content via API:", debugContent(specificContents[0]));
                    setCurrentContent(specificContents[0]);
                  } else {
                    console.log("No specific content found via API");
                    setCurrentContent(null);
                  }
                }
              }
            } catch (err) {
              console.error("Error fetching specific content:", err);
              setCurrentContent(null);
            }
          }
        } else {
          
          console.log("No valid content from backend");
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

  // Fungsi untuk mendapatkan data berdasarkan jenis laporan (asumsi fungsi ini tersedia di API)
  const getContentByReportType = async (type: string, year: string, quarter?: string) => {
    console.log(`Fetching ${type} report for year: ${year}${quarter ? `, quarter: ${quarter}` : ''}`);
    try {
      if (contents && contents.length > 0) {
        const filtered = contents.filter(content => {
          if (type === 'Tahunan' && content.report_type === type && content.report_year === year) {
            return true;
          }
          if (type === 'Triwulan' && content.report_type === type && content.report_year === year && content.report_quarter === quarter) {
            return true;
          }
          return false;
        });
        if (filtered.length > 0) {
          console.log(`Found ${filtered.length} matching reports by filtering existing data`);
          return filtered;
        }
      }
      
      // Jika tidak ditemukan dari data yang ada, coba panggil API
      console.log("Trying API call as fallback");
      const url = quarter ? 
        `/api/reports?type=${type}&year=${year}&quarter=${quarter}` : 
        `/api/reports?type=${type}&year=${year}`;
      return await getContentBySubMenuUrl(url);
    } catch (error) {
      console.error("Error fetching report by type:", error);
      return [];
    }
  };

  const getLaporanData = () => {
    if (!id) return null;
    const normalizedId = typeof id === 'string' ? id : '';
    
    // Selalu gunakan data default untuk tampilan Hero jika tersedia
    const defaultLaporanData = defaultData[normalizedId];
    
    if (defaultLaporanData) {
      return defaultLaporanData;
    }
    
    // Jika tidak ada data default yang cocok, buat data berdasarkan ID
    // Periksa format ID
    if (normalizedId.includes('-')) {
      const parts = normalizedId.split('-');
      
      // Jika format "2025-2021" (mungkin menunjukkan rentang tahun)
      if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
        return {
          title: `LAPORAN ${parts[0]}-${parts[1]}`,
          description: `Laporan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama periode ${parts[1]} hingga ${parts[0]}.`,
          image: "https://bankabdi.co.id/img/banner/hero-laporan.webp",
          icon: "https://bankabdi.co.id/img/icon/laporan.png",
        };
      }
      
      // Format standar untuk laporan triwulan (tahun-triwulan)
      const [year, quarter] = parts;
      return {
        title: `LAPORAN TRIWULAN ${quarter} TAHUN ${year}`,
        description: `Laporan triwulan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama triwulan ${quarter} tahun ${year}.`,
        image: "https://bankabdi.co.id/img/banner/hero-laporan.webp",
        icon: "https://bankabdi.co.id/img/icon/laporan.png",
      };
    } else {
      // Format untuk laporan tahunan (hanya tahun)
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