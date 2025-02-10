import Image from "next/image";
import DeviceSliderColumn from "./deviceSlider";
import Perbankan from "./perbankan";
import Keunggulan from "./keunggulan";
import Testimoni from "./testimoni";
import Information from "./information";
import Blog from "./blog";

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
            <Keunggulan />
            {/* Banking Solutions Section */}
            <Perbankan />
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
