import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../pages/components/layout/header";
import Hero from "../pages/components//section/hero";
import Informasi from "./components/section/information";
import Footer from "./components/layout/footer";

const AboutPage: React.FC = () => {
  const historyData = [
    {
      number: "1",
      date: "Desember 1988",
      description:
        "Berdiri dengan nama PT Bank Perkreditan Rakyat/BPR Sarana Ekonomi",
    },
    {
      number: "2",
      date: "April 2006",
      description: "Berganti nama menjadi PT BPR Sentra Rahardja",
    },
    {
      number: "3",
      date: "April 2008",
      description: "Berganti nama menjadi PT BPR Anugerah Multi Dana",
    },
    {
      number: "4",
      date: "Mei 2021",
      description: "Diakuisisi dan berganti kepemilikan menjadi PT ABS dan ABI",
    },
    {
      number: "5",
      date: "Mei 2023",
      description: "Berganti nama menjadi BPR ABDI",
    },
    {
      number: "6",
      date: "November 2023",
      description:
        "Menjadi BANK Perekonomian Rakyat Akar Budaya Dana Indonesia",
    },
  ];

  return (
    <div>
      <Header />
      <Hero
        imageSrc="https://bankabdi.co.id/img/banner/hero-about.webp"
        title="Sekilas Bank Abdi"
        showButton={false}
      />

      {/* Keunggulan Section */}
      <section className="section bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full lg:w-8/12 text-left relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-800"></div>
              <p className="text-base text-gray-700 pl-6">
                PT BPR Akar Budaya Dana Indonesia atau disebut BANK ABDI
                sebelumnya bernama PT BPR Sarana Ekonomi yang didirikan pada
                bulan Desember 1988, dan pada April 2006 berganti nama menjadi
                PT BPR Sentra Rahardja, kemudian berganti nama menjadi PT BPR
                Anugerah Multi Dana. Selanjutnya, pada bulan Mei 2021 diakuisisi
                dan resmi berganti kepemilikan menjadi PT Akar Berlian Sentosa
                (ABS) dan PT Akar Budaya Indonesia (ABI).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Keunggulan Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Section Heading */}
            <div className="w-full text-center mb-10">
              <h2 className="text-indigo-600 text-3xl font-semibold">
                Nilai-Nilai Perusahaan
              </h2>
            </div>

            {/* Adapting */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-left">
              <div className="ui-icon-block px-12">
                <h6 className="text-lg font-semibold mt-2">Adapting</h6>
                <p className="text-sm text-gray-700 mt-2">
                  Beradaptasi dengan cepat pada perubahan ekonomi pasar yang
                  konsisten dan meramalkan keunggulan kompetitif yang baru.
                </p>
              </div>
            </div>

            {/* Blessing */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-left">
              <div className="ui-icon-block px-12">
                <h6 className="text-lg font-semibold mt-2">Blessing</h6>
                <p className="text-sm text-gray-700 mt-2">
                  Kepercayaan pelanggan menjadi faktor utama kami dalam melayani
                  dan memberikan nilai tambah bagi keperluan pelanggan.
                </p>
              </div>
            </div>

            {/* Developing */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-left">
              <div className="ui-icon-block px-12">
                <h6 className="text-lg font-semibold mt-2">Developing</h6>
                <p className="text-sm text-gray-700 mt-2">
                  Selalu bergerak dan berkembang sehingga menjadikan bank yang
                  terkinikan.
                </p>
              </div>
            </div>

            {/* Improving */}
            <div className="w-full sm:w-1/2 md:w-1/4 text-left">
              <div className="ui-icon-block px-12">
                <h6 className="text-lg font-semibold mt-2">Improving</h6>
                <p className="text-sm text-gray-700 mt-2">
                  Selalu berinovasi dalam upaya peningkatan kualitas pelayanan
                  terhadap pelanggan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Moto Perusahaan Section */}
      <section
        className="section moto bg-cover bg-center py-16"
        style={{
          backgroundImage: "url(https://bankabdi.co.id/img/banner/moto1.webp)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="section-heading text-center mb-0 relative z-10">
            <h2 className="text-2xl text-white font-[Segoe UI] text-[28px]">
              Moto Perusahaan
            </h2>
            <h1 className="text-4xl font-bold text-white mt-4 font-[Segoe UI] text-[48px]">
              SAHABAT USAHA ANDA
            </h1>
          </div>
          <div className="flex flex-row gap-2 text-white mt-8 relative z-10">
            <span className="motto-p text-sm w-1/2 font-[Segoe UI] px-[92.8px] pt-[48px]">
              Komitmen BANK ABDI sebagai sahabat usaha anda dalam berusaha untuk
              mengembangkan kegiatan usaha bersama-sama.
            </span>
            <span className="motto-p text-sm w-1/2 font-[Segoe UI] px-[92.8px] pt-[48px]">
              BANK ABDI hadir menjadi mitra usaha dalam pengembangan UMKM agar
              menjadi pelaku usaha yang mandiri & memiliki daya saing.
            </span>
          </div>
        </div>
      </section>

      {/* Visi dan Misi Section */}
      <section
        className="bg-white py-16 px-4 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url('/assets/bg-accordion.png')",
          backgroundSize: "cover", // Ensure the image covers the section without repeating
          backgroundPosition: "center", // Center the background image
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-blue-900">
              Visi dan Misi Perusahaan
            </h2>
          </div>

          <div className="space-y-8">
            {/* Visi */}
            <div className="p-8 rounded-lg ">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
                Visi
              </h3>
              <p className="text-lg text-gray-700 mb-4 text-center">
                Menjadi BPR digital di Indonesia yang berinovasi tinggi, maju
                dan sehat dengan didukung sistem, layanan dan SDM terbaik.
              </p>
            </div>

            {/* Misi */}
            <div className="p-8 rounded-lg ">
              <h3 className="text-2xl font-semibold text-blue-900 mb-4 text-center">
                Misi
              </h3>
              <ul className="flex space-x-8 text-lg text-gray-700 text center">
                <li className="flex-1">
                  Menjadi mitra pelaku UMKM untuk mendukung dan mengingkatkan
                  Usaha Mikro Kecil Menengah yang mandiri dan memiliki daya
                  saing kuat.
                </li>
                <li className="flex-1">
                  Meningkatkan layanan perbankan yang mengedepankan
                  service/layanan mutu, infrastruktur yang kuat dan terdepan dan
                  SDM yang kompeten.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Riwayat Perusahaan Section */}
      <section className="hidden lg:block py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-indigo-600 text-2xl font-semibold py-3">
              Riwayat Singkat Perusahaan
            </h2>
          </div>

          <div className="relative">
            {/* Horizontal Line 1-2-3-4 */}
            <div className="absolute top-5 left-[140px] right-[140px] h-0.5 bg-indigo-200" />
            
            {/* Vertical Line for 1-5 */}
            <div className="absolute top-5 left-[128px] w-0.5 h-[200px] bg-indigo-200" />
            
            {/* Horizontal Line 5-6 */}
            <div className="absolute top-[240px] left-[128px] w-[350px] h-0.5 bg-indigo-200" />

            {/* First Row */}
            <div className="flex justify-between mb-20">
              {historyData.slice(0, 4).map((item) => (
                <div key={item.number} className="flex flex-col items-center w-64 relative z-10">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    {item.number}
                  </span>
                  <span className="text-gray-600 font-medium mb-2">{item.date}</span>
                  <span className="text-center text-sm">{item.description}</span>
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className="flex justify-start gap-24">
              {historyData.slice(4).map((item) => (
                <div key={item.number} className="flex flex-col items-center w-64 relative z-10">
                  <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center mb-3">
                    {item.number}
                  </span>
                  <span className="text-gray-600 font-medium mb-2">{item.date}</span>
                  <span className="text-center text-sm">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Version */}
      <section id="steps" className="lg:hidden py-12">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-indigo-600 text-2xl font-semibold">
              Riwayat Singkat Perusahaan
            </h2>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {historyData.map((item) => (
              <div key={item.number} className="relative pl-12 border-l-2 border-indigo-200 pb-8 last:border-l-0 last:pb-0">
                <span className="absolute left-[-17px] bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  {item.number}
                </span>
                <div>
                  <h4 className="text-gray-800 font-medium mb-2">
                    {item.date}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFF6FC] profile-dewan py-8">
        <div className="container mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-6">
            <h2 className="text-indigo-600 text-3xl font-semibold py-3">
              Profil Dewan
            </h2>
          </div>

          {/* Section Container */}
          <div className="flex flex-wrap justify-center gap-6">
            {/* Dewan Komisaris */}
            <div className="w-full">
              <div className="text-center text-xl font-semibold mb-4">
                Dewan Komisaris
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {/* Marlinah Ongko Widjojo */}
                <div className="ui-card bg-white shadow-lg rounded-md overflow-hidden w-1/2 max-w-md">
                  <div className="card-image relative h-60">
                    <Image
                      src="https://bankabdi.co.id/img/profile/marlinah.webp"
                      alt="Marlinah Ongko Widjojo"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="card-title p-4 text-center">
                    <h5 className="text-black  text-xl font-semibold">
                      Marlinah Ongko Widjojo
                    </h5>
                    <small className="text-sm text-black">
                      Komisaris Utama
                    </small>
                  </div>
                </div>

                {/* Manuel Lahengke Nusa */}
                <div className="ui-card bg-white shadow-lg rounded-md overflow-hidden w-1/2 max-w-md">
                  <div className="card-image relative h-60">
                    <Image
                      src="https://bankabdi.co.id/img/profile/manuel.webp"
                      alt="Manuel Lahengke Nusa"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="card-title p-4 text-center">
                    <h5 className="text-black  text-xl font-semibold">
                      Manuel Lahengke Nusa
                    </h5>
                    <small className="text-sm text-black">
                      Komisaris Anggota
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Dewan Direksi */}
            <div className="w-full">
              <div className="text-center text-xl font-semibold mt-8 mb-4">
                Dewan Direksi
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {/* Wardati SE */}
                <div className="ui-card bg-white shadow-lg rounded-md overflow-hidden w-1/2 max-w-md">
                  <div className="card-image relative h-60">
                    <Image
                      src="https://bankabdi.co.id/img/profile/wardati.webp"
                      alt="Wardati SE"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="card-title p-4 text-center">
                    <h5 className=" text-black text-xl font-semibold">
                      Wardati SE
                    </h5>
                    <small className="text-sm text-black">Direktur Utama</small>
                  </div>
                </div>

                {/* Mario Yahya */}
                <div className="ui-card bg-white shadow-lg rounded-md overflow-hidden w-1/2 max-w-md">
                  <div className="card-image relative h-60">
                    <Image
                      src="https://bankabdi.co.id/img/profile/mario.webp"
                      alt="Mario Yahya"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="card-title p-4 text-center">
                    <h5 className=" text-black text-xl font-semibold">
                      Mario Yahya
                    </h5>
                    <small className="text-sm text-black">
                      Direktur Operasional
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-laporan-keuangan bg-white py-12">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h2 className="text-indigo-600 text-2xl font-semibold py-3">
              Informasi Laporan Keuangan
            </h2>
          </div>

          {/* List Container */}
          <div className="flex flex-col md:flex-row justify-start gap-6">
            {/* Laporan Tahunan */}
            <div className="list-informasi-laporan">
              <Link
                href="/laporan/tahunan/2021"
                className="block hover:opacity-80"
              >
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  Laporan Tahunan
                  <Image
                    src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
                    alt="arrow right"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </h3>
                <h6 className="text-sm text-gray-600">
                  Laporan tahunan BANK ABDI yang berisi tentang aktivitas dan
                  pencapaian yang telah diperoleh selama setahun berjalan.
                </h6>
              </Link>
            </div>

            {/* Laporan Triwulan */}
            <div className="list-informasi-laporan">
              <Link
                href="/laporan/triwulan/2021"
                className="block hover:opacity-80"
              >
                <h3 className="flex items-center text-lg font-semibold mb-2">
                  Laporan Triwulan
                  <Image
                    src="https://bankabdi.co.id/img/icon/arrow_circle_right.png"
                    alt="arrow right"
                    width={24}
                    height={24}
                    className="ml-2"
                  />
                </h3>
                <h6 className="text-sm text-gray-600">
                  Laporan triwulanan BANK ABDI yang terbit setiap triwulan.
                </h6>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Informasi />
      <Footer />
    </div>
  );
};

export default AboutPage;
