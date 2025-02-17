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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-6xl w-full mx-4">
        <div className="p-4 border-b">
          <h5 className="text-xl font-semibold text-black text-center">
            {title}
          </h5>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">{children}</div>
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors duration-200"
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
  const { id } = router.query; // Mendapatkan parameter `id` dari URL

  // Menyesuaikan isi berdasarkan `id`
  const getContentBasedOnId = (id: string | string[] | undefined) => {
    switch (id) {
      case "tabungan-abdi":
        return {
          title: "BIAYA-BIAYA TABUNGAN ABDI",
          content: (
            <table className="w-full border-collapse text-black">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-black font-semibold">
                    KETERANGAN
                  </th>
                  <th className="border p-2 text-black font-semibold">
                    PERORANGAN
                  </th>
                  <th className="border p-2 text-black font-semibold">
                    PERUSAHAAN
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Setoran Awal Minumum</td>
                  <td className="border p-2">Rp.100.000</td>
                  <td className="border p-2">Rp.500.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Setoran Minimum Selanjutnya</td>
                  <td className="border p-2">Rp.10.000</td>
                  <td className="border p-2">Rp.250.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Saldo Minimum Dapat Bunga</td>
                  <td className="border p-2">Rp.50.000</td>
                  <td className="border p-2">Rp.250.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Saldo Minimum </td>
                  <td className="border p-2">Rp.25.000</td>
                  <td className="border p-2">Rp.100.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">
                    Biaya Dormant (Saldo Minimum 6 bulan dan rekening tidak
                    aktif)
                  </td>
                  <td className="border p-2">Rp.5.000</td>
                  <td className="border p-2">Rp.10.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Biaya Administrasi</td>
                  <td className="border p-2">Rp.2.500</td>
                  <td className="border p-2">Rp.10.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Minimum Saldo Kena Pajak</td>
                  <td className="border p-2">Rp 7.500.001</td>
                  <td className="border p-2">Rp 7.500.001</td>
                </tr>
                <tr>
                  <td className="border p-2">Biaya Tutup Rekening</td>
                  <td className="border p-2">Rp 15.000</td>
                  <td className="border p-2">Rp 15.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Suku Bunga per Tahun</td>
                  <td className="border p-2">1.50%</td>
                  <td className="border p-2">1.50%</td>
                </tr>
                <tr>
                  <td className="border p-2">Pajak Penghasilan (PPh)</td>
                  <td className="border p-2">20%</td>
                  <td className="border p-2">20%</td>
                </tr>
              </tbody>
            </table>
          ),
        };
      case "tabungan-abdiku":
        return {
          title: "BIAYA TABUNGAN 2",
          content: (
            <table className="w-full border-collapse text-black">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-black font-semibold">
                    KETERANGAN
                  </th>
                  <th className="border p-2 text-black font-semibold">
                    Tabungan ABDIKU
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Setoran Awal Minumum</td>
                  <td className="border p-2">Rp.20.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Setoran Awal Minimum</td>
                  <td className="border p-2">Rp 20.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Setoran Minimum Selanjutnya </td>
                  <td className="border p-2">Rp 10.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Saldo Minimum Dapat Bunga</td>
                  <td className="border p-2">Rp 50.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Saldo Minimum</td>
                  <td className="border p-2">Rp 20.000</td>
                </tr>
                <tr>
                  <td className="border p-2">
                    Biaya Dormant (Saldo Minimum 6 bulan dan rekening tidak
                    aktif)
                  </td>
                  <td className="border p-2">Rp 2.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Biaya Administrasi</td>
                  <td className="border p-2">Free</td>
                </tr>

                <tr>
                  <td className="border p-2">Minimum Saldo Kena Pajak</td>
                  <td className="border p-2">Rp 7.500.001</td>
                </tr>

                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Biaya Tutup Rekening</td>
                  <td className="border p-2">Rp 20.000</td>
                </tr>

                <tr>
                  <td className="border p-2">Suku Bunga per Tahun</td>
                  <td className="border p-2">1.00%</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Pajak Penghasilan (PPh)</td>
                  <td className="border p-2">20%</td>
                </tr>
              </tbody>
            </table>
          ),
        };
      case "tabungan-abdi-simple":
        return {
          title: "BIAYA TABUNGAN 3",
          content: (
            <table className="w-full border-collapse text-black">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-black font-semibold">
                    KETERANGAN
                  </th>
                  <th className="border p-2 text-black font-semibold">
                    Tabungan ABDI SIMPLE
                  </th>
                </tr>
              </thead>
              <tbody>
              <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Setoran Awal Minumum</td>
                  <td className="border p-2">Rp 5.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Setoran Awal Minimum</td>
                  <td className="border p-2">Rp 5.000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Setoran Minimum Selanjutnya</td>
                  <td className="border p-2">Rp 1.000</td>
                </tr>
                <tr>
                  <td className="border p-2">Saldo Minimum Dapat Bunga</td>
                  <td className="border p-2">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Saldo Minimum</td>
                  <td className="border p-2">Rp 5000</td>
                </tr>

                <tr>
                  <td className="border p-2">
                    Biaya Dormant (Saldo Minimum 12 bulan dan rekening tidak
                    aktif)
                  </td>
                  <td className="border p-2">Rp 1000</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Biaya Administrasi</td>
                  <td className="border p-2">Free</td>
                </tr>

                <tr>
                  <td className="border p-2">Minimum Saldo Kena Pajak</td>
                  <td className="border p-2">Rp 7.500.001</td>
                </tr>

                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Biaya Tutup Rekening</td>
                  <td className="border p-2">Rp 5.000</td>
                </tr>

                <tr>
                  <td className="border p-2">Suku Bunga per Tahun</td>
                  <td className="border p-2">0%</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="border p-2">Pajak Penghasilan (PPh)</td>
                  <td className="border p-2">0%</td>
                </tr>
                {/* Add other rows specific to tabungan3 */}
              </tbody>
            </table>
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
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="https://bankabdi.co.id/icons/warning.png"
                  alt="Warning"
                  width={24}
                  height={24}
                />
                <h3 className="text-black font-semibold text-xl">
                  INFORMASI TAMBAHAN
                </h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                BANK ABDI berhak untuk menolak pembukaan rekening antara lain
                jika nasabah tidak memenuhi persyaratan pembukaan rekening.
                <br />
                Dijamin oleh Lembaga Penjamin Simpanan (LPS).
              </h6>
            </div>

            <div className="rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="https://bankabdi.co.id/icons/clipboard.png"
                  alt="Clipboard"
                  width={24}
                  height={24}
                />
                <h3 className="text-black font-semibold text-xl">
                  TABEL BIAYA
                </h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                Klik tombol dibawah ini untuk membuka pop up persyaratan
                perkreditan.
              </h6>
              <button
                onClick={() => setModalPersyaratan(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Tabel Biaya
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
