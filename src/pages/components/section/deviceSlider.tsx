import { useState } from "react";
import Image from "next/image";

type TabType = "Pinjaman" | "Tabungan" | "Deposito";
type PinjamanType = "KTA" | "KKB" | "KPM" | "KPR" | "Kredit Multiguna" | "Kredit Investasi" | "Kredit Modal Kerja";
type TabunganType = "Tabungan Abdi" | "Tabungan ABDIKU" | "Tabungan Simpel";

const DeviceSliderColumn = () => {
    const [activeTab, setActiveTab] = useState<TabType>("Pinjaman");
    const [openSection, setOpenSection] = useState<string | null>(null);

    const tabs: TabType[] = ["Pinjaman", "Tabungan", "Deposito"];
    
    const pinjamanItems: PinjamanType[] = ["KTA", "KKB", "KPM", "KPR", "Kredit Multiguna", "Kredit Investasi", "Kredit Modal Kerja"];
    const tabunganItems: TabunganType[] = ["Tabungan Abdi", "Tabungan ABDIKU", "Tabungan Simpel"];

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="relative flex flex-col items-center py-4 bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg-accordion.png')" }}>
            <div className="flex space-x-6 mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab);
                            setOpenSection(null); 
                        }}
                        className={`text-black text-lg px-6 py-2 transition-all duration-300 ${
                            activeTab === tab ? "border-b-4 border-black-100" : "opacity-60 hover:opacity-100"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-xl">
                {activeTab === "Pinjaman" && (
                    <div className="flex flex-row items-start space-x-6">
                        <div className="flex-shrink-0">
                            <Image src="/assets/tab-pinjaman.png" width={200} height={500} className="rounded-lg shadow-md" alt="Tabungan"/>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl text-black font-bold mb-2">Produk Pinjaman/Kredit</h3>
                            {pinjamanItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 shadow-md mb-2 cursor-pointer"
                                    onClick={() => toggleSection(item)}
                                >
                                    <h6 className="text-lg text-black font-semibold">{item}</h6>
                                    {openSection === item && (
                                        <div className="mt-2">
                                            <p className="text-sm text-black">
                                                {item === "KTA" && "Penuhi berbagai macam kebutuhan Anda tanpa jaminan bersama BANK ABDI dengan Kredit Tanpa Agunan."}
                                                {item === "KKB" && "Raih Kendaraan Bermotor impian Anda bersama BANK ABDI dengan Kredit Kendaraan Bermotor."}
                                                {item === "KPM" && "Miliki Mobil Impian Anda bersama BANK ABDI dengan Kredit Kepemilikan Mobil."}
                                                {item === "KPR" && "Wujudkan rumah idaman Anda bersama BANK ABDI dengan Kredit Kepemilikan Rumah."}
                                                {item === "Kredit Multiguna" && "Penuhi segala kebutuhan Anda bersama BANK ABDI dengan Kredit Multiguna."}
                                                {item === "Kredit Investasi" && "Kembangkan dan perluas bisnis Anda bersama BANK ABDI dengan Kredit Investasi."}
                                                {item === "Kredit Modal Kerja" && "Mulai usaha Anda bersama BANK ABDI dengan Kredit Modal Kerja."}
                                            </p>
                                            <a 
                                                href={`/pinjaman/${item.toLowerCase().replace(/ /g, '-')}`} 
                                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:opacity-80 transition duration-300 block mt-2 text-center"
                                            >
                                                Selengkapnya -
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "Tabungan" && (
                    <div className="flex flex-row items-start space-x-6">
                        <div className="flex-shrink-0">
                            <Image src="/assets/tab-pinjaman.png" width={200} height={200} className="rounded-lg shadow-md" alt="Tabungan"/>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl text-black font-bold mb-2">Produk Tabungan</h3>
                            {tabunganItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-lg p-4 shadow-md mb-2 cursor-pointer"
                                    onClick={() => toggleSection(item)}
                                >
                                    <h6 className="text-lg text-black font-semibold">{item}</h6>
                                    {openSection === item && (
                                        <div className="mt-2">
                                            <p className="text-sm text-black">
                                                {item === "Tabungan Abdi" && "Rencanakan masa depan Anda bersama Tabungan ABDI."}
                                                {item === "Tabungan ABDIKU" && "Nikmati kemudahan menabung tanpa biaya administrasi bulanan."}
                                                {item === "Tabungan Simpel" && "Dorong budaya menabung sejak dini para pelajar dengan Tabungan ABDI Simpel."}
                                            </p>
                                            <a 
                                                href={`/tabungan/${item.toLowerCase().replace(/ /g, '-')}`} 
                                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:opacity-80 transition duration-300 block mt-2 text-center"
                                            >
                                                Selengkapnya -
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "Deposito" && (
                    <div className="flex flex-row items-start space-x-6">
                        <div className="flex-shrink-0">
                            <Image src="/assets/tab-pinjaman.png" width={200} height={200} className="rounded-lg shadow-md" alt="Deposito"/>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl text-black font-bold mb-2">Produk Deposito</h3>
                            <div
                                className="border rounded-lg p-4 shadow-md mb-2 cursor-pointer"
                                onClick={() => toggleSection("Deposito")}
                            >
                                <h6 className="text-lg text-black font-semibold">Deposito</h6>
                                {openSection === "Deposito" && (
                                    <div className="mt-2">
                                        <p className="text-sm text-black">
                                            Dapatkan keuntungan dalam Berinvestasi secara Pasti.
                                        </p>
                                        <a 
                                            href="/deposito" 
                                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:opacity-80 transition duration-300 block mt-2 text-center"
                                        >
                                            Selengkapnya -
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeviceSliderColumn;