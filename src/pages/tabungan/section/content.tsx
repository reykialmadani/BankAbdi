const mainPage = () => {
    return (
        <div className="lg:w-3/4 w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">PERSYARATAN TABUNGAN ABDI</h4>
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
                    <li>Kartu Identitas (e-KTP)</li>
                    <li>NPWP*(bila mana memiliki)</li>
                  </ol>
                </li>
                <li>
                  BADAN HUKUM (WNI)
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>Kartu Identitas Pengurus (e-KTP) dan NPWP</li>
                    <li>NPWP Perusahaan</li>
                    <li>Akta Pendirian atau Anggaran Dasar Terakhir berikut Perubahannya</li>
                    <li>Surat Izin Usaha Perdagangan (SIUP)</li>
                    <li>Tanda Daftar Perusahaan (TDP)/Nomor Induk Berusaha (NIB)</li>
                    <li>Surat Keterangan Domisili</li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
    );
}

export default mainPage