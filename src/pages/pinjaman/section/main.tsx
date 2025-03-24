// FormulirComponent.tsx 
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface FormDataType {
  NamaLengkap: string;
  NoHandphone: string;
  Email: string;
  Provinsi: string;
  Kota: string;
  Pekerjaan: string;
  JenisJaminan: string;
  NominalPengajuan: string;
}

const FormulirComponent = () => {
  const [formData, setFormData] = useState<FormDataType>({
    NamaLengkap: "",
    NoHandphone: "",
    Email: "",
    Provinsi: "",
    Kota: "",
    Pekerjaan: "",
    JenisJaminan: "",
    NominalPengajuan: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  // Reset success message after 5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const validateForm = () => {
    const newErrors: Partial<FormDataType> = {};
    let isValid = true;

    // Validasi Nama Lengkap
    if (formData.NamaLengkap.trim().length < 3) {
      newErrors.NamaLengkap = "Nama lengkap minimal 3 karakter";
      isValid = false;
    }

    // Validasi No Handphone
    const phoneRegex = /^(08|\+628)[0-9]{8,11}$/;
    if (!phoneRegex.test(formData.NoHandphone.replace(/\s+/g, ''))) {
      newErrors.NoHandphone = "Format nomor handphone tidak valid";
      isValid = false;
    }

    // Validasi Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.Email)) {
      newErrors.Email = "Format email tidak valid";
      isValid = false;
    }

    // Validasi Nominal Pengajuan
    const nominalClean = formData.NominalPengajuan.replace(/[^\d]/g, '');
    if (isNaN(Number(nominalClean)) || Number(nominalClean) < 1000000) {
      newErrors.NominalPengajuan = "Nominal pengajuan minimal Rp 1.000.000";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const formatCurrency = (value: string) => {
    // Hapus semua karakter non-digit
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Jika kosong, kembalikan string kosong
    if (!numericValue) return '';
    
    // Konversi ke number dan format ke IDR
    const number = parseInt(numericValue, 10);
    return `Rp ${number.toLocaleString('id-ID')}`;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Khusus untuk handling nomor handphone, hapus spasi
    if (name === 'NoHandphone') {
      const cleanedValue = value.replace(/[^\d+]/g, '');
      setFormData((prevState) => ({
        ...prevState,
        [name]: cleanedValue,
      }));
    } 
    // Khusus untuk handling nominal pengajuan, format currency
    else if (name === 'NominalPengajuan') {
      const formattedValue = formatCurrency(value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
    } 
    // Untuk field lainnya
    else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    
    // Hapus error saat field diubah
    if (errors[name as keyof FormDataType]) {
      setErrors({
        ...errors,
        [name]: undefined
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSffkXXz-Qk-bspU32ZPJGGzqdpp5ThmxKybHmh6RTqVB04MGw/viewform?usp=preview";

    const cleanNominal = formData.NominalPengajuan.replace(/[^\d]/g, '');
    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.2887643431", formData.NamaLengkap);
    formDataGoogle.append("entry.252411449", formData.NoHandphone);
    formDataGoogle.append("entry.154163368", formData.Email);
    formDataGoogle.append("entry.81370468", formData.Provinsi);
    formDataGoogle.append("entry.887786019", formData.Kota);
    formDataGoogle.append("entry.1496153433", formData.Pekerjaan);
    formDataGoogle.append("entry.1971368886", formData.JenisJaminan);
    formDataGoogle.append("entry.291528118", cleanNominal); 
    
    try {
      const iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      
      iframe.addEventListener('load', () => {
        // Reset form setelah submit berhasil
        setFormData({
          NamaLengkap: "",
          NoHandphone: "",
          Email: "",
          Provinsi: "",
          Kota: "",
          Pekerjaan: "",
          JenisJaminan: "",
          NominalPengajuan: "",
        });
        
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Hapus iframe setelah digunakan
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      });
      
      // Google Form tidak mengizinkan CORS, jadi kita perlu menggunakan iframe untuk mengirim data
      const form = document.createElement("form");
      form.action = googleFormUrl;
      form.method = "POST";
      form.target = "hidden_iframe"; // Arahkan ke iframe tersembunyi daripada tab baru
      
      // Tambahkan data form ke form element
      for (const [key, value] of formDataGoogle.entries()) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      }
      
      // Tambahkan form ke DOM, submit, dan hapus
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
    <div className="lg:w-3/4 w-full">
      <div className="rounded-lg shadow-sm p-6">
        <h4 className="text-2xl font-bold text-[#003868] mb-6">
          Formulir Pengajuan Pinjaman
        </h4>
        
        {submitSuccess && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
            <p>Formulir berhasil dikirim! Tim kami akan segera menghubungi Anda.</p>
          </div>
        )}
        
        <div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="formGroupExampleInput"
                >
                  Nama Lengkap Peminjam
                </label>
                <input
                  type="text"
                  name="NamaLengkap"
                  className={`appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 ${
                    errors.NamaLengkap ? 'border-red-500' : 'border-blue-500'
                  } py-2 px-0 leading-tight focus:outline-none font-segoe-ui`}
                  id="formGroupExampleInput"
                  placeholder="Masukkan nama lengkap Anda disini"
                  value={formData.NamaLengkap}
                  onChange={handleChange}
                  required
                />
                {errors.NamaLengkap && (
                  <p className="text-red-500 text-xs mt-1">{errors.NamaLengkap}</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputTelp"
                >
                  No Handphone
                </label>
                <input
                  type="tel"
                  name="NoHandphone"
                  className={`appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 ${
                    errors.NoHandphone ? 'border-red-500' : 'border-blue-500'
                  } py-2 px-0 leading-tight focus:outline-none font-segoe-ui`}
                  id="inputTelp"
                  placeholder="Contoh: 08181818777"
                  value={formData.NoHandphone}
                  onChange={handleChange}
                  required
                />
                {errors.NoHandphone && (
                  <p className="text-red-500 text-xs mt-1">{errors.NoHandphone}</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputEmail4"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  className={`appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 ${
                    errors.Email ? 'border-red-500' : 'border-blue-500'
                  } py-2 px-0 leading-tight focus:outline-none font-segoe-ui`}
                  id="inputEmail4"
                  placeholder="Contoh: deposito@gmail.com"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
                {errors.Email && (
                  <p className="text-red-500 text-xs mt-1">{errors.Email}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputProvinsi"
                >
                  Provinsi Domisili
                </label>
                <input
                  type="text"
                  name="Provinsi"
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputProvinsi"
                  placeholder="Provinsi domisili Anda"
                  value={formData.Provinsi}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputAddress2"
                >
                  Kota/Kabupaten Domisili
                </label>
                <input
                  type="text"
                  name="Kota"
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputAddress2"
                  placeholder="Kota domisili Anda"
                  value={formData.Kota}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputPekerjaan"
                >
                  Pekerjaan
                </label>
                <input
                  type="text"
                  name="Pekerjaan"
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputPekerjaan"
                  placeholder="Pekerjaan Anda"
                  value={formData.Pekerjaan}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputJaminan"
                >
                  Jenis Jaminan
                </label>
                <input
                  type="text"
                  name="JenisJaminan"
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputJaminan"
                  placeholder="Jaminan Anda"
                  value={formData.JenisJaminan}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full px-3 mb-4">
                <label
                  className="block text-[#414c5a] text-sm font-segoe-ui font-medium mb-2"
                  htmlFor="inputNominal"
                >
                  Nominal Pengajuan
                </label>
                <input
                  type="text"
                  name="NominalPengajuan"
                  className={`appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 ${
                    errors.NominalPengajuan ? 'border-red-500' : 'border-blue-500'
                  } py-2 px-0 leading-tight focus:outline-none font-segoe-ui`}
                  id="inputNominal"
                  placeholder="Contoh : Rp 10.000.000"
                  value={formData.NominalPengajuan}
                  onChange={handleChange}
                  required
                />
                {errors.NominalPengajuan && (
                  <p className="text-red-500 text-xs mt-1">{errors.NominalPengajuan}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className={`${
                isSubmitting ? 'bg-blue-700' : 'bg-blue-900 hover:bg-blue-800'
              } text-white font-segoe-ui font-medium py-2 px-6 rounded-full mt-4 transition duration-300 flex items-center`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengirim...
                </>
              ) : (
                'Ajukan Pinjaman'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormulirComponent;