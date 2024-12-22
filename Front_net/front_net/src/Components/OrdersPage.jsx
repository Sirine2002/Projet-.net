// import React, { useState, useEffect } from "react";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

// const OrdersPage = () => {
//   const [orders, setOrders] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   // Fonction pour récupérer l'utilisateur connecté depuis le localStorage
//   const getCurrentUser = () => {
//     const user = localStorage.getItem("userName");
//     return user || null; // Retourne null si aucun utilisateur n'est connecté
//   };

//   // Charger les commandes et l'utilisateur connecté
//   useEffect(() => {
//     const user = getCurrentUser();
//     setCurrentUser(user);

//     const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     // if (user) {
//     //   // Filtrer les commandes de l'utilisateur connecté
//     //   const userOrders = storedOrders.filter(
//     //     (order) => order.applicationUserId === user
//     //   );
//     //   setOrders(userOrders);
//     // }
//     setOrders(storedOrders);
//   }, []);

//   // Calculer le total des commandes
//   const calculateOrderTotal = (orderDetails) => {
//     return orderDetails
//       .reduce((total, item) => total + item.quantity * item.price, 0)
//       .toFixed(2);
//   };
//   const handleDeleteCart=()=>{
//     localStorage.removeItem('cart');
//   }
  

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Mes Commandes</h2>

//       {orders.length === 0 ? (
//         <div className="text-center">
//           <p>Aucune commande passée pour le moment.</p>
//           <Link to="/Client_Dashboard">
//             <Button variant="primary" onClick={() => handleDeleteCart()}>Voir les articles</Button>
//           </Link>
//         </div>
//       ) : (
//         <div className="row">
//           {orders.map((order) => (
//             <div key={order.commandeId} className="col-md-4 mb-4">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>Commande #{order.commandeId}</Card.Title>
//                   <Card.Text>
//                     <strong>Date:</strong>{" "}
//                     {new Date(order.orderDate).toLocaleString()} <br />
//                     <strong>Total:</strong> {calculateOrderTotal(order.orderDetails)} TND
//                   </Card.Text>
//                   <Card.Text>
//                     <strong>Articles:</strong>
//                     <ul>
//                       {order.orderDetails.map((item, index) => (
//                         <li key={index}>
//                           {item.articleName} - {item.quantity} x {item.price} TND
//                         </li>
//                       ))}
//                     </ul>
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrdersPage;

import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";


const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Fonction pour récupérer l'utilisateur connecté depuis le localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem("id"); // Assurez-vous que l'ID utilisateur est stocké dans localStorage
    return user || null;
  };

  // Fonction pour récupérer les commandes de l'utilisateur depuis l'API
  const fetchUserOrders = async (user) => {
    try {
      const response = await axios.get(`https://localhost:7220/api/OrderDetail/GetOrderDetailsByUserId/${user}`);
      console.log(response.data);
      setOrders(response.data); 
    } catch (err) {
      console.log("Impossible de récupérer les données.");

    }
  };
  // Charger les commandes et l'utilisateur connecté
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);

    if (user) {
      fetchUserOrders(user); // Récupérer les commandes si un utilisateur est connecté
    }
  }, []);

const groupByCommandeId = (orderDetails) => {
    // Créer un objet pour regrouper par commandeId
    const grouped = orderDetails.reduce((acc, orderDetail) => {
      const { commandeId, commande, article, quantity, price } = orderDetail;
      
      // Si la commande n'existe pas encore, on l'ajoute
      if (!acc[commandeId]) {
        acc[commandeId] = {
          commandeId, 
          commande, 
          orderDetails: []
        };
      }
  
      // Ajouter les OrderDetails à la commande
      acc[commandeId].orderDetails.push({ article, quantity, price });
  
      return acc;
    }, {});
  
    // Convertir l'objet en tableau
    console.log(Object.values(grouped));
    return Object.values(grouped);
  };
  

  const handleDeleteCart = () => {
    localStorage.removeItem("cart");
  };

  return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Mes Commandes</h2>
    <div className="text-center">
    <Link to="/Client_Dashboard">
          <Button variant="primary" onClick={() => handleDeleteCart()}>
            Retour aux articles
          </Button>
        </Link>
        </div>
  
    
        <div className="row">
        {/* Regroupement des OrderDetails par commandeId */}
        {groupByCommandeId(orders).map((commande) => (
          <div key={commande.commandeId} className="col-md-4 mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Commande #{commande.commandeId}</Card.Title>
                <Card.Text>
                  <strong>Date: </strong>{new Date(commande.commande.orderDate).toLocaleDateString()}
                  {commande.orderDate} <br />
                  <strong>Total:</strong> {commande.commande.totalPrice} TND 
                </Card.Text>
                <Card.Text>
                  <strong>Articles:</strong>
                  <ul>
                    {/* Affichage des articles pour chaque commande */}
                    {commande.orderDetails.map((orderDetail, index) => (
                      <li key={index}>
                        {orderDetail.article?.name} - {orderDetail.quantity} x {orderDetail.price} TND
                      </li>
                    ))}
                  </ul>
                </Card.Text>
                
              </Card.Body>
              
            </Card>
            
          </div>
          
        ))}
      </div>
      

  </div>
  );
};


export default OrdersPage;
