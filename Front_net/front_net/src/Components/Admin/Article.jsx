import React, { useState, useEffect } from "react";
import axios from "axios";

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "", price: "", categoryId: "" });
  const [editArticleId, setEditArticleId] = useState(null);

  const API_URL = "https://localhost:7220/api/Article"; // Replace with your API URL
  const CATEGORY_API_URL = "https://localhost:7220/api/Category"; // Replace with your Category API URL

  // Fetch articles and categories on component mount
  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Failed to fetch articles.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editArticleId) {
        // Update existing article
        await axios.put(`${API_URL}/${editArticleId}`, formData);
        setArticles(
          articles.map((article) =>
            article.articleId === editArticleId ? { ...article, ...formData } : article
          )
        );
      } else {
        // Create new article
        const response = await axios.post(API_URL, formData);
        setArticles([...articles, response.data]);
      }
      setFormData({ name: "", price: "", categoryId: "" });
      setEditArticleId(null);
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article.");
    }
  };

  const handleEdit = (article) => {
    setEditArticleId(article.articleId);
    setFormData({
      name: article.name,
      price: article.price,
      categoryId: article.categoryId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setArticles(articles.filter((article) => article.articleId !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Article Management</h1>

      {/* Form */}
      <div className="card mb-4">
        <div className="card-header">{editArticleId ? "Edit" : "Add"} Article</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Article Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter article name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                id="price"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryId" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="categoryId"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {editArticleId ? "Update" : "Add"} Article
            </button>
          </form>
        </div>
      </div>

      {/* Articles List */}
      <div className="card">
        <div className="card-header">Articles List</div>
        <ul className="list-group list-group-flush">
          {articles.map((article) => (
            <li
              key={article.articleId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5 className="mb-1">{article.name}</h5>
                <p className="mb-1">Price: {article.price.toFixed(2)} TND </p>
                <p className="mb-1">
                  Category:{" "}
                  {categories.find((cat) => cat.categoryId === article.categoryId)?.name ||
                    "Unknown"}
                </p>
              </div>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(article)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(article.articleId)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Article;
