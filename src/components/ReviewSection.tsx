import { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../services/firebase';

const ReviewSection: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsCollection = collection(db, 'avaliacoes');
      const reviewsSnapshot = await getDocs(reviewsCollection);
      const reviewsList = reviewsSnapshot.docs
        .map((doc) => doc.data())
        .filter((review) => review.status === 'publicado'); // Filtrando avaliações publicadas

      setReviews(reviewsList);
    };

    fetchReviews();
  }, []);

  if (reviews.length === 0) return null; // Se não houver avaliações, não exibe a seção

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-8 text-gray-800 text-center">
          Avaliações dos Clientes
        </h2>
        <p className="text-lg sm:text-xl mb-12 text-gray-700 mx-auto max-w-4xl text-center">
          Veja o que nossos clientes têm a dizer sobre os nossos serviços. A experiência deles é a nossa maior motivação para seguir oferecendo o melhor!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {reviews.map((review, index) => {
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-xl transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="ml-4">
                    <h2 className="text-2xl font-semibold text-blue-600">{review.nome}</h2>
                    <div className="flex items-center">
                      {Array.from({ length: review.estrelas }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          width="30"
                          height="30"
                          className="text-yellow-500"
                        >
                          <path d="M12 17.25l6.474 3.522-1.646-7.137 5.307-4.625-7.444-.104L12 .25 9.309 8.931 1.865 9.036l5.307 4.625-1.646 7.137L12 17.25z" />
                        </svg>
                      ))}
                      {Array.from({ length: 5 - review.estrelas }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          className="text-gray-400"
                        >
                          <path d="M12 17.25l6.474 3.522-1.646-7.137 5.307-4.625-7.444-.104L12 .25 9.309 8.931 1.865 9.036l5.307 4.625-1.646 7.137L12 17.25z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-base sm:text-lg mb-4">{review.feedback}</p>
                <p className="text-gray-500 text-sm italic">{review.feedbackTipo}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
