import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/pinjaman/section/sidebar";
import Content from "../../pages/pinjaman/section/content";
import TableSection from "../../pages/pinjaman/section/tableSection";
import LoanProductsSlider from "../../pages/pinjaman/section/LoanProductSlider";
import CreditRequitment from "./section/tabelRequitment";
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

  const dataPinjaman: Record<
    string,
    {
      title: string;
      description: string;
      image: string;
      icon: string;
    }
  > = {
    "kredit-modal-kerja": {
      title: "Kredit Modal Kerja",
      description:
        "Fasilitas pembiayaan yang diperuntukkan sebagai modal usaha untuk meningkatkan produksi dalam kegiatan operasional.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png",
    },
    "kredit-investasi": {
      title: "Kredit Investasi",
      description:
        "Fasilitas pembiayaanyang diberikan untuk membiayai kebutuhan dalam jangka panjang dalam mengembangkan/memperluas usaha anda.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-ki.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png",
    },
    "kredit-multiguna": {
      title: "Kredit Multiguna",
      description:
        "Fasilitas pembiayaan yang diberikan kepada pegawai/pengusaha yang memiliki penghasilan/profesi tetap, untuk membiayai berbagai macam kebutuhannya.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-km.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_km.png",
    },
    "kredit-kepemilikan-rumah": {
      title: "Kredit Kepemilikan Rumah (KPR)",
      description:
        "Fasilitas pembiayaan untuk membeli rumah / rumah toko / rumah kantor.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpr.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpr.png",
    },
    "kredit-kepemilikan-mobil": {
      title: "Kredit Kepemilikan Mobil (KPM)",
      description:
        "Fasilitas pembiayaan untuk pembelian kendaraan roda empat / mobil baik baru maupun bekas.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kpm.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpm.png",
    },
    "kredit-kendaraan-bermotor": {
      title: "Kredit Kendaraan Bermotor (KKB)",
      description:
        "Faslititas pembiayaan untuk pembelian kendaraan bermotor roda dua untuk nasabah perseorangan.",
      image: "https://bankabdi.co.id/img/banner/hero-pinjaman-kkb.webp",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kkb.png",
    },
    "kredit-tanpa-agunan": {
      title: "Kredit Tanpa Agunan (KTA)",
      description:
        "Fasilitas pembiayaan yang merupakan pinjaman tanpa adanya jaminan atau agunan atas pinjaman yang diajukan.",
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
          <p className="text-gray-600">
            Silakan pilih jenis pinjaman yang tersedia.
          </p>
        </div>
      )}
    </div>
  );
};

export default PinjamanDetail;
