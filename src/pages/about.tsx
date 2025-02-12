import Header from "../pages/components/layout/header";
import Hero from "../pages/components//section/hero";

const AboutPage: React.FC = () => {
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
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-indigo-600 py-3">
              Riwayat Singkat Perusahaan
            </h2>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-4 gap-8">
            {/* Timeline Item 1 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                1
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900">
                Desember 1988
              </p>
              <p className="text-gray-700">
                Berdiri dengan nama PT Bank Perkreditan Rakyat/BPR Sarana
                Ekonomi
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                2
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900">
                April 2006
              </p>
              <p className="text-gray-700">
                Berganti nama menjadi PT BPR Sentra Rahardja
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                3
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900">
                April 2008
              </p>
              <p className="text-gray-700">
                Berganti nama menjadi PT BPR Anugerah Multi Dana
              </p>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                4
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900">Mei 2021</p>
              <p className="text-gray-700">
                Diakuisisi dan berganti kepemilikan menjadi PT ABS dan ABI
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8">
            {/* Timeline Item 5 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                5
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900">Mei 2023</p>
              <p className="text-gray-700">Berganti nama menjadi BPR ABDI</p>
            </div>

            {/* Timeline Item 6 */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full">
                6
              </div>
              <p className="mt-4 text-sm font-medium text-gray-900">
                November 2023
              </p>
              <p className="text-gray-700">
                Menjadi BANK Perekonomian Rakyat Akar Budaya Dana
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
