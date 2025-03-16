import { Content as ContentType } from "@/pages/api/fetching/routes";

interface ContentProps {
  contentData?: ContentType | null;
  isLoading?: boolean;
}

const Content = ({ contentData, isLoading = false }: ContentProps) => {
  // Debug info dengan detail tambahan jika tersedia
  console.log(
    "Content component - received contentData:",
    contentData
      ? {
          id: contentData.id,
          title: contentData.title,
          subMenuId: contentData.sub_menu_id,
          subMenu: contentData.sub_menu,
        }
      : null
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (contentData) {
    // Parsing untuk required_documents jika string JSON
    let requiredDocuments = null;
    if (contentData.required_documents) {
      try {
        // Coba parse jika string JSON
        if (typeof contentData.required_documents === "string") {
          const parsed = JSON.parse(contentData.required_documents);
          if (Array.isArray(parsed) && parsed.length > 0) {
            requiredDocuments = (
              <div className="mt-4">
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
                          Lihat Dokumen
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
        requiredDocuments = (
          <div className="mt-4">
            <h5 className="text-lg font-semibold text-[#003868] mb-2">
              Dokumen yang Diperlukan:
            </h5>
            <div
              className="text-[#414c5a]"
              dangerouslySetInnerHTML={{
                __html: contentData.required_documents,
              }}
            />
          </div>
        );
      }
    }

    return (
      <div className="rounded-lg shadow-sm p-6 text-sm">
        <h4 className="text-2xl font-bold text-[#003868] mb-6">
          {contentData.title}
        </h4>
        {/* Tampilkan deskripsi konten */}
        {contentData.description && (
          <div
            className="mb-6 text-[#414c5a] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: contentData.description }}
          />
        )}
        {/* Tampilkan dokumen yang diperlukan jika ada */}
        {requiredDocuments}
        {/* Tampilkan informasi tambahan untuk laporan jika ada */}
        {contentData.report_type && (
          <div className="mt-4">
            <h5 className="text-lg font-semibold text-[#003868] mb-2">
              Informasi Laporan:
            </h5>
            <p className="text-[#414c5a]">
              <span className="font-medium">Jenis Laporan:</span>{" "}
              {contentData.report_type}
            </p>
            {contentData.report_year && (
              <p className="text-[#414c5a]">
                <span className="font-medium">Tahun Laporan:</span>{" "}
                {contentData.report_year}
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
              dangerouslySetInnerHTML={{
                __html: contentData.additional_content,
              }}
            />
          </div>
        )}
        {/* Tampilkan tanggal pembaruan jika tersedia */}
        {contentData.updated_at && (
          <div className="mt-6 text-xs text-gray-500">
            Terakhir diperbarui:{" "}
            {new Date(contentData.updated_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
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