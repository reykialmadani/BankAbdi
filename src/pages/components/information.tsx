import React from 'react';

interface BlogPostProps {
  title: string;
  link: string;
  imageUrl: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, link, imageUrl }) => {
  return (
    <div className="col-md-4">
      <a href={link}>
        <div className="ui-card post-item ui-action-card shadow-sm">
          
          <div
            className="card-image bg-cover bg-center h-48"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
          
          <div className="card-header p-4">
            <small className="post-tag text-sm text-black">Nasabah BANK ABDI</small>
          </div>
          
          <div className="card-body p-4 ui-turncate-text">
            <p className="text-lg text-black">{title}</p>
          </div>
          
          <div className="card-footer flex justify-between items-center p-4">
            <span className="post-meta text-blue-600">Baca Selengkapnya</span>
            <span className="text-blue-600">&gt;</span>
          </div>
        </div>
      </a>
    </div>
  );
};

const Information: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100">
      <div className="ui-blog-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <BlogPost
          title="Menyongsong Masa Pensiun: Langkah Bijak dalam Mengelola Dana"
          link="/posts/menyongsong-masa-pensiun-langkah-bijak-dalam-mengelola-dana"
          imageUrl="https://bankabdi.co.id/storage/post-images/MHYRuxSlECwR5xpaybz4nSthGcNQ9uCeUlG3s2vb.png"
        />
        <BlogPost
          title="Perubahan Title BPR Akar Budaya Dana Indonesia"
          link="/posts/perubahan-title-bpr-akar-budaya-dana-indonesia"
          imageUrl="https://bankabdi.co.id/storage/post-images/BSlnrb8PnxgR7c5xt4VaZe183MUvcl9SprgsrX0B.jpg"
        />
      </div>
    </div>
  );
};

export default Information;
