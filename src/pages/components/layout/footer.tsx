import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-cover bg-no-repeat" style={{ backgroundImage: "url('https://bankabdi.co.id/img/home/footer.webp')" }}>
      <div className="container mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

          {/* Logo Section */}
          <div className="lg:col-span-5">
            <Image
              src="https://bankabdi.co.id/img/logo/logo-color-abdi.svg"
              alt="Bank ABDI Logo"
              width={200}
              height={60}
            />
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 space-y-4 md:space-y-0">
            <nav className="flex justify-start space-x-6">
              <Link href="#" className="text-gray-400 text-base hover:text-primary">FAQ</Link>
              <Link href="#" className="text-gray-400 text-base hover:text-primary">Suku Bunga</Link>
              <Link href="#" className="text-gray-400 text-base hover:text-primary">Blogspot</Link>
              <Link href="#" className="text-gray-400 text-base hover:text-primary">Hubungi Kami</Link>
            </nav>

            <nav className="flex justify-start space-x-6">
              <Link href="#" className="text-gray-400 text-sm hover:text-primary">Kebijakan Privasi |</Link>
              <Link href="#" className="text-gray-400 text-sm hover:text-primary">Syarat dan Ketentuan |</Link>
              <Link href="#" className="text-gray-400 text-sm hover:text-primary">Prosedur Pengaduan Nasabah |</Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">
                  Gedung Bulungan Business Center (BBC)
                  Jl. Bulungan No. 15, Kramat Pela, Kebayoran Baru, Jakarta Selatan, DKI Jakarta, 12130
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
              <h5 className="text-gray-400 font-medium mb-4">Batas Akhir Penerimaan Transaksi di Cabang</h5>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li className="flex justify-between">
                  <span className="font-medium">Tarikan/Setoran Tunai:</span>
                  <span>Pukul 08.30 s/d 14.00 (WIB)</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Transfer/Kiriman Uang:</span>
                  <span>Pukul 08.30 s/d 13.00 (WIB)</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Layanan Informasi:</span>
                  <span>Pukul 08.30 s/d 16.30 (WIB)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="lg:col-span-5">
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
              <strong>PT BPR Akar Budaya Dana Indonesia (ABDI)</strong> terdaftar dan diawasi oleh Otoritas
              Jasa Keuangan (OJK), dan merupakan peserta program penjaminan Lembaga Penjamin Simpanan (LPS).
            </p>
          </div>

          {/* Social Media & Copyright */}
          <div className="lg:col-span-4 text-right">
            <div className="flex justify-end space-x-4 mb-4">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <FontAwesomeIcon icon={faFacebookF} className="text-gray-400 w-4 h-4" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <FontAwesomeIcon icon={faYoutube} className="text-gray-400 w-4 h-4" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <FontAwesomeIcon icon={faInstagram} className="text-gray-400 w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-base">
              COPYRIGHT © 2022 PT BPR ABDI. ALL RIGHTS RESERVED.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
