import { useState } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    content: "Saya sangat berharap BPR ABDI dapat tumbuh dan berkembang dengan baik sehingga berkontribusi dalam pembiayaan kepada pelaku usaha mikro kecil dan menengah di Indonesia",
    author: "Bpk. Roberto Akyuwen",
    position: "Kepala OJK KR 1 DKI Jakarta-Banten",
    avatar: "https://bankabdi.co.id/img/avatars/pak_robert2.webp",
  },
  {
    content: "Semoga BANK ABDI dapat lebih membantu kegiatan masyarakat khususnya dalam rangka UMKM sehingga dapat membantu pemulihan Ekonomi Nasional",
    author: "Bpk. Antonius Prihadi",
    position: "Ketua Perbarindo Komisariat DKI Jakarta",
    avatar: "https://bankabdi.co.id/img/avatars/pak_anton.webp",
  }
];

const TestimonialSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Apa Kata Mereka?</h2>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            →
          </button>

          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div className="transition-transform duration-300 ease-in-out">
              {/* Card */}
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6 border border-gray-200">
                  <div className="flex items-center mb-4">
                    {/* Avatar */}
                    <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonials[currentSlide].avatar}
                        alt={`Testimonial by ${testimonials[currentSlide].author}`}
                        className="w-full h-full object-cover"
                        width={80}
                        height={80}
                      />
                    </div>

                    {/* Author Info */}
                    <div>
                      <h6 className="font-semibold text-gray-800 text-lg">
                        {testimonials[currentSlide].author}
                      </h6>
                      <p className="text-gray-600 text-sm">
                        {testimonials[currentSlide].position}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-gray-700 text-lg italic">
                    {testimonials[currentSlide].content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 mx-1 rounded-full ${
                  currentSlide === index ? 'bg-gray-800' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
