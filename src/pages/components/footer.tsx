// components/Footer.jsx
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="hidden lg:block bg-cover bg-[url('/images/footer.webp')]">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-12 gap-4">
          {/* Logo Section */}
          <div className="col-span-5">
            <Image
              src="/images/logo-color-abdi.svg"
              alt="Bank ABDI Logo"
              width={200}
              height={60}
            />
          </div>

          {/* Navigation Links */}
          <div className="col-span-7">
            <nav className="flex justify-end">
              <ul className="flex space-x-6">
                <li><Link href="#" className="hover:text-primary">FAQ</Link></li>
                <li><Link href="#" className="hover:text-primary">Suku Bunga</Link></li>
                <li><Link href="#" className="hover:text-primary">Blogspot</Link></li>
                <li><Link href="#" className="hover:text-primary">Hubungi Kami</Link></li>
              </ul>
            </nav>
            
            <nav className="flex justify-end mt-4">
              <ul className="flex space-x-6">
                <li><Link href="#" className="hover:text-primary">Kebijakan Privasi</Link></li>
                <li><Link href="#" className="hover:text-primary">Syarat dan Ketentuan</Link></li>
                <li><Link href="#" className="hover:text-primary">Prosedur Pengaduan Nasabah</Link></li>
              </ul>
            </nav>
          </div>

          <div className="col-span-12 py-4" />

          {/* Contact Information */}
          <div className="col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm">
                  Gedung Bulungan Business Center (BBC)
                  Jl. Bulungan No. 15, Kramat Pela, Kebayoran Baru, Jakarta Selatan, DKI Jakarta,
                  12130
                </p>
              </div>
              <div>
                <p className="text-sm">
                  Telp : (+62) 21 2709 5212 <br />
                  WA : (+62) 811 1068 6111 <br />
                  email : info@bankabdi.co.id
                </p>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="col-span-6">
            <div className="text-right">
              <h5 className="font-semibold mb-4">Batas Akhir Penerimaan Transaksi di Cabang</h5>
              <ul className="space-y-2">
                <li>
                  <span className="font-medium">Tarikan/Setoran Tunai: </span>
                  Pukul 08.30 s/d 14.00 (WIB)
                </li>
                <li>
                  <span className="font-medium">Transfer/Kiriman Uang: </span>
                  Pukul 08.30 s/d 13.00 (WIB)
                </li>
                <li>
                  <span className="font-medium">Layanan Informasi: </span>
                  Pukul 08.30 s/d 16.30 (WIB)
                </li>
              </ul>
            </div>
          </div>

          <div className="col-span-12 py-4" />

          {/* Partner Logos */}
          <div className="col-span-5">
            <div className="flex space-x-4">
              <Image src="/images/bpr.png" alt="BPR Logo" width={100} height={40} />
              <Image src="/images/perbaindo.png" alt="Perbaindo Logo" width={100} height={40} />
            </div>
          </div>

          {/* Company Information */}
          <div className="col-span-3">
            <p className="text-sm">
              <strong>PT BPR Akar Budaya Dana Indonesia (ABDI)</strong> terdaftar dan diawasi oleh Otoritas
              Jasa Keuangan (OJK), dan merupakan peserta program penjaminan Lembaga Penjamin Simpanan (LPS).
            </p>
          </div>

          {/* Social Media & Copyright */}
          <div className="col-span-4 text-right">
            <div className="flex justify-end space-x-4">
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <i className="fab fa-facebook-f" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <i className="fab fa-youtube" />
              </button>
              <button className="p-2 bg-white rounded-full hover:bg-gray-100">
                <i className="fab fa-instagram" />
              </button>
            </div>
            <p className="font-semibold pt-3">
              COPYRIGHT © 2022 PT BPR ABDI. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer