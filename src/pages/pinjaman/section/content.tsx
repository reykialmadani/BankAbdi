// pages/pinjaman/section/content.tsx
import { Content as ContentType } from "@/pages/api/fetching/routes";

interface ContentProps {
  contentData: ContentType | null;
  isLoading?: boolean;
}

const Content = ({ contentData, isLoading = false }: ContentProps) => {
  // Debug info
  console.log("Content component - received contentData:", contentData);
  
  // Tampilkan loading spinner jika data sedang diambil
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        {/* <LoadingSpinner /> */}
        <p>Loading...</p>
      </div>
    );
  }

  // Tampilkan konten yang diterima dari props
  if (contentData) {
    return (
      <div className="rounded-lg shadow-sm p-6 text-sm bg-white">
        <h4 className="text-2xl font-bold text-[#003868] mb-6">
          {contentData.title}
        </h4>
        
        {/* Tampilkan deskripsi konten */}
        {contentData.description && (
          <div 
            className="mb-6 text-[#414c5a]" 
            dangerouslySetInnerHTML={{ __html: contentData.description }} 
          />
        )}
        
        {/* Tampilkan dokumen yang diperlukan jika ada */}
        {contentData.required_documents && (
          <div className="mt-4">
            <h5 className="text-lg font-semibold text-[#003868] mb-2">
              Dokumen yang Diperlukan:
            </h5>
            <div 
              className="text-[#414c5a]" 
              dangerouslySetInnerHTML={{ __html: contentData.required_documents }} 
            />
          </div>
        )}
        
        {/* Tampilkan informasi tambahan untuk laporan jika ada */}
        {contentData.report_type && (
          <div className="mt-4">
            <h5 className="text-lg font-semibold text-[#003868] mb-2">
              Informasi Laporan:
            </h5>
            <p className="text-[#414c5a]">
              <span className="font-medium">Jenis Laporan:</span> {contentData.report_type}
            </p>
            {contentData.report_year && (
              <p className="text-[#414c5a]">
                <span className="font-medium">Tahun Laporan:</span> {contentData.report_year}
              </p>
            )}
          </div>
        )}
        
        {/* Tampilkan konten tambahan lainnya jika tersedia */}
        {contentData.additional_content && (
          <div className="mt-4">
            <h5 className="text-lg font-semibold text-[#003868] mb-2">
              Informasi Tambahan:
            </h5>
            <div 
              className="text-[#414c5a]" 
              dangerouslySetInnerHTML={{ __html: contentData.additional_content }} 
            />
          </div>
        )}
        
        {/* Tampilkan tanggal pembaruan jika tersedia */}
        {contentData.updated_at && (
          <div className="mt-6 text-xs text-gray-500">
            Terakhir diperbarui: {new Date(contentData.updated_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        )}
      </div>
    );
  }

  // Default fallback jika tidak ada konten
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h4 className="text-2xl font-bold text-[#414c5a] mb-6">
        Informasi Tidak Tersedia
      </h4>
      <p className="text-[#414c5a]">
        Mohon maaf, informasi untuk halaman ini belum tersedia. Silakan kunjungi halaman lain atau hubungi kami untuk informasi lebih lanjut.
      </p>
    </div>
  );
};

export default Content;