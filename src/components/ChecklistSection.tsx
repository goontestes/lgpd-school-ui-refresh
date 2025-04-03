
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ChecklistSectionProps {
  schoolName: string;
  setSchoolName: (name: string) => void;
  checkedItems: boolean[];
  onCheckboxChange: (index: number, checked: boolean) => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const ChecklistSection = ({ 
  schoolName, 
  setSchoolName, 
  checkedItems, 
  onCheckboxChange,
  onPrevious,
  onSubmit
}: ChecklistSectionProps) => {
  const questions = [
    // Política de Privacidade
    { 
      category: "Política de Privacidade",
      items: [
        "Possui uma política de privacidade clara e acessível, que explique como os dados dos alunos são coletados, utilizados e protegidos.",
        "Coleta apenas os dados estritamente necessários para as atividades educacionais, de acordo com o princípio da minimização de dados."
      ]
    },
    // Uso de Imagens e Dados dos Alunos
    {
      category: "Uso de Imagens e Dados dos Alunos",
      items: [
        "Solicita consentimento específico dos pais para o uso de imagens dos alunos em redes sociais e campanhas publicitárias."
      ]
    },
    // Plataformas Terceirizadas
    {
      category: "Plataformas Terceirizadas",
      items: [
        "Utiliza plataformas de ensino terceirizadas que estão em conformidade com a LGPD e assina contratos de proteção de dados com esses fornecedores."
      ]
    },
    // Segurança e Proteção de Dados
    {
      category: "Segurança e Proteção de Dados",
      items: [
        "Adota medidas de segurança, como criptografia e autenticação em duas etapas, para proteger os dados dos alunos.",
        "Realiza auditorias de segurança regularmente para garantir a proteção dos sistemas contra ataques e vazamentos.",
        "Permite que os pais revisem, corrijam ou solicitem a exclusão dos dados dos alunos quando necessário."
      ]
    },
    // Conscientização e Educação Digital
    {
      category: "Conscientização e Educação Digital",
      items: [
        "Oferece orientações sobre privacidade e segurança digital para alunos, pais e funcionários."
      ]
    },
    // Direitos dos Alunos e Famílias
    {
      category: "Direitos dos Alunos e Famílias",
      items: [
        "Respeita a recusa dos pais quanto ao uso dos dados dos alunos para finalidades secundárias, como marketing."
      ]
    },
    // Vazamento de Dados e Plano de Ação
    {
      category: "Vazamento de Dados e Plano de Ação",
      items: [
        "Possui um plano de ação para lidar com incidentes de vazamento de dados e comunicar os pais de forma rápida e transparente."
      ]
    }
  ];

  // Flatten all questions to match the checkedItems array
  const flattenedQuestions = questions.flatMap(category => category.items);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="schoolName" className="text-lg font-medium text-blue-800">
          Nome da Escola Avaliada:
        </Label>
        <Input
          id="schoolName"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="Digite o nome da escola"
          className="focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium text-blue-800 mb-3">
          Marque serviços e ações oferecidos pela escola:
        </h3>

        <div className="space-y-6 mt-4">
          {questions.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <Separator className="my-4" />
              <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
                {category.category}
              </h4>
              <ul className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  // Calculate the absolute index in the flattened array
                  const absoluteIndex = questions
                    .slice(0, categoryIndex)
                    .reduce((acc, cat) => acc + cat.items.length, 0) + itemIndex;
                  
                  return (
                    <li key={itemIndex} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                      <Checkbox
                        id={`question-${absoluteIndex}`}
                        checked={checkedItems[absoluteIndex]}
                        onCheckedChange={(checked) => 
                          onCheckboxChange(absoluteIndex, checked === true)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor={`question-${absoluteIndex}`}
                        className="text-slate-700 cursor-pointer leading-relaxed"
                      >
                        {item}
                      </Label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Retornar
        </Button>
        <Button 
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
        >
          Avançar <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChecklistSection;
