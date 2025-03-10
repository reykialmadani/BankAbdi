import React from 'react';
import Image from 'next/image';

const Informasi = () => {
  const segoeUIStyles = {
    fontFamily: "'Segoe UI', sans-serif",
  };

  return (
    <section className="bg-gray-50 py-12 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-2xl font-semibold text-center text-gray-800 mb-6"
          style={segoeUIStyles}
        >
          Informasi Terkini Tentang Kami
        </h2>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
            
            {/* Card 1 */}
            <div className="bg-white rounded-lg overflow-hidden w-[288px] h-[556px] flex flex-col relative">
              <Image
                className="w-full h-[70%] object-cover"
                src="https://bankabdi.co.id/storage/post-images/MHYRuxSlECwR5xpaybz4nSthGcNQ9uCeUlG3s2vb.png"
                alt="Informasi Terkini"
                width={640} 
                height={278} 
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3
                  className="text-sm text-gray-400 mb-2"
                  style={segoeUIStyles}
                >
                  Nasabah Bank ABDI
                </h3>
                <p
                  className="font-semibold text-black text-sm mb-2"
                  style={segoeUIStyles}
                >
                  Tips Menyusun Anggaran Penjualan, Biar Cuan Makin Maksimal!
                </p>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-indigo-800"
                  style={segoeUIStyles}
                >
                  Baca Selengkapnya
                </a>
              </div>
              {/* Blue overlay at the bottom of the card */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#2B88D8] h-2"></div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg overflow-hidden w-[288px] h-[556px] flex flex-col relative">
              <Image
                className="w-full h-[70%] object-cover"
                src="https://bankabdi.co.id/storage/post-images/mIDthWsAMu65K7Le8Q5qGPA5qlELd6FUXxO89Pfr.png"
                alt="Informasi Terkini"
                width={640} 
                height={278}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3
                  className="text-sm text-gray-400 mb-2"
                  style={segoeUIStyles}
                >
                  Nasabah Bank ABDI
                </h3>
                <p
                  className="font-semibold text-black text-sm mb-2"
                  style={segoeUIStyles}
                >
                  Tips Menyusun Anggaran Penjualan, Biar Cuan Makin Maksimal!
                </p>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-indigo-800"
                  style={segoeUIStyles}
                >
                  Baca Selengkapnya
                </a>
              </div>
              {/* Blue overlay at the bottom of the card */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#2B88D8] h-2"></div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg overflow-hidden w-[288px] h-[556px] flex flex-col relative">
              <Image
                className="w-full h-[70%] object-cover"
                src="https://bankabdi.co.id/storage/post-images/iNWDdyCNwdPwiMdXuJF4Jc04peujGAnYHYBIY11J.png"
                alt="Informasi Terkini"
                width={640} 
                height={256}
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3
                  className="text-sm text-gray-400 mb-2"
                  style={segoeUIStyles}
                >
                  Nasabah Bank ABDI
                </h3>
                <p
                  className="font-semibold text-black text-sm mb-2"
                  style={segoeUIStyles}
                >
                  Tips Menyusun Anggaran Penjualan, Biar Cuan Makin Maksimal!
                </p>
                <a
                  href="#"
                  className="text-sm text-gray-300 hover:text-indigo-800"
                  style={segoeUIStyles}
                >
                  Baca Selengkapnya
                </a>
              </div>
              {/* Blue overlay at the bottom of the card */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#2B88D8] h-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Informasi;
