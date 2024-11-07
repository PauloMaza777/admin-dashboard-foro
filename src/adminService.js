// src/adminService.js
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import {db} from "./firebase/firebase"

// Obtener el número de usuarios registrados en un intervalo de tiempo específico
const getUsersCountByDate = async () => {
  const usersRef = collection(db, "registro");
  const querySnapshot = await getDocs(usersRef);
  return querySnapshot.size;
};

// Obtener el número total de publicaciones de noticias
const getPostsCount = async () => {
  const postsRef = collection(db, "esport");
  const querySnapshot = await getDocs(postsRef);
  return querySnapshot.size;
};

// Obtener el número total de publicaciones de e-sports
const getPostsCount2 = async () => {
  const postsRef = collection(db, "noticias");
  const querySnapshot = await getDocs(postsRef);
  return querySnapshot.size;
};

export { getUsersCountByDate, getPostsCount, getPostsCount2 };
