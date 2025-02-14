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
  const [modalPerkreditan, setModalPerkreditan] = useState(false);
  const [modalPersyaratan, setModalPersyaratan] = useState(false);

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
                  KETENTUAN PERKREDITAN
                </h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                Klik tombol dibawah ini untuk membuka pop up ketentuan
                perkreditan.
              </h6>
              <button
                onClick={() => setModalPerkreditan(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Ketentuan Perkreditan
              </button>
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
                  PERSYARATAN KREDIT
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
        <table className="min-w-full table-auto border-collapse text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left font-medium text-sm">
                Keterangan
              </th>
              <th className="border p-2 text-left font-medium text-sm">
                Deskripsi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">Denda Keterlambatan Bayar</td>
              <td className="border p-2">
                0,20% perhari keterlambatan dikali dengan nilai angsuran
                tertunggak
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">Denda Pelunasan Dipercepat</td>
              <td className="border p-2">
                3% dikali Sisa Pinjaman yang dilunasi (minimal Rp 200.000)
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">Pengikatan Notaril</td>
              <td className="border p-2">Tentative</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">Asuransi (Kecuali KTA)</td>
              <td className="border p-2">
                KPM = TLO <br />
                KPR = Jiwa dan Kebakaran (subject to Usia dan Jaminan)
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">
                Debt Service Ratio (DSR)/Kemampuan Bayar
              </td>
              <td className="border p-2">40% dari Penghasilan Bersih (THP)</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">Batas Maksimum Pembiayaan</td>
              <td className="border p-2">80% dari Nilai Jaminan/Agunan</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="border p-2">Batas Maksimum Usia Pemohon</td>
              <td className="border p-2">
                Perorangan = pada saat lunas maksimal 55 thn <br />
                Profesional = pada saat lunas maksimal 60 thn
              </td>
            </tr>
          </tbody>
        </table>
      </CreditModal>

      {/* Modal Persyaratan */}
      <CreditModal
        isOpen={modalPersyaratan}
        onClose={() => setModalPersyaratan(false)}
        title="PERSYARATAN KREDIT"
      >
        <table className="w-full border-collapse text-black">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-black font-semibold">
                PERSYARATAN
              </th>
              <th className="border p-2 text-black font-semibold">MOTOR</th>
              <th className="border p-2 text-black font-semibold">MOBIL</th>
              <th className="border p-2 text-black font-semibold">KPR</th>
              <th className="border p-2 text-black font-semibold">
                Perorangan
              </th>
              <th className="border p-2 text-black font-semibold">
                Badan Usaha
              </th>
              <th className="border p-2 text-black font-semibold">KTA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Photocopy KTP Suami dan Istri</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">Photocopy Kartu Keluarga (KK)</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">
                Photocopy Surat Nikah Suami dan Istri atau Akta Cerai
              </td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">Pas Foto 4x6 Suami dan Istri </td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">
                Surat keterangan bekerja/ijin profesional/surat keterangan
                penghasilan
              </td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">
                Asli slip gaji bulan terakhir/surat keterangan penghasilan
                (u/Joint income)
              </td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">
                Copy Rekening Tabungan/Bank 3 Bulan terkahir (Suami & Istri)
              </td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">
                Sertifikat SHM/SHGB/SHMSRS (untuk jaminan tanah)
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">
                BPKB berikut photocopy STNK dan KIR (untuk jaminan kendaraan
                bermotor)
              </td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">SPPT dan STTS PBB tahun terakhir</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">Photocopy IMB (Untuk Jaminan SHM)</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">Photocopy KTP Pengurus</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">Photocopy NPWP</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">v</td>
            </tr>
            <tr>
              <td className="border p-2">
                Photocopy Tanda Daftar Perusahaan (TDP)/NIB
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">
                Photocopy Surat Izin Usaha Perdagangan (SIUP)
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">
                Photocopy Surat Keterangan Domisili
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">
                Photocopy Akta Pendirian & Perubahan-perubahaannya
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">
                Laporan Keuangan/Neraca Audit/Non Audit
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            <tr>
              <td className="border p-2">
                Photocopy bukti pendaftaran di Pengadilan Negeri/Instansi
                terkait
              </td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">-</td>
              <td className="border p-2 text-center">v</td>
              <td className="border p-2 text-center">-</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </CreditModal>
    </>
  );
};

export default CreditSection;
