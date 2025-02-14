import Link from "next/link";
import Image from "next/image";

interface MenuItem {
  href: string;
  label: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  currentPath: string;
}

const Sidebar = ({ menuItems, currentPath }: SidebarProps) => {
  return (
    <div className="lg:w-1/4 w-full">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
        <h6 className="text-lg font-semibold text-gray-700 mb-4">Tabungan</h6>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} legacyBehavior>
                <a
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    currentPath === item.href
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
                  {item.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
