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
type ProductMenuType = 'pinjaman' | 'tabungan' | 'deposito';
type AllMenuType = MenuType | 'produk';

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<AllMenuType | null>(null);
  const [openMobileProductSubmenu, setOpenMobileProductSubmenu] = useState<ProductMenuType | null>(null);
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsTransparent(window.scrollY === 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileSubmenuToggle = (menu: AllMenuType) => {
    if (menu === 'produk') {
      setOpenMobileSubmenu(openMobileSubmenu === 'produk' ? null : 'produk');
      setOpenMobileProductSubmenu(null);
    } else {
      setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
    }
  };

  const handleMobileProductSubmenuToggle = (submenu: ProductMenuType) => {
    setOpenMobileProductSubmenu(openMobileProductSubmenu === submenu ? null : submenu);
  };

  const getSubmenuContent = (menu: MenuType): MenuItem[] => {
    const submenuMap: MenuMap = {
      pinjaman: [
        {
          title: "Kredit Modal Kerja",
          href: "/pinjaman/kredit-modal-kerja",
          desc: "Kami hadir untuk memberikan kemudahan dalam pembiayaan kebutuhan modal kerja anda"
        },
        {
          title: "Kredit Investasi",
          href: "/pinjaman/kredit-investasi",
          desc: "Nikmati pembiayaan untuk kebutuhan perluasan bisnis anda dalam jangka waktu yang panjang"
        },
        {
          title: "Kredit Multiguna",
          href: "/pinjaman/kredit-multiguna",
          desc: "Nikmati fasilitas pinjaman untuk segala kebutuhan anda"
        },
        {
          title: "Kredit Kepemilikan Rumah",
          href: "/pinjaman/kredit-kepemilikan-rumah",
          desc: "Makin mudah wujudkan hunian idaman dengan jangka waktu fleksibel"
        },
        {
          title: "Kredit Kepemilikan Mobil",
          href: "/pinjaman/kredit-kepemilikan-mobil",
          desc: "Jalan mudah untuk memiliki mobil idaman baru atau bekas dengan bunga ringan"
        },
        {
          title: "Kredit Kendaraan Bermotor",
          href: "/pinjaman/kredit-kendaraan-bermotor",
          desc: "Dapatkan bunga ringan untuk mewujudkan motor impian anda"
        },
        {
          title: "Kredit Tanpa Agunan",
          href: "/pinjaman/kredit-tanpa-agunan",
          desc: "Memberikan kemudahan dan keuntungan dalam memenuhi berbagai keperluan hidup anda"
        },
      ],
      tabungan: [
        {
          title: "Tabungan ABDI",
          href: "/tabungan/tabungan-abdi",
          desc: "Raih keuntungan dengan suku bunga kompetitif dan fleksibilitas penarikan dana kapan saja"
        },
        {
          title: "Tabungan Abdiku",
          href: "/tabungan/tabungan-abdiku",
          desc: "Lebih hemat dengan menabung tanpa biaya administrasi bulanan yang mengikat anda"
        },
        {
          title: "Tabungan ABDI SIMPLE",
          href: "/tabungan/tabungan-abdi-simple",
          desc: "Mulailah mengasah disiplin menabung sejak usia dini untuk meraih kehidupan finansial yang lebih baik"
        },
      ],
      deposito: [
        {
          title: "Deposito Berjangka",
          href: "/deposito/deposito-berjangka",
          desc: "Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh LPS"
        },
        {
          title: "Formulir Deposito",
          href: "/deposito/formulir-deposito",
          desc: "Ajukan Deposito dengan mengisi Formulir BANK ABDI"
        },
        {
          title: "Kalkulator Deposito",
          href: "/deposito/kalkulator-deposito",
          desc: "Ketahui suku bunga deposito BANK ABDI dengan Kalkulator BANK ABDI"
        },
      ],
      informasi: [
        {
          title: "Suku Bunga",
          href: "/informasi/suku-bunga",
          desc: "BANK ABDI menawarkan tabungan dengan suku bunga menarik"
        },
        {
          title: "Blog",
          href: "/informasi/blog",
          desc: "Dapatkan informasi terkini melalui Blog Bank ABDI"
        },
        {
          title: "Laporan",
          href: "/laporan/2021",
          desc: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas"
        },
      ],
    };

    return submenuMap[menu] || [];
  };

  const renderMobileSubmenu = (menu: MenuType) => {
    const items = getSubmenuContent(menu);
    let leftItems, rightItems;
    
    if (menu === 'pinjaman') {
      leftItems = items.slice(0, 4);
      rightItems = items.slice(4);
    } else {
      const midPoint = Math.ceil(items.length / 2);
      leftItems = items.slice(0, midPoint);
      rightItems = items.slice(midPoint);
    }

    return (
      <div className="grid grid-cols-2 gap-2 px-2">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2 capitalize col-span-2">
          {menu}
          <Image
            src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
            width={16}
            height={16}
            alt="arrow right"
          />
        </h2>
        
        {/* Left Column */}
        <div className="space-y-2">
          {leftItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="rounded-lg p-3 hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 text-base line-clamp-2">{item.title}</span>
                  <Image
                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                    width={16}
                    height={16}
                    alt="arrow right"
                    className="flex-shrink-0"
                  />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-2">
          {rightItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="rounded-lg p-3 hover:bg-blue-50 transition-colors duration-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900 text-sm line-clamp-2">{item.title}</span>
                  <Image
                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                    width={16}
                    height={16}
                    alt="arrow right"
                    className="flex-shrink-0"
                  />
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 h-[60px] transition-all duration-300 ${isTransparent ? "bg-transparent" : "bg-white shadow-md"}`}>
      <nav className="container mx-auto flex items-center justify-between font-sogeo text-base h-full">
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

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-800">
          {/* Produk Menu (New parent menu) */}
          <li className="relative group">
            <button className={`hover:text-blue-600 capitalize flex items-center ${isTransparent ? "text-white" : "text-gray-800"}`}>
              Produk
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* First level dropdown - Product Categories */}
            <div className="hidden group-hover:block absolute left-0 bg-white shadow-lg z-50 min-w-[200px]">
              <div className="p-2">
                {(['pinjaman', 'tabungan', 'deposito'] as ProductMenuType[]).map((category) => (
                  <div key={category} className="relative group/submenu">
                    <button className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 capitalize flex items-center justify-between">
                      <span>{category}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Second level dropdown - Product Items */}
                    <div className="hidden group-hover/submenu:block absolute left-full top-0 bg-white shadow-lg z-50 min-w-[600px]">
                      <div className="p-4">
                        {renderMobileSubmenu(category as MenuType)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
          
          {/* Informasi Menu */}
          <li className="relative group">
            <button className={`hover:text-blue-600 capitalize flex items-center ${isTransparent ? "text-white" : "text-gray-800"}`}>
              Informasi
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown */}
            <div className="hidden group-hover:block absolute left-0 bg-white shadow-lg z-50 min-w-[300px]">
              <div className="p-2">
                {getSubmenuContent('informasi').map((item, index) => (
                  <Link key={index} href={item.href}>
                    <div className="block px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <Image
                          src="https://bankabdi.co.id/img/icon/arrow_right.png"
                          width={16}
                          height={16}
                          alt="arrow right"
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </li>
          
          <li>
            <Link href="/about">
              <span className={`${isTransparent ? "text-white" : "text-gray-800"} hover:text-blue-600`}>
                Tentang Kami
              </span>
            </Link>
          </li>
          
          <li>
            <Link href="/contact">
              <span className={`${isTransparent ? "text-white" : "text-gray-800"} hover:text-blue-600`}>
                Hubungi Kami
              </span>
            </Link>
          </li>
        </ul>

        <button className={`${isTransparent ? "bg-white text-blue-800 hover:bg-gray-100" : "bg-[#003868] text-white hover:bg-blue-700"} px-4 py-2 rounded-full ml-auto text-xs font-sogeo`}>
          <Link href="/pinjaman/form-pengajuan-kredit">
            <span className={`${isTransparent ? "text-blue-800" : "text-white"} hover:text-blue-100`}>
              Pengajuan Kredit
            </span>
          </Link>
        </button>

        {/* Hamburger Menu */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className={isTransparent ? "text-white" : "text-gray-800"} size={24} />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-lg z-40 max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="container mx-auto py-4 space-y-4 flex flex-col items-center">
            {/* Produk Menu for Mobile */}
            <div className="w-full max-w-md">
              <button 
                className="w-full text-center py-2 text-gray-800 hover:text-blue-600 capitalize flex items-center justify-center gap-2" 
                onClick={() => handleMobileSubmenuToggle('produk')}
              >
                <span className="font-medium">Produk</span>
                {openMobileSubmenu === 'produk' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {openMobileSubmenu === 'produk' && (
                <div className="py-2 space-y-2">
                  {(['pinjaman', 'tabungan', 'deposito'] as ProductMenuType[]).map((category) => (
                    <div key={category} className="px-4">
                      <button 
                        className="w-full text-left py-2 text-gray-800 hover:text-blue-600 capitalize flex items-center justify-between" 
                        onClick={() => handleMobileProductSubmenuToggle(category)}
                      >
                        <span className="font-medium">{category}</span>
                        {openMobileProductSubmenu === category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      
                      {openMobileProductSubmenu === category && (
                        <div className="py-2 space-y-2">
                          {renderMobileSubmenu(category as MenuType)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Informasi Menu for Mobile */}
            <div className="w-full max-w-md">
              <button 
                className="w-full text-center py-2 text-gray-800 hover:text-blue-600 capitalize flex items-center justify-center gap-2" 
                onClick={() => handleMobileSubmenuToggle('informasi')}
              >
                <span className="font-medium">Informasi</span>
                {openMobileSubmenu === 'informasi' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              
              {openMobileSubmenu === 'informasi' && (
                <div className="py-2 space-y-2">
                  {renderMobileSubmenu('informasi')}
                </div>
              )}
            </div>
            
            <div className="flex flex-col items-center space-y-2 w-full max-w-md">
              <Link href="/about">
                <span className="block py-2 text-gray-800 hover:text-blue-600">Tentang Kami</span>
              </Link>
              <Link href="/contact">
                <span className="block py-2 text-gray-800 hover:text-blue-600">Hubungi Kami</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;