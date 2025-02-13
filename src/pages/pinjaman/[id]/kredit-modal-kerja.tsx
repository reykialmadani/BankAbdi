import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/layout/header";
import Hero from "../../components/section/hero";

const KreditModalKerjaPage = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const menuItems = [
    { href: "/pinjaman/kredit-modal-kerja", label: "Kredit Modal Kerja (KMK)" },
    { href: "/pinjaman/kredit-investasi", label: "Kredit Investasi" },
    { href: "/pinjaman/kredit-multiguna", label: "Kredit Multiguna" },
    { href: "/pinjaman/kpr", label: "Kredit Kepemilikan Rumah (KPR)" },
    {
      href: "/pinjaman/kredit-kepemilikan-mobil",
      label: "Kredit Kepemilikan Mobil (KPM)",
    },
    {
      href: "/pinjaman/kredit-kendaraan-bermotor",
      label: "Kredit Kendaraan Bermotor (KKB)",
    },
    { href: "/pinjaman/kta", label: "Kredit Tanpa Agunan (KTA)" },
    { href: "/pinjaman/formulir", label: "Formulir Pengajuan Pinjaman" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero
        imageSrc="https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp"
        title="Kredit Modal Kerja"
        paragraph="Fasilitas pembiayaan yang diperuntukan sebagai modal usaha untuk keperluan meningkatkan produksi dalam kegiatan operasionalnya"
        showButton={false}
      />

      {/* Main Container */}
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h6 className="text-lg font-semibold text-gray-700 mb-4">
                Pinjaman / Kredit
              </h6>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior>
                      <a
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                          currentPath === item.href
                            ? "bg-gray-100 text-blue-600 font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Image
                          src="https://bankabdi.co.id/img/icon/circle_active.svg"
                          alt="active sign"
                          width={16}
                          height={16}
                          className="w-4 h-4 mr-2"
                        />
                        {item.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                KREDIT MODAL KERJA
              </h4>
              <ol className="list-decimal pl-6 text-gray-800 space-y-4">
                <li>Tersedia bagi nasabah Perorangan dan Badan Hukum.</li>
                <li>
                  Melengkapi formulir pembukaan rekening dan dokumen pendukung
                  lain yang disyaratkan.
                </li>
                <li>
                  Dokumen yang diwajibkan:
                  <ol className="list-decimal pl-6 space-y-6 mt-4">
                    <li>
                      PERORANGAN (WNI)
                      <ol className="list-decimal pl-6 space-y-2 mt-2">
                        <li>Photocopy KTP Suami dan Istri</li>
                        <li>Photocopy Kartu Keluarga</li>
                        <li>
                          Photocopy Surat Nikah Suami dan Istri / Akta Cerai
                        </li>
                        <li>Pas Foto 4x6 Suami dan Istri</li>
                        <li>
                          Surat keterangan bekerja / ijin profesional / surat
                          keterangan penghasilan
                        </li>
                        <li>
                          Asli slip gaji bulan terakhir / surat keterangan
                          penghasilan
                        </li>
                        <li>
                          Copy Rekening Tabungan / Bank 3 bulan terakhir (Suami
                          & Istri)
                        </li>
                        <li>
                          Sertifikat SHM / SHGB / SHMSRS (untuk jaminan tanah)
                        </li>
                        <li>
                          BPKB berikut photocopy STNK dan Kir (untuk jaminan
                          kendaraan bermotor)
                        </li>
                        <li>SPPT dan STTS PBB tahun terakhir</li>
                        <li>Photocopy IMB (Untuk Jaminan SHM)</li>
                        <li>Photocopy NPWP</li>
                      </ol>
                    </li>
                    <li>
                      BADAN USAHA (WNI)
                      <ol className="list-decimal pl-6 space-y-2 mt-2">
                        <li>
                          Sertifikat SHM / SHGB / SHMSRS (untuk jaminan tanah)
                        </li>
                        <li>SPPT dan STTS PBB tahun terakhir</li>
                        <li>Photocopy IMB (Untuk Jaminan SHM)</li>
                        <li>Photocopy KTP Pengurus</li>
                        <li>Photocopy NPWP</li>
                        <li>Photocopy Tanda Daftar Perusahaan (TDP)/NIB</li>
                        <li>Photocopy Surat Ijin Usaha Perdagangan (SIUP)</li>
                        <li>Photocopy Surat Keterangan Domisili</li>
                        <li>
                          Photocopy Akta Pendirian & Perubahan-perubahannya
                        </li>
                        <li>Laporan Keuangan/Neraca Audit/Non Audit</li>
                        <li>
                          Photocopy Bukti pendaftaran di pengadilan Negeri /
                          Instansi terkait
                        </li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="py-6 flex justify-center">
          <div className="w-2/3 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 p-2 border-b">
              <h5 className="text-lg font-semibold text-black text-center">
                Perbandingan Produk Pinjaman Produktif
              </h5>
            </div>
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border p-2 text-sm font-semibold text-black">
                      JENIS PINJAMAN
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Nominal
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Bunga per Tahun
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Sifat Bunga
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Jangka Waktu
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Jaminan
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Biaya
                    </th>
                    <th className="border p-2 text-sm font-semibold text-black">
                      Provisi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center text-black bg-[#EFF6FC]">
                    <td className="border p-2">KREDIT MODAL KERJA</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">15%</td>
                    <td className="border p-2">Annuitas</td>
                    <td className="border p-2">5 thn</td>
                    <td className="border p-2">
                      Sertifikat Hak Milik/BPKB Kendaraan/Mesin Produksi
                    </td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">3%</td>
                  </tr>
                  <tr className="text-center text-black bg-gray-50">
                    <td className="border p-2">KREDIT INVESTASI</td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">15%</td>
                    <td className="border p-2">Annuitas</td>
                    <td className="border p-2">5 thn</td>
                    <td className="border p-2">
                      Sertifikat Hak Milik/BPKB Kendaraan/Mesin Produksi
                    </td>
                    <td className="border p-2">-</td>
                    <td className="border p-2">3%</td>
                  </tr>
                  <tr className="text-center text-black bg-[#EFF6FC]">
                    <td className="border p-2">KREDIT MULTIGUNA</td>
                    <td className="border p-2">&lt; Rp 100 juta</td>
                    <td className="border p-2">15%</td>
                    <td className="border p-2">Flat</td>
                    <td className="border p-2">&lt; 50 jt = 3 thn</td>
                    <td className="border p-2">
                      Sertifikat dan BPKB Kendaraan
                    </td>
                    <td className="border p-2 text-xs">
                      &lt;500 jt = Rp 500 ribu
                      <br />
                      &gt;500 jt - 1M = Rp 1 Juta
                      <br />
                      &gt;1M = Rp 1.500.000
                    </td>
                    <td className="border p-2">2%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KreditModalKerjaPage;
