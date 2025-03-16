import Image from "next/image";
import { FC, useState, useEffect } from "react";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-[#eff6fc] rounded-lg w-full mx-auto max-w-6xl max-h-[90vh] flex flex-col">
        <div className="p-3 md:p-4 border-b flex justify-between items-center">
          <h5 className="text-lg md:text-xl font-semibold text-black">
            {title}
          </h5>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-3 md:p-4 overflow-y-auto flex-grow">
          <div className="overflow-x-auto">{children}</div>
        </div>
        <div className="p-3 md:p-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 md:px-4 md:py-2 rounded transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const CreditSection: FC = () => {
  const [modalPerkreditan, setModalPerkreditan] = useState(false);
  const [modalPersyaratan, setModalPersyaratan] = useState(false);

  return (
    <>
      <div className="py-8 w-full md:py-12">
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
                  KETENTUAN PERKREDITAN
                </h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                Klik tombol dibawah ini untuk membuka pop up ketentuan
                perkreditan.
              </h6>
              <button
                onClick={() => setModalPerkreditan(true)}
                className="border-2 bg-white text-black px-6 py-2 rounded-lg hover:text-blue-600"
              >
                Ketentuan Perkreditan
              </button>
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
                  PERSYARATAN KREDIT
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
                Persyaratan Kredit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Perkreditan */}
      <CreditModal
        isOpen={modalPerkreditan}
        onClose={() => setModalPerkreditan(false)}
        title="KETENTUAN PERKREDITAN"
      >
        <div className="text-sm md:text-sm">
          <table className="min-w-full table-auto border-collapse text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-1 md:p-2 text-left font-medium">
                  Keterangan
                </th>
                <th className="border p-1 md:p-2 text-left font-medium">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#DEECF9] border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">Denda Keterlambatan Bayar</td>
                <td className="border p-1 md:p-2">
                  0,20% perhari keterlambatan dikali dengan nilai angsuran
                  tertunggak
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">
                  Denda Pelunasan Dipercepat
                </td>
                <td className="border p-1 md:p-2">
                  3% dikali Sisa Pinjaman yang dilunasi (minimal Rp 200.000)
                </td>
              </tr>
              <tr className="bg-[#DEECF9] border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">Pengikatan Notaril</td>
                <td className="border p-1 md:p-2">Tentative</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">Asuransi (Kecuali KTA)</td>
                <td className="border p-1 md:p-2">
                  KPM = TLO <br />
                  KPR = Jiwa dan Kebakaran (subject to Usia dan Jaminan)
                </td>
              </tr>
              <tr className="bg-[#DEECF9] border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">
                  Debt Service Ratio (DSR)/Kemampuan Bayar
                </td>
                <td className="border p-1 md:p-2">
                  40% dari Penghasilan Bersih (THP)
                </td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">Batas Maksimum Pembiayaan</td>
                <td className="border p-1 md:p-2">
                  80% dari Nilai Jaminan/Agunan
                </td>
              </tr>
              <tr className="bg-[#DEECF9] border-b hover:bg-gray-50">
                <td className="border p-1 md:p-2">
                  Batas Maksimum Usia Pemohon
                </td>
                <td className="border p-1 md:p-2">
                  Perorangan = pada saat lunas maksimal 55 thn <br />
                  Profesional = pada saat lunas maksimal 60 thn
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CreditModal>

      {/* Modal Persyaratan */}
      <CreditModal
        isOpen={modalPersyaratan}
        onClose={() => setModalPersyaratan(false)}
        title="PERSYARATAN KREDIT"
      >
        <div className="md:text-sm lg:text-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-black">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    PERSYARATAN
                  </th>
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    MOTOR
                  </th>
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    MOBIL
                  </th>
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    KPR
                  </th>
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    Perorangan
                  </th>
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    Badan Usaha
                  </th>
                  <th className="p-1 md:p-2 text-black font-semibold whitespace-nowrap">
                    KTA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2 whitespace-nowrap">
                    Photocopy KTP Suami dan Istri
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2 whitespace-nowrap">
                    Photocopy Kartu Keluarga (KK)
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                {/* Rest of rows follow same pattern */}
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Photocopy Surat Nikah Suami dan Istri atau Akta Cerai
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">Pas Foto 4x6 Suami dan Istri</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Surat keterangan bekerja/ijin profesional/surat keterangan
                    penghasilan
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">
                    Asli slip gaji bulan terakhir/surat keterangan penghasilan
                    (u/Joint income)
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Copy Rekening Tabungan/Bank 3 Bulan terkahir (Suami & Istri)
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">
                    Sertifikat SHM/SHGB/SHMSRS (untuk jaminan tanah)
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    BPKB berikut photocopy STNK dan KIR (untuk jaminan kendaraan
                    bermotor)
                  </td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">
                    SPPT dan STTS PBB tahun terakhir
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Photocopy IMB (Untuk Jaminan SHM)
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">Photocopy KTP Pengurus</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">Photocopy NPWP</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">
                    Photocopy Tanda Daftar Perusahaan (TDP)/NIB
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Photocopy Surat Izin Usaha Perdagangan (SIUP)
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">
                    Photocopy Surat Keterangan Domisili
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Photocopy Akta Pendirian & Perubahan-perubahannya
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr>
                  <td className="p-1 md:p-2">
                    Laporan Keuangan/Neraca Audit/Non Audit
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>
                <tr className="bg-[#DEECF9]">
                  <td className="p-1 md:p-2">
                    Photocopy bukti pendaftaran di Pengadilan Negeri/Instansi
                    terkait
                  </td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                  <td className="p-1 md:p-2 text-center">v</td>
                  <td className="p-1 md:p-2 text-center">-</td>
                </tr>

                {/* Additional rows omitted for brevity but would follow same pattern */}
              </tbody>
            </table>
          </div>
        </div>
      </CreditModal>
    </>
  );
};

export default CreditSection;
