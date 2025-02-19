import Image from "next/image";

interface SidebarProps {
  currentPath: string;
  setPage: (page: string) => void;
}

const SidebarLaporan = ({ currentPath, setPage }: SidebarProps) => {
  const menuItems = ["2021", "2022", "2023", "2024", "2025"];
  const triwulan = ["2021", "2022", "2023", "2024", "2025"];

  return (
    <div className="lg:w-1/4 w-full">
      <div className="rounded-lg shadow-sm p-6 sticky top-4">
        {/* LAPORAN TAHUNAN */}
        <h6 className="text-lg font-semibold text-gray-700 mb-4">LAPORAN TAHUNAN</h6>
        <ul className="space-y-2 mb-6">
          {menuItems.map((year) => (
            <li key={year}>
              <button
                onClick={() => setPage(year)}
                className={`flex items-center px-4 py-2 w-full text-left rounded-lg transition-colors ${
                  currentPath === year
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Image
                  src="https://bankabdi.co.id/img/icon/circle_active.svg"
                  alt="active sign"
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-2"
                />
                {year}
              </button>
            </li>
          ))}
        </ul>

        {/* LAPORAN TRIWULAN */}
        <h6 className="text-lg font-semibold text-gray-700 mb-4">LAPORAN TRIWULAN</h6>
        <ul className="space-y-2">
          {triwulan.map((quarter) => (
            <li key={`2025-${quarter}`}>
              <button
                onClick={() => setPage(`2025-${quarter}`)}
                className={`flex items-center px-4 py-2 w-full text-left rounded-lg transition-colors ${
                  currentPath === `2025-${quarter}`
                    ? "bg-gray-100 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Image
                  src="https://bankabdi.co.id/img/icon/circle_active.svg"
                  alt="active sign"
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-2"
                />
                {quarter}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarLaporan;
