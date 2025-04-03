
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Bar } from "recharts";
import { useToast } from "@/components/ui/use-toast";
import IntroSection from "@/components/IntroSection";
import ChecklistSection from "@/components/ChecklistSection";
import ResultSection from "@/components/ResultSection";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [checkedItems, setCheckedItems] = useState(Array(10).fill(false));
  const [diagnosisResults, setDiagnosisResults] = useState({
    percentage: 0,
    totalChecked: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    updateAccessCounter();
  }, []);

  const updateAccessCounter = () => {
    let accesses = parseInt(localStorage.getItem("accessCount") || "0");
    accesses++;
    localStorage.setItem("accessCount", accesses.toString());
  };

  const showSection = (section: number) => {
    setCurrentSection(section);
  };

  const nextSection = () => {
    if (currentSection < 3) {
      setCurrentSection(currentSection + 1);
    }
  };

  const previousSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = checked;
    setCheckedItems(newCheckedItems);
  };

  const calculateDiagnosis = () => {
    if (!schoolName.trim()) {
      toast({
        title: "Nome da escola é obrigatório",
        description: "Por favor, preencha o nome da escola para continuar.",
        variant: "destructive",
      });
      return;
    }

    const totalItems = 10;
    const totalChecked = checkedItems.filter(Boolean).length;
    const percentage = ((totalChecked / totalItems) * 100).toFixed(2);

    setDiagnosisResults({
      percentage: parseFloat(percentage),
      totalChecked,
    });

    nextSection();
  };

  const getComplianceLevel = () => {
    const { totalChecked } = diagnosisResults;

    if (totalChecked >= 8) {
      return {
        level: "Nível 3 - Alta Conformidade",
        text: "A escola demonstra um forte compromisso com a proteção de dados e a privacidade dos alunos. Pode ser considerada segura em relação à conformidade com a LGPD. Este nível é ideal para garantir que os dados dos alunos estão bem protegidos.",
        color: "bg-green-500",
      };
    } else if (totalChecked >= 5) {
      return {
        level: "Nível 2 - Conformidade Moderada",
        text: "A escola tem algumas medidas de proteção de dados, mas existem áreas que precisam de melhoria. É recomendável discutir com a escola sobre planos para corrigir as lacunas e aumentar a conformidade com a LGPD.",
        color: "bg-yellow-500",
      };
    } else {
      return {
        level: "Nível 1 - Baixa Conformidade",
        text: "A escola apresenta grandes deficiências em relação à proteção de dados e privacidade dos alunos. Requer uma reavaliação cuidadosa e discussões com a direção da escola para garantir que as medidas corretivas sejam implementadas. Se as lacunas não forem corrigidas, considere outras opções de escolas mais seguras.",
        color: "bg-red-500",
      };
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <Card className="w-full max-w-3xl shadow-lg border-none backdrop-blur-sm bg-white/90">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-center text-2xl text-blue-800 font-semibold">
            Diagnóstico LGPD para Escolas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {currentSection === 1 && (
            <IntroSection onStart={nextSection} />
          )}

          {currentSection === 2 && (
            <ChecklistSection
              schoolName={schoolName}
              setSchoolName={setSchoolName}
              checkedItems={checkedItems}
              onCheckboxChange={handleCheckboxChange}
              onPrevious={previousSection}
              onSubmit={calculateDiagnosis}
            />
          )}

          {currentSection === 3 && (
            <ResultSection
              schoolName={schoolName}
              diagnosisResults={diagnosisResults}
              complianceInfo={getComplianceLevel()}
              onReturn={previousSection}
            />
          )}
        </CardContent>
      </Card>

      <div className="fixed bottom-3 right-3 bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-blue-800 shadow-sm border border-blue-100">
        Acessos: {localStorage.getItem("accessCount") || 0}
      </div>
    </div>
  );
};

export default Index;
