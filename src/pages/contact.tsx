"use client";
import { Phone, Mail, MapPin } from "lucide-react";
import Header from "./components/layout/header";
import Hero from "./components/section/hero";
import Footer from "./components/layout/footer";

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: <MapPin className="text-indigo-600 w-6 h-6 mt-1" />,
      title: "OFFICE",
      details: (
        <p className="text-gray-600">
          Gedung Bulungan Business Center (BBC) <br />
          Jl. Bulungan I No.15, Kramat Pela, Kebayoran Baru, Jakarta Selatan 12130
        </p>
      ),
    },
    {
      icon: <Phone className="text-indigo-600 w-6 h-6 mt-1" />,
      title: "PHONE",
      details: (
        <>
          <p className="text-gray-600">
            <span className="font-semibold">Telepon:</span>
            <a href="tel:+622127095212" className="hover:underline"> (+62) 21 27095212</a>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">WhatsApp:</span>
            <a href="https://wa.me/6281110686111" target="_blank" className="hover:underline"> 0811 1068 6111</a>
          </p>
        </>
      ),
    },
    {
      icon: <Mail className="text-indigo-600 w-6 h-6 mt-1" />,
      title: "EMAIL",
      details: (
        <>
          <p className="text-gray-600">
            <span className="font-semibold">CS:</span>
            <a href="mailto:cs@bankabdi.co.id" className="hover:underline"> cs@bankabdi.co.id</a>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Informasi Produk/Marketing:</span>
            <a href="mailto:info@bankabdi.co.id" className="hover:underline"> info@bankabdi.co.id</a>
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Pengaduan Nasabah:</span>
            <a href="mailto:pengaduan.nasabah@bankabdi.co.id" className="hover:underline"> pengaduan.nasabah@bankabdi.co.id</a>
          </p>
        </>
      ),
    },
  ];

  return (
    <div>
      <Header />
      <Hero imageSrc="https://bankabdi.co.id/img/banner/hero-contact.webp" title="Hubungi Kami" showButton={false} />
      
      {/* Kontak Section */}
      <section className="bg-[#EFF6FC] py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-8">
            <h2 className="text-black text-3xl font-semibold">KONTAK BANK ABDI</h2>
          </div>
          
          <div className="p-8 grid lg:grid-cols-2 gap-8">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-start space-x-4">
                {contact.icon}
                <div>
                  <h3 className="text-black text-lg font-semibold">{contact.title}</h3>
                  {contact.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;