import React, { useState, useEffect } from "react";
import axios from "axios";

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editCategoryId, setEditCategoryId] = useState(null);

  const API_URL = "https://localhost:7220/api/Category"; // Remplacez par l'URL de votre backend

  // Récupère les catégories au chargement du composant
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
      alert("Impossible de charger les catégories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCategoryId) {
        // Mise à jour d'une catégorie existante
        await axios.put(`${API_URL}/${editCategoryId}`, formData);
        setCategories(
          categories.map((cat) =>
            cat.categoryId === editCategoryId ? { ...cat, ...formData } : cat
          )
        );
      } else {
        // Création d'une nouvelle catégorie
        const response = await axios.post(API_URL, formData);
        setCategories([...categories, response.data]);
      }
      setFormData({ name: "", description: "" });
      setEditCategoryId(null);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Impossible d'enregistrer la catégorie.");
    }
  };

  const handleEdit = (category) => {
    setEditCategoryId(category.categoryId); // Définit l'ID pour la modification
    setFormData({ name: category.name, description: category.description }); // Pré-remplit le formulaire
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCategories(categories.filter((cat) => cat.categoryId !== id)); // Met à jour la liste localement
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de supprimer la catégorie.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des Catégories</h1>

      {/* Formulaire */}
      <div className="card mb-4">
        <div className="card-header">{editCategoryId ? "Modifier" : "Ajouter"} une Catégorie</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nom de la catégorie
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Entrez le nom de la catégorie"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                placeholder="Entrez une description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              {editCategoryId ? "Mettre à jour" : "Ajouter"}
            </button>
          </form>
        </div>
      </div>

      {/* Liste des catégories */}
      <div className="card">
        <div className="card-header">Liste des Catégories</div>
        <ul className="list-group list-group-flush">
          {categories.map((category) => (
            <li
              key={category.categoryId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{category.name}</h5>
                <p className="mb-1">{category.description}</p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(category)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(category.categoryId)}
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

export default Categorie;

