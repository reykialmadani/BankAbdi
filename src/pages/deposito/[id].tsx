import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/tabungan/section/sidebar";
import Content from "../../pages/deposito/section/content";
import RiskManagement from "../../pages/tabungan/section/riskManegement";
import CreditRequitment from "./section/tabelRequitment";
import LoanProductSlider from "../../pages/tabungan/section/LoanProductSlider";
import Footer from "../../pages/components/layout/footer";
import Link from "next/link";

// Define interfaces
interface SavingsProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

interface DepositoProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
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

// Data Produk Deposito
const dataDeposito: Record<string, DepositoProduct> = {
  "deposito-berjangka": {
    title: "Deposito Berjangka",
    description:
      "Simpanan pihak ketiga yang penarikan dananya dilakukan setiap tanggal jatuh tempo yang telah disepakati dalam perjanjian pembukaan deposito berjangka (1,3,6, dan 12 bulan) . Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS)",
    image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
    icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    href: "/deposito/deposito-berjangka",
  },
  "formulir-deposito": {
    title: "Deposito Berjangka",
    description:
      "Simpanan pihak ketiga yang penarikan dananya dilakukan setiap tanggal jatuh tempo yang telah disepakati dalam perjanjian pembukaan deposito berjangka (1,3,6, dan 12 bulan) . Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS)",
    image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
    icon: "https://bankabdi.co.id/img/icon/formulir_deposito.png",
    href: "/deposito/formulir-deposito",
  },
  "kalkulator-deposito": {
    title: "Kalkulator Deposito",
    description: "",
    image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
    icon: "https://bankabdi.co.id/img/icon/kalkulator_deposito.png",
    href: "/deposito/kalkulator-deposito",
  },
};

const DepositoDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  // Check if id is valid and corresponding data exists
  const depositoData = id && typeof id === "string" ? dataDeposito[id] : null;

  // If deposito data not found, show 404 page
  if (!depositoData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-gray-600 mt-4">
            Silakan pilih jenis deposito yang tersedia.
          </p>
          <Link
            href="/deposito"
            className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Kembali ke Daftar Deposito
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <Hero
        imageSrc={depositoData.image}
        title={depositoData.title}
        paragraph={depositoData.description}
        showButton={false}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar Section */}
          <Sidebar currentPath={router.asPath} />

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            <Content />
            <RiskManagement />
          </div>
        </div>
      </div>

      <CreditRequitment />
      <LoanProductSlider savingsProducts={savingsProducts} />
      <Footer />
    </div>
  );
};

// Static Paths for Deposito
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(dataDeposito).map((id) => ({
    params: { id },
  }));

  return {
    paths,
    fallback: false, // fallback to 404 if id doesn't match
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const depositoData = dataDeposito[id] || null;

  return {
    props: {
      depositoData,
    },
  };
};

export default DepositoDetail;
