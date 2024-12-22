import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_ARTICLES_URL = "https://localhost:7220/api/Article";
  const API_CATEGORIES_URL = "https://localhost:7220/api/Category";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les articles
        const articleResponse = await axios.get(API_ARTICLES_URL);
        const articlesData = articleResponse.data;

        // Récupérer les catégories
        const categoryResponse = await axios.get(API_CATEGORIES_URL);
        const categoriesData = categoryResponse.data;

        // Transformer les catégories en un objet pour un accès rapide
        const categoryMap = categoriesData.reduce((map, category) => {
          map[category.categoryId] = category.name; // Utilisez la bonne propriété pour `categoryId`
          return map;
        }, {});

        // Mettre à jour l'état
        setArticles(articlesData);
        setCategories(categoryMap);
        setLoading(false);
      } catch (err) {
        setError("Impossible de récupérer les articles ou les catégories.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Liste des Articles</h2>
      <div className="row">
        {/* Liste des articles sous forme de cartes */}
        {articles.map((article) => (
          <div key={article.articleId} className="col-md-4 mb-4">
            <Card>
              {/* Image de l'article */}
              <Card.Img
                variant="top"
                src={article.image ? `data:image/jpeg;base64,${article.image}` : "placeholder.png"}
                alt={`Image de ${article.name}`}
              />
              <Card.Body>
                {/* Titre de l'article */}
                <Card.Title>{article.name}</Card.Title>
                {/* Description de l'article */}
                <Card.Text>
                  <strong>Prix:</strong> {article.price.toFixed(2)} TND <br />
                  <strong>Catégorie:</strong> {categories[article.categoryId] || "Non défini"}
                </Card.Text>
                <Button variant="primary">Voir plus</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
