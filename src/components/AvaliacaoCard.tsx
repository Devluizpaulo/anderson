import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";
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
    <Card className="glass-card border border-secondary/10 hover:border-secondary/30 transition-all duration-300 rounded-2xl bg-transparent">
      <CardContent className="p-6">
        <p className="font-bold text-lg text-secondary font-display">{avaliacao.nome}</p>
        <div className="flex items-center mt-2">
          {Array.from({ length: avaliacao.estrelas }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-secondary fill-secondary mr-0.5" />
          ))}
        </div>
        <p className="text-[#c4c7c7] mt-3 text-sm leading-relaxed text-justify italic">“{avaliacao.comentario}”</p>
        <p className="text-xs text-[#8e9192] mt-2">{formattedDate}</p>
      </CardContent>
      {!showArchived && (
        <CardFooter className="flex justify-between p-6 pt-0 border-t border-[#444748]/10 mt-2">
          {avaliacao.status === "publicado" ? (
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Publicado</span>
          ) : (
            <Button
              onClick={onPublish}
              disabled={isLoading}
              variant="ghost"
              className="text-secondary hover:text-secondary-fixed hover:bg-secondary/10 text-xs font-bold uppercase tracking-wider"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </Button>
          )}
          <Button
            onClick={onArchive}
            variant="ghost"
            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-xs font-bold uppercase tracking-wider"
          >
            Arquivar
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AvaliacaoCard;