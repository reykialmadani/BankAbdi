import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';


const Header = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
<header className={`bg-white shadow-md top-0 left-0 w-full z-50 fixed h-[60px] ${isTransparent ? 'bg-transparent' : 'bg-white'}`}>


      <nav className="container mx-auto flex items-center justify-between font-sogeo text-sm h-full">
        
        {/* Logo pt */}
        <div className='mr-6'>
          <Link href="/" legacyBehavior>
            <a>
            {isTransparent ? (
              <Image src="https://bankabdi.co.id/img/logo/logo-white-abdi.svg" width={100} height={60} alt="Logo Abdi Bank" className="logo-transparent" />
            ) : (
              <Image src="https://bankabdi.co.id/img/logo/logo-color-abdi.svg" width={100} height={60} alt="Logo Abdi Bank" />
            )}

            </a>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-800 justify-start items-center">
          {['pinjaman', 'tabungan', 'deposito', 'informasi'].map((menu) => (
            <li key={menu} className="relative group">
              <button className="hover:text-blue-600 focus:outline-none capitalize">
                {menu} ⌄
              </button>

              {/* Dropdown Menu */}
              <ul className="absolute left-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-lg p-4 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                {menu === 'pinjaman' && (
                  <>
                    <li><Link href="/pinjaman/kredit-modal-kerja" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Modal Kerja</a></Link></li>
                    <li><Link href="/pinjaman/kredit-investasi" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Investasi</a></Link></li>
                    <li><Link href="/pinjaman/kredit-multiguna" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Multiguna</a></Link></li>
                    <li><Link href="/pinjaman/kredit-multiguna" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Kepemilikan Rumah</a></Link></li>
                    <li><Link href="/pinjaman/kredit-multiguna" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Kepemilikan Mobil</a></Link></li>
                    <li><Link href="/pinjaman/kredit-multiguna" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Kendaraan Bermotor</a></Link></li>
                    <li><Link href="/pinjaman/kredit-multiguna" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Tanpa Agunan</a></Link></li>
                  </>
                )}
                {menu === 'tabungan' && (
                  <>
                    <li><Link href="/tabungan/tabungan-abdi" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Tabungan ABDI</a></Link></li>
                    <li><Link href="/tabungan/tabungan-abdiku" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Tabungan ABDIKU</a></Link></li>
                    <li><Link href="/tabungan/tabungan-abdi-simpel" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Tabungan ABDI SIMPEL</a></Link></li>
                  </>
                )}
                {menu === 'deposito' && (
                  <>
                    <li><Link href="/deposito/deposito-berjangka" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Deposito Berjangka</a></Link></li>
                    <li><Link href="/deposito/formulir-deposito" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Formulir Deposito</a></Link></li>
                    <li><Link href="/deposito/kalkulator-deposito" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kalkulator Deposito</a></Link></li>
                  </>
                )}
                {menu === 'informasi' && (
                  <>
                    <li><Link href="/informasi/suku-bunga" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Suku Bunga</a></Link></li>
                    <li><Link href="/informasi/promo" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Blog</a></Link></li>
                    <li><Link href="/informasi/faq" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Laporan</a></Link></li>
                  </>
                )}
              </ul>
            </li>
          ))}

          <li><Link href="/tentang-kami" legacyBehavior><a className="hover:text-blue-600">Tentang Kami</a></Link></li>
          <li><Link href="/hubungi-kami" legacyBehavior><a className="hover:text-blue-600">Hubungi Kami</a></Link></li>
        </ul>

        {/* Button*/}
        <button className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-800 ml-auto font-sogeo">
          Pengajuan Kredit
        </button>
      </nav>
    </header>
  );
};

export default Header;
