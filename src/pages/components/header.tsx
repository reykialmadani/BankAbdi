import { useState } from "react";

const Header = () => {
    // State untuk setiap dropdown
    const [openDropdown, setOpenDropdown] = useState(null);

    // Fungsi untuk toggle dropdown
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <header className="bg-gray-800 p-4">
            <nav className="container mx-auto">
                <ul className="flex space-x-6 text-white">
                    
                    {/* Dropdown Pinjaman */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("pinjaman")} 
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Pinjaman ⌄
                        </button>
                        {openDropdown === "pinjaman" && (
                            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                                <li><a href="/Pinjaman/Kredit" className="block px-4 py-2 hover:bg-gray-200">Kredit</a></li>
                                <li><a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Angsuran</a></li>
                            </ul>
                        )}
                    </li>

                    {/* Dropdown Tabungan */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("tabungan")} 
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Tabungan ⌄
                        </button>
                        {openDropdown === "tabungan" && (
                            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                                <li><a href="/Tabungan/Simpanan" className="block px-4 py-2 hover:bg-gray-200">Simpanan</a></li>
                                <li><a href="/Tabungan/Investasi" className="block px-4 py-2 hover:bg-gray-200">Investasi</a></li>
                            </ul>
                        )}
                    </li>

                    {/* Dropdown Deposito */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("deposito")} 
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Deposito ⌄
                        </button>
                        {openDropdown === "deposito" && (
                            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                                <li><a href="/Deposito/1Tahun" className="block px-4 py-2 hover:bg-gray-200">1 Tahun</a></li>
                                <li><a href="/Deposito/5Tahun" className="block px-4 py-2 hover:bg-gray-200">5 Tahun</a></li>
                            </ul>
                        )}
                    </li>

                    {/* Dropdown Informasi */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("informasi")} 
                            className="hover:text-gray-300 focus:outline-none"
                        >
                            Informasi ⌄
                        </button>
                        {openDropdown === "informasi" && (
                            <ul className="absolute left-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-lg">
                                <li><a href="/Informasi/Berita" className="block px-4 py-2 hover:bg-gray-200">Berita</a></li>
                                <li><a href="/Informasi/Promo" className="block px-4 py-2 hover:bg-gray-200">Promo</a></li>
                            </ul>
                        )}
                    </li>

                    {/* Tentang Kami (Tanpa Dropdown) */}
                    <li><a href="/Tentang-Kami" className="hover:text-gray-300">Tentang Kami</a></li>

                    {/* Hubungi Kami (Tanpa Dropdown) */}
                    <li><a href="/Hubungi-Kami" className="hover:text-gray-300">Hubungi Kami</a></li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;
