import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/tabungan/section/sidebar";
import Content from "../../pages/tabungan/section/content";
import RiskManagement from "../../pages/tabungan/section/riskManegement";
import CreditRequitment from "./section/tabelRequitment";
import LoanProductSlider from "../../pages/tabungan/section/LoanProductSlider";
import Blog from "../components/section/blog";
import Footer from "../../pages/components/layout/footer";
import Link from "next/link";

// Define the interface for Savings Product
interface SavingsProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
  className?: string;
}

// Savings Products Data
const savingsProducts: SavingsProduct[] = [
  {
    title: "Tabungan Abdiku",
    description:
      "Tabungan fleksibel dengan suku bunga menarik dan biaya administrasi rendah.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  {
    title: "Tabungan Abdi Simple",
    description:
      "Tabungan dengan fitur sederhana untuk memenuhi kebutuhan transaksi harian Anda.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simpel.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
  {
    title: "Deposito Berjangka",
    description:
      "Investasi aman dengan tingkat bunga kompetitif dan fleksibilitas jangka waktu.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/tabungan/deposito-berjangka",
  },
];

// Tabungan Data
const dataTabungan: Record<string, SavingsProduct> = {
  "tabungan-abdi": {
    title: "Tabungan Abdi",
    description:
      "TABUNGAN ABDI merupakan tabungan yang penarikannya dapat dilakukan setiap saat dengan menggunakan sarana yang disediakan bank.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdi.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi.png",
    href: "/tabungan/tabungan-abdi",
  },
  "tabungan-abdiku": {
    title: "Tabungan Abdiku",
    description:
      "Tabungan ABDIKU merupakan produk tabungan yang dikhususkan untuk perorang dengan persyaratan mudah dan ringan. Diterbitkan secara bersama oleh bank-bank di Indonesia (TABUNGANKU), ABDIKU hadir untuk menumbuhkan budaya menabung serta meningkatkan kesejahteraan masyarakat dan tidak dikenakan biaya administrasi bulanan..",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  "tabungan-abdi-simple": {
    title: "Tabungan Abdi Simple",
    description:
      "Tabungan ABDI SIMPEL (Simpanan Pelajar) merupakan tabungan khusus bagi pelajar PAUD, SD,SMP, dan SMA yang berusia dibawah 17 tahun dan belum memiliki KTP. ABDI SIMPEL dikemas untuk memberikan edukasi dan inklusi keuangan untuk belajar mengelola keuangan khususnya membentuk 'karakter' budaya menabung sejak dini dan melatih persiapan masa depan dan pengenalan perbankan lebih dini.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
  "formulir": {
    title: "Formulir Pengajuan Tabungan",
    description:
      "TABUNGAN ABDI merupakan tabungan yang penarikannya dapat dilakukan setiap saat dengan menggunakan sarana yang disediakan bank.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-formulir.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/formulir",
  },
};

const TabunganDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const tabunganData = id && typeof id === "string" ? dataTabungan[id] : null;

  // Check if the current page is the formulir page
  const isFormulirPage = id === "formulir";

  if (!tabunganData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mt-4">
            Silakan pilih jenis tabungan yang tersedia.
          </p>
          <Link
            href="/tabungan"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Daftar Tabungan
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Hero
        imageSrc={tabunganData.image}
        title={tabunganData.title}
        paragraph={tabunganData.description}
        showButton={false}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar Section */}
          <Sidebar currentPath={router.pathname} />

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            <Content />
            <RiskManagement />
          </div>
        </div>
      </div>

      {/* Conditionally render CreditRequitment and LoanProductSlider */}
      {!isFormulirPage && (
        <>
          <CreditRequitment />
          <LoanProductSlider savingsProducts={savingsProducts} />
        </>
      )}
      <Blog />
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(dataTabungan).map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const tabunganData = dataTabungan[id];

  return {
    props: {
      tabunganData: tabunganData || null,
    },
  };
};

export default TabunganDetail;