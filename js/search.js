// js/search.js
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js";

const db = getFirestore();

document.querySelector('.search-bar button').addEventListener('click', async () => {
  const searchTerm = document.querySelector('.search-bar input').value.trim();
  
  if (searchTerm) {
    const q = query(
      collection(db, "menu_items"),
      where("nombre", ">=", searchTerm),
      where("nombre", "<=", searchTerm + '\uf8ff')
    );

    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    console.log("Resultados:", results);
    // Mostrar resultados en interfaz
  }
});