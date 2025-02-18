import React from "react";

const TableSection = () => {
  return (
    <div className="py-6 flex justify-center ">
      <div className="w-2/3 bg-white rounded-lg shadow-sm overflow-hidden border-solid border-2">
        <div className="bg-gray-50 p-2 border-b">
          <h5 className="text-lg font-semibold text-black text-center">
            Perbandingan Produk Pinjaman Produktif
          </h5>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-2 text-sm font-semibold text-black">
                  JENIS PINJAMAN
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Nominal
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Bunga per Tahun
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Sifat Bunga
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Jangka Waktu
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Jaminan
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Biaya
                </th>
                <th className=" p-2 text-sm font-semibold text-black">
                  Provisi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center text-black bg-[#EFF6FC]">
                <td className=" p-2">KREDIT MODAL KERJA</td>
                <td className=" p-2">-</td>
                <td className=" p-2">15%</td>
                <td className=" p-2">Annuitas</td>
                <td className=" p-2">5 thn</td>
                <td className=" p-2">
                  Sertifikat Hak Milik/BPKB Kendaraan/Mesin Produksi
                </td>
                <td className=" p-2">-</td>
                <td className=" p-2">3%</td>
              </tr>
              <tr className="text-center text-black bg-gray-50">
                <td className=" p-2">KREDIT INVESTASI</td>
                <td className=" p-2">-</td>
                <td className=" p-2">15%</td>
                <td className=" p-2">Annuitas</td>
                <td className=" p-2">5 thn</td>
                <td className=" p-2">
                  Sertifikat Hak Milik/BPKB Kendaraan/Mesin Produksi
                </td>
                <td className=" p-2">-</td>
                <td className=" p-2">3%</td>
              </tr>
              <tr className="text-center text-black bg-[#EFF6FC]">
                <td className=" p-2">KREDIT MULTIGUNA</td>
                <td className=" p-2">&lt; Rp 100 juta</td>
                <td className=" p-2">15%</td>
                <td className=" p-2">Flat</td>
                <td className=" p-2">&lt; 50 jt = 3 thn</td>
                <td className=" p-2">
                  Sertifikat dan BPKB Kendaraan
                </td>
                <td className=" p-2 text-xs">
                  &lt;500 jt = Rp 500 ribu
                  <br />
                  &gt;500 jt - 1M = Rp 1 Juta
                  <br />
                  &gt;1M = Rp 1.500.000
                </td>
                <td className=" p-2">2%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableSection;
