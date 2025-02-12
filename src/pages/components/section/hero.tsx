import Image from "next/image";

interface HeroSectionProps {
  imageSrc: string;
  title: string;     
  showButton?: boolean; 
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, showButton = true }) => {
    return (
        <div className="relative h-screen overflow-hidden">
            <Image src={imageSrc} layout="fill" objectFit="cover" alt="Hero Logo" className="z-0" />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 z-10">
                <h1 className="text-white text-4xl font-bold leading-snug">
                    {title}
                </h1>

                {showButton && (
                    <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-800 font-bold">
                        Pengajuan Kredit
                    </button>
                )}
            </div>
        </div>
    );
};

export default HeroSection;
