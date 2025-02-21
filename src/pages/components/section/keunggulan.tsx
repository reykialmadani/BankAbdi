const features = [
    { title: "Cepat", description: "Tanggap dan Sigap Melayani Anda" },
    { title: "Akurat", description: "Cepat, Tepat, dan Benar" },
    { title: "Aman", description: "Jaminan oleh LPS (Lembaga Penjamin Simpanan)" },
    { title: "Menguntungkan", description: "Biaya dan Suku Bunga yang Menarik" },
];

const Keunggulan = () => {
    return (
        <section className="p-6 mx-auto max-w-8xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h3 className="text-lg font-bold text-[#003868] mb-4 md:mb-0 md:w-1/3">
                    Keunggulan Bank ABDI Bagi <br />Anda Calon Nasabah Kami
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-3 md:w-2/3">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="text-[#003868] md:text-left"
                        >
                            <h3 className="font-bold mb-1">{feature.title}</h3>
                            <p className="text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Keunggulan;