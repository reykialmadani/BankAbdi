import React from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

const segoeUIStyles = {
  fontFamily: "segoe_uiregular, sans-serif",
};

const bankingSolutions = [
  {
    title: "Tabungan",
    image: "https://bankabdi.co.id/img/home/produk-tabungan.webp",
    description: "Buku Tabungan Aman & Menguntungkan",
  },
  {
    title: "Deposito",
    image: "https://bankabdi.co.id/img/home/product-deposito.webp",
    description: "Buka Simpanan Aman & Menguntungkan",
  },
  {
    title: "Pinjaman/Kredit",
    image: "https://bankabdi.co.id/img/home/produk-pinjaman.webp",
    description: "Ajukan Pinjaman Cepat dan Mudah",
  },
];

const BankingSolutions = () => {
  return (
    <div
      className="relative flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        ...segoeUIStyles,
        backgroundImage: "url('/assets/bg-accordion.png')",
        height: "500px",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-2xl font-semibold text-black text-center mb-8"
            style={segoeUIStyles}
          >
            Solusi Perbankan Kami, untuk Anda Nasabah Kami
          </h2>
          <Swiper
            modules={[FreeMode]}
            spaceBetween={20}
            slidesPerView={3}
            grabCursor={true}
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="cursor-grab [&_.swiper-slide]:transition-all [&_.swiper-slide]:duration-300 [&_.swiper-slide]:ease-in-out [&_.swiper-slide-active]:scale-110 [&_.swiper-slide-active]:z-10 [&_.swiper-slide]:scale-95"
          >
            {[...Array(3)].map((_, arrayIndex) =>
              bankingSolutions.map((solution, index) => (
                <SwiperSlide key={`${arrayIndex}-${index}`}>
                  <div
                    className="bg-white rounded-md shadow overflow-hidden max-w-sm h-[389px] transition-transform duration-300"
                    style={segoeUIStyles}
                  >
                    <div className="relative h-2/3 w-full">
                      <Image
                        src={solution.image}
                        layout="fill"
                        objectFit="cover"
                        alt={solution.title}
                      />
                    </div>
                    <div className="p-4 h-1/3">
                      <h3
                        className="text-lg font-bold text-black mb-1"
                        style={segoeUIStyles}
                      >
                        {solution.title}
                      </h3>
                      <p
                        className="text-gray-600 text-sm mb-2"
                        style={segoeUIStyles}
                      >
                        {solution.description}
                      </p>
                      <button
                        className="text-[#003868] text-sm hover:text-blue-700"
                        style={segoeUIStyles}
                      >
                        Lihat Solusi Lengkap →
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default BankingSolutions;