// FormulirComponent.tsx
import React, { useState } from 'react';

const FormulirComponent = () => {
  const [formData, setFormData] = useState({
    jenisTabungan: "",
    namaLengkap: "",
    noHandphone: "",
    email: "",
    provinsi: "",
    kota: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://formsubmit.co/a56b76c554c52e9362bff114b5528c24",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Form submitted successfully!");
        // Reset form
        setFormData({
          jenisTabungan: "",
          namaLengkap: "",
          noHandphone: "",
          email: "",
          provinsi: "",
          kota: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h4 className="text-2xl font-bold text-[#003868] mb-6">
          FORMULIR PENGAJUAN TABUNGAN
        </h4>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Jenis Tabungan Section with blue background */}
          <div className="bg-[#EFF6FC] rounded-lg p-6 text-white">
            <h5 className="text-black text-lg font-bold mb-4">Jenis Tabungan</h5>
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="customRadioInline1"
                  name="jenisTabungan"
                  value="Tabungan ABDI"
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
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-black border-white focus:ring-0"
                />
                <label htmlFor="customRadioInline3" className="text-black">
                  Tabungan ABDI SIMPEL
                </label>
              </div>
            </div>
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
                className="w-full border-0 border-b-2 border-blue-500 focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400"
              />
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
                  className="w-full border-0 border-b-2 border-blue-500 focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400"
                />
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
                  className="w-full border-0 border-b-2 border-blue-500 focus:ring-0 focus:outline-none focus:border-blue-700 px-0 bg-transparent text-black placeholder-gray-400"
                />
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

          <button
            type="submit"
            className="w-1/4 mx-auto py-3 px-4 bg-[#003868] text-white font-medium rounded-full"
          >
            Buat Tabungan
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormulirComponent;