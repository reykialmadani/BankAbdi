import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/informasi/section/sidebar";
import Content from "../../pages/informasi/section/content";
import Blog from "../../pages/components/section/blog";
import Footer from "../../pages/components/layout/footer";

interface InformationContent {
  title: string;
  description: string;
  image: string;
  icon: string;
}

const InformationDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const informationData: Record<string, InformationContent> = {
    "suku-bunga": {
      title: "Informasi BANK ABDI",
      description: "",
      image: "https://bankabdi.co.id/img/banner/hero-informasi.webp",
      icon: "https://bankabdi.co.id/img/icon/info_tabungan.png"
    },
    "tabungan": {
      title: "Informasi BANK ABDI",
      description: "",
      image: "https://bankabdi.co.id/img/banner/hero-informasi.webp",
      icon: "https://bankabdi.co.id/img/icon/info_tabungan.png"
    },
    "deposito": {
      title: "DEPOSITO",
      description: "Bunga deposito BANK ABDI tetap tinggi, aman & dijamin oleh LPS.",
      image: "https://bankabdi.co.id/img/banner/simpanan-abdiku.webp",
      icon: "https://bankabdi.co.id/img/icon/info_deposito.png"
    },
    "lps": {
      title: "INFORMASI LPS",
      description: "",
      image: "https://bankabdi.co.id/img/banner/simpanan-abdiku.webp",
      icon: "https://bankabdi.co.id/img/icon/info_lps.png"
    },
    "iso": {
      title: "ISO",
      description: "",
      image: "https://bankabdi.co.id/img/banner/simpanan-abdiku.webp",
      icon: "https://bankabdi.co.id/img/icon/info_iso.png"
    },
    "blog": {
      title: "ISO",
      description: "",
      image: "https://bankabdi.co.id/img/banner/simpanan-abdiku.webp",
      icon: "https://bankabdi.co.id/img/icon/info_iso.png"
    },
    "event": {
      title: "EVENT",
      description: "",
      image: "https://bankabdi.co.id/img/banner/simpanan-abdiku.webp",
      icon: "https://bankabdi.co.id/img/icon/info_iso.png"
    },
    "Laporan": {
      title: "LAPORAN",
      description: "",
      image: "https://bankabdi.co.id/img/banner/simpanan-abdiku.webp",
      icon: "https://bankabdi.co.id/img/icon/info_iso.png"
    }
  };

  const currentInformation = id ? informationData[id as string] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {currentInformation ? (
        <>
          <Hero
            imageSrc={currentInformation.image}
            title={currentInformation.title}
            paragraph={currentInformation.description}
            showButton={false}
          />

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 py-8">
              {/* Sidebar Section */}
              <Sidebar currentPath={router.asPath} />

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
          <p className="text-gray-600">Silakan pilih jenis informasi yang tersedia.</p>
        </div>
      )}
    </div>
  );
};
export default InformationDetail;