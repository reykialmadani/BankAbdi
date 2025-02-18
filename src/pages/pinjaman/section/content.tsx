import { useRouter } from "next/router";
import { useState, FormEvent, ChangeEvent } from "react";
import Head from "next/head";

interface FormDataType {
  NamaLengkap: string;
  NoHandphone: string;
  Email: string;
  Provinsi: string;
  Kota: string;
  Pekerjaan: string;
  JenisJaminan: string;
  NominalPengajuan: string;
}

const CONTENT_TYPES = {
  KREDIT_MODAL_KERJA: "kreditModalKerja",
  FORM_PENGAJUAN: "formPengajuan",
  DEFAULT: "default",
};

const contentMapping: Record<string, string> = {
  "kredit-modal-kerja": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "kredit-investasi": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "kredit-multiguna": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "kredit-kepemilikan-rumah": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "kredit-kepemilikan-mobil": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "kredit-kendaraan-bermotor": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "kredit-tanpa-agunan": CONTENT_TYPES.KREDIT_MODAL_KERJA,
  "form-pengajuan-kredit": CONTENT_TYPES.FORM_PENGAJUAN,
};

const MainPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<FormDataType>({
    NamaLengkap: "",
    NoHandphone: "",
    Email: "",
    Provinsi: "",
    Kota: "",
    Pekerjaan: "",
    JenisJaminan: "",
    NominalPengajuan: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Kirim data ke FormSubmit (ganti dengan URL FormSubmit Anda)
    window.open(
      `https://formsubmit.co/a56b76c554c52e9362bff114b5528c24?_subject=Formulir Pengajuan Pinjaman&NamaLengkap=${formData.NamaLengkap}&NoHandphone=${formData.NoHandphone}&Email=${formData.Email}&Provinsi=${formData.Provinsi}&Kota=${formData.Kota}&Pekerjaan=${formData.Pekerjaan}&JenisJaminan=${formData.JenisJaminan}&NominalPengajuan=${formData.NominalPengajuan}`,
      "_blank"
    );
  };

  // Tentukan konten berbeda berdasarkan `id`
  const getContentType = (pageId: string | string[] | undefined): string => {
    if (pageId === undefined) {
      return CONTENT_TYPES.DEFAULT;
    }

    const idString = Array.isArray(pageId) ? pageId[0] : pageId;
    return contentMapping[idString] || CONTENT_TYPES.DEFAULT;
  };

  const renderContent = (contentType: string) => {
    switch (contentType) {
      case CONTENT_TYPES.KREDIT_MODAL_KERJA:
        let pageTitle = "KREDIT MODAL KERJA";
        if (typeof id === "string") {
          if (id === "kredit-investasi") {
            pageTitle = "KREDIT INVESTASI";
          } else if (id === "kredit-multiguna") {
            pageTitle = "KREDIT MULTIGUNA";
          }
        } else if (Array.isArray(id) && id.length > 0) {
          if (id[0] === "kredit-investasi") {
            pageTitle = "KREDIT INVESTASI";
          } else if (id[0] === "kredit-multiguna") {
            pageTitle = "KREDIT MULTIGUNA";
          }
        }

        return (
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">{pageTitle}</h4>
              <ol className="list-decimal pl-6 text-gray-800 space-y-4">
                <li>Tersedia bagi nasabah Perorangan dan Badan Hukum.</li>
                <li>
                  Melengkapi formulir pembukaan rekening dan dokumen pendukung lain
                  yang disyaratkan.
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
                        <li>Surat keterangan bekerja / ijin profesional</li>
                        <li>Slip gaji bulan terakhir</li>
                        <li>Rekening Tabungan Bank 3 bulan terakhir (Suami & Istri)</li>
                        <li>Sertifikat SHM / SHGB (untuk jaminan tanah)</li>
                        <li>BPKB & STNK (untuk jaminan kendaraan)</li>
                        <li>SPPT & STTS PBB tahun terakhir</li>
                        <li>NPWP</li>
                      </ol>
                    </li>
                    <li>
                      BADAN USAHA (WNI)
                      <ol className="list-decimal pl-6 space-y-2 mt-2">
                        <li>Sertifikat SHM / SHGB (untuk jaminan tanah)</li>
                        <li>SPPT & STTS PBB tahun terakhir</li>
                        <li>NPWP</li>
                        <li>Akta Pendirian Perusahaan</li>
                        <li>Laporan Keuangan / Neraca Audit</li>
                        <li>Surat Keterangan Domisili</li>
                      </ol>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
          </div>
        );
      case CONTENT_TYPES.FORM_PENGAJUAN:
        return (
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-semibold text-blue-600 mb-6">Formulir Pengajuan Pinjaman</h4>
              <div>
                {/* Form Start */}
                <form onSubmit={handleSubmit} className="w-full">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="formGroupExampleInput">
                        Nama Lengkap Peminjam
                      </label>
                      <input
                        type="text"
                        name="NamaLengkap"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="formGroupExampleInput"
                        placeholder="Masukkan nama lengkap Anda disini"
                        value={formData.NamaLengkap}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputTelp">
                        No Handphone
                      </label>
                      <input
                        type="tel"
                        name="NoHandphone"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputTelp"
                        placeholder="Contoh: 0818 1818 7777"
                        value={formData.NoHandphone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputEmail4">
                        Email
                      </label>
                      <input
                        type="email"
                        name="Email"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputEmail4"
                        placeholder="Contoh: deposito@gmail.com"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputProvinsi">
                        Provinsi Domisili
                      </label>
                      <input
                        type="text"
                        name="Provinsi"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputProvinsi"
                        placeholder="Provinsi domisili Anda"
                        value={formData.Provinsi}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputAddress2">
                        Kota/Kabupaten Domisili
                      </label>
                      <input
                        type="text"
                        name="Kota"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputAddress2"
                        placeholder="Kota domisili Anda"
                        value={formData.Kota}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputPekerjaan">
                        Pekerjaan
                      </label>
                      <input
                        type="text"
                        name="Pekerjaan"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputPekerjaan"
                        placeholder="Pekerjaan Anda"
                        value={formData.Pekerjaan}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputJaminan">
                        Jenis Jaminan
                      </label>
                      <input
                        type="text"
                        name="JenisJaminan"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputJaminan"
                        placeholder="Jaminan Anda"
                        value={formData.JenisJaminan}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="w-full px-3 mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="inputNominal">
                        Nominal Pengajuan
                      </label>
                      <input
                        type="text"
                        name="NominalPengajuan"
                        className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-300 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        id="inputNominal"
                        placeholder="Contoh : Rp 10.0000.000"
                        value={formData.NominalPengajuan}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-orange-400 text-white font-medium py-2 px-6 rounded-md hover:from-pink-600 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200 mt-4"
                  >
                    Ajukan Pinjaman
                  </button>
                </form>
                {/* Form End */}
              </div>
            </div>
          </div>
        );
      default:
        return getDefaultContent();
    }
  };

  const getDefaultContent = () => {
    return (
      <div className="lg:w-3/4 w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">
            PERSYARATAN TABUNGAN ABDI - DEFAULT
          </h4>
          <ol className="list-decimal pl-6 text-gray-800 space-y-4">
            <li>Konten default yang muncul jika tidak ada parameter id</li>
          </ol>
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    if (!id) return "Bank Abdi";

    const idString = Array.isArray(id) ? id[0] : id;
    return `${idString
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")} - Bank Abdi`;
  };

  const contentType = getContentType(id);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Layanan Keuangan Bank Abdi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-xl mx-auto py-12">
        {renderContent(contentType)}
      </div>
    </div>
  );
};

export default MainPage;
