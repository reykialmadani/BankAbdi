// components/BankingSolutions.jsx
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';

const bankingSolutions = [
    { title: "Tabungan", image: "/assets/tab-tabungan.png", description: "Buku Tabungan Aman & Menguntungkan" },
    { title: "Deposito", image: "/assets/tab-deposito.jpg", description: "Buka Simpanan Aman & Menguntungkan" },
    { title: "Pinjaman/Kredit", image: "/assets/tab-kredit.png", description: "Ajukan Pinjaman Cepat dan Mudah" },
];

const BankingSolutions = () => {
    return (
        <div className="relative flex flex-col items-center py-4 bg-cover bg-center" 
            style={{
                backgroundImage: "url('/assets/bg-accordion.png')",
                height: "500px", 
                width: "100%", 
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <section className="py-12 px-6">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#003868] text-center mb-8">
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
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 15
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20
                            }
                        }}
                        className="cursor-grab"
                    >
                        {[...Array(3)].map((_, arrayIndex) => (
                            bankingSolutions.map((solution, index) => (
                                <SwiperSlide key={`${arrayIndex}-${index}`}>
                                    <div className="bg-white rounded-md shadow overflow-hidden max-w-sm">
                                        <div className="relative h-32 w-full">
                                            <Image src={solution.image} layout="fill" objectFit="cover" alt={solution.title} />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold text-[#003868] mb-1">{solution.title}</h3>
                                            <p className="text-gray-600 text-sm mb-2">{solution.description}</p>
                                            <button className="text-[#003868] text-sm hover:text-blue-700">
                                                Lihat Solusi Lengkap →
                                            </button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        ))}
                    </Swiper>
                </div>
            </section>
        </div>
    );
};

export default BankingSolutions;