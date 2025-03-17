import { useState, useEffect } from "react";
import SidebarLaporan from "./sidebar";
import { Content as ContentType } from "@/pages/api/fetching/routes";

interface ContentProps {
  contentData: ContentType | null;
  isLoading?: boolean;
  id?: string | string[];
  allContents?: ContentType[]; // Tambahkan parameter baru untuk menerima semua konten
}

const Content = ({ contentData, isLoading = false, id, allContents = [] }: ContentProps) => {
  const [page, setPage] = useState<string>(typeof id === 'string' ? id : "2023");
  
  // Debug info
  console.log("Content component - page:", page);
  console.log("Content component - received contentData:", contentData ? {
    id: contentData.id,
    title: contentData.title,
    subMenuId: contentData.sub_menu_id,
    subMenu: contentData.sub_menu,
    reportType: contentData.report_type,
    reportYear: contentData.report_year
  } : null);
  console.log("Content component - allContents length:", allContents.length);
  
  // Mencari konten yang sesuai dengan tahun yang dipilih saat ini
  const findContentForCurrentYear = () => {
    if (!allContents || allContents.length === 0) return null;
    
    return allContents.find(content => {
      // Untuk laporan tahunan
      if (!page.includes('-') && content.report_type === 'Tahunan' && content.report_year === page) {
        return true;
      }
      
      // Untuk laporan triwulan
      if (page.includes('-')) {
        const [year, quarter] = page.split('-');
        return content.report_type === 'Triwulan' && content.report_year === year && content.report_quarter === quarter;
      }
      
      return false;
    });
  };
  
  // Cari konten yang sesuai dengan tahun yang dipilih
  const currentYearContent = findContentForCurrentYear() || 
    (contentData && contentData.report_year === page ? contentData : null);
  
  // Effect untuk debug ketika page berubah
  useEffect(() => {
    console.log("Page changed to:", page);
    console.log("Current content found:", currentYearContent ? true : false);
  }, [page, currentYearContent]);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  // Konten dinamis dari backend yang sesuai dengan tahun yang dipilih
  if (currentYearContent) {
    // Parsing untuk dokumen laporan jika string JSON
    let reportDocuments = null;
    if (currentYearContent.required_documents) {
      try {
        // Coba parse jika string JSON
        if (typeof currentYearContent.required_documents === 'string') {
          const parsed = JSON.parse(currentYearContent.required_documents);
          if (Array.isArray(parsed) && parsed.length > 0) {
            reportDocuments = (
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-[#003868] mb-2">
                  Dokumen Laporan:
                </h5>
                <ul className="list-disc pl-5 text-[#414c5a]">
                  {parsed.map((doc, index) => (
                    <li key={index}>
                      {doc.name && <span>{doc.name}</span>}
                      {doc.url && (
                        <a
                          href={doc.url}
                          className="text-blue-600 hover:underline ml-2"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Unduh Laporan
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        }
      } catch (e) {
        // Jika bukan JSON valid, gunakan sebagai HTML
        reportDocuments = (
          <div className="mt-4">
            <h5 className="text-lg font-semibold text-[#003868] mb-2">
              Dokumen Laporan:
            </h5>
            <div
              className="text-[#414c5a]"
              dangerouslySetInnerHTML={{
                __html: currentYearContent.required_documents,
              }}
            />
          </div>
        );
      }
    }

    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <SidebarLaporan currentPath={page} setPage={setPage} />
        <div className="lg:w-3/4 w-full">
          <div className="rounded-lg shadow-sm p-6 text-sm">
            <h4 className="text-2xl font-bold text-[#003868] mb-6">
              {currentYearContent.title}
            </h4>
            {/* Tampilkan deskripsi konten */}
            {currentYearContent.description && (
              <div
                className="mb-6 text-[#414c5a] prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentYearContent.description }}
              />
            )}
            {/* Tampilkan dokumen yang diperlukan jika ada */}
            {reportDocuments}
            {/* Tampilkan informasi tambahan untuk laporan */}
            {currentYearContent.report_type && (
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-[#003868] mb-2">
                  Informasi Laporan:
                </h5>
                <p className="text-[#414c5a]">
                  <span className="font-medium">Jenis Laporan:</span> {currentYearContent.report_type}
                </p>
                {currentYearContent.report_year && (
                  <p className="text-[#414c5a]">
                    <span className="font-medium">Tahun Laporan:</span> {currentYearContent.report_year}
                  </p>
                )}
              </div>
            )}
            {/* Tampilkan konten tambahan lainnya jika tersedia */}
            {currentYearContent.additional_content && (
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-[#003868] mb-2">
                  Informasi Tambahan:
                </h5>
                <div
                  className="text-[#414c5a]"
                  dangerouslySetInnerHTML={{
                    __html: currentYearContent.additional_content,
                  }}
                />
              </div>
            )}
            {/* Tampilkan tanggal pembaruan jika tersedia */}
            {currentYearContent.updated_at && (
              <div className="mt-6 text-xs text-gray-500">
                Terakhir diperbarui:{" "}
                {new Date(currentYearContent.updated_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Jika tidak ada data dari backend yang sesuai dengan tahun yang dipilih, tampilkan pesan informasi belum tersedia
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <SidebarLaporan currentPath={page} setPage={setPage} />
      <div className="lg:w-3/4 w-full">
        <div className="rounded-lg shadow-sm p-6">
          <h4 className="text-2xl font-bold text-[#003868] mb-6">
            Informasi Tidak Tersedia
          </h4>
          <p className="text-[#414c5a]">
            Mohon maaf, informasi untuk laporan tahun {page} belum tersedia. Silakan pilih laporan lain atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;