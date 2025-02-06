import { useState } from "react";


const Header = () => {
    // State untuk setiap dropdown
    const [openDropdown, setOpenDropdown] = useState(null);
    // Fungsi untuk toggle dropdown
    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    return (
        <header className="bg-white p-4">
            <nav className="container mx-auto">
                <ul className="flex space-x-6 text-black">
                    
                    {/* Dropdown Pinjaman */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("pinjaman")} 
                            className="hover:text-black-300 focus:outline-none"
                        >
                            Pinjaman ⌄
                        </button>
                        {openDropdown === "pinjaman" && (
                            <ul className="absolute left-0 mt-2 w-screen bg-white text-gray-800 shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4">
                                
                                <button className="left-0 w-full text-left text-black-600 hover:text-gray-900">
                                <h2>PINJAMAN</h2>
                                </button>

                                <li>
                                    <a href="/Pinjaman/Kredit" className="block px-4 py-2 hover:bg-gray-200">Kredit Modal Kerja
                                    <p className="text-sm text-gray-600">Kami hadir untuk memberikan kemudahan dalam pembiayaan kebutuhan modal kerja anda</p></a>
                                    
                                </li>
                                <li>
                                    <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kredit Investasi
                                    <p className="text-sm text-gray-600">Nikmati pembiayaan untuk kebutuhan perluasan bisnis anda dalam jangka waktu yang panjang</p></a>
                                    
                                </li>
                                <li>
                                    <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kredit Multiguna
                                    <p className="text-sm text-gray-600">Nikmati fasilitas pinjaman untuk segala kebutuhan anda</p></a>
                                    
                                </li>
                                <li>
                                    <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kredit Kepemilikan Rumah
                                    <p className="text-sm text-gray-600">Makin mudah wujudkan hunian idaman dengan jangka waktu fleksibel</p></a>
                                    
                                </li>
                                <li>
                                    <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kredit Kepemilikan Mobil
                                    <p className="text-sm text-gray-600">Jalan mudah untuk memiliki mobil idaman baru atau bekas dengan bunga ringan</p></a>
                                    
                                </li>
                                <li>
                                    <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kredit Kendaraan Bermotor
                                    <p className="text-sm text-gray-600">Dapatkan bunga ringan untuk mewujudkan motor impian anda</p></a>
                                    
                                </li>
                                <li>
                                    <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kredit Tanpa Agunan
                                    <p className="text-sm text-gray-600">Memberikan kemudahan dan keuntungan dalam memenuhi berbagai keperluan hidup anda</p></a>
                                    
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Dropdown Tabungan */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("tabungan")} 
                            className="hover:text-black-300 focus:outline-none"
                        >
                            Tabungan ⌄
                        </button>
                        {openDropdown === "tabungan" && (
                            <ul className="absolute left-0 mt-2 w-screen bg-white text-gray-800 shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4">
                                
                            <button className="left-0 w-full text-left text-black-600 hover:text-gray-900">
                            <h2>TABUNGAN</h2>
                            </button>

                            <li>
                                <a href="/Pinjaman/Kredit" className="block px-4 py-2 hover:bg-gray-200">Tabungan Abdi
                                <p className="text-sm text-gray-600">Raih keuntungan dengan suku bunga kompetitif dan fleksibilitas penarikan dana kapan saja</p></a>
                                
                            </li>
                            <li>
                                <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Tabungan Abdi-Ku
                                <p className="text-sm text-gray-600">Lebih hemat dengan menabung tanpa biaya administrasi bulanan yang mengikat</p></a>
                                
                            </li>
                            <li>
                                <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Tabungan Abdi-Simple
                                <p className="text-sm text-gray-600">Mulailah mengasah disiplin menabung sejak usia dini untuk meraih kehidupan finansial yang lebih baik</p></a>
                            </li>
                        </ul>
                        )}
                    </li>

                    {/* Dropdown Deposito */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("deposito")} 
                            className="hover:text-black-300 focus:outline-none"
                        >
                            Deposito ⌄
                        </button>
                        {openDropdown === "deposito" && (
                            <ul className="absolute full-0 mt-2 w-screen bg-white text-gray-800 shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4">
                                
                            <button className="left-0 w-full text-left text-black-600 hover:text-gray-900">
                            <h2>TABUNGAN</h2>
                            </button>

                            <li>
                                <a href="/Pinjaman/Kredit" className="block px-4 py-2 hover:bg-gray-200">Deposito Berjangka
                                <p className="text-sm text-gray-600">Pilihan Investasi yang memberikan Keuntungan dan rasa aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS) anda</p></a>
                                
                            </li>
                            <li>
                                <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Folmulir Deposito
                                <p className="text-sm text-gray-600">Ajukan Deposito dengan mengisi Formulir BANK ABDI</p></a>
                                
                            </li>
                            <li>
                                <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Kalkulator Deposito
                                <p className="text-sm text-gray-600">Ketahui suku bunga deposito BANK ABDI dengan Kalkulator BANK ABDI</p></a>
                            </li>
                        </ul>
                        )}
                    </li>

                    {/* Dropdown Informasi */}
                    <li className="relative">
                        <button 
                            onClick={() => toggleDropdown("informasi")} 
                            className="hover:text-black-300 focus:outline-none"
                        >
                            Informasi ⌄
                        </button>
                        {openDropdown === "informasi" && (
                           <ul className="absolute full-0 mt-2 w-screen bg-white text-gray-800 shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4">
                                
                           <button className="left-0 w-full text-left text-black-600 hover:text-gray-900">
                           <h2>TABUNGAN</h2>
                           </button>

                           <li>
                               <a href="/Pinjaman/Kredit" className="block px-4 py-2 hover:bg-gray-200">Suku Bunga
                               <p className="text-sm text-gray-600">BANK ABDI menawarkan tabungan dengan suku bunga menarik</p></a>
                               
                           </li>
                           <li>
                               <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Blog
                               <p className="text-sm text-gray-600">Dapatkan informasi terkini melalui Blog BANK ABDI</p></a>
                               
                           </li>
                           <li>
                               <a href="/Pinjaman/Angsuran" className="block px-4 py-2 hover:bg-gray-200">Laporan
                               <p className="text-sm text-gray-600">Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan pencapaian yang telah diperoleh selama setahun berjalan</p></a>
                           </li>
                       </ul>
                        )}
                    </li>

                    {/* Tentang Kami (Tanpa Dropdown) */}
                    <li><a href="/Tentang-Kami" className="hover:text-white-300">Tentang Kami</a></li>

                    {/* Hubungi Kami (Tanpa Dropdown) */}
                    <li><a href="/Hubungi-Kami" className="hover:text-black-300">Hubungi Kami</a></li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;
