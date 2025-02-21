import Image from "next/image";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  paragraph?: string; 
  showButton?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, paragraph, showButton = true }) => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <Image 
        src={imageSrc} 
        layout="fill" 
        objectFit="cover" 
        alt="Hero Logo" 
        className="z-0"
      />
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 z-10">
      <h1 className="text-white text-3xl md:text-5xl font-bold leading-snug pl-8">
          {title.split(" ").map((word, index) => {
            return index === 3 ? (
              <>
                {word} <br /> 
              </>
            ) : (
              word + " "
            );
          })}
        </h1>
        
        {paragraph && (
          <p className="text-white mt-4 text-base pl-8 max-w-[600px] break-words">
            {paragraph}
          </p>
        )}

        {showButton && (
          <button className="ml-8 mt-4 bg-[#003868] text-white px-6 py-3 rounded-full hover:bg-blue-800 font-bold">
            Pengajuan Kredit
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
