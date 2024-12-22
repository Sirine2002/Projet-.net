import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [credentials, setCredentials] = useState({ userName: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://localhost:7220/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error("Le Username ou le Password est incorrect!");
            }

            const data = await response.json();
            const { token, role, username, id } = data; // Récupérer le token, rôle et username depuis la réponse

            if (token) {
                // Enregistrer le token et le username dans le localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('id', id);
                localStorage.setItem('userName', username); // Directement depuis la réponse
            }

            setError('');

            // Redirection basée sur le rôle
            if (role === 'Admin') {
                navigate('/Admin_Dashboard');
            } else if (role === 'Client') {
                navigate('/Client_Dashboard');
            } else {
                setError('Unknown role. Please contact support.');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
  className="container-fluid vh-100 d-flex justify-content-center align-items-center"
  style={{
    backgroundImage: "url('src/assets/tasty-pizza-near-ingredients.jpg')", // Ajout de l'image comme fond
    backgroundSize: "cover", // Ajuste l'image pour couvrir tout l'écran
    backgroundPosition: "center", // Centre l'image
    backgroundRepeat: "no-repeat", // Empêche la répétition
  }}
>
  {/* Conteneur du formulaire avec un fond semi-transparent */}
  <div
    className="row w-100"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.7)", // Fond semi-transparent
      padding: "40px", // Augmenter l'espace autour du formulaire
      borderRadius: "15px", // Coins plus arrondis
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)", // Ombre plus marquée
      maxWidth: "450px", // Largeur maximale ajustée
      width: "100%", // S'assurer qu'il occupe toute la largeur possible jusqu'à 450px
    }}
  >
    <div className="col text-center">
      <h1 className="mb-4">Hello Again!</h1>
      <h3 className="mb-4">Welcome Back</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="userName"
            value={credentials.userName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-3">
          Login
        </Button>
      </Form>

      {/* Lien pour la page d'inscription */}
      <div className="mt-3">
        <p>
          Vous n'avez pas un compte ?{" "}
          <a href="/register" className="text-primary">
            S'inscrire maintenant!
          </a>
        </p>
      </div>
    </div>
  </div>
</div>




    );

}

export default Login;


