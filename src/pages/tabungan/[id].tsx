import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/tabungan/section/sidebar";
import Content from "../../pages/tabungan/section/content";
import RiskManagement from "../../pages/tabungan/section/riskManegement";
import CreditRequitment from "../../pages/tabungan/section/creditRequitment";
import LoanProductSlider from "../../pages/tabungan/section/LoanProductSlider";
import Footer from "../../pages/components/layout/footer";

// Define the interface for Savings Product
interface SavingsProduct {
  title: string;
  description: string;
  image: string;
  icon: string;
  href: string;
}

// Define the interface for Loan Product
interface LoanProduct {
  title: string;
  description: string;
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
    icon: "	https://bankabdi.co.id/img/icon/tabungan_abdi_simpel.png",
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

// Loan Products Data (since it was referenced in the original code)
const loanProducts: LoanProduct[] = [
  {
    title: "Pinjaman Umum",
    description: "Pinjaman dengan persyaratan mudah dan proses cepat.",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_umum.png",
    href: "/pinjaman/umum",
  },
  {
    title: "Pinjaman Mikro",
    description: "Solusi pendanaan untuk usaha kecil dan menengah.",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_mikro.png",
    href: "/pinjaman/mikro",
  },
  {
    title: "Pinjaman Konsumtif",
    description: "Pinjaman untuk kebutuhan konsumsi pribadi.",
    icon: "https://bankabdi.co.id/img/icon/pinjaman_konsumtif.png",
    href: "/pinjaman/konsumtif",
  },
];

// Tabungan Data
const dataTabungan: Record<string, SavingsProduct> = {
  "tabungan-abdi": {
    title: "Tabungan Abdi",
    description:
      "Tabungan yang memberikan kemudahan serta keuntungan optimal bagi nasabah.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdi.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi.png",
    href: "/tabungan/tabungan-abdi",
  },
  "tabungan-abdiku": {
    title: "Tabungan Abdiku",
    description:
      "Tabungan fleksibel dengan suku bunga menarik dan biaya administrasi rendah.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdiku.png",
    href: "/tabungan/tabungan-abdiku",
  },
  "tabungan-abdi-simple": {
    title: "Tabungan Abdi Simple",
    description:
      "Tabungan dengan fitur sederhana untuk memenuhi kebutuhan transaksi harian Anda.",
    image: "https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp",
    icon: "https://bankabdi.co.id/img/icon/tabungan_abdi_simple.png",
    href: "/tabungan/tabungan-abdi-simple",
  },
};

// Menu Sidebar Items
const menuItems = Object.keys(dataTabungan).map((key) => ({
  href: `/tabungan/${key}`,
  label: dataTabungan[key].title,
}));

const TabunganDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const tabunganData = id && typeof id === "string" ? dataTabungan[id] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {tabunganData ? (
        <>
          <Hero
            imageSrc={tabunganData.image}
            title={tabunganData.title}
            paragraph={tabunganData.description}
            showButton={false}
          />

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 py-8">
              {/* Sidebar Section */}
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />

              {/* Main Content */}
              <div className="lg:w-3/4 w-full">
                {/* Tambahkan konten utama di sini */}
                <Content />

                <RiskManagement />
              </div>
            </div>
          </div>
          <CreditRequitment />
          <LoanProductSlider savingsProducts={savingsProducts} />

          <Footer />
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">
            Silakan pilih jenis tabungan yang tersedia.
          </p>
        </div>
      )}
    </div>
  );
};

export default TabunganDetail;
