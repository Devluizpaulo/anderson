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
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
      <p className="font-medium text-lg text-blue-600">{avaliacao.nome}</p>
      <div className="flex items-center mt-2">
        {Array.from({ length: avaliacao.estrelas }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            className="text-yellow-500"
          >
            <path d="M12 17.25l6.474 3.522-1.646-7.137 5.307-4.625-7.444-.104L12 .25 9.309 8.931 1.865 9.036l5.307 4.625-1.646 7.137L12 17.25z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 mt-2">{avaliacao.comentario}</p>
      <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
      {!showArchived && (
        <div className="flex justify-between mt-4">
          {avaliacao.status === "publicado" ? (
            <span className="text-green-600">Publicado</span>
          ) : (
            <button
              onClick={onPublish}
              disabled={isLoading}
              className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
          )}
          <button onClick={onArchive} className="text-yellow-600 hover:text-yellow-700">
            Arquivar
          </button>
        </div>
      )}
    </div>
  );
};

export default AvaliacaoCard;
