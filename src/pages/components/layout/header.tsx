import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [mounted, setMounted] = useState(false);

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

        <ul className="flex space-x-6 text-gray-800 justify-start items-center">
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
                                <span className="font-medium text-gray-900">
                                  Kredit Investasi
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Kredit Multiguna
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Kredit Kepemilikan Rumah
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Kredit Kepemilikan Mobil
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Kredit Kendaraan Bermotor
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Kredit Tanpa Agunan
                                </span>
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
                    <div className="w-[500px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900">
                          TABUNGAN
                        </h2>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                            <Link href="/tabungan/tabungan-abdi" legacyBehavior>
                              <a className="block px-4 py-3">
                                <span className="font-medium text-gray-900">
                                  Tabungan ABDI
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Tabungan Abdiku
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Tabungan ABDI SIMPLE
                                </span>
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
                    <div className="w-[500px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900">
                          DEPOSITO
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
                                <span className="font-medium text-gray-900">
                                  Deposito Berjangka
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Formulir Deposito
                                </span>
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
                                <span className="font-medium text-gray-900">
                                  Kalkulator Deposito
                                </span>
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
                    <div className="w-[500px] p-4">
                      <div className="border-b border-gray-100 pb-2 mb-2">
                        <h2 className="font-semibold text-gray-900">
                          INFORMASI
                        </h2>
                      </div>
                      <div className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                        <Link href="/informasi/suku-bunga" legacyBehavior>
                          <a className="block px-4 py-3">
                            <span className="font-medium text-gray-900">
                              Suku Bunga
                            </span>
                            <p className="text-sm text-gray-600 mt-1">
                              BANK ABDI menawarkan tabungan dengan suku bunga
                              menarik
                            </p>
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}

          {/* Navigation Links */}
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

        {/* Button */}
        <button className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors ml-auto mr-6 font-sogeo">
          Pengajuan Kredit
        </button>
      </nav>
    </header>
  );
};

export default Header;
