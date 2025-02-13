// components/section/CreditSection.tsx
import Image from 'next/image';
import { FC, useState } from 'react';

interface CreditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CreditModal: FC<CreditModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-4 border-b">
          <h5 className="text-xl font-semibold text-black text-center">{title}</h5>
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
      <div className="bg-[#eff6fc] py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="https://bankabdi.co.id/icons/warning.png"
                  alt="Warning"
                  width={24}
                  height={24}
                />
                <h3 className="font-semibold text-xl">KETENTUAN PERKREDITAN</h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                Klik tombol dibawah ini untuk membuka pop up ketentuan perkreditan.
              </h6>
              <button
                onClick={() => setModalPerkreditan(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Ketentuan Perkreditan
              </button>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="https://bankabdi.co.id/icons/clipboard.png"
                  alt="Clipboard"
                  width={24}
                  height={24}
                />
                <h3 className="font-semibold text-xl">PERSYARATAN KREDIT</h3>
              </div>
              <h6 className="text-gray-600 mb-4">
                Klik tombol dibawah ini untuk membuka pop up persyaratan perkreditan.
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
        <table className="table table-striped text-black">
          <tbody>
            <tr>
              <td>Denda Keterlambatan Bayar</td>
              <td>0,20% perhari keterlambatan dikali dengan nilai angsuran tertunggak</td>
            </tr>
            <tr>
              <td>Denda Pelunasan Dipercepat</td>
              <td>3% dikali Sisa Pinjaman yang dilunasi (minimal Rp 200.000)</td>
            </tr>
            <tr>
              <td>Pengikatan Notaril</td>
              <td>Tentative</td>
            </tr>
            <tr>
              <td>Asuransi (Kecuali KTA)</td>
              <td>
                KPM = TLO <br />
                KPR = Jiwa dan Kebakaran (subject to Usia dan Jaminan)
              </td>
            </tr>
            <tr>
              <td>Debt Service Ratio (DSR)/Kemampuan Bayar</td>
              <td>40% dari Penghasilan Bersih (THP)</td>
            </tr>
            <tr>
              <td>Batas Maksimum Pembiayaan</td>
              <td>80% dari Nilai Jaminan/Agunan</td>
            </tr>
            <tr>
              <td>Batas Maksimum Usia Pemohon</td>
              <td>
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
              <th className="border p-2 text-black font-semibold">PERSYARATAN</th>
              <th className="border p-2 text-black font-semibold">MOTOR</th>
              <th className="border p-2 text-black font-semibold">MOBIL</th>
              <th className="border p-2 text-black font-semibold">KPR</th>
              <th className="border p-2 text-black font-semibold">Perorangan</th>
              <th className="border p-2 text-black font-semibold">Badan Usaha</th>
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
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </CreditModal>
    </>
  );
};

export default CreditSection;