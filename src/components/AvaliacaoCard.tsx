import { Button } from "@/components/ui/button"; // Importando o componente Button do shadcn/ui
import { Card, CardContent, CardFooter } from "@/components/ui/card"; // Importando componentes de Card do shadcn/ui
import { Star } from "lucide-react"; // Importando ícone de estrela do Lucide
import { Avaliacao } from "../services/avaliacoes";

interface AvaliacaoCardProps {
  avaliacao: Avaliacao;
  onPublish: () => void;
  onArchive: () => void;
  isLoading: boolean;
  showArchived: boolean;
}

const AvaliacaoCard: React.FC<AvaliacaoCardProps> = ({
  avaliacao,
  onPublish,
  onArchive,
  isLoading,
  showArchived,
}) => {
  const formattedDate = avaliacao.data
    ? new Date(avaliacao.data.seconds * 1000).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Data não disponível";

  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-6">
        <p className="font-medium text-lg text-blue-600">{avaliacao.nome}</p>
        <div className="flex items-center mt-2">
          {Array.from({ length: avaliacao.estrelas }).map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
          ))}
        </div>
        <p className="text-gray-600 mt-2">{avaliacao.comentario}</p>
        <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
      </CardContent>
      {!showArchived && (
        <CardFooter className="flex justify-between p-6 pt-0">
          {avaliacao.status === "publicado" ? (
            <span className="text-green-600">Publicado</span>
          ) : (
            <Button
              onClick={onPublish}
              disabled={isLoading}
              variant="ghost"
              className="text-blue-600 hover:text-blue-800"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </Button>
          )}
          <Button
            onClick={onArchive}
            variant="ghost"
            className="text-yellow-600 hover:text-yellow-700"
          >
            Arquivar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AvaliacaoCard;