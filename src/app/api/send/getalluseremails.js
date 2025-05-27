import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // seu arquivo de configuração do Firebase

export const getAllUserEmails = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      email: doc.data().email,
    }));
  };
  
  