import React from 'react';
import Image from 'next/image';


interface RiskManagementProps {
  className?: string;
}
const RiskManagement: React.FC<RiskManagementProps> = ({ className }) => {
  return (
    <div className={`risk-management-section ${className || ""}`}>
      
      {/* Docs Section Manfaat */}
      <div className="docs-section">
        <h4 className="heading prime-primary pb-5 text-black">Manfaat</h4>
        <div className="grid grid-cols-2 gap-5">
          <div className="manfaat flex items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/manfaat_plant.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">Tabungan yang memberikan suku bunga kompetitif.</p>
          </div>
          <div className="manfaat flex items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/manfaat-buku.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">Rekening Koran.</p>
          </div>
          <div className="manfaat flex items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/manfaat_hand.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">Setoran awal yang terjangkau.</p>
          </div>
          <div className="manfaat flex items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/manfaat_chart.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">Bunga dihitung atas saldo rata-rata harian.</p>
          </div>
        </div>
      </div>

      {/* Docs Section Risiko */}
      <div className="docs-section mt-5">
        <h4 className="heading complementary pb-5 text-black">Risiko</h4>
        <div className="grid grid-cols-2 gap-5">
          <div className="risiko flex flex-row items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/risiko_password.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">
              Rekening tabungan dan kerahasiaan informasi/kode
              sandi terkait layanan tabungan (bilamana ada)
              merupakan tanggung jawab nasabah.
            </p>
          </div>
          <div className="risiko flex flex-row items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/risiko_tag.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">
              Bank sewaktu-waktu dapat melakukan perubahan atas
              besaran suku bunga / biaya lainnya tanpa pemberitahuan
              kepada nasabah terlebih dulu (syarat ketentuan
              berlaku).
            </p>
          </div>
          <div className="risiko col-span-2 flex flex-row items-center">
            <Image 
              alt="" 
              src="https://bankabdi.co.id/img/icon/risiko_x.png" 
              width={50} 
              height={50} 
            />
            <p className="ml-3 text-black">
              Bank tidak akan memberikan bunga untuk saldo yang
              berada dibawah Saldo Minimum Dapat Bunga.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagement;