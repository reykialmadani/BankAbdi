// import { useRouter } from "next/router";

const MainContent = () => {
  return (
    <div className="lg:w-3/4 w-full">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h4 className="text-2xl font-bold text-gray-900 mb-6">KREDIT MODAL KERJA</h4>
        <ol className="list-decimal pl-6 text-gray-800 space-y-4">
          <li>Tersedia bagi nasabah Perorangan dan Badan Hukum.</li>
          <li>
            Melengkapi formulir pembukaan rekening dan dokumen pendukung lain yang disyaratkan.
          </li>
          <li>
            Dokumen yang diwajibkan:
            <ol className="list-decimal pl-6 space-y-6 mt-4">
              <li>
                PERORANGAN (WNI)
                <ol className="list-decimal pl-6 space-y-2 mt-2">
                  <li>Photocopy KTP Suami dan Istri</li>
                  <li>Photocopy Kartu Keluarga</li>
                  <li>Photocopy Surat Nikah Suami dan Istri / Akta Cerai</li>
                  <li>Pas Foto 4x6 Suami dan Istri</li>
                  <li>Surat keterangan bekerja / ijin profesional / surat keterangan penghasilan</li>
                  <li>Asli slip gaji bulan terakhir / surat keterangan penghasilan</li>
                  <li>Copy Rekening Tabungan / Bank 3 bulan terakhir (Suami & Istri)</li>
                  <li>Sertifikat SHM / SHGB / SHMSRS (untuk jaminan tanah)</li>
                  <li>BPKB berikut photocopy STNK dan Kir (untuk jaminan kendaraan bermotor)</li>
                  <li>SPPT dan STTS PBB tahun terakhir</li>
                  <li>Photocopy IMB (Untuk Jaminan SHM)</li>
                  <li>Photocopy NPWP</li>
                </ol>
              </li>
              <li>
                BADAN USAHA (WNI)
                <ol className="list-decimal pl-6 space-y-2 mt-2">
                  <li>Sertifikat SHM / SHGB / SHMSRS (untuk jaminan tanah)</li>
                  <li>SPPT dan STTS PBB tahun terakhir</li>
                  <li>Photocopy IMB (Untuk Jaminan SHM)</li>
                  <li>Photocopy KTP Pengurus</li>
                  <li>Photocopy NPWP</li>
                  <li>Photocopy Tanda Daftar Perusahaan (TDP)/NIB</li>
                  <li>Photocopy Surat Ijin Usaha Perdagangan (SIUP)</li>
                  <li>Photocopy Surat Keterangan Domisili</li>
                  <li>Photocopy Akta Pendirian & Perubahan-perubahannya</li>
                  <li>Laporan Keuangan/Neraca Audit/Non Audit</li>
                  <li>Photocopy Bukti pendaftaran di pengadilan Negeri / Instansi terkait</li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default MainContent;
