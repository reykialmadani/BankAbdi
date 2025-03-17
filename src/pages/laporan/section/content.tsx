import { useState, useEffect } from "react";
import SidebarLaporan from "./sidebar";
import { Content as ContentType } from "@/pages/api/fetching/routes";

// Perbaikan: Mendefinisikan tipe yang lebih lengkap jika ContentType dari API tidak memiliki properti yang dibutuhkan
interface ExtendedContentType extends ContentType {
  // Properti tambahan yang digunakan tapi tidak ada di ContentType
  report_type?: string;
  report_year?: string;
  report_quarter?: string;
  required_documents?: string;
  additional_content?: string;
  updated_at?: string;
  sub_menu_id?: number;
  sub_menu?: any;
}

interface ContentProps {
  contentData: ExtendedContentType | null;
  isLoading?: boolean;
  id?: string | string[];
  allContents?: ExtendedContentType[]; // Gunakan tipe yang diperluas
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
    reportYear: contentData.report_year,
    reportQuarter: contentData.report_quarter
  } : null);
  console.log("Content component - allContents length:", allContents.length);

  // Mencari konten yang sesuai dengan tahun/triwulan yang dipilih saat ini
  const findContentForCurrentSelection = () => {
    if (!allContents || allContents.length === 0) return null;

    // Menangani format "2025-2021"
    if (page.includes('-')) {
      const parts = page.split('-');
      
      // Jika format "2025-2021" (keduanya adalah angka dan tidak ada huruf)
      if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
        // Prioritaskan mencari laporan triwulan terlebih dahulu
        // Cari triwulan untuk tahun pertama
        const firstYearQuarterlyContent = allContents.filter(content => 
          content.report_type === 'Triwulan' && 
          content.report_year === parts[0]
        );
        
        if (firstYearQuarterlyContent.length > 0) {
          console.log(`Found ${firstYearQuarterlyContent.length} quarterly reports for year ${parts[0]}`);
          // Urutkan berdasarkan triwulan terbaru
          const sorted = [...firstYearQuarterlyContent].sort((a, b) => {
            const quarterA = parseInt(a.report_quarter || '0');
            const quarterB = parseInt(b.report_quarter || '0');
            return quarterB - quarterA;
          });
          return sorted[0]; // Ambil triwulan terbaru
        }
        
        // Cari triwulan untuk tahun kedua
        const secondYearQuarterlyContent = allContents.filter(content => 
          content.report_type === 'Triwulan' && 
          content.report_year === parts[1]
        );
        
        if (secondYearQuarterlyContent.length > 0) {
          console.log(`Found ${secondYearQuarterlyContent.length} quarterly reports for year ${parts[1]}`);
          // Urutkan berdasarkan triwulan terbaru
          const sorted = [...secondYearQuarterlyContent].sort((a, b) => {
            const quarterA = parseInt(a.report_quarter || '0');
            const quarterB = parseInt(b.report_quarter || '0');
            return quarterB - quarterA;
          });
          return sorted[0]; // Ambil triwulan terbaru
        }
        
        // Jika tidak ditemukan laporan triwulan, cari laporan tahunan
        // Prioritaskan tahun pertama (biasanya tahun terbaru)
        const firstYearAnnualContent = allContents.find(content => 
          content.report_type === 'Tahunan' && 
          content.report_year === parts[0]
        );
        
        if (firstYearAnnualContent) {
          console.log(`Found annual report for year ${parts[0]}`);
          return firstYearAnnualContent;
        }
        
        // Coba tahun kedua jika tidak ditemukan untuk tahun pertama
        const secondYearAnnualContent = allContents.find(content => 
          content.report_type === 'Tahunan' && 
          content.report_year === parts[1]
        );
        
        if (secondYearAnnualContent) {
          console.log(`Found annual report for year ${parts[1]}`);
          return secondYearAnnualContent;
        }
        
        return null;
      } 
      // Format standar untuk laporan triwulan (tahun-triwulan, contoh: 2021-1)
      else {
        const [year, quarter] = parts;
        // Cari konten triwulan yang spesifik
        const matchingQuarterlyContent = allContents.find(content => 
          content.report_type === 'Triwulan' && 
          content.report_year === year && 
          content.report_quarter === quarter
        );
        
        if (matchingQuarterlyContent) {
          console.log(`Found specific quarterly report for ${year}-${quarter}`);
          return matchingQuarterlyContent;
        }
        
        return null;
      }
    } 
    // Format untuk laporan tahunan (hanya tahun)
    else {
      const matchingAnnualContent = allContents.find(content => 
        content.report_type === 'Tahunan' && 
        content.report_year === page
      );
      
      if (matchingAnnualContent) {
        console.log(`Found annual report for ${page}`);
        return matchingAnnualContent;
      }
      
      return null;
    }
  };

  // Prioritaskan hasil dari findContentForCurrentSelection
  // Namun jika tidak ditemukan, gunakan contentData sebagai fallback
  const currentContent = findContentForCurrentSelection() || contentData;

  // Effect untuk debug ketika page berubah
  useEffect(() => {
    console.log("Page changed to:", page);
    console.log("Current content found:", currentContent ? true : false);
    if (currentContent) {
      console.log("Content type:", currentContent.report_type);
      console.log("Content year:", currentContent.report_year);
      console.log("Content quarter:", currentContent.report_quarter);
    }
  }, [page, currentContent]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  // Konten dinamis dari backend yang sesuai dengan tahun/triwulan yang dipilih
  if (currentContent) {
    // Parsing untuk dokumen laporan jika string JSON
    let reportDocuments = null;
    if (currentContent.required_documents) {
      try {
        // Coba parse jika string JSON
        if (typeof currentContent.required_documents === 'string') {
          const parsed = JSON.parse(currentContent.required_documents);
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
                __html: currentContent.required_documents,
              }}
            />
          </div>
        );
      }
    }

    // Template khusus untuk laporan triwulan
    const isQuarterlyReport = currentContent.report_type === 'Triwulan';

    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <SidebarLaporan currentPath={page} setPage={setPage} />
        <div className="lg:w-3/4 w-full">
          <div className="rounded-lg shadow-sm p-6 text-sm">
            <h4 className="text-2xl font-bold text-[#003868] mb-6">
              {currentContent.title}
            </h4>
            
            {/* Tampilkan deskripsi konten */}
            {currentContent.description && (
              <div
                className="mb-6 text-[#414c5a] prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.description }}
              />
            )}
            
            {/* Tampilkan dokumen yang diperlukan jika ada */}
            {reportDocuments}
            
            {/* Informasi laporan dengan format yang berbeda berdasarkan jenis laporan */}
            <div className="mt-4">
              <h5 className="text-lg font-semibold text-[#003868] mb-2">
                Informasi Laporan:
              </h5>
              {currentContent.report_type && (
                <p className="text-[#414c5a]">
                  <span className="font-medium">Jenis Laporan:</span> {currentContent.report_type}
                </p>
              )}
              {currentContent.report_year && (
                <p className="text-[#414c5a]">
                  <span className="font-medium">Tahun Laporan:</span> {currentContent.report_year}
                </p>
              )}
              {/* Tampilkan informasi triwulan jika ini adalah laporan triwulan */}
              {isQuarterlyReport && currentContent.report_quarter && (
                <p className="text-[#414c5a]">
                  <span className="font-medium">Triwulan:</span> {currentContent.report_quarter}
                </p>
              )}
            </div>
            
            {/* Tampilkan konten tambahan lainnya jika tersedia */}
            {currentContent.additional_content && (
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-[#003868] mb-2">
                  {isQuarterlyReport ? "Detail Laporan Triwulan:" : "Informasi Tambahan:"}
                </h5>
                <div
                  className="text-[#414c5a]"
                  dangerouslySetInnerHTML={{
                    __html: currentContent.additional_content,
                  }}
                />
              </div>
            )}
            
            {/* Tampilkan tanggal pembaruan jika tersedia */}
            {currentContent.updated_at && (
              <div className="mt-6 text-xs text-gray-500">
                Terakhir diperbarui:{" "}
                {new Date(currentContent.updated_at).toLocaleDateString("id-ID", {
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
            {page.includes('-') ? 
              (page.split('-').length === 2 && !isNaN(Number(page.split('-')[0])) && !isNaN(Number(page.split('-')[1])) ?
                `Mohon maaf, informasi untuk periode ${page} belum tersedia.` :
                `Mohon maaf, informasi untuk Triwulan ${page.split('-')[1]} Tahun ${page.split('-')[0]} belum tersedia.`) :
              `Mohon maaf, informasi untuk laporan tahun ${page} belum tersedia.`
            } 
            Silakan pilih laporan lain atau hubungi kami untuk informasi lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;