export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return user || null; // Renvoie un objet utilisateur ou null s'il n'y a pas d'utilisateur connecté
  };
  