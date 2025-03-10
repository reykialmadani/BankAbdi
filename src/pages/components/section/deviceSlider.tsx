import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

  const segoeUIStyles = {
    fontFamily: "'Segoe UI', sans-serif",
  };

  return (
    <div
      className="relative flex flex-col items-center py-4 w-full bg-no-repeat"
      style={{
        backgroundImage: `url("https://bankabdi.co.id/img/home/bg-tab-section.webp")`,
        backgroundSize: "auto 400px",
        backgroundPosition: "center 100px",
        ...segoeUIStyles,
      }}
    >
      {/* Modified tab container to ensure horizontal display */}
      <div className="flex w-full justify-center mb-4">
        <div className="grid grid-cols-3 w-full max-w-md">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenSection(null);
              }}
              className={`text-black text-sm sm:text-lg px-2 sm:px-6 py-2 transition-all duration-300 ${
                activeTab === tab
                  ? "border-b-4 border-black-100 font-semibold"
                  : "opacity-60 hover:opacity-100"
              }`}
              style={segoeUIStyles}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl px-4">
        {activeTab === "Pinjaman" && (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto flex justify-center">
              <motion.div
                key="image-pinjaman"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg shadow-md w-full md:w-auto max-w-[400px]"
              >
                <Image
                  src="/assets/tab-pinjaman.png"
                  width={400}
                  height={533}
                  alt="Tabungan"
                />
              </motion.div>
            </div>
            <div className="w-full">
              <h3
                className="text-xl font-semibold text-black mb-2 text-center md:text-left"
                style={segoeUIStyles}
              >
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
                  <div className="flex justify-between items-center">
                    <h6
                      className="font-semibold text-sm text-black"
                      style={segoeUIStyles}
                    >
                      {item}
                    </h6>
                    <span
                      className={`transition-transform duration-300 ${
                        openSection === item ? "rotate-180" : "rotate-0"
                      }`}
                      style={{ color: "#8E9BAE" }}
                      
                    >
                      ▼
                    </span>
                  </div>
                  {openSection === item && (
                    <div className="mt-2 transition-all duration-300 ease-in-out opacity-100">
                      <p className="text-sm text-black" style={segoeUIStyles}>
                        {item === "KTA" &&
                          "Penuhi berbagai macam kebutuhan Anda tanpa jaminan bersama BANK ABDI dengan Kredit Tanpa Agunan."}
                        {item === "KKB" &&
                          "Raih Kendaraan Bermotor impian Anda bersama BANK ABDI dengan Kredit Kendaraan Bermotor."}
                        {item === "KPM" &&
                          "Miliki Mobil Impian Anda bersama BANK ABDI dengan Kredit Kepemilikan Mobil."}
                        {item === "KPR" &&
                          "Wujudkan rumah idaman Anda bersama BANK ABDI dengan Kredit Kepemilikan Rumah."}
                        {item === "Kredit Multiguna" &&
                          "Penuhi segala kebutuhan Anda bersama BANK ABDI dengan Kredit Multiguna."}
                        {item === "Kredit Investasi" &&
                          "Kembangkan dan perluas bisnis Anda bersama BANK ABDI dengan Kredit Investasi."}
                        {item === "Kredit Modal Kerja" &&
                          "Mulai usaha Anda bersama BANK ABDI dengan Kredit Modal Kerja."}
                      </p>
                      <div className="flex justify-end">
                        <a
                          href={`/pinjaman/${item
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-[#003868] rounded-full shadow-md hover:opacity-80 transition duration-300"
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

        {activeTab === "Tabungan" && (
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-auto flex justify-center">
              <motion.div
                key="image-tabungan"
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="rounded-lg shadow-md w-full md:w-auto max-w-[400px]"
              >
                <Image
                  src="/assets/tabungan.png"
                  width={400}
                  height={366}
                  alt="Tabungan"
                />
              </motion.div>
            </div>
            <div className="w-full">
              <h3
                className="text-xl font-semibold text-black mb-2 text-center md:text-left"
                style={segoeUIStyles}
              >
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
                  <div className="flex justify-between items-center">
                    <h6
                      className="font-semibold text-sm text-black"
                      style={segoeUIStyles}
                    >
                      {item}
                    </h6>
                    <span
                      className={`transition-transform duration-300 ${
                        openSection === item ? "rotate-180" : "rotate-0"
                      }`}
                      style={{ color: "#8E9BAE" }}
                    >
                      ▼
                    </span>
                  </div>
                  {openSection === item && (
                    <div className="mt-2 transition-all duration-300 ease-in-out opacity-100">
                      <p className="text-sm text-black" style={segoeUIStyles}>
                        {item === "Tabungan Abdi" &&
                          "Rencanakan masa depan Anda bersama Tabungan ABDI."}
                        {item === "Tabungan ABDIKU" &&
                          "Nikmati kemudahan menabung tanpa biaya administrasi bulanan."}
                        {item === "Tabungan Simpel" &&
                          "Dorong budaya menabung sejak dini para pelajar dengan Tabungan ABDI Simpel."}
                      </p>
                      <div className="flex justify-end">
                        <a
                          href={`/tabungan/${item
                            .toLowerCase()
                            .replace(/ /g, "-")}`}
                          className="px-4 py-2 text-sm font-semibold text-white bg-[#003868] rounded-md shadow-md hover:opacity-80 transition duration-300"
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
              <motion.div
                key="image-deposito"
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="rounded-lg shadow-md w-full md:w-auto max-w-[400px]"
              >
                <Image
                  src="/assets/deposito.jpeg"
                  width={400}
                  height={366}
                  alt="Deposito"
                />
              </motion.div>
            </div>
            <div className="w-full">
              <h3
                className="text-xl font-semibold text-black mb-2 text-center md:text-left"
                style={segoeUIStyles}
              >
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
                <div className="flex justify-between items-center">
                  <h6
                    className="font-semibold text-sm text-black"
                    style={segoeUIStyles}
                  >
                    Deposito
                  </h6>
                  <span
                    className={`transition-transform duration-300 ${
                      openSection === "Deposito" ? "rotate-180" : "rotate-0"
                    }`}
                    style={{ color: "#8E9BAE" }}
                  >
                    ▼
                  </span>
                </div>
                {openSection === "Deposito" && (
                  <div className="mt-2 transition-all duration-300 ease-in-out opacity-100">
                    <p className="text-sm text-black" style={segoeUIStyles}>
                      Dapatkan keuntungan dalam Berinvestasi secara Pasti.
                    </p>
                    <div className="flex justify-end">
                      <a
                        href="/deposito"
                        className="px-4 py-2 text-sm font-semibold text-white bg-[#003868] rounded-md shadow-md hover:opacity-80 transition duration-300"
                      >
                        Selengkapnya ⮕
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
