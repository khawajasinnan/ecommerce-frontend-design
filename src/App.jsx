import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import ProductListing from './pages/ProductListing/ProductListing'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Auth from './pages/Auth/Auth'
import './App.css'

const App = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <div className="app">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<ProductListing />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/signin" element={<Auth />} />
                            <Route path="/signup" element={<Auth />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </CartProvider>
        </BrowserRouter>
    )
}

export default App

