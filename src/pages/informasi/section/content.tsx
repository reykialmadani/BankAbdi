import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
// import { useState } from 'react';

// Blog Card Component
const BlogCard = ({ post }: { post: any }) => {
  return (
    <Link href={post.href} className="block">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image 
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <div className="mb-3">
            <small className="text-gray-700 font-medium">{post.title}</small>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Baca Selengkapnya</span>
            <span className="text-[#2b88d8]">&gt;</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-1">
        <li className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className={`px-3 py-2 border rounded ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-600' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            &lsaquo;
          </Link>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i + 1}>
            <Link
              href={`/blog?page=${i + 1}`}
              className={`px-3 py-2 border rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </Link>
          </li>
        ))}
        <li className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className={`px-3 py-2 border rounded ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-600'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            &rsaquo;
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Content = () => {
  const router = useRouter();
  const { id } = router.query;

  const getContent = (id: string | string[] | undefined) => {
    switch (id) {
      case "suku-bunga":
        return (
          <div className="w-full max-w-6xl mx-auto px-4 py-8">
            {/* Deposito Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                DEPOSITO
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          NOMINAL
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          1 Bulan
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          3 Bulan
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          6 Bulan
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          12 Bulan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          s.d 500.000.000
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          5.75%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          5.75%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.25%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.25%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          &gt; 500.000.000
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.00%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.25%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.50%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.50%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabungan Abdi Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                TABUNGAN ABDI
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Suku Bunga TABUNGAN ABDI
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          PERORANGAN
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          PERUSAHAAN
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Suku Bunga per Tahun
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          1.50%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          1.50%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Pajak Penghasilan (PPh)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">20%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabungan Abdiku Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                TABUNGAN ABDIKU
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Suku Bunga TABUNGAN ABDIKU
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          PERORANGAN
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Suku Bunga per Tahun
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          1.00%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Pajak Penghasilan (PPh)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabungan Abdi Simpel Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                TABUNGAN ABDI SIMPEL
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          SUKU BUNGA TABUNGAN ABDI SIMPEL
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          TABUNGAN ABDI SIMPEL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Suku Bunga per Tahun
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          0.00%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Pajak Penghasilan (PPh)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "tabungan":
        return (
          <div className="w-full max-w-6xl mx-auto px-4 py-8">
            {/* Deposito Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                DEPOSITO
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          NOMINAL
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          1 Bulan
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          3 Bulan
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          6 Bulan
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          12 Bulan
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          s.d 500.000.000
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          5.75%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          5.75%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.25%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.25%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          &gt; 500.000.000
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.00%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.25%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.50%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          6.50%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabungan Abdi Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                TABUNGAN ABDI
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Suku Bunga TABUNGAN ABDI
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          PERORANGAN
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          PERUSAHAAN
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Suku Bunga per Tahun
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          1.50%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          1.50%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Pajak Penghasilan (PPh)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">20%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabungan Abdiku Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                TABUNGAN ABDIKU
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          Suku Bunga TABUNGAN ABDIKU
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          PERORANGAN
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Suku Bunga per Tahun
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          1.00%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Pajak Penghasilan (PPh)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">20%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Tabungan Abdi Simpel Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">
                TABUNGAN ABDI SIMPEL
              </h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          SUKU BUNGA TABUNGAN ABDI SIMPEL
                        </th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                          TABUNGAN ABDI SIMPEL
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Suku Bunga per Tahun
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          0.00%
                        </td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">
                          Pajak Penghasilan (PPh)
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">0%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "deposito":
        return (
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
            {/* Deposito Section */}
            <div className="mb-8">
              <h4 className="text-2xl font-semibold text-blue-600 mb-4">DEPOSITO</h4>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">NOMINAL</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">1 Bulan</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">3 Bulan</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">6 Bulan</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">12 Bulan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="bg-white hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">s.d 500.000.000</td>
                        <td className="px-6 py-4 text-sm text-gray-700">5.75%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">5.75%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6.25%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6.25%</td>
                      </tr>
                      <tr className="bg-gray-50 hover:bg-gray-100">
                        <td className="px-6 py-4 text-sm text-gray-700">&gt; 500.000.000</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6.00%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6.25%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6.50%</td>
                        <td className="px-6 py-4 text-sm text-gray-700">6.50%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case "lps":
        return (
            <div className="content-lps">
            <h4 className="heading prime-primary text-xl font-semibold text-blue-600 mb-4">
              INFORMASI LPS
            </h4>
            <div className="relative">
              <object
                data="https://bankabdi.co.id/docs/LPS-2023.pdf"
                type="application/pdf"
                className="w-[700px] h-[1000px]"
              >
                <iframe
                  src="https://docs.google.com/viewer?url=https://bankabdi.co.id/docs/LPS-2023.pdf&embedded=true"
                  className="w-[700px] h-[1000px] border-0"
                ></iframe>
              </object>
            </div>
          </div>
      
        );
      case "iso":
        return (
            <div className="docs-content">
            <div className="docs-section mb-8">
              <h4 className="text-xl font-semibold text-blue-600 mb-4">Sertifikat ISO</h4>
              <Link
                href="https://bankabdi.co.id/storage/public/images/ZFfztbtSx4E3UJrCLqijASqVhgnyVguxwtd2D9lV.jpgjpg"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Image
                  src="https://bankabdi.co.id/storage/public/images/ZFfztbtSx4E3UJrCLqijASqVhgnyVguxwtd2D9lV.jpg"
                  alt="iso"
                  width={448}
                  height={640}
                  className="w-full max-w-lg rounded-lg shadow-lg"
                />
              </Link>
            </div>
          </div>
        );
        case "blog":case "event":
            const posts = [
              {
                href: "/posts/tips-menyusun-anggaran-penjualan-biar-cuan-makin-maksimal",
                image: "https://bankabdi.co.id/storage/post-images/iNWDdyCNwdPwiMdXuJF4Jc04peujGAnYHYBIY11J.png",
                title: "Tips Menyusun Anggaran Penjualan, Biar Cuan Makin Maksimal!",
                excerpt: "Pernah bingung cara menyusun anggaran penjualan yang tepat? Tenang, kamu nggak sendirian! Anggaran y..."
              },
              {
                href: "/posts/kredit-101-pahami-istilah-istilah-ini-sebelum-mengajukan-pinjaman",
                image: "https://bankabdi.co.id/storage/post-images/mIDthWsAMu65K7Le8Q5qGPA5qlELd6FUXxO89Pfr.png",
                title: "Kredit 101: Pahami Istilah-Istilah Ini Sebelum Mengajukan Pinjaman!",
                excerpt: "Saat ini, banyak dari kita mencari dana pinjaman untuk berbagai kebutuhan. Entah itu untuk beli ruma..."
              },
              {
                href: "/posts/menyongsong-masa-pensiun-langkah-bijak-dalam-mengelola-dana",
                image: "https://bankabdi.co.id/storage/post-images/MHYRuxSlECwR5xpaybz4nSthGcNQ9uCeUlG3s2vb.png",
                title: "Menyongsong Masa Pensiun: Langkah Bijak dalam Mengelola Dana",
                excerpt: "Pensiun, sebuah fase kehidupan yang seharusnya dipandang sebagai perjalanan menuju ketenangan dan ke..."
              },
              // Add more posts as needed
            ];
    
            return (
              <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                  <h4 className="text-2xl font-semibold text-[#2b88d8]">Blogs</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First post takes full width */}
                  <div className="md:col-span-2">
                    <BlogCard post={posts[0]} />
                  </div>
                  
                  {/* Remaining posts in two columns */}
                  {posts.slice(1).map((post, index) => (
                    <div key={index}>
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
    
                <Pagination currentPage={1} totalPages={2} />
              </div>
            );
      default:
        return (
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                INFORMASI BANK ABDI
              </h4>
              <div className="text-gray-800">
                <p>Silakan pilih menu informasi yang ingin Anda lihat.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return getContent(id);
};

export default Content;
