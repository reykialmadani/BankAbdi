import Image from "next/image";
import Keunggulan from "../section/keunggulan";
import Perbankan from "../section/perbankan";
import DeviceSliderColumn from "../section/deviceSlider";
import Testimoni from "../section/testimoni";
import Information from "../section/information";
import Blog from "../section/blog";

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
            <section>
                <Keunggulan />
            </section>

            {/* Banking Solutions Section */}
            <section>
                <Perbankan />
            </section>
            
            {/* Device Sections */}
            <section>
                <DeviceSliderColumn/>
            </section>

            {/* Testimoni Section */}
            <section>
                <Testimoni/>
            </section>

            {/* Information Section */}
            <section>
                <Information/>
            </section>

            {/* Blog Section */}
            <section>
                <Blog/>
            </section>
        </div>
    );
};

export default MainPage;
