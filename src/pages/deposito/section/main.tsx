import { useRouter } from "next/router";
import React, { useState } from "react";

const MainPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  // State for calculator
  const [nominal, setNominal] = useState<string>("");
  const [tenure, setTenure] = useState<string>("1");
  const [interestRate, setInterestRate] = useState<string>("");
  const [calculationResult, setCalculationResult] = useState({
    maturityAmount: "",
    totalInterest: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    // You can use API routes in Next.js to handle the submission
    console.log(id);  // To debug and ensure `id` is correctly populated
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
                          className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                        />
                        {/* <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 transform rotate-45 translate-y-1/2"></div> */}
                      </div>

                      {/* No Handphone and Email in one row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-group relative">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            No Handphone
                          </label>
                          <input
                            type="number"
                            id="phone"
                            name="noHandphone"
                            placeholder="Contoh: 0818 1818 7777"
                            required
                            className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                          />
                          {/* <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 transform rotate-45 translate-y-1/2"></div> */}
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
                            className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                          />
                          {/* <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 transform rotate-45 translate-y-1/2"></div> */}
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
                          name="Domisili"
                          placeholder="Provinsi domisili Anda"
                          className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                        />
                        {/* <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 transform rotate-45 translate-y-1/2"></div> */}
                      </div>

                      {/* Kota/Kabupaten */}
                      <div className="form-group relative">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          Kota/Kabupaten Domisili*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="Kota"
                          placeholder="Kota domisili Anda"
                          className="w-full px-3 py-2 bg-transparent border-b-2 border-blue-500 focus:outline-none focus:border-blue-700 text-black"
                        />
                        {/* <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 transform rotate-45 translate-y-1/2"></div> */}
                      </div>

                      <button
                        type="submit"
                        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        BUKA DEPOSITO
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

export default MainPage;