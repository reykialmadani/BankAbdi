import { useState } from "react";
import Image from "next/image";

type TabType = "Pinjaman" | "Tabungan" | "Deposito";
type PinjamanType =
  | "KTA"
  | "KKB"
  | "KPM"
  | "KPR"
  | "Kredit Multiguna"
  | "Kredit Investasi"
  | "Kredit Modal Kerja";
type TabunganType = "Tabungan Abdi" | "Tabungan ABDIKU" | "Tabungan Simpel";

const DeviceSliderColumn = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Pinjaman");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const tabs: TabType[] = ["Pinjaman", "Tabungan", "Deposito"];

  const pinjamanItems: PinjamanType[] = [
    "KTA",
    "KKB",
    "KPM",
    "KPR",
    "Kredit Multiguna",
    "Kredit Investasi",
    "Kredit Modal Kerja",
  ];
  const tabunganItems: TabunganType[] = [
    "Tabungan Abdi",
    "Tabungan ABDIKU",
    "Tabungan Simpel",
  ];

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div
      className="relative flex flex-col items-center py-4 w-full bg-no-repeat"
      style={{
        backgroundImage: `url("https://bankabdi.co.id/img/home/bg-tab-section.webp")`,
        backgroundSize: "auto 400px",
        backgroundPosition: "center 100px",
      }}
    >
      <div className="flex overflow-x-auto space-x-6 mb-4 w-full px-4 md:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setOpenSection(null);
            }}
            className={`text-black text-lg px-6 py-2 transition-all duration-300 whitespace-nowrap ${
              activeTab === tab
                ? "border-b-4 border-black-100"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-4xl px-4">
        {activeTab === "Pinjaman" && (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto flex justify-center">
              <Image
                src="/assets/tab-pinjaman.png"
                width={400}
                height={533}
                className="rounded-lg shadow-md w-full md:w-auto max-w-[400px]"
                alt="Tabungan"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xl text-black mb-2 text-center md:text-left">
                Produk Pinjaman/Kredit
              </h3>
              {pinjamanItems.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 shadow-md mb-2 cursor-pointer w-full flex flex-col justify-center bg-white transition-all duration-300 ease-in-out ${
                    openSection === item 
                      ? "transform translate-y-0 scale-105 z-10 shadow-xl" 
                      : "transform translate-y-0 scale-100 z-0 hover:scale-102"
                  }`}
                  onClick={() => toggleSection(item)}
                >
                  <h6 className="text-lg text-black">{item}</h6>
                  {openSection === item && (
                    <div className="mt-2 transition-all duration-300 ease-in-out opacity-100">
                      <p className="text-sm text-black">
                        {item === "KTA" &&
                          "Penuhi berbagai macam kebutuhan Anda tanpa jaminan bersama BANK ABDI dengan Kredit Tanpa Agunan."}
                        {/* ... other conditions ... */}
                      </p>
                      <div className="flex justify-end">
                        <a
                          href={`/pinjaman/${item.toLowerCase().replace(/ /g, "-")}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:opacity-80 transition duration-300"
                        >
                          Selengkapnya ⮕
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar changes for Tabungan and Deposito sections */}
        {activeTab === "Tabungan" && (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto flex justify-center">
              <Image
                src="/assets/tabungan.png"
                width={400}
                height={366}
                className="rounded-lg shadow-md w-full md:w-auto max-w-[400px]"
                alt="Tabungan"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xl text-black mb-2 text-center md:text-left">
                Produk Tabungan
              </h3>
              {tabunganItems.map((item, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 shadow-md mb-2 cursor-pointer w-full flex flex-col justify-center bg-white transition-all duration-300 ease-in-out ${
                    openSection === item 
                      ? "transform translate-y-0 scale-105 z-10 shadow-xl" 
                      : "transform translate-y-0 scale-100 z-0 hover:scale-102"
                  }`}
                  onClick={() => toggleSection(item)}
                >
                  <h6 className="text-lg text-black">{item}</h6>
                  {openSection === item && (
                    <div className="mt-2 transition-all duration-300 ease-in-out opacity-100">
                      <p className="text-sm text-black">
                        {item === "Tabungan Abdi" &&
                          "Rencanakan masa depan Anda bersama Tabungan ABDI."}
                        {/* ... other conditions ... */}
                      </p>
                      <div className="flex justify-end">
                        <a
                          href={`/tabungan/${item.toLowerCase().replace(/ /g, "-")}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:opacity-80 transition duration-300"
                        >
                          Selengkapnya ⮕
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "Deposito" && (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto flex justify-center">
              <Image
                src="/assets/deposito.jpeg"
                width={400}
                height={366}
                className="rounded-lg shadow-md w-full md:w-auto max-w-[400px]"
                alt="Deposito"
              />
            </div>
            <div className="w-full">
              <h3 className="text-xl text-black mb-2 text-center md:text-left">
                Produk Deposito
              </h3>
              <div
                className={`border rounded-lg p-4 shadow-md mb-2 cursor-pointer w-full flex flex-col justify-center bg-white transition-all duration-300 ease-in-out ${
                  openSection === "Deposito" 
                    ? "transform translate-y-0 scale-105 z-10 shadow-xl" 
                    : "transform translate-y-0 scale-100 z-0 hover:scale-102"
                }`}
                onClick={() => toggleSection("Deposito")}
              >
                <h6 className="text-lg text-black">Deposito</h6>
                {openSection === "Deposito" && (
                  <div className="mt-2 transition-all duration-300 ease-in-out opacity-100">
                    <p className="text-sm text-black">
                      Dapatkan keuntungan dalam Berinvestasi secara Pasti.
                    </p>
                    <div className="flex justify-end">
                      <a
                        href="/deposito"
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md shadow-md hover:opacity-80 transition duration-300"
                      >
                        selengkapnya ⮕
                      </a>
                    </div>
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