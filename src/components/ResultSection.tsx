
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

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

  const data = [
    {
      name: "Proteção de dados",
      Atendidos: totalChecked,
      Pendentes: pendingItems,
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-800 border-b pb-2">
        Análise da Escola: {schoolName}
      </h2>
      
      <div className="p-4 bg-blue-50 rounded-lg text-blue-800 font-medium">
        A escola atende {totalChecked} de 10 ({percentage}%) critérios de proteção de dados
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="Atendidos" stackId="a" fill="#4ade80" radius={[4, 0, 0, 4]}>
              <LabelList dataKey="Atendidos" position="inside" fill="#fff" fontWeight="bold" />
            </Bar>
            <Bar dataKey="Pendentes" stackId="a" fill="#f87171" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="Pendentes" position="inside" fill="#fff" fontWeight="bold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
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
