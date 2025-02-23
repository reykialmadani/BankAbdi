import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const segoeUIStyles = {
  fontFamily: "segoe_uiregular, sans-serif",
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

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const BankingSolutions = () => {
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
              modules={[FreeMode, Pagination]}
              spaceBetween={20}
              grabCursor={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  centeredSlides: true,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                  centeredSlides: true,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                  centeredSlides: false,
                  pagination: false,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  centeredSlides: false,
                  pagination: false,
                },
              }}
              className="!pb-12 md:!pb-0 max-w-[320px] md:max-w-none"
            >
              {[...Array(3)].map((_, arrayIndex) =>
                bankingSolutions.map((solution, index) => (
                  <SwiperSlide 
                    key={`${arrayIndex}-${index}`} 
                    className="flex justify-center items-center transition-all duration-300"
                  >
                    <motion.div
                      className="bg-white rounded-xl shadow overflow-hidden w-full max-w-[280px] h-[400px] transition-transform duration-300 hover:scale-105"
                      style={segoeUIStyles}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      viewport={{ once: true }}
                    >
                      <div className="relative h-3/5 w-full">
                        <Image 
                          src={solution.image} 
                          layout="fill" 
                          objectFit="cover" 
                          alt={solution.title}
                          priority={index === 0}
                        />
                      </div>
                      <div className="p-6 h-2/5 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-black mb-2" style={segoeUIStyles}>
                            {solution.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4" style={segoeUIStyles}>
                            {solution.description}
                          </p>
                        </div>
                        <Link href={solution.link} passHref>
                          <span 
                            className="text-[#003868] text-sm hover:text-blue-700 cursor-pointer inline-block"
                            style={segoeUIStyles}
                          >
                            Lihat Solusi Lengkap →
                          </span>
                        </Link>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BankingSolutions;