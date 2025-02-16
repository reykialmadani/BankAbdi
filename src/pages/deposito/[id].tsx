import { useRouter } from "next/router";
import Header from "../../pages/components/layout/header";
import Hero from "../../pages/components/section/hero";
import Sidebar from "../../pages/tabungan/section/sidebar";
import Content from "../../pages/deposito/section/content";
import RiskManagement from "../../pages/deposito/section/riskManagement";
import CreditRequitment from "../../pages/tabungan/section/creditRequitment";
import LoanProductSlider from "../../pages/tabungan/section/LoanProductSlider";
import Blog from "../../pages/components/section/blog";
import Footer from "../../pages/components/layout/footer";

interface DepositoProduct {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const DepositoDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const dataDeposito: Record<
    string,
    {
      title: string;
      description: string;
      image: string;
      icon: string;
    }
  > = {
    "deposito-berjangka": {
      title: "Deposito Berjangka",
      description:
        "Simpanan pihak ketiga yang penarikan dananya dilakukan setiap tanggal jatuh tempo yang telah disepakati dalam perjanjian pembukaan deposito berjangka (1,3,6, dan 12 bulan) . Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS).",
      image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
      icon: "https://bankabdi.co.id/img/icon/deposito_berjangka.png",
    },
    "formulir-deposito": {
      title: "Deposito Berjangka",
      description:
        "Simpanan pihak ketiga yang penarikan dananya dilakukan setiap tanggal jatuh tempo yang telah disepakati dalam perjanjian pembukaan deposito berjangka (1,3,6, dan 12 bulan) . Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS).",
      image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
      icon: "https://bankabdi.co.id/img/icon/formulir_deposito.png",
    },
    "kalkulator-deposito": {
      title: "Kalkulator Deposito",
      description: "",
      image: "https://bankabdi.co.id/img/banner/hero-deposito.webp",
      icon: "https://bankabdi.co.id/img/icon/kalkulator_deposito.png",
    },
  };

  const depositoProducts: DepositoProduct[] = Object.keys(dataDeposito).map(
    (key) => ({
      title: dataDeposito[key].title,
      description: dataDeposito[key].description,
      icon: dataDeposito[key].icon,
      href: `/deposito/${key}`,
    })
  );

  // Menu Sidebar
  const menuItems = Object.keys(dataDeposito).map((key) => ({
    href: `/deposito/${key}`,
    label: dataDeposito[key].title,
  }));

  const depositoData = id ? dataDeposito[id as string] : null;

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

  // Components for each deposito page type
  const renderDepositoContent = () => {
    switch (id) {
      case "deposito-berjangka":
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">
              Keunggulan Deposito Berjangka
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Suku Bunga Kompetitif
                  </h3>
                  <p className="text-gray-600">
                    Dapatkan imbal hasil yang menarik dengan suku bunga yang
                    kompetitif.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Jangka Waktu Fleksibel
                  </h3>
                  <p className="text-gray-600">
                    Pilih jangka waktu yang sesuai dengan kebutuhan Anda, mulai
                    dari 1, 3, 6, atau 12 bulan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case "formulir-deposito":
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">
              Formulir Pengajuan Deposito
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nominal Deposito
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jangka Waktu
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>1 Bulan</option>
                  <option>3 Bulan</option>
                  <option>6 Bulan</option>
                  <option>12 Bulan</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Ajukan Deposito
              </button>
            </form>
          </div>
        );

      case "kalkulator-deposito":
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Kalkulator Deposito</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nominal Deposito
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Jangka Waktu (Bulan)
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>1</option>
                  <option>3</option>
                  <option>6</option>
                  <option>12</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Suku Bunga (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Hitung
              </button>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  Hasil Perhitungan
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Total Bunga: Rp 0</p>
                  <p className="text-gray-600">
                    Total Dana di Akhir Periode: Rp 0
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {depositoData ? (
        <>
          <Hero
            imageSrc={depositoData.image}
            title={depositoData.title}
            paragraph={depositoData.description}
            showButton={false}
          />

          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8 py-8">
              {/* Sidebar Section */}
              <Sidebar menuItems={menuItems} currentPath={router.asPath} />

              {/* Main Content */}
              <div className="lg:w-3/4 w-full">
                <Content />
                <RiskManagement className="mt-6" />
              </div>
            </div>
          </div>
          <CreditRequitment />
          <LoanProductSlider savingsProducts={savingsProducts} />

          <Blog />
          <Footer />
        </>
      ) : (
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold">Halaman Tidak Ditemukan</h1>
          <p className="text-gray-600">
            Silakan pilih jenis deposito yang tersedia.
          </p>
        </div>
      )}
    </div>
  );
};

export default DepositoDetail;
