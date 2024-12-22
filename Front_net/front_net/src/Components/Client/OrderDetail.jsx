import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Pour récupérer les paramètres de l'URL
import { Card, Button } from "react-bootstrap";

const OrderDetail = () => {
  const { commandeId } = useParams(); // Récupérer l'ID de la commande de l'URL
  const [order, setOrder] = useState(null);

  // Cette fonction simule la récupération d'une commande depuis le backend
  const fetchOrderDetails = () => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = storedOrders.find((order) => order.commandeId === parseInt(commandeId));
    setOrder(order);
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [commandeId]);

  if (!order) {
    return <div>Commande introuvable.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Détails de la Commande #{order.commandeId}</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Informations sur la commande</Card.Title>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Total:</strong> {order.totalPrice.toFixed(2)} TND</p>
          <p><strong>Utilisateur:</strong> {order.applicationUserId}</p> {/* Afficher l'ID de l'utilisateur */}
        </Card.Body>
      </Card>

      <h4>Détails des Articles</h4>
      <div>
        {order.orderDetails.map((detail, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Title>{detail.articleName}</Card.Title>
              <p><strong>Quantité:</strong> {detail.quantity}</p>
              <p><strong>Prix unitaire:</strong> {detail.price} TND</p>
              <p><strong>Total:</strong> {(detail.quantity * detail.price).toFixed(2)} TND</p>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Link to="/orders">
        <Button variant="secondary">Retour à la liste des commandes</Button>
      </Link>
    </div>
  );
};

export default OrderDetail;
