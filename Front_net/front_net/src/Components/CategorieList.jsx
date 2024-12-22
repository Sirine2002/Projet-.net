// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Card, Button, Toast, Modal } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection

// const CategorieList = () => {
//   const [categories, setCategories] = useState([]);
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [cart, setCart] = useState([]); // Panier
//   const [toastVisible, setToastVisible] = useState(false); // Notification popup
//   const [toastMessage, setToastMessage] = useState(""); // Message de notification
//   const [showCartDetails, setShowCartDetails] = useState(false); // Panneau latéral avec détails du panier
//   const [orderSummary, setOrderSummary] = useState(null); // Détails de la commande validée
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_CATEGORIES_URL = "https://localhost:7220/api/Category";
//   const API_ARTICLES_URL = "https://localhost:7220/api/Article";

//   const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const categoryResponse = await axios.get(API_CATEGORIES_URL);
//         const categoriesData = categoryResponse.data;

//         const articleResponse = await axios.get(API_ARTICLES_URL);
//         const articlesData = articleResponse.data;

//         setCategories(categoriesData);
//         setArticles(articlesData);
//         setFilteredArticles(articlesData);
//         setLoading(false);
//       } catch (err) {
//         setError("Impossible de récupérer les données.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     if (categoryId === null) {
//       setFilteredArticles(articles);
//     } else {
//       const filtered = articles.filter((article) => article.categoryId === categoryId);
//       setFilteredArticles(filtered);
//     }
//   };

//   const handleAddToCart = (article) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.articleId === article.articleId);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.articleId === article.articleId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...article, quantity: 1 }];
//       }
//     });

//     // Afficher la notification
//     setToastMessage(`${article.name} ajouté au panier !`);
//     setToastVisible(true);

//     // Masquer la notification après 3 secondes
//     setTimeout(() => {
//       setToastVisible(false);
//     }, 3000);
//   };

//   const handleIncreaseQuantity = (articleId) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.articleId === articleId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleDecreaseQuantity = (articleId) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.articleId === articleId
//           ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
//           : item
//       )
//     );
//   };

//   const handleRemoveFromCart = (articleId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.articleId !== articleId));
//   };

//   const handleShowCartDetails = () => {
//     setShowCartDetails(true);
//   };

//   const handleCloseCartDetails = () => {
//     setShowCartDetails(false);
//   };

//   const handleValidateOrder = () => {
//     // Créer un objet commande avec les articles du panier
//     const order = {
//       commandeId: new Date().getTime(), // Utiliser un identifiant unique temporaire pour la commande
//       orderDate: new Date(),
//       totalPrice: cart.reduce((total, item) => total + item.quantity * item.price, 0),
//       items: cart.map((item) => ({
//         articleName: item.name,
//         quantity: item.quantity,
//         price: item.price,
//         total: item.quantity * item.price,
//       })),
//     };

//     // Afficher le résumé de la commande
//     setOrderSummary(order);

//     // Vider le panier après validation
//     setCart([]);

//     // Redirection vers la page de commande
//    //navigate('/orderpage'); // Redirige vers la page de commande
//   };

//   // Calcul du prix total du panier
//   const calculateTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
//   };

//   if (loading) {
//     return <div>Chargement...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Liste des Catégories</h2>
//       <div className="d-flex justify-content-center mb-4">
//         <Button variant="secondary" className="me-2" onClick={() => handleCategoryClick(null)}>
//           Toutes les catégories
//         </Button>
//         {categories.map((category) => (
//           <Button
//             key={category.categoryId}
//             variant="primary"
//             className="me-2"
//             onClick={() => handleCategoryClick(category.categoryId)}
//           >
//             {category.name}
//           </Button>
//         ))}
//       </div>

//       <h2 className="text-center mb-4">Liste des Articles</h2>
//       <div className="row">
//         {filteredArticles.map((article) => (
//           <div key={article.articleId} className="col-md-4 mb-4">
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={article.image ? `data:image/jpeg;base64,${article.image}` : "placeholder.png"}
//                 alt={`Image de ${article.name}`}
//               />
//               <Card.Body>
//                 <Card.Title>{article.name}</Card.Title>
//                 <Card.Text>
//                   <strong>Prix:</strong> {article.price.toFixed(2)} TND <br />
//                   <strong>Catégorie:</strong> {categories.find((cat) => cat.categoryId === article.categoryId)?.name || "Non défini"}
//                 </Card.Text>
//                 <Button variant="success" onClick={() => handleAddToCart(article)}>
//                   Ajouter au panier
//                 </Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>

