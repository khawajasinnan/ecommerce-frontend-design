import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { initScrollReveal } from './hooks/useScrollReveal'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import ProductListing from './pages/ProductListing/ProductListing'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Auth from './pages/Auth/Auth'
import './App.css'

/* Initializes scroll-reveal on every route change */
const ScrollRevealInit = () => {
    const location = useLocation()
    useEffect(() => {
        // Small delay for DOM to render
        const timer = setTimeout(() => {
            const observer = initScrollReveal()
            return () => observer?.disconnect()
        }, 100)
        return () => clearTimeout(timer)
    }, [location.pathname])
    return null
}

const App = () => {
    return (
        <BrowserRouter>
            <CartProvider>
                <ScrollRevealInit />
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


