// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";

// const Admin_Dashboard = () => {
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [newItem, setNewItem] = useState({});
//   const [editItemId, setEditItemId] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState("categories");

//   const CATEGORY_API_URL = "https://localhost:7220/api/Category";
//   const ARTICLE_API_URL = "https://localhost:7220/api/Article";

//   useEffect(() => {
//     fetchCategories();
//     fetchArticles();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(CATEGORY_API_URL, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setCategories(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des catégories :", error);
//     }
//   };

//   const fetchArticles = async () => {
//     try {
//       const response = await axios.get(ARTICLE_API_URL, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setArticles(response.data);
//     } catch (error) {
//       console.error("Erreur lors de la récupération des articles :", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const API_URL = activeTab === "categories" ? CATEGORY_API_URL : ARTICLE_API_URL;

//       const formData = new FormData();
//       formData.append("name", newItem.name);
//       formData.append("price", newItem.price);
//       formData.append("categoryId", newItem.categoryId);
//       formData.append("description", newItem.description);

//       if (newItem.image) {
//         console.log(newItem.image);
//         formData.append("picture", newItem.image);
//       }

//       if (editItemId) {
//         // Mise à jour de l'article
//         const response = await axios.put(`${API_URL}/${editItemId}`, activeTab === "categories" ? newItem : formData, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": activeTab === "categories" ? "application/json" : "multipart/form-data",
//           },
//         });

//         if (activeTab === "categories") {
//           setCategories(
//             categories.map((item) =>
//               item.categoryId === editItemId ? { ...item, ...response.data } : item
//             )
//           );
//         } else {
//           setArticles(
//             articles.map((item) =>
//               item.articleId === editItemId ? { ...item, ...response.data } : item
//             )
//           );
//         } 
        
//       } else {
//         // Ajout d'un nouvel article
//         const response = await axios.post(API_URL, activeTab === "categories" ? newItem : formData, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": activeTab === "categories" ? "application/json" : "multipart/form-data",
//           },
//         });

//         if (activeTab === "categories") {
//           setCategories([...categories, response.data]);
//         } else {
//           setArticles([...articles, response.data]);
//         }
//       }

