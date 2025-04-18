import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  content: string;
  author: string;
  position: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    content:
      'Saya sangat berharap BPR ABDI dapat tumbuh dan berkembang dengan baik sehingga berkontribusi dalam pembiayaan kepada pelaku usaha mikro kecil dan menengah di Indonesia',
    author: 'Bpk. Roberto Akyuwen',
    position: 'Kepala OJK KR 1 DKI Jakarta-Banten',
    avatar: 'https://bankabdi.co.id/img/avatars/pak_robert2.webp',
  },
  {
    content:
      'Semoga BANK ABDI dapat lebih membantu kegiatan masyarakat khususnya dalam rangka UMKM sehingga dapat membantu pemulihan Ekonomi Nasional',
    author: 'Bpk. Antonius Prihadi',
    position: 'Ketua Perbarindo Komisariat DKI Jakarta',
    avatar: 'https://bankabdi.co.id/img/avatars/pak_anton.webp',
  },
];

// Tambah dummy slide untuk infinite scroll
const extendedTestimonials = [
  testimonials[testimonials.length - 1], // duplikat terakhir
  ...testimonials,
  testimonials[0], // duplikat pertama
];

const TestimonialSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      // Posisikan ke slide pertama asli
      sliderRef.current.scrollLeft = sliderRef.current.offsetWidth;
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    if (!sliderRef.current) return;
    setIsDragging(false);

    const slideWidth = sliderRef.current.offsetWidth;
    const currentScroll = sliderRef.current.scrollLeft;
    const nearestSlide = Math.round(currentScroll / slideWidth);

    // Loop logic
    if (nearestSlide === 0) {
      // ke duplikat terakhir → teleport ke terakhir asli
      sliderRef.current.scrollLeft = slideWidth * testimonials.length;
      setCurrentSlide(testimonials.length - 1);
      return;
    } else if (nearestSlide === testimonials.length + 1) {
      // ke duplikat pertama → teleport ke pertama asli
      sliderRef.current.scrollLeft = slideWidth;
      setCurrentSlide(0);
      return;
    }

    sliderRef.current.scrollTo({
      left: nearestSlide * slideWidth,
      behavior: 'smooth',
    });
    setCurrentSlide(nearestSlide - 1); // offset karena dummy di depan
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleSlideClick = (index: number) => {
    if (isDragging || !sliderRef.current) return;

    const slideWidth = sliderRef.current.offsetWidth;
    const actualIndex = index + 1; // offset karena dummy depan

    sliderRef.current.scrollTo({
      left: actualIndex * slideWidth,
      behavior: 'smooth',
    });
    setCurrentSlide(index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Apa Kata Mereka?</h2>
        </div>

        <div className="relative">
          <div
            ref={sliderRef}
            className={`overflow-x-hidden flex cursor-grab active:cursor-grabbing ${
              isDragging ? 'select-none' : 'select-auto'
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0"
                onClick={() => handleSlideClick(index - 1)} // offset
              >
                <div className="max-w-2xl mx-auto px-4">
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border border-gray-200 relative">
                    <p className="text-gray-700 text-lg italic mb-8">{testimonial.content}</p>
                  </div>
                </div>

                <div className="flex items-center justify-start mt-4 ml-[22%]">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={`Testimonial by ${testimonial.author}`}
                      className="w-full h-full object-cover"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-800 text-sm">{testimonial.author}</h6>
                    <p className="text-gray-600 text-xs">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideClick(index)}
                className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
