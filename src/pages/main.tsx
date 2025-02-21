import Hero from "./components/section/hero"
import Keunggulan from "./components/section/keunggulan";
import Perbankan from "./components/section/perbankan";
import DeviceSliderColumn from "./components/section/deviceSlider";
import Testimoni from "./components/section/testimoni";
import Information from "./components/section/information";
import Blog from "./components/section/blog";

const MainPage = () => {
    return (
        <div className="bg-white">
            
            {/* Hero Section */}
            <section>
            <Hero
            imageSrc="https://bankabdi.co.id/img/banner/hero-tabungan-abdiku.webp"
            title="Sahabat Anda dalam Menggapai Masa Depan yang Lebih Baik"
            showButton = {true}
            />
            </section>

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
