import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface FormDataType {
  jenisTabungan: string;
  namaLengkap: string;
  noHandphone: string;
  email: string;
  provinsi: string;
  kota: string;
}

const FormulirTabungan: React.FC = () => {
  // State untuk form
  const [formData, setFormData] = useState<FormDataType>({
    jenisTabungan: "",
    namaLengkap: "",
    noHandphone: "",
    email: "",
    provinsi: "",
    kota: "",
  });

  // State untuk status pengiriman form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  // Reset pesan sukses setelah 5 detik
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Validasi form
  const validateForm = () => {
    const newErrors: Partial<FormDataType> = {};
    let isValid = true;

    // Validasi Jenis Tabungan
    if (!formData.jenisTabungan) {
      newErrors.jenisTabungan = "Pilih jenis tabungan";
      isValid = false;
    }

    // Validasi Nama Lengkap
    if (formData.namaLengkap.trim().length < 3) {
      newErrors.namaLengkap = "Nama lengkap minimal 3 karakter";
      isValid = false;
    }

    // Validasi No Handphone
    const phoneRegex = /^(08|\+628)[0-9]{8,11}$/;
    if (!phoneRegex.test(formData.noHandphone.replace(/\s+/g, ''))) {
      newErrors.noHandphone = "Format nomor handphone tidak valid";
      isValid = false;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle perubahan input form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Khusus untuk handling nomor handphone, hapus karakter non-digit kecuali +
    if (name === 'noHandphone') {
      const cleanedValue = value.replace(/[^\d+]/g, '');
      setFormData((prevState) => ({
        ...prevState,
        [name]: cleanedValue,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Hapus error saat field diubah
    if (errors[name as keyof FormDataType]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  // Handle pengiriman form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // URL untuk Google Form
    const googleFormUrl = "https://docs.google.com/forms/u/0/d/1XpRDbTaJupvaztwjYlBP1MfgFtfHLZ9nFrhvUGFNLEc/formResponse";
    
    // Persiapkan data untuk dikirim ke Google Form
    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.566903359", formData.jenisTabungan); // Jenis Tabungan
    formDataGoogle.append("entry.703610632", formData.namaLengkap);   // Nama Lengkap
    formDataGoogle.append("entry.1211476152", formData.noHandphone);  // No Handphone
    formDataGoogle.append("entry.1104566216", formData.email);        // Email
    formDataGoogle.append("entry.628538996", formData.provinsi);      // Provinsi
    formDataGoogle.append("entry.1601530458", formData.kota);         // Kota

    try {
      // Buat iframe tersembunyi untuk target form submission
      const iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Konfigurasi listener untuk menangani event setelah form disubmit
      iframe.addEventListener('load', () => {
        setFormData({
          jenisTabungan: "",
          namaLengkap: "",
          noHandphone: "",
          email: "",
          provinsi: "",
          kota: ""
        });
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Hapus iframe setelah digunakan
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      });

      // Buat form element untuk mengatasi masalah CORS
      const form = document.createElement("form");
      form.action = googleFormUrl;
      form.method = "POST";
      form.target = "hidden_iframe"; // Arahkan ke iframe tersembunyi
      
      // Tambahkan data form ke form element
      for (const [key, value] of formDataGoogle.entries()) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }

      // Tambahkan form ke DOM dan submit
      document.body.appendChild(form);
      form.submit();
      
      // Hapus form setelah submit
      setTimeout(() => {
        document.body.removeChild(form);
      }, 500);
      
    } catch (error) {
      console.error("Error mengirim formulir:", error);
      setIsSubmitting(false);
      alert("Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h4 className="text-2xl font-bold text-[#003868] mb-6">
          FORMULIR PENGAJUAN TABUNGAN
        </h4>
        
        {submitSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <p>Formulir berhasil dikirim! Tim kami akan segera menghubungi Anda.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Jenis Tabungan Section with blue background */}
          <div className="bg-[#EFF6FC] rounded-lg p-6 text-white">
            <h5 className="text-black text-lg font-bold mb-4">Jenis Tabungan</h5>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="jenisTabungan"
                  value="Tabungan ABDI"
                  checked={formData.jenisTabungan === "Tabungan ABDI"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-white border-white focus:ring-0"
                />
                <label htmlFor="customRadioInline1" className="text-black">
                  Tabungan ABDI
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="customRadioInline2"
                  name="jenisTabungan"
                  value="Tabungan ABDIKU"
                  checked={formData.jenisTabungan === "Tabungan ABDIKU"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-black border-white focus:ring-0"
                />
                <label htmlFor="customRadioInline2" className="text-black">
                  Tabungan ABDIKU
                </label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="customRadioInline3"
                  name="jenisTabungan"
                  value="Tabungan ABDI SIMPEL"
                  checked={formData.jenisTabungan === "Tabungan ABDI SIMPEL"}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-black border-white focus:ring-0"
                />
                <label htmlFor="customRadioInline3" className="text-black">
                  Tabungan ABDI SIMPEL
                </label>
              </div>
            </div>
            {errors.jenisTabungan && (
              <p className="text-red-500 text-xs mt-2">{errors.jenisTabungan}</p>
            )}
          </div>

          {/* Personal Information Section with underlined inputs */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="namaLengkap"
                className="block text-sm font-medium text-black mb-1"
              >
                Nama Lengkap Anda
              </label>
              <input
                type="text"
                name="namaLengkap"
                id="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda disini"
                className={`w-full border-0 border-b-2 ${
                  errors.namaLengkap ? 'border-red-500' : 'border-blue-500'
                } focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400`}
              />
              {errors.namaLengkap && (
                <p className="text-red-500 text-xs mt-1">{errors.namaLengkap}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="noHandphone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  No Handphone
                </label>
                <input
                  type="tel"
                  name="noHandphone"
                  id="noHandphone"
                  value={formData.noHandphone}
                  onChange={handleChange}
                  placeholder="Contoh: 0818 1818 7777"
                  className={`w-full border-0 border-b-2 ${
                    errors.noHandphone ? 'border-red-500' : 'border-blue-500'
                  } focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400`}
                />
                {errors.noHandphone && (
                  <p className="text-red-500 text-xs mt-1">{errors.noHandphone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Contoh: deposito@gmail.com"
                  className={`w-full border-0 border-b-2 ${
                    errors.email ? 'border-red-500' : 'border-blue-500'
                  } focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="provinsi"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Provinsi Domisili
              </label>
              <input
                type="text"
                name="provinsi"
                id="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                placeholder="Provinsi domisili Anda"
                className="w-full border-0 border-b-2 border-blue-500 focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400"
              />
            </div>

            <div>
              <label
                htmlFor="kota"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kota/Kabupaten Domisili*
              </label>
              <input
                type="text"
                name="kota"
                id="kota"
                value={formData.kota}
                onChange={handleChange}
                placeholder="Kota domisili Anda"
                className="w-full border-0 border-b-2 border-blue-500 focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                isSubmitting ? 'bg-blue-700' : 'bg-[#003868] hover:bg-blue-700'
              } w-full md:w-1/4 mx-auto py-3 px-4 text-white font-medium rounded-full flex items-center justify-center`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                'Buat Tabungan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormulirTabungan;