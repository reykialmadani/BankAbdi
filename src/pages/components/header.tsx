import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-start font-sogeo text-sm">
        {/* Logo */}
        <div className='mr-6'>
          <Link href="/" legacyBehavior>
            <a>
              <Image src= "/assets/logoabdibank.png" width={50} height={50}/>
            </a>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-800">
          {['pinjaman', 'tabungan', 'deposito'].map((menu) => (
            <li key={menu} className="relative">
              <button onClick={() => toggleDropdown(menu)} className="hover:text-blue-600 focus:outline-none capitalize">
                {menu} ⌄
              </button>
              
              {openDropdown === menu && (
                <ul className="absolute left-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-lg p-4">
                  {menu === 'pinjaman' && (
                    <>
                      <li><Link href="/pinjaman/kredit-modal-kerja" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Modal Kerja</a></Link></li>
                      <li><Link href="/pinjaman/kredit-investasi" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Investasi</a></Link></li>
                      <li><Link href="/pinjaman/kredit-multiguna" legacyBehavior><a className="block px-4 py-2 hover:bg-gray-100">Kredit Multiguna</a></Link></li>
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
                </ul>
              )}
            </li>
          ))}

          <li><Link href="/tentang-kami" legacyBehavior><a className="hover:text-blue-600">Tentang Kami</a></Link></li>
          <li><Link href="/hubungi-kami" legacyBehavior><a className="hover:text-blue-600">Hubungi Kami</a></Link></li>
        </ul>

        {/* Button Pengajuan Kredit */}
        <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-800 ml-auto font-sogeo">
          Pengajuan Kredit
        </button>
      </nav>
    </header>
  );
};

export default Header;