
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface IntroSectionProps {
  onStart: () => void;
}

const IntroSection = ({ onStart }: IntroSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-500 text-blue-800">
        <p className="leading-relaxed">
          Este formulário foi criado para ajudar você a avaliar a conformidade de uma 
          instituição escolar com a Lei Geral de Proteção de Dados Pessoais (LGPD). 
          A LGPD é uma legislação que visa proteger a privacidade e a segurança dos 
          dados de cada cidadão. No contexto escolar, é essencial garantir que os 
          dados dos alunos estejam seguros e sejam tratados de forma responsável.
        </p>
        <p className="mt-4 leading-relaxed">
          Nós respeitamos a sua privacidade. Todas as informações inseridas neste 
          formulário são para sua avaliação pessoal e não são armazenadas em nossos servidores.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={onStart} className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md">
          Iniciar avaliação 
          <Play className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default IntroSection;
