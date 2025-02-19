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
;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsTransparent(window.scrollY === 0);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle mobile submenu toggle
  const handleMobileSubmenuToggle = (menu: MenuType) => {
    setOpenMobileSubmenu(openMobileSubmenu === menu ? null : menu);
  };

  // Getting submenu content based on menu type
  const getSubmenuContent = (menu: MenuType): MenuItem[] => {
    const submenuMap = {
      pinjaman: [
        {
          title: "Kredit Modal Kerja",
          href: "/pinjaman/kredit-modal-kerja",
          desc: "Kami hadir untuk memberikan kemudahan dalam pembiayaan kebutuhan modal kerja anda",
        },
        {
          title: "Kredit Investasi",
          href: "/pinjaman/kredit-investasi",
          desc: "Nikmati pembiayaan untuk kebutuhan perluasan bisnis anda dalam jangka waktu yang panjang",
        },
        {
          title: "Kredit Multiguna",
          href: "/pinjaman/kredit-multiguna",
          desc: "Nikmati fasilitas pinjaman untuk segala kebutuhan anda",
        },
        {
          title: "Kredit Kepemilikan Rumah",
          href: "/pinjaman/kredit-kepemilikan-rumah",
          desc: "Makin mudah wujudkan hunian idaman dengan jangka waktu fleksibel",
        },
        {
          title: "Kredit Kepemilikan Mobil",
          href: "/pinjaman/kredit-kepemilikan-mobil",
          desc: "Jalan mudah untuk memiliki mobil idaman baru atau bekas dengan bunga ringan",
        },
        {
          title: "Kredit Kendaraan Bermotor",
          href: "/pinjaman/kredit-kendaraan-bermotor",
          desc: "Dapatkan bunga ringan untuk mewujudkan motor impian anda",
        },
        {
          title: "Kredit Tanpa Agunan",
          href: "/pinjaman/kredit-tanpa-agunan",
          desc: "Memberikan kemudahan dan keuntungan dalam memenuhi berbagai keperluan hidup anda",
        },
      ],
      tabungan: [
        {
          title: "Tabungan ABDI",
          href: "/tabungan/tabungan-abdi",
          desc: "Raih keuntungan dengan suku bunga kompetitif dan fleksibilitas penarikan dana kapan saja",
        },
        {
          title: "Tabungan Abdiku",
          href: "/tabungan/tabungan-abdiku",
          desc: "Lebih hemat dengan menabung tanpa biaya administrasi bulanan yang mengikat anda",
        },
        {
          title: "Tabungan ABDI SIMPLE",
          href: "/tabungan/tabungan-abdi-simple",
          desc: "Mulailah mengasah disiplin menabung sejak usia dini untuk meraih kehidupan finansial yang lebih baik",
        },
      ],
      deposito: [
        {
          title: "Deposito Berjangka",
          href: "/deposito/deposito-berjangka",
          desc: "Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh LPS",
        },
        {
          title: "Formulir Deposito",
          href: "/deposito/formulir-deposito",
          desc: "Ajukan Deposito dengan mengisi Formulir BANK ABDI",
        },
        {
          title: "Kalkulator Deposito",
          href: "/deposito/kalkulator-deposito",
          desc: "Ketahui suku bunga deposito BANK ABDI dengan Kalkulator BANK ABDI",
        },
      ],
      informasi: [
        {
          title: "Suku Bunga",
          href: "/informasi/suku-bunga",
          desc: "BANK ABDI menawarkan tabungan dengan suku bunga menarik",
        },
        {
          title: "Blog",
          href: "/informasi/blog",
          desc: "Dapatkan informasi terkini melalui Blog Bank ABDI",
        },
        {
          title: "Laporan",
          href: "/informasi/laporan",
          desc: "Laporan tahunan BANK ABDI yang berisi tentang aktivitas",
        },
      ],
    };
    return submenuMap[menu] || [];
  };

  if (!mounted) return null;

  return (
    <header
      className={`top-0 left-0 w-full z-50 fixed h-[60px] transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-white shadow-md"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between font-sogeo text-sm h-full">
        <div className="mr-6 pl-4">
          <Link href="/" legacyBehavior>
            <a>
              {isTransparent ? (
                <Image
                  src="https://bankabdi.co.id/img/logo/logo-white-abdi.svg"
                  width={172.44}
                  height={40}
                  alt="Logo Abdi Bank"
                  className="logo-transparent"
                />
              ) : (
                <Image
                  src="https://bankabdi.co.id/img/logo/logo-color-abdi.svg"
                  width={172.44}
                  height={40}
                  alt="Logo Abdi Bank"
                />
              )}
            </a>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-800 justify-start items-center">
          {["pinjaman", "tabungan", "deposito", "informasi"].map((menu) => (
            <li key={menu} className="relative group">
              <button
                className={`hover:text-blue-600 focus:outline-none capitalize flex items-center ${
                  isTransparent ? "text-white" : "text-gray-800"
                }`}
              >
                {menu}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menus */}
              <div className="hidden group-hover:block fixed left-0 right-0 bg-white shadow-lg z-50">
                <div className="container mx-auto">
                  {menu === "pinjaman" && (
                    <div className="w-[800px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                          PINJAMAN
                          <Image
                            src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
                            width={16}
                            height={16}
                            alt="arrow right"
                          />
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-modal-kerja"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Modal Kerja
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Kami hadir untuk memberikan kemudahan dalam
                                  pembiayaan kebutuhan modal kerja anda
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-investasi"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Investasi
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Nikmati pembiayaan untuk kebutuhan perluasan
                                  bisnis anda dalam jangka waktu yang panjang
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-multiguna"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Multiguna
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Nikmati fasilitas pinjaman untuk segala
                                  kebutuhan anda
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-kepemilikan-rumah"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Kepemilikan Rumah
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Makin mudah wujudkan hunian idaman dengan
                                  jangka waktu fleksibel
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-kepemilikan-mobil"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Kepemilikan Mobil
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Jalan mudah untuk memiliki mobil idaman baru
                                  atau bekas dengan bunga ringan
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-kendaraan-bermotor"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Kendaraan Bermotor
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Dapatkan bunga ringan untuk mewujudkan motor
                                  impian anda
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/pinjaman/kredit-tanpa-agunan"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kredit Tanpa Agunan
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Memberikan kemudahan dan keuntungan dalam
                                  memenuhi berbagai keperluan hidup anda
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {menu === "tabungan" && (
                    <div className="w-[800px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                          TABUNGAN
                          <Image
                            src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
                            width={16}
                            height={16}
                            alt="arrow right"
                          />
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link href="/tabungan/tabungan-abdi" legacyBehavior>
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Tabungan ABDI
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Raih keuntungan dengan suku bunga kompetitif
                                  dan fleksibilitas penarikan dana kapan saja
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/tabungan/tabungan-abdiku"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Tabungan Abdiku
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Lebih hemat dengan menabung tanpa biaya
                                  administrasi bulanan yang mengikat anda
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/tabungan/tabungan-abdi-simple"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Tabungan ABDI SIMPLE
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Mulailah mengasah disiplin menabung sejak usia
                                  dini untuk meraih kehidupan finansial yang
                                  lebih baik
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {menu === "deposito" && (
                    <div className="w-[800px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                          DEPOSITO
                          <Image
                            src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
                            width={16}
                            height={16}
                            alt="arrow right"
                          />
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/deposito/deposito-berjangka"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Deposito Berjangka
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Pilihan Investasi yang memberikan Keuntungan
                                  dan rasa aman karena dijamin oleh Lembaga
                                  Penjamin Simpanan (LPS)
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/deposito/formulir-deposito"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Formulir Deposito
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Ajukan Deposito dengan mengisi Formulir BANK
                                  ABDI
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link
                              href="/deposito/kalkulator-deposito"
                              legacyBehavior
                            >
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Kalkulator Deposito
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Ketahui suku bunga deposito BANK ABDI dengan
                                  Kalkulator BANK ABDI
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {menu === "informasi" && (
                    <div className="w-[800px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                          INFORMASI
                          <Image
                            src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
                            width={16}
                            height={16}
                            alt="arrow right"
                          />
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link href="/informasi/suku-bunga" legacyBehavior>
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Suku Bunga
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  BANK ABDI menawarkan tabungan dengan suku
                                  bunga menarik
                                </p>
                              </a>
                            </Link>
                          </div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link href="/informasi/blog" legacyBehavior>
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Blog
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  Dapatkan informasi terkini melalui Blog Bank
                                  ABDI
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link href="/laporan/2021" legacyBehavior>
                              <a className="block px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-gray-900">
                                    Laporan
                                  </span>
                                  <Image
                                    src="https://bankabdi.co.id/img/icon/arrow_right.png"
                                    width={16}
                                    height={16}
                                    alt="arrow right"
                                  />
                                </div>
                                <p className="text-sm text-gray-600">
                                  Laporan tahunan BANK ABDI yang berisi tentang
                                  aktivitas
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}

          {/* Additional Links */}
          <li>
            <Link href="/about" legacyBehavior>
              <a
                className={`hover:text-blue-600 ${
                  isTransparent ? "text-white" : "text-gray-800"
                }`}
              >
                Tentang Kami
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contact" legacyBehavior>
              <a
                className={`hover:text-blue-600 ${
                  isTransparent ? "text-white" : "text-gray-800"
                }`}
              >
                Hubungi Kami
              </a>
            </Link>
          </li>
        </ul>

        <button className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors ml-auto mr-6 font-sogeo">
          <Link href="pinjaman/form-pengajuan-kredit" legacyBehavior>
            <a className="text-white hover:text-blue-100">Pengajuan Kredit</a>
          </Link>
        </button>

        {/* Hamburger Menu Button (visible on mobile) */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu
            className={isTransparent ? "text-white" : "text-gray-800"}
            size={24}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-lg z-40 max-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="container mx-auto py-4">
            <ul className="space-y-4 px-6">
              {(
                ["pinjaman", "tabungan", "deposito", "informasi"] as MenuType[]
              ).map((menu) => (
                <li key={menu} className="w-full">
                  <div className="border-b border-gray-100">
                    <button
                      className="w-full text-left py-2 text-gray-800 hover:text-blue-600 capitalize flex items-center justify-between"
                      onClick={() => handleMobileSubmenuToggle(menu)}
                    >
                      <span className="font-medium">{menu}</span>
                      {openMobileSubmenu === menu ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {/* Mobile Submenu */}
                    {openMobileSubmenu === menu && (
                      <div className="py-2 space-y-2">
                        {getSubmenuContent(menu).map(
                          (item: MenuItem, index: number) => (
                            <Link key={index} href={item.href} legacyBehavior>
                              <a className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded">
                                <span className="font-medium text-gray-800 block">
                                  {item.title}
                                </span>
                                <span className="text-sm mt-1">
                                  {item.desc}
                                </span>
                              </a>
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}

              <li className="border-b border-gray-100">
                <Link href="/about" legacyBehavior>
                  <a className="block py-2 text-gray-800 hover:text-blue-600">
                    Tentang Kami
                  </a>
                </Link>
              </li>
              <li className="border-b border-gray-100">
                <Link href="/contact" legacyBehavior>
                  <a className="block py-2 text-gray-800 hover:text-blue-600">
                    Hubungi Kami
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
