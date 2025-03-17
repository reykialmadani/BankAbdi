// FormulirComponent.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
          NamaLengkap: "",
          NoHandphone: "",
          Email: "",
          Provinsi: "",
          Kota: "",
          Pekerjaan: "",
          JenisJaminan: "",
          NominalPengajuan: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <div className="lg:w-3/4 w-full">
      <div className="rounded-lg shadow-sm p-6">
        <h4 className="text-2xl font-bold text-[#003868] mb-6">
          Formulir Pengajuan Pinjaman
        </h4>
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
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="formGroupExampleInput"
                  placeholder="Masukkan nama lengkap Anda disini"
                  value={formData.NamaLengkap}
                  onChange={handleChange}
                  required
                />
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
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputTelp"
                  placeholder="Contoh: 0818 1818 7777"
                  value={formData.NoHandphone}
                  onChange={handleChange}
                  required
                />
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
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputEmail4"
                  placeholder="Contoh: deposito@gmail.com"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
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
                  className="appearance-none block w-full bg-transparent text-[#414c5a] border-b-2 border-blue-500 py-2 px-0 leading-tight focus:outline-none font-segoe-ui"
                  id="inputNominal"
                  placeholder="Contoh : Rp 10.0000.000"
                  value={formData.NominalPengajuan}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-900 text-white font-segoe-ui font-medium py-2 px-6 rounded-full mt-4"
            >
              Ajukan Pinjaman
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormulirComponent;