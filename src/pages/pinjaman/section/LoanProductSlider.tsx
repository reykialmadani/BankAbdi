import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback, useRef } from "react";

interface LoanProduct { 
  title: string;
  description: string;
  icon: string;
  href: string;
}

interface LoanProductsSliderProps {
  loanProducts: LoanProduct[];
}

const LoanProductsSlider = ({ loanProducts }: LoanProductsSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderContainerRef = useRef<HTMLUListElement>(null);

  // Function to determine slides per view based on screen width
  const updateSlidesPerView = useCallback(() => {
    if (window.innerWidth < 640) {
      setSlidesPerView(1);
    } else if (window.innerWidth < 1024) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  }, []);

  // Update slider position
  const updateSlider = useCallback(() => {
    if (sliderContainerRef.current) {
      const slideWidth = 100 / slidesPerView;
      const offset = currentIndex * -slideWidth;
      sliderContainerRef.current.style.transform = `translateX(${offset}%)`;
    }
  }, [currentIndex, slidesPerView]);

  // Handle navigation
  const handlePrevClick = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const handleNextClick = useCallback(() => {
    if (currentIndex < loanProducts.length - slidesPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, loanProducts.length, slidesPerView]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      handleNextClick();
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      handlePrevClick();
    }
  };

  useEffect(() => {
    // Initial setup
    updateSlidesPerView();
    
    // Add resize listener
    window.addEventListener('resize', updateSlidesPerView);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, [updateSlidesPerView]);

  useEffect(() => {
    updateSlider();
  }, [currentIndex, slidesPerView, updateSlider]);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 mx-auto max-w-[1100px]">
        Produk Pinjaman Lainnya
      </h4>

      <div className="relative">
        <div className="overflow-hidden mx-auto max-w-[1100px]">
          <ul 
            ref={sliderContainerRef}
            className="flex transition-transform duration-300 ease-out"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {loanProducts.map((product, index) => (
              <li 
                key={index} 
                className={`${
                  slidesPerView === 1 ? 'w-full' : 
                  slidesPerView === 2 ? 'w-1/2' : 'w-1/3'
                } flex-shrink-0 px-1 sm:px-2 md:px-3`}
                style={{transition: 'width 0.3s ease'}}
              >
                <div className="bg-gray-100 w-full h-[270px] rounded-lg shadow-lg hover:bg-gray-300 transition-all duration-300">
                  <Link href={product.href}>
                    <div className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                          <Image
                            src={product.icon}
                            alt={product.title}
                            sizes="(max-width: 640px) 32px, 40px"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority={index === 0}
                          />
                        </div>
                        <h6 className="text-sm sm:text-base font-semibold text-gray-900">
                          {product.title}
                        </h6>
                      </div>
                      <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">
                        {product.description}
                      </p>
                    </div>
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t flex justify-between items-center">
                      <span className="text-blue-600 text-xs sm:text-sm">
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

        <button
          type="button"
          className="slider-nav absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50"
          aria-label="Previous"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          style={{opacity: currentIndex === 0 ? 0.5 : 1}}
        >
          <span className="text-blue-600">&lt;</span>
        </button>

        <button
          type="button"
          className="slider-nav-next absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50"
          aria-label="Next"
          onClick={handleNextClick}
          disabled={currentIndex >= loanProducts.length - slidesPerView}
          style={{opacity: currentIndex >= loanProducts.length - slidesPerView ? 0.5 : 1}}
        >
          <span className="text-blue-600">&gt;</span>
        </button>
        
        {/* Pagination indicators (optional) */}
        <div className="flex justify-center mt-4">
          {Array.from({length: Math.ceil(loanProducts.length / slidesPerView)}).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`mx-1 w-2 h-2 rounded-full ${
                index === Math.floor(currentIndex / slidesPerView) 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanProductsSlider;