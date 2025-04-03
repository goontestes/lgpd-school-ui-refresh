
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultSectionProps {
  schoolName: string;
  diagnosisResults: {
    percentage: number;
    totalChecked: number;
  };
  complianceInfo: {
    level: string;
    text: string;
    color: string;
  };
  onReturn: () => void;
}

const ResultSection = ({ 
  schoolName, 
  diagnosisResults, 
  complianceInfo,
  onReturn
}: ResultSectionProps) => {
  const { percentage, totalChecked } = diagnosisResults;
  const pendingItems = 10 - totalChecked;

  // Determina a cor do medidor baseado na pontuação
  const getGaugeColor = (score: number) => {
    if (score <= 6) return "bg-red-500";
    if (score <= 8) return "bg-yellow-500";
    return "bg-green-500";
  };

  const gaugeColor = getGaugeColor(totalChecked);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-800 border-b pb-2">
        Análise da Escola: {schoolName}
      </h2>
      
      <div className="p-4 bg-blue-50 rounded-lg text-blue-800 font-medium">
        A escola atende {totalChecked} de 10 ({percentage}%) critérios de proteção de dados
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Velocímetro/Gauge */}
        <div className="mb-8 relative">
          <div className="flex justify-between mb-2 text-sm font-medium">
            <span className="text-red-500">Baixa</span>
            <span className="text-yellow-500">Moderada</span>
            <span className="text-green-500">Alta</span>
          </div>
          
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <Progress value={percentage} className="h-full" />
          </div>
          
          <div className="relative h-8 mt-1">
            <div 
              className={`absolute top-0 w-6 h-6 rounded-full ${gaugeColor} border-2 border-white shadow-md transform -translate-x-1/2`} 
              style={{ left: `${percentage}%` }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>|</span>
            <span>10</span>
          </div>
        </div>
        
        {/* Detalhes numéricos */}
        <div className="flex justify-center gap-8 text-center">
          <div className="space-y-1">
            <div className="text-green-500 font-bold text-2xl">{totalChecked}</div>
            <div className="text-sm text-gray-600">Atendidos</div>
          </div>
          <div className="space-y-1">
            <div className="text-red-500 font-bold text-2xl">{pendingItems}</div>
            <div className="text-sm text-gray-600">Pendentes</div>
          </div>
        </div>
      </div>
      
      <div className={`p-4 rounded-lg ${complianceInfo.color.replace('bg-', 'bg-opacity-10 text-').replace('-500', '-700')} border-l-4 ${complianceInfo.color}`}>
        <h3 className="font-bold mb-2">{complianceInfo.level}</h3>
        <p>{complianceInfo.text}</p>
      </div>
      
      <div className="mt-6">
        <Button 
          variant="outline" 
          onClick={onReturn}
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Retornar
        </Button>
      </div>
    </div>
  );
};

export default ResultSection;
