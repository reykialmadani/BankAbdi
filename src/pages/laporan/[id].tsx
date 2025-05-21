import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";

// Definisi tipe data untuk laporan
interface LaporanItem {
  id: number;
  title: string;
  month: string;
  report_year: string;
  required_documents: { url: string; name?: string }[];
}

// Definisi tipe data untuk kategori laporan
interface LaporanCategory {
  title: string;
  description: string;
  heroImage: string;
}

// Informasi kategori laporan
const categoryInfo: Record<string, LaporanCategory> = {
  tahunan: {
    title: "Laporan Tahunan",
    description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama tahun berjalan.",
    heroImage: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
  },
  bulanan: {
    title: "Laporan Bulanan",
    description: "Laporan bulanan BANK ABDI yang mencakup kinerja dan aktivitas bank dalam periode bulanan.",
    heroImage: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
  },
  publikasi: {
    title: "Laporan Publikasi",
    description: "Laporan publikasi BANK ABDI yang berisi informasi keuangan dan non-keuangan yang dipublikasikan secara berkala.",
    heroImage: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
  },
  "tata-kelola": {
    title: "Laporan Tata Kelola",
    description: "Laporan tata kelola BANK ABDI yang menjabarkan praktik tata kelola perusahaan yang baik.",
    heroImage: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
  },
};

const LaporanDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [laporanItems, setLaporanItems] = useState<LaporanItem[]>([]);
  const [categoryData, setCategoryData] = useState<LaporanCategory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (id && typeof id === "string") {
          const normalizedId = id.toLowerCase();
          setCurrentCategory(normalizedId);
          
          if (normalizedId in categoryInfo) {
            setCategoryData(categoryInfo[normalizedId]);
            const response = await fetch(`http://localhost:5000/api/report/report=${normalizedId}`);
            
            if (!response.ok) throw new Error(`API error: ${response.status}`);
            
            const responseData = await response.json();
            console.log(responseData);
            
            const parsedData = responseData.data.map((item: any) => ({
              ...item,
              required_documents: safeJsonParse(item.required_documents),
            }));
            
            setLaporanItems(parsedData);
          } else {
            setCategoryData(null);
            setLaporanItems([]);
            setError("Kategori laporan tidak tersedia");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
        setLaporanItems([]);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const safeJsonParse = (input: string): string[] => {
    try {
      return typeof input === "string" ? JSON.parse(input) : input;
    } catch {
      return [];
    }
  };

  const showMonthColumn = currentCategory === 'bulanan';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!categoryData || error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">{error || "Kategori laporan tidak tersedia."}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative">
        <div
          className="w-full h-64 md:h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryData.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {categoryData.title}
              </h1>
              <p className="text-white text-base md:text-lg max-w-2xl mx-auto">
                {categoryData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Table Section */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                  {showMonthColumn && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bulan</th>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {laporanItems.length > 0 ? (
                  laporanItems.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                      {showMonthColumn && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{item.month}</td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.report_year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-y-1">
                        {item.required_documents?.map((doc, idx) => (
                          <a
                            key={idx}
                            href={`${BASE_URL}${doc.url}`}
                            download
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md text-sm inline-block mr-2"
                          >
                            Download
                          </a>
                        ))}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={showMonthColumn ? 5 : 4} className="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada data laporan tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LaporanDetail;