//       {/* Toast Notification */}
//       <div style={{ position: "fixed", top: "10%", right: "10%", zIndex: 1050 }}>
//         <Toast show={toastVisible} onClose={() => setToastVisible(false)} autohide delay={3000}>
//           <Toast.Header>
//             <strong className="me-auto">Panier</strong>
//           </Toast.Header>
//           <Toast.Body>{toastMessage}</Toast.Body>
//         </Toast>
//       </div>

//       {/* Panneau Latéral avec Détails du Panier */}
//       <div
//         className={`cart-sidebar ${showCartDetails ? "show" : ""}`}
//         style={{
//           position: "fixed",
//           top: 0,
//           right: showCartDetails ? 0 : "-100%",
//           width: "50%",
//           height: "100vh",
//           backgroundColor: "#f8f9fa",
//           padding: "20px",
//           overflowY: "auto",
//           transition: "right 0.3s ease-in-out", // Animation fluide
//           zIndex: 1050,
//         }}
//       >
//         <Button
//           variant="info"
//           className="position-fixed bottom-0 end-0 m-3"
//           onClick={handleShowCartDetails}
//           style={{ zIndex: 1060 }}
//         >
//           Voir le panier
//         </Button>
//         <h4>Détails du Panier</h4>
//         {cart.length === 0 ? (
//           <p>Votre panier est vide.</p>
//         ) : (
//           cart.map((cartItem) => (
//             <div key={cartItem.articleId}>
//               <p><strong>Nom de l'Article:</strong> {cartItem.name}</p>
//               <p><strong>Quantité:</strong> {cartItem.quantity}</p>
//               <p><strong>Prix Unitaire:</strong> {cartItem.price} TND</p>
//               <p><strong>Total:</strong> {cartItem.quantity * cartItem.price} TND</p>
//               <Button variant="warning" onClick={() => handleIncreaseQuantity(cartItem.articleId)}>
//                 +
//               </Button>
//               <Button variant="warning" onClick={() => handleDecreaseQuantity(cartItem.articleId)} className="ms-2">
//                 -
//               </Button>
//               <Button variant="danger" onClick={() => handleRemoveFromCart(cartItem.articleId)} className="ms-2">
//                 Supprimer
//               </Button>
//               <hr />
//             </div>
//           ))
//         )}

//         <div>
//           <h4>Total: {calculateTotalPrice()} TND</h4>
//           <Button variant="primary" onClick={handleValidateOrder}>
//             Passer la commande
//           </Button>
//         </div>

//         <Button variant="secondary" onClick={handleCloseCartDetails} className="mt-3">
//           Fermer
//         </Button>
//       </div>

//       {/* Afficher la commande validée */}
//       {orderSummary && (
//         <Modal show={orderSummary !== null} onHide={() => setOrderSummary(null)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Résumé de la Commande</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <h5>Date: {orderSummary.orderDate.toString()}</h5>
//             <h5>Total: {orderSummary.totalPrice.toFixed(2)} TND</h5>
//             <h6>Détails des articles:</h6>
//             <ul>
//               {orderSummary.items.map((item, index) => (
//                 <li key={index}>
//                   {item.articleName} - {item.quantity} x {item.price.toFixed(2)} TND = {item.total.toFixed(2)} TND
//                 </li>
//               ))}
//             </ul>
//           </Modal.Body>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default CategorieList;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Toast, Modal, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EmptyCartImg } from "../assets";
import "@fortawesome/fontawesome-free/css/all.css";


