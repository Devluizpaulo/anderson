import React, { useState } from "react";
import { DriverData } from "./types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Car, ChevronDown, ChevronUp } from "lucide-react";

interface ReceiptDriverConfigProps {
  driver: DriverData;
  onChange: (updatedDriver: DriverData) => void;
}

export const ReceiptDriverConfig: React.FC<ReceiptDriverConfigProps> = ({
  driver,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFieldChange = (field: keyof DriverData, value: string) => {
    onChange({
      ...driver,
      [field]: value,
    });
  };

  return (
    <div className="bg-black/30 border border-[#e9c349]/10 rounded-2xl overflow-hidden transition-all duration-300">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none select-none hover:bg-white/5 transition"
      >
        <div className="flex items-center space-x-3">
          <Car className="w-5 h-5 text-[#e9c349]" />
          <div>
            <h4 className="text-xs font-semibold text-[#e2e2e2] uppercase tracking-wider">
              Dados do Emissor / Veículo
            </h4>
            <p className="text-[10px] text-[#c4c7c7] mt-0.5">
              {driver.nome} • {driver.veiculo} ({driver.placa})
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-5 border-t border-[#e9c349]/10 bg-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-scale-up">
          <div className="space-y-2">
            <Label htmlFor="drvNome" className="text-xs font-semibold text-[#c4c7c7]">
              Nome do Motorista
            </Label>
            <Input
              id="drvNome"
              type="text"
              value={driver.nome}
              onChange={(e) => handleFieldChange("nome", e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drvCpf" className="text-xs font-semibold text-[#c4c7c7]">
              CPF do Motorista
            </Label>
            <Input
              id="drvCpf"
              type="text"
              value={driver.cpf}
              onChange={(e) => handleFieldChange("cpf", e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drvCnpj" className="text-xs font-semibold text-[#c4c7c7]">
              CNPJ da Empresa (Opcional)
            </Label>
            <Input
              id="drvCnpj"
              type="text"
              value={driver.cnpj || ""}
              onChange={(e) => handleFieldChange("cnpj", e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drvVeiculo" className="text-xs font-semibold text-[#c4c7c7]">
              Modelo do Veículo
            </Label>
            <Input
              id="drvVeiculo"
              type="text"
              value={driver.veiculo}
              onChange={(e) => handleFieldChange("veiculo", e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>

          <div className="sm:col-span-2 space-y-2">
            <Label htmlFor="drvPlaca" className="text-xs font-semibold text-[#c4c7c7]">
              Placa do Veículo
            </Label>
            <Input
              id="drvPlaca"
              type="text"
              value={driver.placa}
              onChange={(e) => handleFieldChange("placa", e.target.value)}
              className="bg-[#0C0F0F] border-[#444748]/30 text-white focus:border-[#e9c349] transition"
            />
          </div>
        </div>
      )}
    </div>
  );
};
