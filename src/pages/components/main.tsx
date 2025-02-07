import Image from "next/image";

const features = [
    { title: "Cepat", description: "Tanggap dan Sigap Melayani Anda" },
    { title: "Akurat", description: "Cepat, Tepat, dan Benar" },
    { title: "Aman", description: "Jaminan oleh LPS (Lembaga Penjamin Simpanan)" },
    { title: "Menguntungkan", description: "Biaya dan Suku Bunga yang Menarik" },
];

const bankingSolutions = [
    { title: "Tabungan", image: "/assets/tabungan.jpg", description: "Simpan dana Anda dengan aman dan dapatkan berbagai keuntungan menarik" },
    { title: "Deposito", image: "/assets/deposito.jpg", description: "Investasikan dana Anda dengan bunga kompetitif dan jangka waktu fleksibel" },
    { title: "Kredit", image: "/assets/kredit.jpg", description: "Wujudkan impian Anda dengan solusi pembiayaan yang tepat" },
];

const MainPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-screen overflow-hidden">
                <Image src="/assets/herologo1.jpg" layout="fill" objectFit="cover" alt="Hero Logo" className="z-0" />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-8 z-10">
                    <h1 className="text-white text-4xl font-bold leading-snug">
                        Sahabat Anda dalam Menggapai Masa Depan <br /> yang Lebih Baik
                    </h1>
                    <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-800 font-bold">
                        Pengajuan Kredit
                    </button>
                </div>
            </div>

            {/* Keunggulan Section */}
            <section className="p-6 mx-auto max-w-6xl">
                <h3 className="text-lg font-bold text-[#003868] mb-4">
                    Keunggulan Bank ABDI Bagi Anda Calon Nasabah Kami
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="text-[#003868]">
                            <h3 className="font-bold">{feature.title}</h3>
                            <p className="text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Solusi Perbankan Section */}
            <section className="bg-gray-100 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-[#003868] text-center mb-8">
                        Solusi Perbankan Kami, untuk Anda Nasabah Kami
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {bankingSolutions.map((solution, index) => (
                            <div key={index} className="bg-white rounded-md shadow overflow-hidden">
                                <div className="relative h-32 w-full">
                                    <Image src={solution.image} layout="fill" objectFit="cover" alt={solution.title} />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-[#003868] mb-1">{solution.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{solution.description}</p>
                                    <button className="text-[#003868] text-sm font-semibold hover:text-blue-700">
                                        Selengkapnya →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainPage;
