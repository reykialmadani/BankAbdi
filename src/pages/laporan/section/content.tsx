import { useState } from "react";
import SidebarLaporan from "../../laporan/section/sidebar";

const MainPage = () => {
  const [page, setPage] = useState("2021"); // Default ke 2021

  const renderContent = () => {
    switch (page) {
      case "2021":
        return (
          <div className="lg:w-3/4 w-full">
            <div className="rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-bold text-[#003868] mb-6">
                LAPORAN TAHUN 2022
              </h4>
              <ol className="list-decimal pl-6 text-gray-800 space-y-4">
                <li>Laporanya Tahunan 2022 .</li>
            </ol>
            </div>
          </div>
        );
      case "2022":
        case "2023":
        case "2024":
        case "2025":
        return (
          <div className="lg:w-3/4 w-full">
            <div className="rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-bold text-[#003868] mb-6">
                LAPORAN TAHUN 2022
              </h4>
              <ol className="list-decimal pl-6 text-gray-800 space-y-4">
                <li>Laporanya Tahunan 2022 .</li>
            </ol>
            </div>
          </div>
        );
      case "2022":
        return <div className="p-6">Konten untuk Laporan 2022</div>;
      case "2023":
        return <div className="p-6">Konten untuk Laporan 2023</div>;
      case "2024":
        return <div className="p-6">Konten untuk Laporan 2024</div>;
      case "2025":
        return <div className="p-6">Konten untuk Laporan 2025</div>;
      default:
        return <div className="p-6">Halaman tidak ditemukan</div>;
    }
  };

  return (
    <div className="flex">
      <SidebarLaporan currentPath={page} setPage={setPage} />
      {renderContent()}
    </div>
  );
};

export default MainPage;
