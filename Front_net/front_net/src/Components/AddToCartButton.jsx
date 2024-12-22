// import React, { useState } from 'react';

// const AddToCartButton = ({ articleId, articleName, price }) => {
//     const [quantity, setQuantity] = useState(1);

//     const handleAddToCart = async () => {
//         const userName = localStorage.getItem('userName'); // Récupérer le nom de l'utilisateur connecté
//         if (!userName) {
//             alert('Veuillez vous connecter pour ajouter au panier');
//             return;
//         }

//         // // Récupérer l'utilisateur via son nom
//         // const responseUser = await fetch(`http://localhost:5000/api/users/${userName}`);
//         // const user = await responseUser.json();
//         // if (!user) {
//         //     alert('Utilisateur non trouvé');
//         //     return;
//         // }

//         // Vérifier si un panier existe déjà pour l'utilisateur
//         let panierResponse = await fetch(`https://localhost:7220/api/Panier/${user.id}`);
//         let panier = await panierResponse.json();

//         // Si aucun panier n'existe, on en crée un
//         if (!panier) {
//             const panierData = {
//                 applicationUserId: user.id
//             };

//             const createPanierResponse = await fetch('https://localhost:7220/api/Panier', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(panierData)
//             });

//             if (createPanierResponse.ok) {
//                 panierResponse = await createPanierResponse.json();
//                 panier = panierResponse; // Récupérer le panier créé
//             } else {
//                 alert('Erreur lors de la création du panier');
//                 return;
//             }
//         }

//         // Ajouter un article au panier
//         const cartItemData = {
//             panierId: panier.panierId,
//             articleId: articleId,
//             quantity: quantity
//         };

//         const createCartItemResponse = await fetch('https://localhost:7220/api/CartItem', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(cartItemData)
//         });

//         if (createCartItemResponse.ok) {
//             alert(`${articleName} ajouté au panier avec succès`);
//         } else {
//             alert('Erreur lors de l\'ajout au panier');
//         }
//     };

//     return (
//         <div>
//             <h3>{articleName}</h3>
//             <p>{price} TND</p>
//             <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(parseInt(e.target.value))}
//                 min="1"
//             />
//             <button onClick={handleAddToCart}>Ajouter au panier</button>
//         </div>
//     );
// };

// export default AddToCartButton;
