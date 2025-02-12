import Header from "../pages/components/layout/header";
import Hero from "../pages/components//section/hero";

const AboutPage: React.FC = () => {
    return (
        <div>
            <Header />
            <Hero
                imageSrc="https://bankabdi.co.id/img/banner/hero-about.webp"
                title="Sekilas Bank Abdi"
                showButton={false} />
            
            {/* Keunggulan Section */}
            <section className="section bg-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-8/12 text-left relative">
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-800"></div>
                            <p className="text-base text-gray-700 pl-6">
                                PT BPR Akar Budaya Dana Indonesia atau disebut BANK ABDI sebelumnya bernama PT BPR Sarana
                                Ekonomi yang didirikan pada bulan Desember 1988, dan pada April 2006 berganti nama menjadi PT
                                BPR Sentra Rahardja, kemudian berganti nama menjadi PT BPR Anugerah Multi Dana. Selanjutnya, pada
                                bulan Mei 2021 diakuisisi dan resmi berganti kepemilikan menjadi PT Akar Berlian Sentosa (ABS) dan
                                PT Akar Budaya Indonesia (ABI).
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
                            <h2 className="text-indigo-600 text-3xl font-semibold">Nilai-Nilai Perusahaan</h2>
                        </div>

                        {/* Adapting */}
                        <div className="w-full sm:w-1/2 md:w-1/4 text-left">
                            <div className="ui-icon-block px-12">
                                <h6 className="text-lg font-semibold mt-2">Adapting</h6>
                                <p className="text-sm text-gray-700 mt-2">
                                    Beradaptasi dengan cepat pada perubahan ekonomi pasar yang konsisten dan meramalkan keunggulan kompetitif yang baru.
                                </p>
                            </div>
                        </div>

                        {/* Blessing */}
                        <div className="w-full sm:w-1/2 md:w-1/4 text-left">
                            <div className="ui-icon-block px-12">
                                <h6 className="text-lg font-semibold mt-2">Blessing</h6>
                                <p className="text-sm text-gray-700 mt-2">
                                    Kepercayaan pelanggan menjadi faktor utama kami dalam melayani dan memberikan nilai tambah bagi keperluan pelanggan.
                                </p>
                            </div>
                        </div>

                        {/* Developing */}
                        <div className="w-full sm:w-1/2 md:w-1/4 text-left">
                            <div className="ui-icon-block px-12">
                                <h6 className="text-lg font-semibold mt-2">Developing</h6>
                                <p className="text-sm text-gray-700 mt-2">
                                    Selalu bergerak dan berkembang sehingga menjadikan bank yang terkinikan.
                                </p>
                            </div>
                        </div>

                        {/* Improving */}
                        <div className="w-full sm:w-1/2 md:w-1/4 text-left">
                            <div className="ui-icon-block px-12">
                                <h6 className="text-lg font-semibold mt-2">Improving</h6>
                                <p className="text-sm text-gray-700 mt-2">
                                    Selalu berinovasi dalam upaya peningkatan kualitas pelayanan terhadap pelanggan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
