import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, EffectCoverflow } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const segoeUIStyles = {
  fontFamily: "'Segoe UI', sans-serif",
};

const bankingSolutions = [
  {
    title: "Tabungan",
    image: "https://bankabdi.co.id/img/home/produk-tabungan.webp",
    description: "Buku Tabungan Aman & Menguntungkan",
    link: "/tabungan/tabungan-abdi",
  },
  {
    title: "Deposito",
    image: "https://bankabdi.co.id/img/home/product-deposito.webp",
    description: "Buka Simpanan Aman & Menguntungkan",
    link: "/deposito/deposito-berjangka",
  },
  {
    title: "Pinjaman/Kredit",
    image: "https://bankabdi.co.id/img/home/produk-pinjaman.webp",
    description: "Ajukan Pinjaman Cepat dan Mudah",
    link: "/pinjaman/pinjaman-modal-kerja",
  },
];

// Duplikat slide untuk efek loop yang lebih baik
const duplicatedSolutions = [...bankingSolutions, ...bankingSolutions, ...bankingSolutions];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const BankingSolutions = () => {
  // Hitung initial slide di tengah set pertama
  const initialSlideIndex = bankingSolutions.length + bankingSolutions.findIndex(
    (solution) => solution.title === "Deposito"
  );

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center bg-cover bg-center min-h-[500px] w-full py-8"
      style={{
        ...segoeUIStyles,
        backgroundImage: "url('/assets/bg-accordion.png')",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInUp}
    >
      <section className="w-full px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-black text-center mb-8" style={segoeUIStyles}>
            Solusi Perbankan Kami, untuk Anda Nasabah Kami
          </h2>
          <div className="flex justify-center">
            <Swiper
              initialSlide={initialSlideIndex}
              modules={[FreeMode, Pagination, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              loopAdditionalSlides={2} // Tambahan slide untuk loop yang lebih mulus
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  effect: "slide",
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                  effect: "coverflow",
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  effect: "coverflow",
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 25,
                  effect: "coverflow",
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                  effect: "coverflow",
                },
              }}
              className="!pb-12 w-full"
            >
              {duplicatedSolutions.map((solution, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center transition-all duration-300">
                  <motion.div
                    className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-[280px] h-[400px] transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={segoeUIStyles}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % bankingSolutions.length) * 0.1 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  >
                    <div className="relative h-3/5 w-full">
  <Image
    src={solution.image}
    alt={solution.title}
    fill
    style={{ objectFit: 'cover' }}
    priority={index === initialSlideIndex}
    sizes="100vw"
  />
</div>

                    <div className="p-6 h-2/5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2" style={segoeUIStyles}>
                          {solution.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4" style={segoeUIStyles}>
                          {solution.description}
                        </p>
                      </div>
                      <Link href={solution.link} passHref>
                        <span
                          className="text-[#003868] text-sm hover:text-blue-700 cursor-pointer inline-block font-medium"
                          style={segoeUIStyles}
                        >
                          Lihat Solusi Lengkap →
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BankingSolutions;