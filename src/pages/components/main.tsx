import Image from "next/image";

const MainPage = () => {
    return (
        <div className="container">
            <div className="hero h-screen overflow-hidden relative">

                {/* Background Image */}
                <Image
                    src="/assets/herologo1.jpg"
                    layout="fill"
                    objectFit="cover"
                    alt="Hero Logo"
                    className="z-0"
                />

                {/* Hero Image */}
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 text-left z-10">
                    <h1 className="text-white-500 text-4xl font-bold">
                        Sahabat Anda dalam Menggapai Masa Depan <br /> yang Lebih Baik
                    </h1>
                    <button className="bg-blue-600 text-white px-6 py-3 mt-4 rounded-full hover:bg-blue-800 font-sogeo font-bold">
                        Pengajuan Kredit
                    </button>
                </div>
            </div>

            {/* Keunggulan */}
            <div className="bg-white p-6 flex flex-col items-center mx-auto">
                <div className="w-full mb-4">
                    <h3 className="font-bold text-lg text-[#003868]">
                        Keunggulan Bank ABDI Bagi <br /> Anda Calon Nasabah Kami
                    </h3>
                </div>
                <div className="flex space-x-6 w-full justify-center">
                    {["Cepat", "Akurat", "Aman", "Menguntungkan"].map((title, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <h3 className="font-bold text-[#003868]">{title}</h3>
                            <p className="text-center text-[#003868]">
                                {title === "Cepat" && "Tanggap dan Sigap Melayani Anda"}
                                {title === "Akurat" && "Cepat, Tepat, dan Benar"}
                                {title === "Aman" && "Jaminan oleh LPS (Lembaga Penjamin Simpanan)"}
                                {title === "Menguntungkan" && "Biaya dan Suku Bunga yang Menarik"}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
