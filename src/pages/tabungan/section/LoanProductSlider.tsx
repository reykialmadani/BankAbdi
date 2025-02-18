import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SavingsProduct {
  title: string;
  description: string;
  icon: string;
  href: string;
}

interface SavingsProductsSliderProps {
  savingsProducts: SavingsProduct[];
}

const SavingsProductsSlider = ({
  savingsProducts,
}: SavingsProductsSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < savingsProducts.length - (isMobile ? 1 : 3)) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="py-8">
      <h4 className="text-2xl font-bold text-gray-900 mb-6 px-4 mx-auto max-w-[1100px]">
        Produk Tabungan Lainnya
      </h4>

      <div className="relative">
        {/* Mobile View */}
        <div className="md:hidden">
          <ul className="flex flex-col gap-4 px-4">
            {savingsProducts.map((product, index) => (
              <li key={index} className="w-full">
                <div className="bg-gray-100 w-full rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300">
                  <Link href={product.href}>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={product.icon}
                            alt={product.title}
                            sizes="40px"
                            fill
                            style={{ objectFit: "contain" }}
                            priority={index === 0}
                          />
                        </div>
                        <h6 className="font-semibold text-gray-900">
                          {product.title}
                        </h6>
                      </div>
                      <p className="mt-4 text-gray-600 text-sm">
                        {product.description}
                      </p>
                    </div>
                    <div className="px-6 py-4 border-t flex justify-between items-center">
                      <span className="text-blue-600 text-sm">
                        Selengkapnya
                      </span>
                      <span className="text-blue-600">&gt;</span>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-hidden mx-auto max-w-[1100px]">
          <ul 
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * 33.33}%)`
            }}
          >
            {savingsProducts.map((product, index) => (
              <li key={index} className="w-1/3 flex-shrink-0 px-1">
                <div className="bg-gray-100 w-full max-w-[350px] h-[270px] rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300">
                  <Link href={product.href}>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative w-10 h-10 flex-shrink-0">
                          <Image
                            src={product.icon}
                            alt={product.title}
                            sizes="40px"
                            fill
                            style={{ objectFit: "contain" }}
                            priority={index === 0}
                          />
                        </div>
                        <h6 className="font-semibold text-gray-900">
                          {product.title}
                        </h6>
                      </div>
                      <p className="mt-4 text-gray-600 text-sm">
                        {product.description}
                      </p>
                    </div>
                    <div className="px-6 py-4 border-t flex justify-between items-center">
                      <span className="text-blue-600 text-sm">
                        Selengkapnya
                      </span>
                      <span className="text-blue-600">&gt;</span>
                    </div>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons (Desktop Only) */}
        <div className="hidden md:block">
          <button
            type="button"
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <span className="text-blue-600">&lt;</span>
          </button>

          <button
            type="button"
            onClick={handleNextClick}
            disabled={currentIndex >= savingsProducts.length - 3}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <span className="text-blue-600">&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingsProductsSlider;