import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/pinjaman/section/sidebar";
import Content from "../../pages/pinjaman/section/content";
import TableSection from "../../pages/pinjaman/section/tableSection";
import LoanProductsSlider from "../../pages/pinjaman/section/LoanProductSlider";
import CreditRequitment from "../../pages/pinjaman/section/creditRequitment";
import Blog from "../../pages/components/section/blog";
import Footer from "../../pages/components/layout/footer";

interface LoanProduct {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const PinjamanDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  
  const dataPinjaman: Record<string, { 
    title: string; 
    description: string; 
    image: string;
    icon: string; // Menambahkan field icon
  }> = {
    "kredit-modal-kerja": {
      title: "Kredit Modal Kerja",
      description: "Fasilitas pembiayaan yang diperuntukkan sebagai modal usaha untuk meningkatkan produksi dalam kegiatan operasional.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png"
    },
    "kredit-investasi": {
      title: "Kredit Investasi",
      description: "Pembiayaan untuk kebutuhan perluasan dan pengembangan bisnis dengan jangka waktu panjang.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-investasi.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png"
    },
    "kredit-multiguna": {
      title: "Kredit Multiguna",
      description: "Nikmati fasilitas pinjaman untuk berbagai kebutuhan Anda.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-multiguna.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_km.png"
    },
    "kredit-kepemilikan-rumah": {
      title: "Kredit Kepemilikan Rumah (KPR)",
      description: "Makin mudah wujudkan hunian idaman dengan jangka waktu fleksibel.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpr.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpr.png"
    },
    "kredit-kepemilikan-mobil": {
      title: "Kredit Kepemilikan Mobil (KPM)",
      description: "Mudah memiliki mobil impian baru atau bekas dengan bunga ringan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpm.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpm.png"
    },
    "kredit-kendaraan-bermotor": {
      title: "Kredit Kendaraan Bermotor (KKB)",
      description: "Dapatkan bunga ringan untuk mewujudkan motor impian Anda.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kkb.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kkb.png"
    },
    "kredit-tanpa-agunan": {
      title: "Kredit Tanpa Agunan (KTA)",
      description: "Kemudahan dalam memenuhi berbagai keperluan hidup tanpa jaminan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kta.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kta.png"
    },
  };
  
  const loanProducts: LoanProduct[] = Object.keys(dataPinjaman).map((key) => ({
    title: dataPinjaman[key].title,
    description: dataPinjaman[key].description,
    icon: dataPinjaman[key].icon, 
    href: `/pinjaman/${key}`,
  }));

  // Menu Sidebar
  const menuItems = Object.keys(dataPinjaman).map((key) => ({
    href: `/pinjaman/${key}`,
    label: dataPinjaman[key].title,
  }));


  const pinjamanData = id ? dataPinjaman[id as string] : null;

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
                
              {/* Sidebar Section */}
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />

              {/* Main Content */}
              <div className="lg:w-3/4 w-full">
                <Content />
              </div>
            </div>

            <TableSection />

            {/* Slider Section */}
            <LoanProductsSlider loanProducts={loanProducts} />

            {/* Credit Requirement Section */}
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