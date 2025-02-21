import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface TableData {
  headers: string[];
  rows: string[][];
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
      <div className="bg-white rounded-lg w-full max-w-6xl mx-auto">
        <div className="p-4 border-b">
          <h5 className="text-xl font-semibold text-black text-center">
            {title}
          </h5>
        </div>
        <div className="p-2 sm:p-4 max-h-[70vh] overflow-y-auto">
          <div className="overflow-x-auto w-full">{children}</div>
        </div>
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

const ResponsiveTable: FC<{ data: TableData }> = ({ data }) => {
  // Responsive table component that adapts based on screen size
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse text-black text-sm md:text-sm">
        <thead>
          <tr className="bg-gray-50">
            {data.headers.map((header: string, index: number) => (
              <th key={index} className="p-2 text-black font-semibold text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row: string[], index: number) => (
            <tr key={index} className={index % 2 === 0 ? "bg-[#DEECF9]" : ""}>
              {row.map((cell: string, cellIndex: number) => (
                <td key={cellIndex} className="p-2 whitespace-normal">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CreditSection: FC = () => {
  const [modalPersyaratan, setModalPersyaratan] = useState(false);
  const router = useRouter();
  const { id } = router.query; // Mendapatkan parameter `id` dari URL

  // Data untuk tabel-tabel
  const tableData = {
    "tabungan-abdi": {
      title: "BIAYA-BIAYA TABUNGAN ABDI",
      headers: ["KETERANGAN", "PERORANGAN", "PERUSAHAAN"],
      rows: [
        ["Setoran Awal Minimum", "Rp.100.000", "Rp.500.000"],
        ["Setoran Minimum Selanjutnya", "Rp.10.000", "Rp.250.000"],
        ["Saldo Minimum Dapat Bunga", "Rp.50.000", "Rp.250.000"],
        ["Saldo Minimum", "Rp.25.000", "Rp.100.000"],
        ["Biaya Dormant (Saldo Minimum 6 bulan dan rekening tidak aktif)", "Rp.5.000", "Rp.10.000"],
        ["Biaya Administrasi", "Rp.2.500", "Rp.10.000"],
        ["Minimum Saldo Kena Pajak", "Rp 7.500.001", "Rp 7.500.001"],
        ["Biaya Tutup Rekening", "Rp 15.000", "Rp 15.000"],
        ["Suku Bunga per Tahun", "1.50%", "1.50%"],
        ["Pajak Penghasilan (PPh)", "20%", "20%"]
      ]
    },
    "tabungan-abdiku": {
      title: "BIAYA TABUNGAN ABDIKU",
      headers: ["KETERANGAN", "Tabungan ABDIKU"],
      rows: [
        ["Setoran Awal Minimum", "Rp.20.000"],
        ["Setoran Minimum Selanjutnya", "Rp 10.000"],
        ["Saldo Minimum Dapat Bunga", "Rp 50.000"],
        ["Saldo Minimum", "Rp 20.000"],
        ["Biaya Dormant (Saldo Minimum 6 bulan dan rekening tidak aktif)", "Rp 2.000"],
        ["Biaya Administrasi", "Free"],
        ["Minimum Saldo Kena Pajak", "Rp 7.500.001"],
        ["Biaya Tutup Rekening", "Rp 20.000"],
        ["Suku Bunga per Tahun", "1.00%"],
        ["Pajak Penghasilan (PPh)", "20%"]
      ]
    },
    "tabungan-abdi-simple": {
      title: "BIAYA TABUNGAN ABDI SIMPLE",
      headers: ["KETERANGAN", "Tabungan ABDI SIMPLE"],
      rows: [
        ["Setoran Awal Minimum", "Rp 5.000"],
        ["Setoran Minimum Selanjutnya", "Rp 1.000"],
        ["Saldo Minimum Dapat Bunga", "-"],
        ["Saldo Minimum", "Rp 5000"],
        ["Biaya Dormant (Saldo Minimum 12 bulan dan rekening tidak aktif)", "Rp 1000"],
        ["Biaya Administrasi", "Free"],
        ["Minimum Saldo Kena Pajak", "Rp 7.500.001"],
        ["Biaya Tutup Rekening", "Rp 5.000"],
        ["Suku Bunga per Tahun", "0%"],
        ["Pajak Penghasilan (PPh)", "0%"]
      ]
    }
  };

  // Get current table data based on ID
  const getCurrentTableData = () => {
    const currentId = typeof id === 'string' ? id : '';
    return tableData[currentId as keyof typeof tableData] || {
      title: "DEFAULT TITLE",
      headers: ["KETERANGAN"],
      rows: [["Content not available for this tabungan."]]
    };
  };

  const currentData = getCurrentTableData();

  return (
    <>
      <div className="bg-[#eff6fc] py-8">
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
                  TABEL BIAYA
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
                Tabel Biaya
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Persyaratan dengan tabel responsif */}
      <CreditModal
        isOpen={modalPersyaratan}
        onClose={() => setModalPersyaratan(false)}
        title={currentData.title}
      >
        <ResponsiveTable data={currentData} />
      </CreditModal>
    </>
  );
};

export default CreditSection;