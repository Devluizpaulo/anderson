"use client";

import { useState, useEffect } from "react";
import HeaderCpanel from "../../components/HeaderCpanel";
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { format } from "date-fns";

// Definindo a interface para Avaliação
interface Avaliacao {
  id: string;
  nome: string;
  estrelas: number;
  comentario: string;
  status: string;
  data: Timestamp;
}

const CPanel: React.FC = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPublish, setLoadingPublish] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const fetchAvaliacoes = async (archived = false) => {
    setLoading(true);
    try {
      const collectionName = archived ? "avaliacoes_archivadas" : "avaliacoes";
      const querySnapshot = await getDocs(collection(db, collectionName));
      const avaliacoesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Avaliacao[];
      setAvaliacoes(avaliacoesList);
    } catch (error) {
      console.error("Erro ao buscar avaliações:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    setLoadingPublish(id);
    try {
      const avaliacaoRef = doc(db, "avaliacoes", id);
      await updateDoc(avaliacaoRef, {
        status: "publicado",
        dataPublicacao: Timestamp.now(),
      });
      fetchAvaliacoes();
    } catch (error) {
      console.error("Erro ao publicar avaliação:", error);
    } finally {
      setLoadingPublish(null);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const avaliacaoRef = doc(db, "avaliacoes", id);
      const avaliacaoDoc = await getDoc(avaliacaoRef);
      const avaliacaoData = avaliacaoDoc.data();

      if (avaliacaoData) {
        await setDoc(doc(db, "avaliacoes_archivadas", id), avaliacaoData);
        await deleteDoc(avaliacaoRef);
        fetchAvaliacoes();
      }
    } catch (error) {
      console.error("Erro ao arquivar avaliação:", error);
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col ml-0 lg:ml-64">
        <HeaderCpanel />
        <main className="flex-1 p-6 overflow-y-auto">
          <p className="mt-4 text-lg text-gray-600">Gerencie seu sistema de forma eficaz e intuitiva.</p>
          <button
            onClick={() => {
              setShowArchived(!showArchived);
              fetchAvaliacoes(!showArchived);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            {showArchived ? "Voltar às Avaliações Ativas" : "Exibir Arquivadas"}
          </button>
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">
              {showArchived ? "Avaliações Arquivadas" : "Avaliações Ativas"}
            </h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {loading ? (
                <p className="text-center text-gray-500">Carregando avaliações...</p>
              ) : (
                avaliacoes.map((avaliacao) => {
                  const data = avaliacao.data instanceof Timestamp ? avaliacao.data : null;
                  const formattedDate = data
                    ? format(new Date(data.seconds * 1000), "dd/MM/yyyy HH:mm")
                    : "Data não disponível";

                  return (
                    <div
                      key={avaliacao.id}
                      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                    >
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
                              onClick={() => handlePublish(avaliacao.id)}
                              disabled={loadingPublish === avaliacao.id}
                              className={`text-blue-600 hover:text-blue-800 ${
                                loadingPublish === avaliacao.id && "opacity-50 cursor-not-allowed"
                              }`}
                            >
                              {loadingPublish === avaliacao.id ? "Publicando..." : "Publicar"}
                            </button>
                          )}
                          <button
                            onClick={() => handleArchive(avaliacao.id)}
                            className="text-yellow-600 hover:text-yellow-700"
                          >
                            Arquivar
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default CPanel;
