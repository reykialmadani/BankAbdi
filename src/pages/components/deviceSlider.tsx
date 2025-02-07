import { useState } from "react";

const DeviceSliderColumn = () => {
    const [activeTab, setActiveTab] = useState("Pinjaman");

    const tabs = ["Pinjaman", "Tabungan", "Deposito"];

    return (
        <div className="flex justify-center py-4">
            <div className="flex space-x-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-black text-lg px-6 py-2 transition-all duration-300 ${
                            activeTab === tab ? "border-b-4 border-black-100" : "opacity-60 hover:opacity-100"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DeviceSliderColumn;
