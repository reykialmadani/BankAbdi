import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CreditModal: FC<CreditModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-3 sm:p-4 border-b">
          <h5 className="text-lg sm:text-xl font-semibold text-black text-center">
            {title}
          </h5>
        </div>
        <div className="p-2 sm:p-4 overflow-y-auto flex-grow">
          {children}
        </div>
        <div className="p-3 sm:p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CreditSection: FC = () => {
  const [modalPersyaratan, setModalPersyaratan] = useState(false);
  const router = useRouter();
  const { id } = router.query; 

  // Menyesuaikan isi berdasarkan `id`
  const getContentBasedOnId = (id: string | string[] | undefined) => {
    switch (id) {
      case "deposito-berjangka":
      case "formulir-deposito":
      case "kalkulator-deposito":
        return {
          title: "",
          content: (
            <div className="p-2 sm:p-6">
              {/* Suku Bunga Section */}
              <div className="mb-6">
                <h5 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-[#003868]">
                  SUKU BUNGA DEPOSITO
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs sm:text-sm md:text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className=" p-1 sm:p-2 text-left text-black">NOMINAL</th>
                        <th className=" p-1 sm:p-2 text-black">1 Bulan</th>
                        <th className=" p-1 sm:p-2 text-black">3 Bulan</th>
                        <th className=" p-1 sm:p-2 text-black">6 Bulan</th>
                        <th className=" p-1 sm:p-2 text-black">12 Bulan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#DEECF9]">
                        <td className=" p-1 sm:p-2 text-black">Rp 10jt - &lt; Rp 500jt</td>
                        <td className=" p-1 sm:p-2 text-center text-black">4,75%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">4,75%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,00%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,00%</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className=" p-1 sm:p-2 text-black">Rp 500jt - &lt; Rp 1M</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,25%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,25%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,50%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,75%</td>
                      </tr>
                      <tr className="bg-[#DEECF9]">
                        <td className=" p-1 sm:p-2 text-black">&gt; Rp 1M</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,75%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,75%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">5,75%</td>
                        <td className=" p-1 sm:p-2 text-center text-black">6,00%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            
              {/* Biaya Administrasi Section */}
              <div>
                <h5 className="text-lg sm:text-xl font-semibold text-center mb-3 sm:mb-4 text-[#003868]">
                  BIAYA ADMINISTRASI DEPOSITO
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full -collapse text-xs sm:text-sm md:text-sm">
                    <thead>
                      <tr className="bg-gray-100">
                        <th colSpan={2} className=" p-1 sm:p-2 text-center text-gray-800">
                          BIAYA ADMINISTRASI (Pencairan Sebelum Jatuh Tempo)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-[#DEECF9]">
                        <td className=" p-1 sm:p-2 text-black">Rp 0 - Rp 50jt</td>
                        <td className=" p-1 sm:p-2 text-center text-black">Rp 50.000</td>
                      </tr>
                      <tr className="bg-gray-100">
                        <td className=" p-1 sm:p-2 text-black">Rp 50jt - Rp 100jt</td>
                        <td className=" p-1 sm:p-2 text-center text-black">Rp 75.000</td>
                      </tr>
                      <tr className="bg-[#DEECF9]">
                        <td className=" p-1 sm:p-2 text-black">&gt; Rp 100jt</td>
                        <td className=" p-1 sm:p-2 text-center text-black">Rp 100.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ),
        };
      default:
        return {
          title: "DEFAULT TITLE",
          content: <p>Content not available for this tabungan.</p>,
        };
    }
  };

  const { title, content } = getContentBasedOnId(id);

  return (
    <>
      <div className="bg-[#eff6fc] py-8 ">
        <div className="container mx-auto px-4 max-w-[1100px]">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg p-6 shadow-sm">
            <hr className="border-t-2 border-gray-300 my-4" />
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="https://bankabdi.co.id/icons/warning.png"
                  alt="Warning"
                  width={24}
                  height={24}
                />
                <h3 className="text-[#003868] font-semibold text-xl">
                  INFORMASI TAMBAHAN
                </h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                BANK ABDI berhak untuk menolak pembukaan rekening antara lain
                jika nasabah tidak memenuhi persyaratan pembukaan rekening.
                Pencairan Deposito harus membawa Bilyet Deposito yang asli.
                Pencairan Deposito Pokok + Bunga harus dikreditkan ke nama yang
                sama dengan rekening Deposito
                <br />
                Dijamin oleh Lembaga Penjamin Simpanan (LPS).
              </h6>
            </div>

            <div className="rounded-lg p-6 shadow-sm">
            <hr className="border-t-2 border-gray-300 my-4" />
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="https://bankabdi.co.id/icons/clipboard.png"
                  alt="Clipboard"
                  width={24}
                  height={24}
                />
                <h3 className="text-[#003868] font-semibold text-xl">
                  TABEL SUKU BUNGA DAN BIAYA
                </h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                Klik tombol dibawah ini untuk membuka pop up persyaratan
                perkreditan.
              </h6>
              <button
                onClick={() => setModalPersyaratan(true)}
                className="border-2 bg-white text-black px-6 py-2 rounded-lg hover:text-blue-600"
              >
                Tabel Suku Bunga
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Persyaratan */}
      <CreditModal
        isOpen={modalPersyaratan}
        onClose={() => setModalPersyaratan(false)}
        title={title}
      >
        {content}
      </CreditModal>
    </>
  );
};

export default CreditSection;