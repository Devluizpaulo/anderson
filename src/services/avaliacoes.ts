import {
    collection,
    getDocs,
    doc,
    updateDoc,
    setDoc,
    deleteDoc,
    getDoc,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "./firebase";
  
  export interface Avaliacao {
    id: string;
    nome: string;
    estrelas: number;
    comentario: string;
    status: string;
    data: Timestamp;
  }
  
  export const fetchAvaliacoes = async (archived = false): Promise<Avaliacao[]> => {
    const collectionName = archived ? "avaliacoes_archivadas" : "avaliacoes";
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Avaliacao[];
  };
  
  export const publishAvaliacao = async (id: string) => {
    const avaliacaoRef = doc(db, "avaliacoes", id);
    await updateDoc(avaliacaoRef, {
      status: "publicado",
      dataPublicacao: Timestamp.now(),
    });
  };
  
  export const archiveAvaliacao = async (id: string) => {
    const avaliacaoRef = doc(db, "avaliacoes", id);
    const avaliacaoDoc = await getDoc(avaliacaoRef);
    const avaliacaoData = avaliacaoDoc.data();
  
    if (avaliacaoData) {
      await setDoc(doc(db, "avaliacoes_archivadas", id), avaliacaoData);
      await deleteDoc(avaliacaoRef);
    }
  };
  