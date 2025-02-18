import Header from "./components/layout/header"
import Hero from "./components/section/hero"
import Sidebar from "../pages/pinjaman/section/sidebar" 

// Define the interface for the loan products data
interface LoanProduct {
  title: string;
  description: string;
  icon: string;
  href: string;
}

const PengajuanKredit = () => {
    // Copied the dataPinjaman object from the original file
    const dataPinjaman: Record<string, { 
        title: string; 
        description: string; 
        image: string;
        icon: string; 
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
          image: "https://bankabdi.co.id/img/banner/hero-pinjaman-ki.webp",
          icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png"
        },
        "kredit-multiguna": {
          title: "Kredit Multiguna",
          description: "Nikmati fasilitas pinjaman untuk berbagai kebutuhan Anda.",
          image: "https://bankabdi.co.id/img/banner/hero-pinjaman-km.webp",
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

    // Create the menu items for sidebar from dataPinjaman
    const menuItems = Object.keys(dataPinjaman).map((key) => ({
        href: `/pinjaman/${key}`,
        label: dataPinjaman[key].title,
    }));
    
    // You'll need to get the current path for highlighting the active menu item
    // In a real application, you would use router.asPath, but for now let's set it to a default path
    const currentPath = "/formulir-pengajuan-kredit"; // This can be updated based on your routing logic
    
    return (
        <div className="bg-white min-h-screen">
            <Header />
            {/* Hero Section */}
            <section>
                <Hero
                    imageSrc="https://bankabdi.co.id/img/banner/hero-pinjaman.webp"
                    title="Formulir Pengajuan Pinjaman"
                    showButton={false}
                />
            </section>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 py-8">
                    {/* Sidebar Section */}
                    <Sidebar menuItems={menuItems} currentPath={currentPath} />
                </div>
            </div>
        </div>
    )
}

export default PengajuanKredit