import Image from 'next/image'

const DepositInfo = () => {
  const benefits = [
    {
      icon: "https://bankabdi.co.id/img/icon/manfaat_plant.png",
      text: "Deposito yang memberikan suku bunga kompetitif."
    },
    {
      icon: "https://bankabdi.co.id/img/icon/manfaat_clock1.png",
      text: "Jangka waktu 1, 3, 6, dan 12 bulan."
    },
    {
      icon: "https://bankabdi.co.id/img/icon/manfaat_bilyet.png",
      text: "Mendapatkan Bilyet Deposito."
    },
    {
      icon: "https://bankabdi.co.id/img/icon/manfaat_bunga_transfer.png",
      text: "Bunga dapat ditransfer ke rekening BANK ABDI atau bank lain."
    },
    {
      icon: "https://bankabdi.co.id/img/icon/manfaat_clock2.png",
      text: "Perpanjangan Deposito dilakukan secara otomatis (Automatic Roll Over /ARO)."
    },
    {
      icon: "https://bankabdi.co.id/img/icon/manfaat_agunan_pinjaman.png",
      text: "Dapat dijadikan agunan untuk fasilitas pinjaman."
    }
  ]

  const risks = [
    {
      icon: "https://bankabdi.co.id/img/icon/risiko_bilyet.png",
      text: "Bilyet Deposito hilang merupakan tanggung jawab nasabah, harus membuat laporan kehilangan dari kepolisian setempat.",
      fullWidth: true
    },
    {
      icon: "https://bankabdi.co.id/img/icon/risiko_tempo.png",
      text: "Tidak dapat dicairkan sebelum jatuh tempo."
    },
    {
      icon: "https://bankabdi.co.id/img/icon/risiko_penalty.png",
      text: "Akan dibebankan penalty atas pencairan deposito sebelum jatuh tempo"
    }
  ]

  return (
    <div className="container mx-auto px-4">
      {/* Benefits Section */}
      <section className="mb-12">
        <h4 className="text-primary text-2xl font-semibold mb-8">Manfaat</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src={benefit.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-700">{benefit.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Risks Section */}
      <section>
        <h4 className="text-secondary text-2xl font-semibold mb-8">Risiko</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {risks.map((risk, index) => (
            <div 
              key={index} 
              className={`flex items-start space-x-4 ${
                risk.fullWidth ? 'md:col-span-3' : ''
              }`}
            >
              <div className="w-12 h-12 flex-shrink-0">
                <Image
                  src={risk.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-700">{risk.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DepositInfo