import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Blog from "../components/section/blog";

type BlogPostData = {
  title: string;
  image: string;
  content: string;
  date: string;
  author: string;
};

// Sample blog posts data with minimal content
const blogPostsData: Record<string, BlogPostData> = {
  "tips-menyusun-anggaran-penjualan-biar-cuan-makin-maksimal": {
    title: "Tips Menyusun Anggaran Penjualan, Biar Cuan Makin Maksimal!",
    image:
      "https://bankabdi.co.id/storage/post-images/iNWDdyCNwdPwiMdXuJF4Jc04peujGAnYHYBIY11J.png",
    date: "10 Maret 2025",
    author: "Tim Bank Abdi",
    content: `
      <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Enim suspendisse aenean montes sed vivamus consequat! Netus odio lorem pulvinar dui nullam sollicitudin lectus blandit. Ad curae netus luctus tristique conubia torquent quis mauris. Nunc cras orci mus quis quisque. Nunc libero aenean placerat consectetur massa tempus pharetra tincidunt.`,
  },
  "kredit-101-pahami-istilah-istilah-ini-sebelum-mengajukan-pinjaman": {
    title:
      "Kredit 101: Pahami Istilah-Istilah Ini Sebelum Mengajukan Pinjaman!",
    image:
      "https://bankabdi.co.id/storage/post-images/mIDthWsAMu65K7Le8Q5qGPA5qlELd6FUXxO89Pfr.png",
    date: "5 Maret 2025",
    author: "Tim Bank Abdi",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut dapibus felis vel magna mattis commodo.</p>
      
      <h2>Istilah Kredit Dasar</h2>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      
      <ul>
        <li>Excepteur sint occaecat cupidatat</li>
        <li>Non proident, sunt in culpa</li>
        <li>Qui officia deserunt mollit</li>
      </ul>
    `,
  },
  "menyongsong-masa-pensiun-langkah-bijak-dalam-mengelola-dana": {
    title: "Menyongsong Masa Pensiun: Langkah Bijak dalam Mengelola Dana",
    image:
      "https://bankabdi.co.id/storage/post-images/MHYRuxSlECwR5xpaybz4nSthGcNQ9uCeUlG3s2vb.png",
    date: "28 Februari 2025",
    author: "Tim Bank Abdi",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus non ipsum nec metus cursus tincidunt.</p>
      
      <h2>Persiapan Dana Pensiun</h2>
    `,
  },
};

const BlogPostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [blogPost, setBlogPost] = useState<BlogPostData | null>(null);

  useEffect(() => {
    if (slug && typeof slug === "string") {
      // In a real app, this would be an API call to fetch the blog post data
      const post = blogPostsData[slug];
      if (post) {
        setBlogPost(post);
      } else {
        // Handle 404 case - post not found
        router.push("/404");
      }
    }
  }, [slug, router]);

  if (!blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section with Blog Post Image */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={blogPost.image}
            alt={blogPost.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-white text-2xl md:text-4xl font-bold mb-4">
                {blogPost.title}
              </h1>
              <div className="flex items-center text-white text-sm mb-4">
                <span>{blogPost.date}</span>
                <span className="mx-2">•</span>
                <span>{blogPost.author}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="text-sm mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto shadow-sm p-6 md:p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blogPost.content }}
            />
          </div>
        </div>
      </main>

      <Blog />
      <Footer />
    </div>
  );
};

export default BlogPostPage;