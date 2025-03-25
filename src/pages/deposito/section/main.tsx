import { useRouter } from "next/router";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface FormDataType {
  NamaLengkap: string;
  NoHandphone: string;
  Email: string;
  Provinsi: string;
  Kota: string;
}

const FormulirComponent: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // State untuk form deposito
  const [formData, setFormData] = useState<FormDataType>({
    NamaLengkap: "",
    NoHandphone: "",
    Email: "",
    Provinsi: "",
    Kota: ""
  });

  // State untuk status pengiriman form
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<FormDataType>>({});

  // State untuk kalkulator
  const [nominal, setNominal] = useState<string>("");
  const [tenure, setTenure] = useState<string>("1");
  const [interestRate, setInterestRate] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState({
    maturityAmount: "",
    totalInterest: "",
  });

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

    setErrors(newErrors);
    return isValid;
  };

  // Handle perubahan input form
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Khusus untuk handling nomor handphone, hapus karakter non-digit kecuali +
    if (name === 'NoHandphone') {
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validasi form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    const googleFormUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeuU12PKZNDHbvDchNee6YB2Xh26r_yl5BinDssfCOeu_c66Q/formResponse";
    
    const formDataGoogle = new FormData();
    formDataGoogle.append("entry.923347926", formData.NamaLengkap);
    formDataGoogle.append("entry.1185425086", formData.NoHandphone);
    formDataGoogle.append("entry.1253734581", formData.Email);
    formDataGoogle.append("entry.619027298", formData.Provinsi);
    formDataGoogle.append("entry.1295003116", formData.Kota);

    try {
      const iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      iframe.addEventListener('load', () => {
        setFormData({
          NamaLengkap: "",
          NoHandphone: "",
          Email: "",
          Provinsi: "",
          Kota: ""
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

  // Fungsi untuk kalkulator
  const calculateDeposit = () => {
    const principalAmount = parseFloat(nominal);
    const monthlyTenure = parseInt(tenure);
    const yearlyInterest = parseFloat(interestRate);
    
    if (!principalAmount || !monthlyTenure || !yearlyInterest) return;
    
    const monthlyInterest = yearlyInterest / 12;
    const totalInterest = (principalAmount * monthlyTenure * monthlyInterest) / 100;
    const maturityAmount = principalAmount + totalInterest;
    
    setCalculationResult({
      maturityAmount: maturityAmount.toLocaleString('id-ID'),
      totalInterest: totalInterest.toLocaleString('id-ID'),
    });
  };

  const resetCalculator = () => {
    setNominal("");
    setTenure("1");
    setInterestRate("");
    setCalculationResult({
      maturityAmount: "",
      totalInterest: "",
    });
  };

  // Tentukan konten berbeda berdasarkan `id`
  const getContent = (id: string | string[] | undefined) => {
    switch (id) {
      case "formulir-deposito":
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="docs-content">
                <div className="docs-section">
                  <h4 className="text-2xl font-bold text-[#003868] mb-6">
                    FORMULIR PENGAJUAN DEPOSITO
                  </h4>
                  
                  {submitSuccess && (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6">
                      <p>Formulir berhasil dikirim! Tim kami akan segera menghubungi Anda.</p>
                    </div>
                  )}
                  
                  <div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Nama Lengkap */}
                      <div className="form-group relative">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Lengkap Anda
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="NamaLengkap"
                          placeholder="Masukkan nama lengkap Anda disini"
                          className={`w-full px-3 py-2 bg-transparent border-b-2 ${
                            errors.NamaLengkap ? 'border-red-500' : 'border-blue-500'
                          } focus:outline-none focus:border-blue-700 text-black`}
                          value={formData.NamaLengkap}
                          onChange={handleChange}
                          required
                        />
                        {errors.NamaLengkap && (
                          <p className="text-red-500 text-xs mt-1">{errors.NamaLengkap}</p>
                        )}
                      </div>
                      
                      {/* No Handphone and Email in one row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group relative">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            No Handphone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="NoHandphone"
                            placeholder="Contoh: 0818 1818 7777"
                            className={`w-full px-3 py-2 bg-transparent border-b-2 ${
                              errors.NoHandphone ? 'border-red-500' : 'border-blue-500'
                            } focus:outline-none focus:border-blue-700 text-black`}
                            value={formData.NoHandphone}
                            onChange={handleChange}
                            required
                          />
                          {errors.NoHandphone && (
                            <p className="text-red-500 text-xs mt-1">{errors.NoHandphone}</p>
                          )}
                        </div>
                        
                        <div className="form-group relative">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="Email"
                            placeholder="Contoh: deposito@gmail.com"
                            className={`w-full px-3 py-2 bg-transparent border-b-2 ${
                              errors.Email ? 'border-red-500' : 'border-blue-500'
                            } focus:outline-none focus:border-blue-700 text-black`}
                            value={formData.Email}
                            onChange={handleChange}
                            required
                          />
                          {errors.Email && (
                            <p className="text-red-500 text-xs mt-1">{errors.Email}</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Provinsi */}
                      <div className="form-group relative">
                        <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
                          Provinsi Domisili
                        </label>
                        <input
                          type="text"
                          id="province"
                          name="Provinsi"
                          placeholder="Provinsi domisili Anda"
                          className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                          value={formData.Provinsi}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      {/* Kota/Kabupaten */}
                      <div className="form-group relative">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          Kota/Kabupaten Domisili
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="Kota"
                          placeholder="Kota domisili Anda"
                          className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                          value={formData.Kota}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className={`${
                          isSubmitting ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
                        } w-full md:w-auto px-6 py-3 text-white font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 flex items-center justify-center`}
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
                          'BUKA DEPOSITO'
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case "kalkulator-deposito":
        // Define Segoe UI font styles
        const segoeUIStyles = {
          fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
        };
        
        return (
          <div className="container mx-auto px-4 py-8" style={segoeUIStyles}>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h4 className="text-2xl font-bold text-[#003868] mb-6" style={segoeUIStyles}>
                  KALKULATOR DEPOSITO BANK ABDI
                </h4>
                
                {/* Calculator Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={segoeUIStyles}>
                      Nominal
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                      style={segoeUIStyles}
                      placeholder="Contoh : Rp 10.000.000"
                      value={nominal}
                      onChange={(e) => setNominal(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={segoeUIStyles}>
                      Jangka Waktu (Bulan)
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                      style={segoeUIStyles}
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="3">3</option>
                      <option value="6">6</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2" style={segoeUIStyles}>
                      Suku Bunga per Tahun
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-black"
                      style={segoeUIStyles}
                      placeholder="Contoh: 6,00%"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex justify-center gap-4 mb-8 text-black">
                  <button
                    onClick={resetCalculator}
                    className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    style={segoeUIStyles}
                  >
                    Reset
                  </button>
                  <button
                    onClick={calculateDeposit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    style={segoeUIStyles}
                  >
                    Hitung
                  </button>
                </div>
                
                {/* Results Card */}
                {calculationResult.maturityAmount && (
                  <div className="grid md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6" style={segoeUIStyles}>
                    <div className="space-y-4">
                      <div>
                        <h6 className="text-sm text-gray-600" style={segoeUIStyles}>Nominal saat jatuh tempo</h6>
                        <h3 className="text-xl font-bold text-blue-600" style={segoeUIStyles}>
                          Rp {calculationResult.maturityAmount}
                        </h3>
                      </div>
                      <div>
                        <h6 className="text-sm text-gray-600" style={segoeUIStyles}>Total Akumulasi Bunga</h6>
                        <h3 className="text-xl font-bold text-blue-600" style={segoeUIStyles}>
                          Rp {calculationResult.totalInterest}
                        </h3>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h6 className="text-sm text-gray-600" style={segoeUIStyles}>Faktor Kalkulasi</h6>
                      <div className="flex justify-between">
                        <span className="text-gray-600" style={segoeUIStyles}>Nominal</span>
                        <span className="font-medium" style={segoeUIStyles}>Rp {nominal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600" style={segoeUIStyles}>Jangka Waktu (Bulan)</span>
                        <span className="font-medium" style={segoeUIStyles}>{tenure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600" style={segoeUIStyles}>Suku Bunga per Tahun</span>
                        <span className="font-medium" style={segoeUIStyles}>{interestRate}%</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Disclaimer */}
                <div className="mt-8 space-y-4">
                  <h4 className="text-xl font-bold text-[#003868] ">
                    Simulasi Kalkulator Deposito | BANK ABDI
                  </h4>
                  <h3 className="text-[#Ff0000] text-lg font-semibold">Disclaimer</h3>
                  <p className="text-gray-600">
                    Kalkulator Deposito ini dirancang untuk membantu Anda menghitung pendapatan Bunga Deposito Berjangka.
                  </p>
                  <p className="text-gray-600">
                    (Calon) Nasabah disarankan berkonsultasi secara gratis dan mendapatkan penjelasan detail dari Funding officer Bank Universal BPR dengan mengisi form.
                  </p>
                  <p className="text-gray-600">
                    Ketahui suku bunga deposito BANK ABDI dengan mengklik tautan ini.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="lg:w-3/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">
                PERSYARATAN TABUNGAN ABDI - DEFAULT
              </h4>
              <ol className="list-decimal pl-6 text-gray-800 space-y-4">
                <li>Konten default yang muncul jika tidak ada parameter id</li>
              </ol>
            </div>
          </div>
        );
    }
  };

  return getContent(id);
};

export default FormulirComponent;