import React from 'react';

const BannerContact: React.FC = () => {
  return (
    <div
      className="section bg-cover bg-center bg-overlay-dark"
      style={{
        backgroundImage: 'url(https://bankabdi.co.id/img/home/bg-cta-footer.png)',
      }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="section-heading text-center mb-0">
          <h2 className="heading text-white text-3xl sm:text-4xl md:text-5xl mt-4">
            Ingin Mengembangkan Investasi dan Usaha Anda?
          </h2>
          <a
            href="/contact"
            className="btn btn-lg bg-blue-600 text-white py-2 px-6 rounded-full mt-10"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
};

export default BannerContact;
