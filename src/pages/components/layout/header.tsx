import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsTransparent(window.scrollY === 0);
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`top-0 left-0 w-full z-50 fixed h-[60px] transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between font-sogeo text-sm h-full">
        {/* Logo pt */}
        <div className="mr-6">
          <Link href="/" legacyBehavior>
            <a>
              {isTransparent ? (
                <Image
                  src="https://bankabdi.co.id/img/logo/logo-white-abdi.svg"
                  width={100}
                  height={60}
                  alt="Logo Abdi Bank"
                  className="logo-transparent"
                />
              ) : (
                <Image
                  src="https://bankabdi.co.id/img/logo/logo-color-abdi.svg"
                  width={100}
                  height={60}
                  alt="Logo Abdi Bank"
                />
              )}
            </a>
          </Link>
        </div>

        {/* Navigation */}
        <ul className="flex space-x-6 text-gray-800 justify-start items-center">
          {['pinjaman', 'tabungan', 'deposito', 'informasi'].map((menu) => (
            <li key={menu} className="relative group">
              <button className={`hover:text-blue-600 focus:outline-none capitalize flex items-center ${
                isTransparent ? 'text-white' : 'text-gray-800'
              }`}>
                {menu} <span className="ml-1">▼</span>
              </button>

              {/* Dropdown Menu */}
              <ul className={`absolute left-0 mt-2 ${menu === 'pinjaman' ? 'w-[800px]' : 'w-64'} bg-white text-gray-800 shadow-lg rounded-lg p-4 z-50 hidden group-hover:block transition-all duration-200 ease-in-out transform translate-y-2 group-hover:translate-y-0`}>
                {menu === 'pinjaman' && (
                  <>
                    <li className="border-b border-gray-100 pb-2 mb-2">
                      <h2 className="font-semibold text-gray-900">PINJAMAN</h2>
                    </li>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Kolom Kiri */}
                      <div>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-modal-kerja" legacyBehavior>
                            <a className="block px-4 py-3">
                              <span className="font-medium text-gray-900">Kredit Modal Kerja</span>
                              <p className="text-sm text-gray-600 mt-1">
                                Kami hadir untuk memberikan kemudahan dalam pembiayaan
                                kebutuhan modal kerja anda
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-investasi" legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-100">
                              <span className="font-medium text-gray-900">Kredit Investasi</span>
                              <p className="text-sm text-gray-600">
                                Nikmati pembiayaan untuk kebutuhan perluasan bisnis anda
                                dalam jangka waktu yang panjang
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-multiguna" legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-100">
                              <span className="font-medium text-gray-900">Kredit Multiguna</span>
                              <p className="text-sm text-gray-600">
                                Nikmati fasilitas pinjaman untuk segala kebutuhan anda
                              </p>
                            </a>
                          </Link>
                        </li>
                      </div>
                      
                      {/* Kolom Kanan */}
                      <div>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-kepemilikan-rumah" legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-100">
                              <span className="font-medium text-gray-900">Kredit Kepemilikan Rumah</span>
                              <p className="text-sm text-gray-600">
                                Makin mudah wujudkan hunian idaman dengan jangka waktu
                                fleksibel
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-kepemilikan-mobil" legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-100">
                              <span className="font-medium text-gray-900">Kredit Kepemilikan Mobil</span>
                              <p className="text-sm text-gray-600">
                                Jalan mudah untuk memiliki mobil idaman baru atau bekas
                                dengan bunga ringan
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-kendaraan-bermotor" legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-100">
                              <span className="font-medium text-gray-900">Kredit Kendaraan Bermotor</span>
                              <p className="text-sm text-gray-600">
                                Dapatkan bunga ringan untuk mewujudkan motor impian anda
                              </p>
                            </a>
                          </Link>
                        </li>
                        <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                          <Link href="/pinjaman/kredit-tanpa-agunan" legacyBehavior>
                            <a className="block px-4 py-2 hover:bg-gray-100">
                              <span className="font-medium text-gray-900">Kredit Tanpa Agunan</span>
                              <p className="text-sm text-gray-600">
                                Memberikan kemudahan dan keuntungan dalam memenuhi berbagai
                                keperluan hidup anda
                              </p>
                            </a>
                          </Link>
                        </li>
                      </div>
                    </div>
                  </>
                )}

                {menu === 'tabungan' && (
                  <>
                    <li className="border-b border-gray-100 pb-2 mb-2">
                      <h2 className="font-semibold text-gray-900">TABUNGAN</h2>
                    </li>
                    <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <Link href="/tabungan/tabungan-abdi" legacyBehavior>
                        <a className="block px-4 py-3">
                          <span className="font-medium text-gray-900">Tabungan ABDI</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Raih keuntungan dengan suku bunga kompetitif dan fleksibilitas
                            penarikan dana kapan saja
                          </p>
                        </a>
                      </Link>
                    </li>
                  </>
                )}

                {menu === 'deposito' && (
                  <>
                    <li className="border-b border-gray-100 pb-2 mb-2">
                      <h2 className="font-semibold text-gray-900">DEPOSITO</h2>
                    </li>
                    <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <Link href="/deposito/deposito-berjangka" legacyBehavior>
                        <a className="block px-4 py-3">
                          <span className="font-medium text-gray-900">Deposito Berjangka</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Pilihan Investasi yang memberikan Keuntungan dan rasa aman
                            karena dijamin oleh Lembaga Penjamin Simpanan (LPS) anda
                          </p>
                        </a>
                      </Link>
                    </li>
                  </>
                )}

                {menu === 'informasi' && (
                  <>
                    <li className="border-b border-gray-100 pb-2 mb-2">
                      <h2 className="font-semibold text-gray-900">INFORMASI</h2>
                    </li>
                    <li className="hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <Link href="/informasi/suku-bunga" legacyBehavior>
                        <a className="block px-4 py-3">
                          <span className="font-medium text-gray-900">Suku Bunga</span>
                          <p className="text-sm text-gray-600 mt-1">
                            BANK ABDI menawarkan tabungan dengan suku bunga menarik
                          </p>
                        </a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          ))}

          {/* Navigation Links */}
          <li>
            <Link href="/tentang-kami" legacyBehavior>
              <a className={`hover:text-blue-600 ${
                isTransparent ? 'text-white' : 'text-gray-800'
              }`}>
                Tentang Kami
              </a>
            </Link>
          </li>
          <li>
            <Link href="/hubungi-kami" legacyBehavior>
              <a className={`hover:text-blue-600 ${
                isTransparent ? 'text-white' : 'text-gray-800'
              }`}>
                Hubungi Kami
              </a>
            </Link>
          </li>
        </ul>

        {/* Button */}
        <button className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors ml-auto font-sogeo">
          Pengajuan Kredit
        </button>
      </nav>
    </header>
  );
};

export default Header;