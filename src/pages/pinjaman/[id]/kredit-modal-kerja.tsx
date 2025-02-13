import { useRouter } from "next/router";
import Header from "../../components/layout/header";
import TableSection from "../section/tableSection";
import Hero from "../../components/section/hero";
import Blog from "../../components/section/blog";
import CreditRequitment from "../section/creditRequitment";
import Content from "../section/content";
import Footer from "@/pages/components/layout/footer";
import LoanProductsSlider from "../section/LoanProductSlider";
import Sidebar from "../section/sidebar";

const KreditModalKerjaPage = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const menuItems = [
    { href: "/pinjaman/kredit-modal-kerja", label: "Kredit Modal Kerja (KMK)" },
    { href: "/pinjaman/kredit-investasi", label: "Kredit Investasi" },
    { href: "/pinjaman/kredit-multiguna", label: "Kredit Multiguna" },
    { href: "/pinjaman/kpr", label: "Kredit Kepemilikan Rumah (KPR)" },
    {
      href: "/pinjaman/kredit-kepemilikan-mobil",
      label: "Kredit Kepemilikan Mobil (KPM)",
    },
    {
      href: "/pinjaman/kredit-kendaraan-bermotor",
      label: "Kredit Kendaraan Bermotor (KKB)",
    },
    { href: "/pinjaman/kta", label: "Kredit Tanpa Agunan (KTA)" },
    { href: "/pinjaman/formulir", label: "Formulir Pengajuan Pinjaman" },
  ];

  const loanProducts = [
    {
      title: "Kredit Modal Kerja (KMK)",
      description:
        "Kami hadir untuk memberikan kemudahan dalam pembiayaan kebutuhan modal kerja anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png",
      href: "/pinjaman/kredit-modal-kerja",
    },
    {
      title: "Kredit Investasi",
      description:
        "Nikmati pembiayaan untuk kebutuhan perluasan dan pengembangan bisnis anda dengan jangka waktu yang panjang",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png",
      href: "/pinjaman/kredit-investasi",
    },
    {
      title: "Kredit Kepemilikan Rumah",
      description:
        "Makin mudah wujudkan hunian idaman anda dengan jangka waktu fleksibel",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpr.png",
      href: "/pinjaman/kpr",
    },
    {
      title: "Kredit Multiguna",
      description: "Nikmati fasilitas pinjaman untuk segala kebutuhan anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_km.png",
      href: "/pinjaman/kredit-multiguna",
    },
    {
      title: "Kredit Kepemilikan Mobil (KPM)",
      description:
        "Jalan mudah untuk memiliki mobil idaman baru atau bekas dengan bunga ringan",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpm.png",
      href: "/pinjaman/kredit-kepemilikan-mobil",
    },
    {
      title: "Kredit Kendaraan Bermotor (KKB)",
      description: "Dapatkan bunga ringan untuk mewujudkan motor impian anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kkb.png",
      href: "/pinjaman/kredit-kendaraan-bermotor",
    },
    {
      title: "Kredit Tanpa Agunan",
      description:
        "Memberikan kemudahan dan keuntungan dalam memenuhi berbagai keperluan hidup anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kta.png",
      href: "/pinjaman/kta",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero
        imageSrc="https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp"
        title="Kredit Modal Kerja"
        paragraph="Fasilitas pembiayaan yang diperuntukan sebagai modal usaha untuk keperluan meningkatkan produksi dalam kegiatan operasionalnya"
        showButton={false}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
            
          {/* Sidebar Section */}
          <Sidebar menuItems={menuItems} currentPath={currentPath} />

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            <Content />
          </div>
        </div>

        <TableSection />

        {/* Slider Section */}
        <LoanProductsSlider loanProducts={loanProducts} />

        {/* Credit Requitment Section */}
        <CreditRequitment />
      </div>

      <Blog />
      <Footer />
    </div>
  );
};

export default KreditModalKerjaPage;