//       resetForm();
//       closeModal();
//     } catch (error) {
//       console.error("Erreur lors de l'enregistrement :", error.response || error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const API_URL = activeTab === "categories" ? CATEGORY_API_URL : ARTICLE_API_URL;
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       if (activeTab === "categories") {
//         setCategories(categories.filter((item) => item.categoryId !== id));
//       } else {
//         setArticles(articles.filter((item) => item.articleId !== id));
//       }
//     } catch (error) {
//       console.error("Erreur lors de la suppression :", error.response || error.message);
//     }
//   };

//   const openModal = (item = null) => {
//     if (item) {
//       setEditItemId(activeTab === "categories" ? item.categoryId : item.articleId);
//       setNewItem(
//         activeTab === "categories"
//           ? { name: item.name, description: item.description }
//           : {
//               name: item.name,
//               price: item.price,
//               categoryId: item.categoryId,
//               description: item.description || "",
//               image: item.image || null, // Ajout de l'image
//             }
//       );
//     } else {
//       resetForm();
//     }
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setNewItem(
//       activeTab === "categories"
//         ? { name: "", description: "" }
//         : { name: "", price: "", categoryId: "", description: "", image: null }
//     );
//     setEditItemId(null);
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center">Admin Dashboard</h1>

//       <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-4">
//         <Tab eventKey="categories" title="Catégories">
//           <div className="mb-4">
//             <Button variant="primary" onClick={() => openModal()}>Ajouter une catégorie</Button>
//           </div>
//           <div className="card">
//             <div className="card-header">Liste des Catégories</div>
//             <ul className="list-group list-group-flush">
//               {categories.map((category) => (
//                 <li key={category.categoryId} className="list-group-item d-flex justify-content-between align-items-center">
//                   <div>
//                     <h5>{category.name}</h5>
//                     <p>{category.description}</p>
//                   </div>
//                   <div>
//                     <Button variant="warning" onClick={() => openModal(category)}>Modifier</Button>
//                     <Button variant="danger" onClick={() => handleDelete(category.categoryId)}>Supprimer</Button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </Tab>

//         <Tab eventKey="articles" title="Articles">
//   <div className="mb-4">
//     <Button variant="primary" onClick={() => openModal()}>Ajouter un article</Button>
//   </div>
//   <div className="card">
//     <div className="card-header">Liste des Articles</div>
//     <ul className="list-group list-group-flush">
//       {articles.map((article) => (
//         <li key={article.articleId} className="list-group-item d-flex justify-content-between align-items-center">
//           <div className="d-flex align-items-center">
//             {/* Affichage de l'image de l'article */}
//             {article.image ? (
//               <img
//                 src={"data:image/jpeg;base64," + article.image}
//                 alt={article.name}
//                 style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
//               />
//             ) : (
//               <div style={{ width: "50px", height: "50px", backgroundColor: "#ddd", marginRight: "10px" }}></div>
//             )}
//             <div>
//               <h5>{article.name}</h5>
//               <p>Prix: {article.price} TND</p>
//               <p>Catégorie: {categories.find((cat) => cat.categoryId === article.categoryId)?.name || ""}</p>
//             </div>
//           </div>
//           <div>
//             <Button variant="warning" onClick={() => openModal(article)}>Modifier</Button>
//             <Button variant="danger" onClick={() => handleDelete(article.articleId)}>Supprimer</Button>
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
// </Tab>

//       </Tabs>

//       {/* Modal pour Ajouter/Modifier */}
//       <Modal show={showModal} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editItemId ? (activeTab === "categories" ? "Modifier la catégorie" : "Modifier l'article") : (activeTab === "categories" ? "Ajouter une catégorie" : "Ajouter un article")}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             {activeTab === "categories" ? (
//               <>
//                 <Form.Group controlId="categoryName">
//                   <Form.Label>Nom de la catégorie</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Entrez le nom de la catégorie"
//                     value={newItem.name || ""}
//                     onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="categoryDescription" className="mt-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     placeholder="Entrez une description"
//                     value={newItem.description || ""}
//                     onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//               </>
//             ) : (
//               <>
//                 <Form.Group controlId="articleName">
//                   <Form.Label>Nom de l'article</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Entrez le nom de l'article"
//                     value={newItem.name || ""}
//                     onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="articlePrice" className="mt-3">
//                   <Form.Label>Prix</Form.Label>
//                   <Form.Control
//                     type="number"
//                     placeholder="Entrez le prix de l'article"
//                     value={newItem.price || ""}
//                     onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
//                     required
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="articleCategory" className="mt-3">
//                   <Form.Label>Catégorie</Form.Label>
//                   <Form.Control
//                     as="select"
//                     value={newItem.categoryId || ""}
//                     onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
//                     required
//                   >
//                     <option value="">Sélectionnez une catégorie</option>
//                     {categories.map((category) => (
//                       <option key={category.categoryId} value={category.categoryId}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </Form.Group>
               
//                 <Form.Group controlId="articleImage" className="mt-3">
//                   <Form.Label>Image</Form.Label>
//                   <Form.Control
//                     type="file"
//                     onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
//                   />
//                 </Form.Group>
//               </>
//             )}
//             <Modal.Footer>
//               <Button variant="secondary" onClick={closeModal}>
//                 Annuler
//               </Button>
//               <Button variant="primary" type="submit">
//                 {editItemId ? "Mettre à jour" : "Ajouter"}
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default Admin_Dashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Tabs, Tab } from "react-bootstrap";


const Admin_Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [newItem, setNewItem] = useState({});
  const [editItemId, setEditItemId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("categories");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
 

  const CATEGORY_API_URL = "https://localhost:7220/api/Category";
  const ARTICLE_API_URL = "https://localhost:7220/api/Article";
  const USERNAME_API_URL = "https://localhost:7220/api/Account/usernames";
  const ORDER_DETAILS_API_URL = "https://localhost:7220/api/OrderDetail/GetOrderDetailsByUserId";

  useEffect(() => {
    fetchCategories();
    fetchArticles();
    fetchOrders();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories :", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(ARTICLE_API_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
    }
  };
  

  
 //_______________Order Details___________________ 
  const fetchOrders = async () => {
    try {
        // Récupérer la liste des utilisateurs
        const response = await axios.get(USERNAME_API_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        
        setUsernames(response.data); // Enregistrer les utilisateurs dans le state
        console.log(response.data);
        // Pour chaque utilisateur, récupérer leurs commandes et détails
        for (const user of response.data) {
            await fetchUserOrders(user); // Récupérer les commandes de cet utilisateur
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
};
const showOrderDetails = async (userId) => {
  try {
    const response = await axios.get(`${ORDER_DETAILS_API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setSelectedOrderDetails(response.data); // Mettre à jour les détails
    setShowModal(true); // Ouvrir le modal
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la commande :", error);
  }
};

const fetchUserOrders = async (user) => {
    try {
        // Récupérer les commandes de l'utilisateur via le userId
        const orderResponse  = await axios.get(`${ORDER_DETAILS_API_URL}/${user.id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setOrders((prevOrders) => {
          const newOrders = orderResponse.data.filter(order => 
            !prevOrders.some(existingOrder => existingOrder.orderDetailId === order.orderDetailId)
          );
          return [...prevOrders, ...newOrders]; // Ajouter les nouvelles commandes sans doublons
        });
        //console.log(response.data);
        // response.data.forEach(element => {
        //   console.log(element.article);
        // });
        
    } catch (error) {
        console.log(user);
        console.error(`Erreur lors de la récupération des commandes pour l'utilisateur ${user.userName}:`, error);
    }
};

console.log(orders); 



//_______________Fin Order Details___________________ 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = activeTab === "categories" ? CATEGORY_API_URL : ARTICLE_API_URL;

      const formData = new FormData();
      formData.append("name", newItem.name);
      formData.append("price", newItem.price);
      formData.append("categoryId", newItem.categoryId);
      formData.append("description", newItem.description);

      if (newItem.image) {
        console.log(newItem.image);
        formData.append("picture", newItem.image);
      }

      if (editItemId) {
        const response = await axios.put(`${API_URL}/${editItemId}`, activeTab === "categories" ? newItem : formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": activeTab === "categories" ? "application/json" : "multipart/form-data",
          },
        });
       
        if (activeTab === "categories") {
          setCategories(
      categories.map((item) =>
        item.categoryId === editItemId ? { ...item, ...newItem } : item
      )
    );
        } else {
          setArticles(
            articles.map((item) =>
              item.articleId === editItemId ? { ...item, ...response.data } : item
            )
          );
         
        }
      } else {
        const response = await axios.post(API_URL, activeTab === "categories" ? newItem : formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": activeTab === "categories" ? "application/json" : "multipart/form-data",
          },
        });

        if (activeTab === "categories") {
          setCategories([...categories, response.data]);
        } else {
          setArticles([...articles, response.data]);
        }
      }

      resetForm();
      closeModal();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error.response || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const API_URL = activeTab === "categories" ? CATEGORY_API_URL : ARTICLE_API_URL;
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (activeTab === "categories") {
        setCategories(categories.filter((item) => item.categoryId !== id));
      } else {
        setArticles(articles.filter((item) => item.articleId !== id));
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response || error.message);
    }
  };

  const openModal = (item = null) => {//ouvrir formulaire
    if (item) {
      setEditItemId(activeTab === "categories" ? item.categoryId : item.articleId);
      setNewItem(
        
        activeTab === "categories"
          ? { name: item.name , description: item.description, }
          : {
              
              name: item.name,
              price: item.price,
              categoryId: item.categoryId,
              description: item.description || "",
              image: item.image || null,
            }  
      );
      
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewItem(
      activeTab === "categories"
        ? { name: "", description: "" }
        : { name: "", price: "", categoryId: "", description: "", image: null }
    );
    setEditItemId(null);
  };

  const [selectedStatus, setSelectedStatus] = useState("En cours");

  return (
    <div className="container mt-5">
      <h1 className="text-center">Admin Dashboard</h1>

      <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="mb-4">
        <Tab eventKey="categories" title="Catégories">
          <div className="mb-4">
            <Button variant="primary" onClick={() => openModal()}><i class="fa-solid fa-plus-minus"></i> Ajouter une catégorie</Button>
          </div>
          <div className="card">
            <div className="card-header">Liste des Catégories</div>
            <ul className="list-group list-group-flush">
              {categories.map((category) => (
                <li key={category.categoryId} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{category.name}</h5>
                    <p>{category.description}</p>
                  </div>
                  <div>
                    <Button variant="success" onClick={() => openModal(category)}><i class="fa-regular fa-pen-to-square"></i> Modifier</Button>
                    <Button variant="danger" onClick={() => handleDelete(category.categoryId)}>Supprimer <i class="fa-solid fa-trash"></i></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Tab>

        <Tab eventKey="articles" title="Articles">
          <div className="mb-4">
            <Button variant="primary" onClick={() => openModal()}><i class="fa-solid fa-plus-minus"></i> Ajouter un article</Button>
          </div>
          <div className="card">
            <div className="card-header">Liste des Articles</div>
            <ul className="list-group list-group-flush">
              {articles.map((article) => (
                <li key={article.articleId} className="list-group-item d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {article.image ? (
                      <img
                        src={"data:image/jpeg;base64," + article.image}
                        alt={article.name}
                        style={{ width: "50px", height: "50px", objectFit: "cover", marginRight: "10px" }}
                      />
                    ) : (
                      <div style={{ width: "50px", height: "50px", backgroundColor: "#ddd", marginRight: "10px" }}></div>
                    )}
                    <div>
                      <h5>{article.name}</h5>
                      <p>Prix: {article.price} TND</p>
                      <p>Catégorie: {categories.find((cat) => cat.categoryId === article.categoryId)?.name || ""}</p>
                    </div>
                  </div>
                  <div>
                    <Button variant="success" onClick={() => openModal(article)}><i class="fa-regular fa-pen-to-square"></i> Modifier</Button>
                    <Button variant="danger" onClick={() => handleDelete(article.articleId)}>Supprimer <i class="fa-solid fa-trash"></i></Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Tab>

        <Tab eventKey="orders" title="Commandes">
  <div className="mb-4">
    <h4> Liste des Commandes</h4>
    <br/>
    <table className="table table-bordered">
      <thead>
        
      </thead>
      <tbody>
        {usernames.map((user) => (
          <tr key={user.id}>
            <td colSpan="4">
              <h5><i class="fa-solid fa-person-circle-plus"></i> Commande de {user.userName}</h5>
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Commande ID</th>
                    <th>Prix Total</th>
                    <th>Date</th>
                    <th>Articles</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter((order) => order.commande.applicationUserId === user.id) // Filtrer les commandes pour chaque utilisateur
                    .reduce((acc, order) => {
                      const existingCommande = acc.find(
                        (item) => item.commandeId === order.commande.commandeId
                      );

                      if (existingCommande) {
                        // Vérifier si l'article existe déjà pour incrémenter la quantité
                        const existingArticle = existingCommande.orderDetails.find(
                          (detail) => detail.article.name === order.article.name
                        );
                        if (existingArticle) {
                          existingArticle.quantity += 1;
                        } else {
                          existingCommande.orderDetails.push({
                            article: order.article,
                            quantity: 1,
                            price: order.price,
                          });
                        }
                      } else {
                        // Ajouter une nouvelle commande
                        acc.push({
                          commandeId: order.commande.commandeId,
                          totalPrice: order.commande.totalPrice,
                          orderDate: order.commande.orderDate,
                          orderDetails: [
                            {
                              article: order.article,
                              quantity: order.quantity,
                              price: order.price,
                            },
                          ],
                        });
                      }
                      return acc;
                    }, [])
                    .map((commande) => (
                      <tr key={commande.commandeId}>
                        <td>{commande.commandeId}</td>
                        <td>{commande.totalPrice} TND</td>
                        <td>{new Date(commande.orderDate).toLocaleDateString()}</td>
                        <td>
                          <table className="table table-sm">
                            <thead>
                              <tr>
                                <th>Nom de l'Article</th>
                                <th>Quantité</th>
                                <th>Prix Unitaire (TND)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {commande.orderDetails.map((detail, index) => (
                                <tr key={index}>
                                  <td>{detail.article?.name}</td>
                                  <td>{detail.quantity}</td>
                                  <td>{detail.price} TND</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                        <td>
  <div className="d-flex align-items-center">
    <div
      style={{
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        backgroundColor: selectedStatus === "En cours" ? "red" : "green",
        marginRight: "10px",
      }}
    ></div>
    <form>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="form-select form-select-sm"
        style={{ width: "120px" }}
      >
        <option value="En cours">En cours</option>
        <option value="Livré">Livré</option>
      </select>
    </form>
  </div>
</td>






                      </tr>
                    ))}
                </tbody>
              </table>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</Tab>






      </Tabs>

      {/* Modal pour Ajouter/Modifier */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editItemId ? (activeTab === "categories" ? "Modifier la catégorie" : "Modifier l'article") : (activeTab === "categories" ? "Ajouter une catégorie" : "Ajouter un article")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {activeTab === "categories" ? (
              <>
                <Form.Group controlId="categoryName">
                  <Form.Label>Nom de la catégorie</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le nom de la catégorie"
                    value={newItem.name || ""}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="categoryDescription" className="mt-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Entrez une description"
                    value={newItem.description || ""}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    required
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group controlId="articleName">
                  <Form.Label>Nom de l'article</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Entrez le nom de l'article"
                    value={newItem.name || ""}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="articlePrice" className="mt-3">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Entrez le prix de l'article"
                    value={newItem.price || ""}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="articleCategory" className="mt-3">
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    as="select"
                    value={newItem.categoryId || ""}
                    onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                    required
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="articleImage" className="mt-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })}
                  />
                </Form.Group>
              </>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Annuler</Button>
              <Button variant="primary" type="submit">{editItemId ? "Mettre à jour" : "Ajouter"}</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin_Dashboard;
