import React, { useState, useEffect } from "react";
import axios from "axios";

const Panier = () => {
  const [paniers, setPaniers] = useState([]);
  const [formData, setFormData] = useState({ applicationUserId: "" });
  const [editPanierId, setEditPanierId] = useState(null);

  const API_URL = "https://localhost:7220/api/Panier"; // Remplacez par l'URL de votre API

  // Récupère la liste des paniers lors du chargement du composant
  useEffect(() => {
    fetchPaniers();
  }, []);

  const fetchPaniers = async () => {
    try {
      const response = await axios.get(API_URL);
      setPaniers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des paniers :", error);
      alert("Impossible de récupérer les paniers.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPanierId) {
        // Mettre à jour un panier existant
        await axios.put(`${API_URL}/${editPanierId}`, formData);
        setPaniers(
          paniers.map((panier) =>
            panier.panierId === editPanierId ? { ...panier, ...formData } : panier
          )
        );
      } else {
        // Créer un nouveau panier
        const response = await axios.post(API_URL, formData);
        setPaniers([...paniers, response.data]);
      }
      setFormData({ applicationUserId: "" });
      setEditPanierId(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du panier :", error);
      alert("Impossible d'enregistrer le panier.");
    }
  };

  const handleEdit = (panier) => {
    setEditPanierId(panier.panierId);
    setFormData({ applicationUserId: panier.applicationUserId });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setPaniers(paniers.filter((panier) => panier.panierId !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du panier :", error);
      alert("Impossible de supprimer le panier.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des Paniers</h1>

      {/* Formulaire */}
      <div className="card mb-4">
        <div className="card-header">{editPanierId ? "Modifier" : "Ajouter"} un Panier</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="applicationUserId" className="form-label">
                ID de l'utilisateur
              </label>
              <input
                type="text"
                className="form-control"
                id="applicationUserId"
                placeholder="Entrez l'ID de l'utilisateur"
                value={formData.applicationUserId}
                onChange={(e) => setFormData({ ...formData, applicationUserId: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editPanierId ? "Mettre à jour" : "Ajouter"} le Panier
            </button>
          </form>
        </div>
      </div>

      {/* Liste des Paniers */}
      <div className="card">
        <div className="card-header">Liste des Paniers</div>
        <ul className="list-group list-group-flush">
          {paniers.map((panier) => (
            <li
              key={panier.panierId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Panier ID : {panier.panierId}</h5>
                <p className="mb-1">Utilisateur ID : {panier.applicationUserId}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(panier)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(panier.panierId)}
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Panier;





// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const PanierManager = () => {
//   const [panier, setPanier] = useState(null); // Panier spécifique pour le client
//   const [isClient, setIsClient] = useState(true); // Détermine si l'utilisateur est un client (vous pouvez lier cette variable à l'authentification)

//   const API_URL = "http://localhost:5000/api/Panier"; // Remplacez par l'URL de votre API

//   // Charger les paniers au montage du composant (affichage d'un seul panier pour l'utilisateur connecté)
//   useEffect(() => {
//     fetchPanier();
//   }, []);

//   const fetchPanier = async () => {
//     try {
//       // Supposons que l'ID de l'utilisateur est accessible
//       const userId = "userIdExemple"; // Remplacer par l'ID de l'utilisateur connecté
//       const response = await axios.get(`${API_URL}/user/${userId}`);
//       setPanier(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération du panier :", error);
//       alert("Impossible de récupérer le panier.");
//     }
//   };

//   const handleDelete = async (cartItemId) => {
//     try {
//       await axios.delete(`${API_URL}/cartItem/${cartItemId}`);
//       setPanier((prevPanier) => ({
//         ...prevPanier,
//         cartItems: prevPanier.cartItems.filter(
//           (item) => item.cartItemId !== cartItemId
//         ),
//       }));
//     } catch (error) {
//       console.error("Erreur lors de la suppression de l'article du panier :", error);
//       alert("Impossible de supprimer cet article.");
//     }
//   };

//   const calculateTotalPrice = () => {
//     if (panier && panier.cartItems) {
//       return panier.cartItems.reduce(
//         (total, item) => total + item.quantity * item.article.price,
//         0
//       );
//     }
//     return 0;
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Mon Panier</h1>

//       {panier && panier.cartItems && panier.cartItems.length > 0 ? (
//         <>
//           <div className="card">
//             <div className="card-header">Articles dans votre panier</div>
//             <ul className="list-group list-group-flush">
//               {panier.cartItems.map((item) => (
//                 <li
//                   key={item.cartItemId}
//                   className="list-group-item d-flex justify-content-between align-items-center"
//                 >
//                   <div>
//                     <h5>{item.article.name}</h5>
//                     <p>Prix : {item.article.price} €</p>
//                     <p>Quantité : {item.quantity}</p>
//                   </div>

//                   <div>
//                     {/* Pour les clients, on ne permet pas la modification ou l'ajout */}
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(item.cartItemId)}
//                     >
//                       Supprimer
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="card mt-3">
//             <div className="card-body">
//               <h4>Total du panier : {calculateTotalPrice().toFixed(2)} €</h4>
//             </div>
//           </div>
//         </>
//       ) : (
//         <p>Votre panier est vide.</p>
//       )}
//     </div>
//   );
// };

// export default PanierManager;
