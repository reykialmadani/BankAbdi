import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/layout/header";
import Hero from "../../components/section/hero";
import Blog from "../../components/section/blog";
import Footer from "@/pages/components/layout/footer";

const KreditModalKerjaPage = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const [modalPerkreditan, setModalPerkreditan] = useState(false);
  const [modalPersyaratan, setModalPersyaratan] = useState(false);

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

  const loanProducts = [
    {
      title: "Kredit Modal Kerja (KMK)",
      description:
        "Kami hadir untuk memberikan kemudahan dalam pembiayaan kebutuhan modal kerja anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kmk.png",
      href: "/pinjaman/kredit-modal-kerja",
    },
    {
      title: "Kredit Investasi",
      description:
        "Nikmati pembiayaan untuk kebutuhan perluasan dan pengembangan bisnis anda dengan jangka waktu yang panjang",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_ki.png",
      href: "/pinjaman/kredit-investasi",
    },
    {
      title: "Kredit Kepemilikan Rumah",
      description:
        "Makin mudah wujudkan hunian idaman anda dengan jangka waktu fleksibel",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpr.png",
      href: "/pinjaman/kpr",
    },
    {
      title: "Kredit Multiguna",
      description: "Nikmati fasilitas pinjaman untuk segala kebutuhan anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_km.png",
      href: "/pinjaman/kredit-multiguna",
    },
    {
      title: "Kredit Kepemilikan Mobil (KPM)",
      description:
        "Jalan mudah untuk memiliki mobil idaman baru atau bekas dengan bunga ringan",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kpm.png",
      href: "/pinjaman/kredit-kepemilikan-mobil",
    },
    {
      title: "Kredit Kendaraan Bermotor (KKB)",
      description: "Dapatkan bunga ringan untuk mewujudkan motor impian anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kkb.png",
      href: "/pinjaman/kredit-kendaraan-bermotor",
    },
    {
      title: "Kredit Tanpa Agunan",
      description:
        "Memberikan kemudahan dan keuntungan dalam memenuhi berbagai keperluan hidup anda",
      icon: "https://bankabdi.co.id/img/icon/pinjaman_kta.png",
      href: "/pinjaman/kta",
    },
  ];

  useEffect(() => {
    const sliderContainer = document.querySelector(
      ".slider-container"
    ) as HTMLElement;
    const slides = document.querySelectorAll(".slider-container > li");
    const prevButton = document.querySelector(".slider-nav");
    const nextButton = document.querySelector(".slider-nav-next");

    let currentIndex = 0;

    const updateSlider = () => {
      const offset = currentIndex * -33.33;
      if (sliderContainer) {
        sliderContainer.style.transform = `translateX(${offset}%)`;
      }
    };

    const handlePrevClick = () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    };

    const handleNextClick = () => {
      if (currentIndex < slides.length - 3) {
        currentIndex++;
        updateSlider();
      }
    };

    prevButton?.addEventListener("click", handlePrevClick);
    nextButton?.addEventListener("click", handleNextClick);

    return () => {
      prevButton?.removeEventListener("click", handlePrevClick);
      nextButton?.removeEventListener("click", handleNextClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero
        imageSrc="https://bankabdi.co.id/img/banner/hero-pinjaman-kmk.webp"
        title="Kredit Modal Kerja"
        paragraph="Fasilitas pembiayaan yang diperuntukan sebagai modal usaha untuk keperluan meningkatkan produksi dalam kegiatan operasionalnya"
        showButton={false}
      />

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

        {/* Slider Section */}
        <div className="py-8">
          <h4 className="text-2xl font-bold text-gray-900 mb-6">
            Produk Pinjaman Lainnya
          </h4>

          <div className="relative">
            <div className="overflow-hidden">
              <ul className="slider-container flex transition-transform duration-300">
                {loanProducts.map((product, index) => (
                  <li key={index} className="w-1/3 flex-shrink-0 px-4">
                    <div className="bg-white rounded-lg shadow-sm h-full">
                      <Link href={product.href}>
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            <Image
                              src={product.icon}
                              alt={product.title}
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                            <h6 className="font-semibold text-gray-900">
                              {product.title}
                            </h6>
                          </div>
                          <p className="mt-4 text-gray-600 text-sm">
                            {product.description}
                          </p>
                        </div>
                        <div className="px-6 py-4 border-t flex justify-between items-center">
                          <span className="text-blue-600 text-sm">
                            Selengkapnya
                          </span>
                          <span className="text-blue-600">&gt;</span>
                        </div>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              className="slider-nav absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50"
              aria-label="Previous"
            >
              <span className="text-blue-600">&lt;</span>
            </button>

            <button
              type="button"
              className="slider-nav-next absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center z-10 hover:bg-gray-50"
              aria-label="Next"
            >
              <span className="text-blue-600">&gt;</span>
            </button>
          </div>
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
                    <h3 className="font-semibold text-xl">
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

                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src="https://bankabdi.co.id/icons/clipboard.png"
                      alt="Clipboard"
                      width={24}
                      height={24}
                    />
                    <h3 className="font-semibold text-xl">
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
          {modalPerkreditan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
                <div className="p-4 border-b">
                  <h5 className="text-xl font-semibold text-center">
                    KETENTUAN PERKREDITAN
                  </h5>
                </div>
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                  <table className="w-full border-collapse">
                    {/* Add your ketentuan perkreditan table content here */}
                    {/* Copy the table content from the original HTML */}
                  </table>
                </div>
                <div className="p-4 border-t flex justify-end">
                  <button
                    onClick={() => setModalPerkreditan(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Persyaratan Kredit */}
          {modalPersyaratan && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
                <div className="p-4 border-b">
                  <h5 className="text-xl font-semibold text-center">
                    PERSYARATAN KREDIT
                  </h5>
                </div>
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                  <table className="w-full border-collapse">
                    {/* Add your persyaratan kredit table content here */}
                    {/* Copy the table content from the original HTML */}
                  </table>
                </div>
                <div className="p-4 border-t flex justify-end">
                  <button
                    onClick={() => setModalPersyaratan(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
          <section>
            <Blog />
          </section>

          <section>
            <Footer />
          </section>
    </div>
  );
};

export default KreditModalKerjaPage;
