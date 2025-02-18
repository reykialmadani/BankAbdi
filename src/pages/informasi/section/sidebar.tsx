import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  currentPath: string;
}

const Sidebar = ({ currentPath }: SidebarProps) => {
  // Data menu informasi
  const informationMenuItems = [
    {
      href: "/informasi/tabungan",
      label: "Tabungan"
    },
    {
      href: "/informasi/deposito",
      label: "Informasi Deposito"
    },
    {
      href: "/informasi/lps",
      label: "Informasi LPS"
    },
    {
      href: "/informasi/iso",
      label: "Informasi ISO"
    }
  ];

  // Data menu blog/event
  const blogEventMenuItems = [
    {
      href: "/informasi/blog",
      label: "Blog"
    },
    {
      href: "/informasi/event",
      label: "Event"
    }
  ];

  return (
    <div className="lg:w-1/4 w-full">
      <div className="rounded-lg shadow-sm p-6 sticky top-4">
        {/* Informasi Section */}
        <div>
          <h6 className="text-lg font-semibold text-gray-700 mb-4">INFORMASI</h6>
          <ul className="space-y-2">
            {informationMenuItems.map((item) => (
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

        {/* Blog/Event Section */}
        <div className="mt-6">
          <h6 className="text-lg font-semibold text-gray-700 mb-4">BLOG/EVENT</h6>
          <ul className="space-y-2">
            {blogEventMenuItems.map((item) => (
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
    </div>
  );
};

export default Sidebar;