// import React from 'react'
// import ArticleList from '../ArticleList'
// import CategorieList from '../CategorieList'

// const Client_Dashboard = () => {
//   return (
//     <div>
//       <CategorieList/>
//       {/* <ArticleList/> */}
//     </div>
//   )
// }

// export default Client_Dashboard

import React, { useEffect, useState } from 'react';
import CategorieList from '../CategorieList';
import Footer from '../../Views/Footer';
import MyNavbar from '../../../public/MyNavbar';
import Carousels from '../../Views/Carousels';
const Client_Dashboard = () => {
    const [userName, setUserName] = useState('');
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    
    useEffect(() => {
        // Récupérer le nom d'utilisateur depuis le localStorage
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }

        // Cacher le message de bienvenue après 3 secondes avec un effet fluide
        const timer = setTimeout(() => {
            setShowWelcomeMessage(false);
        }, 3000);

        return () => clearTimeout(timer); // Nettoyer le timer à la désactivation du composant
    }, []);

    if (!userName) {
        return <div>Veuillez vous connecter pour accéder au tableau de bord.</div>;
    }
    

    return (
      
        <div >
            {/* En-tête du tableau de bord */}
            
            {/* Message de bienvenue avec animation de disparition */}
            {showWelcomeMessage && (
                <h3 
                    style={{ 
                      
                        display: 'flex', // Utilisation de flexbox pour le centrage
                        justifyContent: 'center', // Centrage horizontal
                        margin: 0,
                     
                        color: 'green', 
                        opacity: showWelcomeMessage ? 1 : 0, 
                        
                        transition: 'opacity 3s ease, transform 3s ease', // Apparition en ralenti
                    }}
                >
                    Welcome, {userName}! 
                </h3>
            )}
<br/>
<Carousels/>
            <CategorieList />
            <Footer/>
           
        </div>
    );
};

export default Client_Dashboard;

 