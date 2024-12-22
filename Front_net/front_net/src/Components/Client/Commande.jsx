import React, { useState, useEffect } from "react";
import axios from "axios";

const Commande = () => {
  const [commandes, setCommandes] = useState([]);
  const [formData, setFormData] = useState({
    applicationUserId: "",
    totalPrice: "",
    orderDate: "",
  });
  const [editCommandeId, setEditCommandeId] = useState(null);

  const API_URL = "https://localhost:7220/api/Commande"; // Remplacez par l'URL de votre API

  // Charger les commandes au montage du composant
  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      const response = await axios.get(API_URL);
      setCommandes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes :", error);
      alert("Impossible de récupérer les commandes.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCommandeId) {
        // Mettre à jour une commande existante
        await axios.put(`${API_URL}/${editCommandeId}`, formData);
        setCommandes(
          commandes.map((commande) =>
            commande.commandeId === editCommandeId
              ? { ...commande, ...formData }
              : commande
          )
        );
      } else {
        // Créer une nouvelle commande
        const response = await axios.post(API_URL, formData);
        setCommandes([...commandes, response.data]);
      }
      setFormData({ applicationUserId: "", totalPrice: "", orderDate: "" });
      setEditCommandeId(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la commande :", error);
      alert("Impossible d'enregistrer la commande.");
    }
  };

  

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des Commandes</h1>

      {/* Formulaire */}
      <div className="card mb-4">
        <div className="card-header">{editCommandeId ? "Modifier" : "Ajouter"} une Commande</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="applicationUserId" className="form-label">
                ID de l'Utilisateur
              </label>
              <input
                type="text"
                className="form-control"
                id="applicationUserId"
                placeholder="Entrez l'ID de l'utilisateur"
                value={formData.applicationUserId}
                onChange={(e) =>
                  setFormData({ ...formData, applicationUserId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="totalPrice" className="form-label">
                Prix Total
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="totalPrice"
                placeholder="Entrez le prix total"
                value={formData.totalPrice}
                onChange={(e) =>
                  setFormData({ ...formData, totalPrice: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="orderDate" className="form-label">
                Date de Commande
              </label>
              <input
                type="date"
                className="form-control"
                id="orderDate"
                value={formData.orderDate}
                onChange={(e) =>
                  setFormData({ ...formData, orderDate: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editCommandeId ? "Mettre à jour" : "Ajouter"} la Commande
            </button>
          </form>
        </div>
      </div>

      {/* Liste des Commandes */}
      <div className="card">
        <div className="card-header">Liste des Commandes</div>
        <ul className="list-group list-group-flush">
          {commandes.map((commande) => (
            <li
              key={commande.commandeId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Commande ID : {commande.commandeId}</h5>
                <p className="mb-1">Utilisateur ID : {commande.applicationUserId}</p>
                <p className="mb-1">Prix Total : {commande.totalPrice} €</p>
                <p className="mb-1">
                  Date : {new Date(commande.orderDate).toLocaleDateString()}
                </p>
              </div>
             
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commande;
