import Head from "next/head";
import { Phone, Mail, MapPin, MessageSquare } from "lucide-react"; // Ditambahkan MessageSquare
import Header from "./components/layout/header";
import Hero from "./components/section/hero";
import Footer from "./components/layout/footer";

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: <MapPin className="text-indigo-600 w-6 h-6 mt-1" />,
      title: "OFFICE",
      details: (
        <p className="text-sm text-gray-600">
          Gedung Bulungan Business Center (BBC) <br />
          Jl. Bulungan I No.15, Kramat Pela, Kebayoran Baru, Jakarta Selatan 12130
        </p>
      ),
    },
    {
      icon: <Mail className="text-indigo-600 w-6 h-6 mt-1" />,
      title: "EMAIL",
      details: (
        <>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">CS:</span>
            <a href="mailto:cs@bankabdi.co.id" className="hover:underline"> cs@bankabdi.co.id</a>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Informasi Produk/Marketing:</span>
            <a href="mailto:info@bankabdi.co.id" className="hover:underline"> info@bankabdi.co.id</a>
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Pengaduan Nasabah:</span>
            <a href="mailto:pengaduan.nasabah@bankabdi.co.id" className="hover:underline"> pengaduan.nasabah@bankabdi.co.id</a>
          </p>
        </>
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
            <a href="https://wa.me/6281110686111" target="_blank" rel="noopener noreferrer" className="hover:underline"> 0811 1068 6111</a>
          </p>
        </>
      ),
    },
  ];

  return (
    <div>
      <Head>
        <title>Hubungi Kami - Bank Abdi</title>
        <meta name="description" content="Halaman kontak resmi Bank Abdi. Hubungi kami melalui telepon, email, atau kunjungi kantor kami." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero imageSrc="https://bankabdi.co.id/img/banner/hero-contact.webp" title="Hubungi Kami" showButton={false} />

      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-8">
            <h2 className="text-black text-3xl font-semibold">KONTAK BANK ABDI</h2>
          </div>

          <div className="p-8 grid lg:grid-cols-2 gap-8">
            {contactInfo.map((contact, index) => (
              <div key={index} className="flex items-start space-x-4">
                {contact.icon}
                <div>
                  <h3 className="text-[#003868] text-lg font-semibold">{contact.title}</h3>
                  {contact.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Kirimkan Pesan Langsung</h2>
              <p className="text-gray-600 mb-8">
                Punya pertanyaan atau butuh informasi lebih lanjut? Isi formulir di samping dan tim kami akan segera menghubungi Anda.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-indigo-100 rounded-full">
                    <MessageSquare className="text-indigo-600 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Response Time</h3>
                    <p className="text-gray-600">
                      Kami berusaha merespon semua pesan dalam waktu 1-2 jam kerja. Untuk pertanyaan mendesak, silakan hubungi nomor telepon kami.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl shadow-md">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Apa yang bisa kami bantu?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Pesan Anda
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Lokasi Kantor Kami</h2>
            <p className="text-gray-600 mt-2">Kunjungi kantor pusat kami di Jakarta Selatan</p>
          </div>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.146722836435!2d106.79448207457091!3d-6.2443869937439525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1f6719b6427%3A0x1d994159d7539bc6!2sBulungan%20Business%20Center%20BBC!5e0!3m2!1sid!2sid!4v1744977677490!5m2!1sid!2sid"
              width="100%"
              height="450"
              allowFullScreen
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;