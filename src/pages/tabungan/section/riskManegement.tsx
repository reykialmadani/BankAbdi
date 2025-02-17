import { useRouter } from 'next/router'
import Image from 'next/image'

const RiskManagement = () => {
  const router = useRouter()
  const { id } = router.query

  // Konten yang berbeda berdasarkan id
  const content: Record<string, { title: string; benefits: { icon: string; text: string }[]; risks: { icon: string; text: string; fullWidth?: boolean }[] }> = {
    "tabungan-abdi": {
      title: "Manfaat dan Risiko Tabungan",
      benefits: [
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_plant.png",
          text: "Tabungan yang memberikan suku bunga kompetitif."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat-buku.png",
          text: "Rekening Koran."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_hand.png",
          text: "Setoran awal yang terjangkau."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_chart.png",
          text: "Bunga dihitung atas saldo rata-rata harian."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_pig.png",
          text: "Saldo Minimum tabungan rendah dan Setoran Minimum Selanjutnya juga kecil."
        }
      ],
      risks: [
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_password.png",
          text: "Rekening tabungan dan kerahasiaan informasi/kode sandi terkait layanan tabungan (bilamana ada) merupakan tanggung jawab nasabah."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_tag.png",
          text: "Bank sewaktu-waktu dapat melakukan perubahan atas besaran suku bunga / biaya lainnya tanpa pemberitahuan kepada nasabah terlebih dulu (syarat ketentuan berlaku)."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_x.png",
          text: "Bank tidak akan memberikan bunga untuk saldo yang berada dibawah Saldo Minimum Dapat Bunga.",
          fullWidth: true
        }
      ]
    },
    "tabungan-abdiku": {
      title: "Manfaat dan Risiko Tabungan",
      benefits: [
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_plant.png",
          text: "Keuntungan tabungan kedua yang berbeda."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat-buku.png",
          text: "Buku rekening yang mudah diakses."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_hand.png",
          text: "Setoran awal yang rendah."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_chart.png",
          text: "Perhitungan bunga berbasis saldo harian."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_pig.png",
          text: "Minimal saldo dan setoran selanjutnya sangat rendah."
        }
      ],
      risks: [
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_password.png",
          text: "Risiko terkait keamanan informasi akun dan password."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_tag.png",
          text: "Perubahan kebijakan bank tanpa pemberitahuan lebih lanjut."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_x.png",
          text: "Bunga tidak diberikan jika saldo dibawah minimum yang ditentukan."
        }
      ]
    },
    "tabungan-abdi-simple": {
      title: "Manfaat dan Risiko Tabungan",
      benefits: [
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat-buku.png",
          text: "Rekening Koran."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_hand.png",
          text: "Setoran Awal Terjangkau."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_sejak_dini.png",
          text: "Meningkatkan pemahaman perbankan sejak dini."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_child.png",
          text: "Bunga dihitung atas saldo rata-rata harian."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/manfaat_student.png",
          text: "Melatih kemandirian dan pengelolaan keuangan untuk masa depan.."
        }
      ],
      risks: [
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_password.png",
          text: "Rekening tabungan  dan kerahasiaan informasi/kode sandi terkait layanan tabungan (bilamana ada) merupakan tanggung jawab nasabah.."
        },
        {
          icon: "https://bankabdi.co.id/img/icon/risiko_tag.png",
          text: "Bank sewaktu-waktu dapat melakukan perubahan atas besaran suku bunga / biaya lainnya tanpa pemberitahuan kepada nasabah terlebih dulu (syarat ketentuan berlaku).."
        }
      ]
    }
  }

  // Pastikan id valid dan merupakan salah satu dari angka yang ada
  if (!id || !content[id as keyof typeof content]) {
    return <p>Konten tidak ditemukan</p>
  }

  const currentContent = content[id as keyof typeof content];

  return (
    <div className="container mx-auto px-4">
      <h4 className="text-primary text-2xl font-semibold mb-8">{currentContent.title}</h4>

      {/* Manfaat Section */}
      <section className="mb-12">
        <h5 className="text-primary text-xl font-semibold mb-4">Manfaat</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentContent.benefits.map((benefit, index) => (
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

      {/* Risiko Section */}
      <section>
        <h5 className="text-secondary text-xl font-semibold mb-4">Risiko</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentContent.risks.map((risk, index) => (
            <div key={index} className={`flex items-start space-x-4 ${risk.fullWidth ? 'md:col-span-3' : ''}`}>
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

export default RiskManagement