const CategorieList = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [cart, setCart] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [orderSummary, setOrderSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_CATEGORIES_URL = "https://localhost:7220/api/Category";
  const API_ARTICLES_URL = "https://localhost:7220/api/Article";
  const API_Commande_URL = 'https://localhost:7220/api/Commande';
  const API_Detail_URL = 'https://localhost:7220/api/OrderDetail';

  const navigate = useNavigate();

  // Fonction pour récupérer l'utilisateur connecté (exemple avec localStorage)
  const getCurrentUser = () => {
    const user = localStorage.getItem("userName");
    return user || null; // Retourne l'utilisateur connecté ou null s'il n'est pas connecté
  };

  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(API_CATEGORIES_URL);
        const categoriesData = categoryResponse.data;

        const articleResponse = await axios.get(API_ARTICLES_URL);
        const articlesData = articleResponse.data;

        setCategories(categoriesData);
        setArticles(articlesData);
        setFilteredArticles(articlesData);
        setLoading(false);
      } catch (err) {
        setError("Impossible de récupérer les données.");
        setLoading(false);
      }
    };

    fetchData();
    const user = getCurrentUser();
    if (user) {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const userCart = storedCart.filter((item) => item.userId === user); // Charger uniquement les articles de l'utilisateur
    setCart(userCart);
  }
  }, []);
  

   


  const handleCategoryClick = (categoryId) => {
    if (categoryId === null) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter((article) => article.categoryId === categoryId);
      setFilteredArticles(filtered);
    }
  };

  const handleAddToCart = (article) => {
  const user = getCurrentUser();

  if (!user) {
    alert("Vous devez être connecté pour ajouter des articles au panier.");
    return;
  }

  setCart((prevCart) => {
    // Vérifier si l'article existe déjà dans le panier
    const existingItem = prevCart.find((item) => item.articleId === article.articleId);

    // Si l'article existe, mettre à jour la quantité, sinon ajouter l'article
    const updatedCart = existingItem
      ? prevCart.map((item) =>
          item.articleId === article.articleId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...prevCart, { ...article, quantity: 1, userId: user.id }]; // Assurez-vous d'ajouter seulement userId
        
    // Mettre à jour le panier dans localStorage
    localStorage.setItem("cart", (updatedCart));

    return updatedCart; // Retourner le panier mis à jour
  });

    setToastMessage(`${article.name} ajouté au panier !`);
    setToastVisible(true);
  
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  

  const handleIncreaseQuantity = (articleId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.articleId === articleId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (articleId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.articleId === articleId
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const handleRemoveFromCart = (articleId) => {
    setCart((prevCart) => prevCart.filter((item) => item.articleId !== articleId));
  };

  const handleShowCartDetails = () => {
    setShowCartDetails(true);
  };
  const handleShowOrdersDetails=()=>{
    navigate("/orders");
  }
  const handleCloseCartDetails = () => {
    setShowCartDetails(false);
  };
  
  const handleValidateOrder = async () => {
    const user = getCurrentUser();
    if (!user) {
        alert("Vous devez être connecté pour passer une commande.");
        return;
    }

    const order = {
        orderDate: new Date(),
        totalPrice: cart.reduce((total, item) => total + item.quantity * item.price, 0),
        applicationUserId: localStorage.getItem('id'), // Assurez-vous que l'ID de l'utilisateur est bien sous forme de chaîne
    };
     
    console.log("Commande à envoyer :", order);
    const token = localStorage.getItem("token"); // Récupérer le token d'authentification
    console.log("Token: ", token); // Vérifier si le token est bien récupéré

    if (!token) {
        alert("Vous devez être connecté pour passer une commande.");
        return;
    }
    var commandeResponse=null;
    try {
        const response = await axios.post(`${API_Commande_URL}`, order, {
            headers: {
                "Authorization": `Bearer ${token}`, // Authentification via le token
            },
        });
        

        if (response.status === 201) {
            console.log("Commande enregistrée avec succès :", response.data);
            setCart([]); // Vider le panier après la commande
            commandeResponse=response.data;
             // Rediriger vers la page des commandes
        } else {
            console.error("Erreur lors de l'enregistrement de la commande", response);
            alert("Une erreur est survenue lors de la commande.");
        }
    } catch (error) {
        // Gestion des erreurs de réseau et autres erreurs
        console.error("Erreur lors de l'enregistrement de la commande :", error);
        if (error.response) {
            // Si la réponse du serveur est reçue mais qu'il y a une erreur
            if (error.response.status === 401) {
                alert("Vous n'êtes pas autorisé à effectuer cette action. Assurez-vous que vous êtes connecté.");
            } else {
                alert(`Erreur: ${error.response.data.message || "Une erreur est survenue"}`);
            }
        } else if (error.request) {
            // Si la requête n'a pas été envoyée (par exemple, problème de réseau)
            alert("Problème de réseau. Veuillez réessayer plus tard.");
        } else {
            // Erreur inconnue
            alert("Une erreur inconnue est survenue.");
        }
    }
    const orderDetails = cart.map((item) => ({
        CommandeId:commandeResponse.commandeId,       
        ArticleId: item.articleId,  
        Quantity: item.quantity,
        Price: item.price,
    }));
    console.log(orderDetails);
    try{
        const response1 = await axios.post(`${API_Detail_URL}`, orderDetails, {
            headers: {
                "Authorization": `Bearer ${token}`, // Authentification via le token
            },
        });
        console.log(orderDetails);
        if (response1.status === 201) {
            console.log("Commande enregistrée avec succès :", response1.data);
    }}catch(error){
        console.error("Erreur lors de l'enregistrement de la commande :", error);
    }
    navigate("/orders");
};

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
  };
  
  
  

  return (
  
    <div className="container mt-5">
        
      {/* <h2 className="text-center mb-4">Liste des Catégories</h2> */}
      <div className="d-flex justify-content-center mb-4">
        
        <Button variant="secondary" className="me-2" onClick={() => handleCategoryClick(null)}>

        <i class="fa-solid fa-list"></i>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.categoryId}
            variant="info"
            className="me-2" 
            onClick={() => handleCategoryClick(category.categoryId)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
        
      <h2 className="text-center mb-4">Liste des Articles</h2>
      
      <div className="row">
        {filteredArticles.map((article) => (
          <div key={article.articleId} className="col-md-4 mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={article.image ? `data:image/jpeg;base64,${article.image}` : "placeholder.png"}
                alt={`Image de ${article.name}`}
              />
              <Card.Body>
                <Card.Title>{article.name}</Card.Title>
                <Card.Text>
                  <strong>Prix:</strong> {article.price.toFixed(2)} TND <br />
                  <strong>Catégorie:</strong> {categories.find((cat) => cat.categoryId === article.categoryId)?.name || "Non défini"}
                </Card.Text>
            <Button variant="success" onClick={() => handleAddToCart(article)}>
        Ajouter au panier
        </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Toast Notification */}
      <div style={{ position: "fixed", top: "10%", right: "10%", zIndex: 1050 }}>
        <Toast show={toastVisible} onClose={() => setToastVisible(false)} autohide delay={3000}>
          <Toast.Header>
            <strong className="me-auto">Panier</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>

      {/* Panneau Latéral avec Détails du Panier */}
      <div
        className={`cart-sidebar ${showCartDetails ? "show" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: showCartDetails ? 0 : "-100%",
          width: "30%",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          overflowY: "auto",
          transition: "right 0.3s ease-in-out",
          zIndex: 1050,
        }}
      >
<div className="position-fixed bottom-0 end-0 d-flex flex-column m-2" style={{ zIndex: 1060 }}>
  {/* Icône du panier */}
  <Button
    onClick={handleShowCartDetails}
    className="mb-2 border-0 bg-transparent text-muted" // Pas de fond ni de bordure, icône grise
    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
  >
    
    {/* <i className="fa-solid fa-cart-shopping" ></i> */}
    <i class="fa-solid fa-cart-plus" style={{ fontSize: '24px' }}></i>

  </Button>
  
  {/* Icône des commandes */}
  <Button
    onClick={handleShowOrdersDetails}
    className="border-0 bg-transparent text-muted" // Pas de fond ni de bordure, icône grise
    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
  >
    <i class="fa-solid fa-chart-bar" style={{ fontSize: '24px' }}></i>
    
  </Button>
</div>



        <h4>Détails du Panier</h4>
        <br/>
        {cart.length === 0 ? (
          <div className='w-full p-5 flex flex-col items-center gap-4 justify-center'>
          <img className='h-[340px]' src={EmptyCartImg} alt='empty cart' />
          <p className="text-textColor  font-semibold">Le panier est vide</p>
      </div>
        ) : (
          cart.map((cartItem) => (
            <div key={cartItem.articleId}>
              <p><strong>Nom de l'Article:</strong> {cartItem.name}</p>
              <p><strong>Quantité:</strong> {cartItem.quantity}</p>
              <p><strong>Prix Unitaire:</strong> {cartItem.price} TND</p>
              <p><strong>Total:</strong> {cartItem.quantity * cartItem.price} TND</p>
              <Button variant="warning" onClick={() => handleIncreaseQuantity(cartItem.articleId)}>
              <i class="fa-solid fa-plus"></i>
              </Button>
              <Button variant="warning" onClick={() => handleDecreaseQuantity(cartItem.articleId)} className="ms-2">
              <i class="fa-solid fa-minus"></i>
              </Button>
              <Button variant="danger" onClick={() => handleRemoveFromCart(cartItem.articleId)} className="ms-2">
                Supprimer <i class="fa-solid fa-delete-left"></i>
              </Button>
              <hr />
            </div>
          ))
        )}

        <div>
          <h4>Total: {calculateTotalPrice()} TND</h4>
          <Button variant="primary" onClick={handleValidateOrder}>
          <i class="fa-solid fa-check"></i> Passer la commande 
          </Button>
        </div>

        <Button variant="secondary" onClick={handleCloseCartDetails} className="mt-3">
          Fermer
        </Button>
      </div>
    </div>
  );
};

export default CategorieList;



