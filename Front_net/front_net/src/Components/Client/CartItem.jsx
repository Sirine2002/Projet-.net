import React, { useState, useEffect } from "react";
import axios from "axios";

const CartItem = () => {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    panierId: "",
    articleId: "",
    quantity: "",
  });
  const [editCartItemId, setEditCartItemId] = useState(null);

  const API_URL = "https://localhost:7220/api/CartItem"; // Remplacez par l'URL de votre API

  // Récupère les cartItems à l'initialisation
  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setCartItems(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cartItems :", error);
      alert("Impossible de récupérer les éléments du panier.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCartItemId) {
        // Mettre à jour un élément du panier existant
        await axios.put(`${API_URL}/${editCartItemId}`, formData);
        setCartItems(
          cartItems.map((item) =>
            item.cartItemId === editCartItemId
              ? { ...item, ...formData }
              : item
          )
        );
      } else {
        // Créer un nouvel élément dans le panier
        const response = await axios.post(API_URL, formData);
        setCartItems([...cartItems, response.data]);
      }
      setFormData({ panierId: "", articleId: "", quantity: "" });
      setEditCartItemId(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'élément du panier :", error);
      alert("Impossible d'enregistrer l'élément.");
    }
  };

  const handleEdit = (cartItem) => {
    setEditCartItemId(cartItem.cartItemId);
    setFormData({
      panierId: cartItem.panierId,
      articleId: cartItem.articleId,
      quantity: cartItem.quantity,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCartItems(cartItems.filter((item) => item.cartItemId !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'élément du panier :", error);
      alert("Impossible de supprimer l'élément.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des Éléments du Panier</h1>

      {/* Formulaire */}
      <div className="card mb-4">
        <div className="card-header">{editCartItemId ? "Modifier" : "Ajouter"} un Élément</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="panierId" className="form-label">
                ID du Panier
              </label>
              <input
                type="number"
                className="form-control"
                id="panierId"
                placeholder="Entrez l'ID du panier"
                value={formData.panierId}
                onChange={(e) =>
                  setFormData({ ...formData, panierId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="articleId" className="form-label">
                ID de l'Article
              </label>
              <input
                type="number"
                className="form-control"
                id="articleId"
                placeholder="Entrez l'ID de l'article"
                value={formData.articleId}
                onChange={(e) =>
                  setFormData({ ...formData, articleId: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantité
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="Entrez la quantité"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editCartItemId ? "Mettre à jour" : "Ajouter"} l'Élément
            </button>
          </form>
        </div>
      </div>

      {/* Liste des Éléments du Panier */}
      <div className="card">
        <div className="card-header">Liste des Éléments</div>
        <ul className="list-group list-group-flush">
          {cartItems.map((item) => (
            <li
              key={item.cartItemId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">Élément ID : {item.cartItemId}</h5>
                <p className="mb-1">Panier ID : {item.panierId}</p>
                <p className="mb-1">Article ID : {item.articleId}</p>
                <p className="mb-1">Quantité : {item.quantity}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(item.cartItemId)}
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

export default CartItem;
