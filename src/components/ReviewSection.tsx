import { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../services/firebase';
import { Star, MessageSquare } from 'lucide-react';

// Definindo o tipo para a avaliação
interface Review {
  nome: string;
  estrelas: number;
  feedback: string;
  feedbackTipo: string;
  status: string; // Considerando o status da avaliação
}

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // Usando o tipo Review[]
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, 'avaliacoes');
        const reviewsSnapshot = await getDocs(reviewsCollection);
        const reviewsList = reviewsSnapshot.docs
          .map((doc) => doc.data() as Review) // Agora tipado como Review
          .filter((review) => review.status === 'publicado'); // Filtrando avaliações publicadas

        setReviews(reviewsList);
      } catch (e) {
        console.error("Erro ao buscar avaliações no Firestore:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-950 text-white border-t border-gray-900">
        <p className="text-center text-gray-400">Carregando depoimentos...</p>
      </section>
    );
  }

  if (reviews.length === 0) return null; // Se não houver avaliações, não exibe a seção

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white border-t border-gray-900 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold text-yellow-500 tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6 text-white tracking-tight">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
            A experiência de nossos passageiros é o pilar que sustenta nosso compromisso de oferecer sempre o melhor serviço. Veja relatos de quem viaja conosco:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => {
            return (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:border-yellow-500/15"
              >
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">{review.nome}</h4>
                  
                  {/* Estrelas */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: review.estrelas }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                    {Array.from({ length: 5 - review.estrelas }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-gray-600"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 italic text-justify">
                  “{review.feedback}”
                </p>

                {review.feedbackTipo && (
                  <span className="text-[10px] uppercase font-bold tracking-wider text-yellow-500/70 bg-yellow-500/5 border border-yellow-500/10 px-2.5 py-0.5 rounded">
                    {review.feedbackTipo}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
