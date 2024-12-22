import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from '../public/MyNavbar';
import Register from '../public/Register';
import Login from '../public/Login';
import Categorie from './Components/Admin/Categorie';
import Article from './Components/Admin/Article';
import Panier from './Components/Client/Panier';
import CartItem from './Components/Client/CartItem';
import Commande from './Components/Client/Commande';
import OrderDetail from './Components/Client/OrderDetail';
import Admin_Dashboard from './Components/Admin/Admin_Dashboard';
import Client_Dashboard from './Components/Client/Client_Dashboard';
import ArticleList from './Components/ArticleList';
import CategorieList from './Components/CategorieList';
import OrdersPage from './Components/OrdersPage';


function App() {
    return (
        <Router>
            <MyNavbar/>
            
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/Category" element={<Categorie />} />
                    <Route path="/Article" element={<Article />} />
                    <Route path="/Panier" element={<Panier />} />
                    <Route path="/CartItem" element={<CartItem />} />
                    <Route path="/Commande" element={<Commande />} />
                    <Route path="/OrderDetail" element={<OrderDetail />} />
                    <Route path="/Admin_Dashboard" element={<Admin_Dashboard />} />
                    <Route path="/Client_Dashboard" element={<Client_Dashboard />} />
                    <Route path="/ArticleList" element={<ArticleList />} />
                    <Route path="/CategorieList" element={<CategorieList />} />
                    <Route path="/orders" element={<OrdersPage />} />
                   
                    
                    {/* <Route path="/AddToCartButton" element={<AddToCartButton />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
