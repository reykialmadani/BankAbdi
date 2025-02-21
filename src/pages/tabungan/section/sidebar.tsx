import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

interface SidebarProps {
  currentPath: string;
}

const Sidebar = ({ }: SidebarProps) => {
  const router = useRouter(); // Inisialisasi router
  const { id } = router.query; // Dapatkan id dari query parameter

  // Data tabungan yang sebelumnya berasal dari menuItems
  const tabunganMenuItems = [
    {
      href: "/tabungan/tabungan-abdi",
      label: "Tabungan Abdi",
    },
    {
      href: "/tabungan/tabungan-abdiku",
      label: "Tabungan Abdiku",
    },
    {
      href: "/tabungan/tabungan-abdi-simple",
      label: "Tabungan Abdi Simple",
    },
    {
      href: "/tabungan/formulir",
      label: "Formulir Pengajuan Tabungan",
    },
  ];

  // Data deposito (sudah statis sebelumnya)
  const depositoMenuItems = [
    {
      href: "/deposito/deposito-berjangka",
      label: "Deposito Berjangka",
    },
    {
      href: "/deposito/formulir-deposito",
      label: "Formulir Deposito",
    },
    {
      href: "/deposito/kalkulator-deposito",
      label: "Kalkulator Deposito",
    },
  ];

  const isActive = (href: string) => {
    const itemId = href.split('/').pop(); // Get the last segment of the URL
    return itemId === id;
  };

  return (
    <div className="lg:w-1/4 w-full">
      <div className="rounded-lg shadow-sm p-6 sticky top-4 text-sm">
        {/* Tabungan Section */}
        <div>
          <h6 className="text-lg font-semibold text-gray-700 mb-4">TABUNGAN</h6>
          <ul className="space-y-2">
            {tabunganMenuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} legacyBehavior>
                  <a
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gray-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {isActive(item.href) && (
                      <Image
                        src="https://bankabdi.co.id/img/icon/circle_active.svg"
                        alt="active indicator"
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2"
                        priority
                      />
                    )}
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Deposito Section */}
        <div className="mt-6">
          <h6 className="text-lg font-semibold text-gray-700 mb-4">DEPOSITO</h6>
          <ul className="space-y-2">
            {depositoMenuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} legacyBehavior>
                  <a
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-gray-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {isActive(item.href) && (
                      <Image
                        src="https://bankabdi.co.id/img/icon/circle_active.svg"
                        alt="active indicator"
                        width={16}
                        height={16}
                        className="w-4 h-4 mr-2"
                        priority
                      />
                    )}
                    {item.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;