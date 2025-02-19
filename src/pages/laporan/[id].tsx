import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
// import Sidebar from "../../pages/laporan/section/sidebar";
import Content from "../../pages/laporan/section/content";
import Blog from "../../pages/components/section/blog";
import Footer from "../../pages/components/layout/footer";

const LaporanDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  
  const dataLaporan: Record<string, { 
    title: string; 
    description: string; 
    image: string;
    icon: string; 
  }> = {
    "2021": {
      title: "LAPORAN TAHUNAN",
      description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama setahun berjalan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png"
    },
    "2022": {
      title: "2022",
      description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama setahun berjalan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png"
    },
    "2023": {
      title: "2023",
      description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama setahun berjalan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png"
    },
    "2024": {
      title: "2024",
      description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama setahun berjalan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png"
    },
   "2025": {
      title: "2025",
      description: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama setahun berjalan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png"
    },
  };
  
  const laporanData = id ? dataLaporan[id as string] : null;

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
            <div className="flex flex-col lg:flex-row gap-8 py-8">
                
              {/* Sidebar Section */}
              {/* <Sidebar currentPath={router.asPath} /> */}

              {/* Main Content */}
              <div className="lg:w-3/4 w-full">
                <Content />
              </div>
            </div>
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

export default LaporanDetail;