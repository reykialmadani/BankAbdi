import { useState, useEffect } from "react";
import SidebarLaporan from "./sidebar";
import { Content as ContentType } from "@/pages/api/fetching/routes";

interface ExtendedContentType extends Omit<ContentType, 'sub_menu_id'> {
  sub_menu_id?: number;
  
  report_type?: string;
  report_year?: string;
  report_quarter?: string;
  required_documents?: string;
  additional_content?: string;
  updated_at?: string;
  sub_menu?: Record<string, unknown>;
}

interface ContentProps {
  contentData: ExtendedContentType | null;
  isLoading?: boolean;
  id?: string | string[];
  allContents?: ExtendedContentType[]; 
}

const Content = ({ contentData, isLoading = false, id, allContents = [] }: ContentProps) => {
  const [page, setPage] = useState<string>(typeof id === 'string' ? id : "2023");

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

  const findContentForCurrentSelection = () => {
    if (!allContents || allContents.length === 0) return null;

    if (page.includes('-')) {
      const parts = page.split('-');
      
      if (parts.length === 2 && !isNaN(Number(parts[0])) && !isNaN(Number(parts[1]))) {
        const firstYearQuarterlyContent = allContents.filter(content => 
          content.report_type === 'Triwulan' && 
          content.report_year === parts[0]
        );
        
        if (firstYearQuarterlyContent.length > 0) {
          console.log(`Found ${firstYearQuarterlyContent.length} quarterly reports for year ${parts[0]}`);
          const sorted = [...firstYearQuarterlyContent].sort((a, b) => {
            const quarterA = parseInt(a.report_quarter || '0');
            const quarterB = parseInt(b.report_quarter || '0');
            return quarterB - quarterA;
          });
          return sorted[0];
        }
        
        const secondYearQuarterlyContent = allContents.filter(content => 
          content.report_type === 'Triwulan' && 
          content.report_year === parts[1]
        );
        
        if (secondYearQuarterlyContent.length > 0) {
          console.log(`Found ${secondYearQuarterlyContent.length} quarterly reports for year ${parts[1]}`);
          const sorted = [...secondYearQuarterlyContent].sort((a, b) => {
            const quarterA = parseInt(a.report_quarter || '0');
            const quarterB = parseInt(b.report_quarter || '0');
            return quarterB - quarterA;
          });
          return sorted[0];
        }
        
        const firstYearAnnualContent = allContents.find(content => 
          content.report_type === 'Tahunan' && 
          content.report_year === parts[0]
        );
        
        if (firstYearAnnualContent) {
          console.log(`Found annual report for year ${parts[0]}`);
          return firstYearAnnualContent;
        }
        
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
      else {
        const [year, quarter] = parts;
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

  const currentContent = findContentForCurrentSelection() || contentData;

  useEffect(() => {
    console.log("Page changed to:", page);
    console.log("Current content found:", currentContent ? true : false);
    if (currentContent) {
      console.log("Content type:", currentContent.report_type);
      console.log("Content year:", currentContent.report_year);
      console.log("Content quarter:", currentContent.report_quarter);
    }
  }, [page, currentContent]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (currentContent) {
    let reportDocuments = null;
    if (currentContent.required_documents) {
      try {
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
      } catch (error) {
        console.error(error);
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

    const isQuarterlyReport = currentContent.report_type === 'Triwulan';

    return (
      <div className="flex flex-col lg:flex-row gap-8">
        <SidebarLaporan currentPath={page} setPage={setPage} />
        <div className="lg:w-3/4 w-full">
          <div className="rounded-lg shadow-sm p-6 text-sm">
            <h4 className="text-2xl font-bold text-[#003868] mb-6">
              {currentContent.title}
            </h4>
            
            {currentContent.description && (
              <div
                className="mb-6 text-[#414c5a] prose max-w-none"
                dangerouslySetInnerHTML={{ __html: currentContent.description }}
              />
            )}
            
            {reportDocuments}
            
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
              {isQuarterlyReport && currentContent.report_quarter && (
                <p className="text-[#414c5a]">
                  <span className="font-medium">Triwulan:</span> {currentContent.report_quarter}
                </p>
              )}
            </div>
            
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