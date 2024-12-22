import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { register } from '../src/services/Auth_service';
import { Form, Button, Alert } from 'react-bootstrap'; // Import necessary components from react-bootstrap

function Register() {
  const [formData, setFormData] = useState({ userName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setError('');
      
      // Redirect to the login page after 2 seconds
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
      setSuccess('');
    }
  };

  return (
    <div
    className="container-fluid vh-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundImage: "url('src/assets/tasty-pizza-near-ingredients.jpg')", // Lien correct de l'image de fond (ajouter 'url()')
      backgroundSize: "cover", // L'image couvre toute la page
      backgroundPosition: "center", // L'image est centrée
      backgroundRepeat: "no-repeat", // Empêche la répétition de l'image
    }}
  >
    <div
      className="row w-100 justify-content-center"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Fond semi-transparent pour le formulaire
        padding: "30px",
        borderRadius: "15px", // Coins arrondis
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Ombre légère pour le formulaire
        maxWidth: "400px", // Réduire la largeur maximale pour que ce soit la même taille que pour "login"
        width: "100%", // Utiliser toute la largeur disponible jusqu'à 400px
      }}
    >
      <div className="col-12">
        <h1 className="text-center mb-4">Welcome!</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Nom d'utilisateur */}
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>Nom d'utilisateur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom d'utilisateur"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </Form.Group>
  
          {/* Email */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
  
          {/* Mot de passe */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>
  
          {/* Bouton de soumission */}
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
  

  );
}

export default Register;
