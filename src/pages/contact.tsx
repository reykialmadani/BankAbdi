"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "../pages/components/layout/header";
import Hero from "../pages/components/section/hero";
import Footer from "./components/layout/footer";

const ContactPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero
        imageSrc="https://bankabdi.co.id/img/banner/hero-contact.webp"
        title="Hubungi Kami"
        showButton={false}
      />

      <section className="bg-[#EFF6FC] py-12">
        <div className="container mx-auto px-6 lg:px-20">
          
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-black text-3xl font-semibold">
              KONTAK BANK ABDI
            </h2>
          </div>

          <div className="p-8 grid lg:grid-cols-2 gap-8">
            {/* Kiri - Office & Phone */}
            <div className="space-y-6">
              {/* Alamat Kantor */}
              <div className="flex items-start space-x-4">
                <MapPin className="text-indigo-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-black text-lg font-semibold">OFFICE</h3>
                  <p className="text-gray-600">
                    Gedung Bulungan Business Center (BBC) <br />
                    Jl. Bulungan I No.15, Kramat Pela, Kebayoran Baru, Jakarta Selatan 12130
                  </p>
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start space-x-4">
                <Phone className="text-indigo-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-black text-lg font-semibold">PHONE</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">Telepon:</span> 
                    <a href="tel:+622127095212" className="hover:underline"> (+62) 21 27095212</a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">WhatsApp:</span> 
                    <a href="https://wa.me/6281110686111" target="_blank" className="hover:underline"> 0811 1068 6111</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Kanan - Email */}
            <div>
              <div className="flex items-start space-x-4">
                <Mail className="text-indigo-600 w-6 h-6 mt-1" />
                <div>
                  <h3 className="text-black text-lg font-semibold">EMAIL</h3>
                  <p className="text-gray-600">
                    <span className="font-semibold">CS:</span> 
                    <a href="mailto:cs@bankabdi.co.id" className=" hover:underline"> cs@bankabdi.co.id</a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Informasi Produk/Marketing:</span> 
                    <a href="mailto:info@bankabdi.co.id" className=" hover:underline"> info@bankabdi.co.id</a>
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Pengaduan Nasabah:</span> 
                    <a href="mailto:pengaduan.nasabah@bankabdi.co.id" className="hover:underline"> pengaduan.nasabah@bankabdi.co.id</a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
