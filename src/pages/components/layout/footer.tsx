import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      className="hidden md:block bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('https://bankabdi.co.id/img/home/footer.webp')",
      }}
    >
      <div className="mx-auto px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Logo Section */}
          <div className="lg:col-span-4">
            <Image
              src="https://bankabdi.co.id/img/logo/logo-color-abdi.svg"
              alt="Bank ABDI Logo"
              width={200}
              height={60}
            />
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-8 space-y-4 md:space-y-0 ml-auto">
            <nav className="flex justify-start space-x-6">
              <Link
                href="#"
                className="text-gray-500 text-base font-bold hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-gray-500 text-base font-bold hover:text-primary"
              >
                Suku Bunga
              </Link>
              <Link
                href="#"
                className="text-gray-500 text-base font-bold hover:text-primary"
              >
                Blogspot
              </Link>
              <Link
                href="#"
                className="text-gray-500 text-base font-bold hover:text-primary"
              >
                Hubungi Kami
              </Link>
            </nav>

            <nav className="flex justify-start space-x-2">
              <Link
                href="#"
                className="text-gray-400 text-sm hover:text-primary"
              >
                Kebijakan Privasi |
              </Link>
              <Link
                href="#"
                className="text-gray-400 text-sm hover:text-primary"
              >
                Syarat dan Ketentuan |
              </Link>
              <Link
                href="#"
                className="text-gray-400 text-sm hover:text-primary"
              >
                Prosedur Pengaduan Nasabah |
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">
                  Gedung Bulungan Business Center (BBC) Jl. Bulungan No. 15,
                  Kramat Pela, Kebayoran Baru, Jakarta Selatan, DKI Jakarta,
                  12130
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">
                  Telp : (+62) 21 2709 5212 <br />
                  WA : (+62) 811 1068 6111 <br />
                  email : info@bankabdi.co.id
                </p>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="lg:col-span-6">
            <div className="text-right">
              <h5 className="text-gray-400 text-base mb-4">
                Batas Akhir Penerimaan Transaksi di Cabang
              </h5>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-sm">Tarikan/Setoran Tunai:</span>
                  <span className="text-sm ml-2">Pukul 08.30 s/d 14.00 (WIB)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm">Transfer/Kiriman Uang:</span>
                  <span className="text-sm ml-2">Pukul 08.30 s/d 13.00 (WIB)</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-sm">Layanan Informasi:</span>
                  <span className="text-sm ml-2">Pukul 08.30 s/d 16.30 (WIB)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="lg:col-span-4">
            <div className="flex space-x-4">
              <Image
                src="https://bankabdi.co.id/img/logo/bpr.png"
                alt="BPR Logo"
                width={50}
                height={60}
              />
              <Image
                src="https://bankabdi.co.id/img/logo/perbaindo.png"
                alt="Perbaindo Logo"
                width={200}
                height={60}
              />
            </div>
          </div>

          {/* Company Information */}
          <div className="lg:col-span-3">
            <p className="text-gray-400 text-sm">
              <strong>PT BPR Akar Budaya Dana Indonesia (ABDI)</strong>{" "}
              terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK), dan
              merupakan peserta program penjaminan Lembaga Penjamin Simpanan
              (LPS).
            </p>
          </div>

          {/* Social Media & Copyright */}
          <div className="lg:col-span-5 text-right">
            <div className="flex justify-end space-x-4 mb-4">
              <a
                href="https://www.facebook.com/BPRABDI"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-gray-400 w-4 h-4"
                />
              </a>
              <a
                href="https://www.youtube.com/@bpranugerahmultidana"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  className="text-gray-400 w-4 h-4"
                />
              </a>
              <a
                href="https://www.instagram.com/bank.abdi/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-gray-400 w-4 h-4"
                />
              </a>
            </div>
            <p className="text-gray-400 text-base">
              COPYRIGHT © 2025 PT BPR ABDI. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
