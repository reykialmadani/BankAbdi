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
      <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Enim suspendisse aenean montes sed vivamus consequat! Netus odio lorem pulvinar dui nullam sollicitudin lectus blandit. Ad curae netus luctus tristique conubia torquent quis mauris. Nunc cras orci mus quis quisque. Nunc libero aenean placerat consectetur massa tempus pharetra tincidunt.

Adipiscing tempor praesent erat, in fames class luctus vivamus justo. Scelerisque inceptos non; himenaeos neque maximus sit potenti quis ad. Faucibus est orci sollicitudin fusce tellus velit. Et rutrum pulvinar quis suspendisse suscipit morbi tincidunt maximus platea. Nunc commodo imperdiet condimentum imperdiet netus aenean ipsum phasellus. Mollis conubia rutrum metus adipiscing primis porta magna laoreet lacinia. Mus dignissim praesent magnis est suscipit felis. Velit sem elementum nulla vestibulum elit facilisi blandit convallis.

Acurae phasellus rhoncus varius ultrices phasellus. Efficitur quisque pretium aenean; in sociosqu convallis. Nibh eleifend nascetur placerat rutrum nostra luctus. Tortor enim efficitur dis laoreet natoque turpis aliquet. Mattis scelerisque adipiscing platea maximus felis orci finibus accumsan. Montes lacinia fermentum viverra platea magnis lacus lectus.

Massa lacinia ipsum sagittis arcu risus litora suscipit non. Felis erat dolor lectus; efficitur purus mollis mollis cras. Laoreet molestie ac montes potenti nostra fermentum. Neque est ad nostra nisl himenaeos. Eros tellus in finibus lacus lacus condimentum. Viverra rhoncus etiam posuere class bibendum hac dignissim bibendum? Ultricies magnis pulvinar scelerisque; magna vitae cubilia.

Pellentesque fermentum vivamus fames sagittis maecenas volutpat primis convallis. Tempor dolor tincidunt sagittis nibh proin orci. Senectus etiam vehicula pretium litora vestibulum. Feugiat odio accumsan; ut scelerisque proin sodales! Vel ipsum sagittis facilisis faucibus; porta cras eu. Ex cursus semper sagittis elementum leo. Habitant fusce adipiscing suscipit lobortis, ante vivamus. Nisl dui ridiculus vitae inceptos pulvinar massa class. Cursus ullamcorper turpis duis dis aenean amet. Ultrices sagittis maximus, rutrum convallis urna semper ultrices.

Inceptos condimentum mi convallis scelerisque, etiam erat! Sed nisi molestie nam neque turpis suscipit. Volutpat vitae aliquam finibus etiam nisi nullam. Ante ex ante class nam magna penatibus. Adipiscing sit habitant risus maecenas sagittis; odio efficitur primis taciti. Pharetra fringilla ac nec elementum imperdiet condimentum quis duis. Id risus venenatis fusce donec praesent amet hendrerit. Congue himenaeos velit interdum cubilia et molestie risus turpis. Enim netus magnis tempor maximus fames interdum mollis et.

Laoreet nulla metus efficitur, nisi nulla neque. Platea facilisi libero nunc donec sem; magnis vivamus. Feugiat hendrerit fringilla, iaculis convallis nullam tristique. Lobortis hendrerit donec gravida penatibus dolor lacinia adipiscing per non. Hendrerit suscipit consectetur litora netus congue, phasellus quis nulla aliquam. Ipsum magnis suscipit risus ex nullam lacinia fringilla facilisis. Urna pretium dictumst fringilla etiam justo urna imperdiet curae. Leo tellus integer nunc vehicula duis congue. Montes non consequat ridiculus ligula platea laoreet. Ante vivamus sollicitudin natoque; integer mattis lobortis fames.

Ipsum feugiat aliquam lacus pretium, quis neque praesent felis. Quisque class velit nisi primis donec sapien sit. Aliquam sem proin eget efficitur venenatis. Rutrum tempor quisque gravida quisque fermentum; turpis sollicitudin duis? Ipsum erat scelerisque ad ullamcorper bibendum. Fusce suscipit porta libero finibus vestibulum est viverra ante. Placerat per eleifend duis facilisi sapien velit primis vivamus.

Elit tristique malesuada egestas tempor nibh accumsan eu. Quam morbi ridiculus facilisis ultricies fames auctor elementum. Parturient semper velit ullamcorper accumsan urna ut dui litora. Eros erat dictum nascetur massa imperdiet nascetur. Euismod pretium cras suscipit varius suspendisse. Fringilla himenaeos iaculis mollis consequat elementum dolor. Urna class sodales non dictum finibus massa. Vestibulum magnis phasellus penatibus felis venenatis interdum suscipit. Sem sit eget ridiculus himenaeos est. Nisl mus inceptos condimentum lobortis; vivamus donec euismod.

Justo euismod diam aptent eget; commodo mauris. Tempus mattis euismod id arcu malesuada rhoncus ornare. Nostra condimentum facilisi scelerisque nostra velit. Commodo curabitur felis gravida facilisis malesuada purus nullam neque. Cras cubilia nullam semper curabitur himenaeos enim urna. Iaculis lobortis proin nibh suspendisse tempor rutrum. Accumsan gravida id montes vel condimentum tincidunt aliquet mus. Amet etiam ut lacinia nisi class. Magnis proin nunc, facilisis erat magnis ornare phasellus in.</p>
      
      <h2>Strategi Anggaran Penjualan</h2>
      
      <p>Fusce sit amet quam eget nisi tincidunt tempus. Phasellus dictum nisi in mauris commodo, non volutpat quam vulputate. Praesent in dui vitae mi gravida sagittis.</p>
      
      <ul>
        <li>Nullam dignissim felis ac turpis finibus</li>
        <li>Vivamus malesuada mauris eget semper congue</li>
        <li>Cras egestas nibh in velit lobortis</li>
      </ul>
      
      <h3>Pertimbangan Penting</h3>
      
      <p>Nulla facilisi. Sed ultrices sapien non enim fermentum, a luctus libero dictum. Integer porttitor magna eget felis imperdiet, ac ornare sapien molestie.</p>
    `,
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
      
      <p>Donec luctus, dolor ut convallis tristique, massa nisl tempor dolor, non dignissim nisi turpis at magna.</p>
      
      <h3>Strategi Investasi</h3>
      
      <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
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