  // pages/pinjaman/section/content.tsx
  import { useRouter } from "next/router";
  import { useState, useEffect } from "react";
  import { getContentBySubMenuUrl, Content as ContentType } from "@/pages/api/fetching/routes";
  // import LoadingSpinner from "../../components/ui/LoadingSpinner";

  const Content = () => {
    const router = useRouter();
    const { id } = router.query;
    const [content, setContent] = useState<ContentType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchContent = async () => {
        if (!id) return;

        try {
          setLoading(true);
          // Mengambil konten berdasarkan URL sub-menu
          const contents = await getContentBySubMenuUrl(id as string);
          
          if (contents.length > 0) {
            setContent(contents[0]);
          } else {
            setError("Konten tidak ditemukan");
          }
        } catch (err) {
          console.error("Error fetching content:", err);
          setError("Gagal mengambil data konten. Silakan coba lagi nanti.");
        } finally {
          setLoading(false);
        }
      };

      fetchContent();
    }, [id]);

    // Tampilkan loading spinner saat data sedang diambil
    if (loading) {
      return (
        <div className="lg:w-3/4 w-full flex justify-center items-center py-10">
          {/* <LoadingSpinner /> */}
        </div>
      );
    }

    // Tampilkan pesan error jika terjadi kesalahan
    if (error) {
      return (
        <div className="lg:w-3/4 w-full">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        </div>
      );
    }

    // Tampilkan konten yang diambil dari backend
    if (content) {
      return (
        <div className="lg:w-3/4 w-full">
          <div className="rounded-lg shadow-sm p-6 text-sm">
            <h4 className="text-2xl font-bold text-[#003868] mb-6">
              {content.title}
            </h4>
            
            {/* Tampilkan deskripsi konten */}
            {content.description && (
              <div className="mb-6 text-[#414c5a]" 
                  dangerouslySetInnerHTML={{ __html: content.description }} />
            )}
            
            {/* Tampilkan dokumen yang diperlukan jika ada */}
            {content.required_documents && (
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-[#003868] mb-2">
                  Dokumen yang Diperlukan:
                </h5>
                <div className="text-[#414c5a]"
                    dangerouslySetInnerHTML={{ __html: content.required_documents }} />
              </div>
            )}
            
            {/* Tampilkan informasi tambahan untuk laporan jika ada */}
            {content.report_type && (
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-[#003868] mb-2">
                  Informasi Laporan:
                </h5>
                <p className="text-[#414c5a]">
                  <span className="font-medium">Jenis Laporan:</span> {content.report_type}
                </p>
                {content.report_year && (
                  <p className="text-[#414c5a]">
                    <span className="font-medium">Tahun Laporan:</span> {content.report_year}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Default fallback jika tidak ada konten
    return (
      <div className="lg:w-3/4 w-full">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h4 className="text-2xl font-bold text-[#414c5a] mb-6">
            Informasi Tidak Tersedia
          </h4>
          <p className="text-[#414c5a]">
            Mohon maaf, informasi untuk halaman ini belum tersedia. Silakan kunjungi halaman lain atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>
      </div>
    );
  };

  export default Content;