import Image from "next/image";
import { motion } from "framer-motion";

interface HeroSectionProps {
  imageSrc: string;
  title: string;
  paragraph?: string; 
  showButton?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ imageSrc, title, paragraph, showButton = true }) => {
  const segoeUIStyles = {
    fontFamily: "'Segoe UI', sans-serif",
  };

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
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-3xl md:text-5xl font-semibold leading-snug pl-8"
          style={segoeUIStyles}
        >
          {title.split(" ").map((word, index) => (
            index === 3 ? (
              <>
                {word} <br />
              </>
            ) : (
              word + " "
            )
          ))}
        </motion.h1>
        
        {paragraph && (
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white mt-4 text-base pl-8 max-w-[600px] break-words"
            style={segoeUIStyles}
          >
            {paragraph}
          </motion.p>
        )}

        {showButton && (
          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="ml-8 mt-4 bg-[#003868] text-white px-6 py-3 rounded-full hover:bg-blue-800 font-semibold"
            style={segoeUIStyles}
          >
            Pengajuan Kredit
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default HeroSection;