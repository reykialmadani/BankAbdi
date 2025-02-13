import Link from "next/link";
import Image from "next/image";

// Deklarasi tipe untuk produk pinjaman
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
  return (
    <div className="py-8">
      <h4 className="text-2xl font-bold text-gray-900 mb-6">
        Produk Pinjaman Lainnya
      </h4>

      <div className="relative">
        <div className="overflow-hidden">
          <ul className="slider-container flex transition-transform duration-300">
            {loanProducts.map((product, index) => (
              <li key={index} className="w-1/3 flex-shrink-0 px-4">
                <div className="bg-white rounded-lg shadow-sm h-full">
                  <Link href={product.href}>
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <Image
                          src={product.icon}
                          alt={product.title}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
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

        <button
          type="button"
          className="slider-nav absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50"
          aria-label="Previous"
        >
          <span className="text-blue-600">&lt;</span>
        </button>

        <button
          type="button"
          className="slider-nav-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50"
          aria-label="Next"
        >
          <span className="text-blue-600">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default LoanProductsSlider;
