import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";

type MenuItem = {
  title: string;
  href: string;
  desc: string;
};

type MenuMap = {
  pinjaman: MenuItem[];
  tabungan: MenuItem[];
  deposito: MenuItem[];
  informasi: MenuItem[];
};

type MenuType = keyof MenuMap;

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<MenuType | null>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsTransparent(window.scrollY === 0);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileSubmenuToggle = (menu: MenuType) => {
    setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
  };

  const getSubmenuContent = (menu: MenuType): MenuItem[] => {
    const submenuMap: MenuMap = {
      pinjaman: [
        { title: "Kredit Modal Kerja", href: "/pinjaman/kredit-modal-kerja", desc: "Kami hadir untuk memberikan kemudahan dalam pembiayaan kebutuhan modal kerja anda" },
        { title: "Kredit Investasi", href: "/pinjaman/kredit-investasi", desc: "Nikmati pembiayaan untuk kebutuhan perluasan bisnis anda dalam jangka waktu yang panjang" },
        { title: "Kredit Multiguna", href: "/pinjaman/kredit-multiguna", desc: "Nikmati fasilitas pinjaman untuk segala kebutuhan anda" },
        { title: "Kredit Kepemilikan Rumah", href: "/pinjaman/kredit-kepemilikan-rumah", desc: "Makin mudah wujudkan hunian idaman dengan jangka waktu fleksibel" },
        { title: "Kredit Kepemilikan Mobil", href: "/pinjaman/kredit-kepemilikan-mobil", desc: "Jalan mudah untuk memiliki mobil idaman baru atau bekas dengan bunga ringan" },
        { title: "Kredit Kendaraan Bermotor", href: "/pinjaman/kredit-kendaraan-bermotor", desc: "Dapatkan bunga ringan untuk mewujudkan motor impian anda" },
        { title: "Kredit Tanpa Agunan", href: "/pinjaman/kredit-tanpa-agunan", desc: "Memberikan kemudahan dan keuntungan dalam memenuhi berbagai keperluan hidup anda" },
      ],
      tabungan: [
        { title: "Tabungan ABDI", href: "/tabungan/tabungan-abdi", desc: "Raih keuntungan dengan suku bunga kompetitif dan fleksibilitas penarikan dana kapan saja" },
        { title: "Tabungan Abdiku", href: "/tabungan/tabungan-abdiku", desc: "Lebih hemat dengan menabung tanpa biaya administrasi bulanan yang mengikat anda" },
        { title: "Tabungan ABDI SIMPLE", href: "/tabungan/tabungan-abdi-simple", desc: "Mulailah mengasah disiplin menabung sejak usia dini untuk meraih kehidupan finansial yang lebih baik" },
      ],
      deposito: [
        { title: "Deposito Berjangka", href: "/deposito/deposito-berjangka", desc: "Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh LPS" },
        { title: "Formulir Deposito", href: "/deposito/formulir-deposito", desc: "Ajukan Deposito dengan mengisi Formulir BANK ABDI" },
        { title: "Kalkulator Deposito", href: "/deposito/kalkulator-deposito", desc: "Ketahui suku bunga deposito BANK ABDI dengan Kalkulator BANK ABDI" },
      ],
      informasi: [
        { title: "Suku Bunga", href: "/informasi/suku-bunga", desc: "BANK ABDI menawarkan tabungan dengan suku bunga menarik" },
        { title: "Blog", href: "/informasi/blog", desc: "Dapatkan informasi terkini melalui Blog Bank ABDI" },
        { title: "Laporan", href: "/informasi/laporan", desc: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas" },
      ],
    };
    return submenuMap[menu] || [];
  };

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 h-[60px] transition-all duration-300 ${isTransparent ? "bg-transparent" : "bg-white shadow-md"}`}>
      <nav className="container mx-auto flex items-center justify-between font-sogeo text-sm h-full">
        <div className="mr-6 pl-4">
          <Link href="/">
            <Image
              src={isTransparent ? "https://bankabdi.co.id/img/logo/logo-white-abdi.svg" : "https://bankabdi.co.id/img/logo/logo-color-abdi.svg"}
              width={172.44}
              height={40}
              alt="Logo Abdi Bank"
              className={isTransparent ? "logo-transparent" : ""}
            />
          </Link>
        </div>

        {/* Desktop */}
        <ul className="hidden md:flex space-x-6 text-gray-800">
          {(["pinjaman", "tabungan", "deposito", "informasi"] as MenuType[]).map((menu) => (
            <li key={menu} className="relative group">
              <button className={`hover:text-blue-600 capitalize flex items-center ${isTransparent ? "text-white" : "text-gray-800"}`}>
                {menu}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className="hidden group-hover:block fixed left-0 right-0 bg-white shadow-lg z-50">
                <div className="container mx-auto p-4 text-base">
                  {getSubmenuContent(menu).map((item, index) => (
                    <Link key={index} href={item.href}>
                      <div className="block px-4 py-3 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <Image src="https://bankabdi.co.id/img/icon/arrow_right.png" width={16} height={16} alt="arrow right" />
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          ))}

          <li><Link href="/about"><span className={`${isTransparent ? "text-white" : "text-gray-800"} hover:text-blue-600`}>Tentang Kami</span></Link></li>
          <li><Link href="/contact"><span className={`${isTransparent ? "text-white" : "text-gray-800"} hover:text-blue-600`}>Hubungi Kami</span></Link></li>
        </ul>

        <button className={`${isTransparent ? "bg-white text-blue-800 hover:bg-gray-100" : "bg-[#003868] text-white hover:bg-blue-700"} px-4 py-2 rounded-full ml-auto text-xs font-sogeo`}>
          <Link href="/pinjaman/form-pengajuan-kredit"><span className={`${isTransparent ? "text-blue-800" : "text-white"} hover:text-blue-100`}>Pengajuan Kredit</span></Link>
        </button>

        {/* Hamburger Menu */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Menu className={isTransparent ? "text-white" : "text-gray-800"} size={24} />
        </button>
      </nav>

      {/* Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-lg z-40 max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="container mx-auto py-4 px-6 space-y-4">
            {(["pinjaman", "tabungan", "deposito", "informasi"] as MenuType[]).map((menu) => (
              <div key={menu} className="w-full">
                <button className="w-full text-left py-2 text-gray-800 hover:text-blue-600 capitalize flex items-center justify-between" onClick={() => handleMobileSubmenuToggle(menu)}>
                  <span className="font-medium">{menu}</span>
                  {openMobileSubmenu === menu ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openMobileSubmenu === menu && (
                  <div className="py-2 space-y-2">
                    {getSubmenuContent(menu).map((item, index) => (
                      <Link key={index} href={item.href}>
                        <div className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">{item.title}</span>
                            <Image src="https://bankabdi.co.id/img/icon/arrow_right.png" width={16} height={16} alt="arrow right" />
                          </div>
                          <span className="text-sm mt-1">{item.desc}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/about"><span className="block py-2 text-gray-800 hover:text-blue-600">Tentang Kami</span></Link>
            <Link href="/contact"><span className="block py-2 text-gray-800 hover:text-blue-600">Hubungi Kami</span></Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
