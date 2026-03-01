import { useState, useContext, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()
    const { cartCount, cartItems } = useContext(CartContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All category')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState(null)
    const dropdownRef = useRef(null)

    const categories = [
        'All category',
        'Electronics',
        'Mobile accessory',
        'Smartphones',
        'Modern tech',
        'Clothing',
    ]

    const navLinks = [
        { label: 'All category', to: '/products', hasMenu: true },
        { label: 'Hot offers', to: '/products?sort=highest' },
        { label: 'Gift boxes', to: '/products' },
        { label: 'Projects', to: '/products' },
        { label: 'Menu item', to: '/products' },
        { label: 'Help', to: '#', hasDropdown: true },
    ]

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const toggleDropdown = (name) => {
        setActiveDropdown(prev => prev === name ? null : name)
    }

    return (
        <header className="header">
            {/* Main Header */}
            <div className="main-header">
                <div className="container main-header__inner">
                    {/* Logo */}
                    <Link to="/" className="main-header__logo">
                        <img
                            src="/assets/Layout/Brand/logo-colored.png"
                            alt="Brand"
                            className="main-header__logo-img"
                        />
                    </Link>

                    {/* Search Bar */}
                    <div className="main-header__search">
                        <input
                            type="text"
                            className="main-header__search-input"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <select
                            className="main-header__search-category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <button className="main-header__search-btn" onClick={handleSearch}>
                            Search
                        </button>
                    </div>

                    {/* User Actions with Dropdowns */}
                    <div className="main-header__actions" ref={dropdownRef}>
                        {/* Profile */}
                        <div className="main-header__action-wrap">
                            <button className="main-header__action" onClick={() => toggleDropdown('profile')}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className="main-header__action-label">Profile</span>
                            </button>
                            {activeDropdown === 'profile' && (
                                <div className="header-dropdown">
                                    <div className="header-dropdown__header">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="1.5">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
                                        </svg>
                                        <div>
                                            <span className="header-dropdown__title">My Account</span>
                                            <span className="header-dropdown__subtitle">Sign in for the best experience</span>
                                        </div>
                                    </div>
                                    <div className="header-dropdown__actions">
                                        <Link to="/signin" className="header-dropdown__btn header-dropdown__btn--primary" onClick={() => setActiveDropdown(null)}>
                                            Sign In
                                        </Link>
                                        <Link to="/signup" className="header-dropdown__btn header-dropdown__btn--outline" onClick={() => setActiveDropdown(null)}>
                                            Register
                                        </Link>
                                    </div>
                                    <div className="header-dropdown__links">
                                        <Link to="/signin" className="header-dropdown__link" onClick={() => setActiveDropdown(null)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                            My Profile
                                        </Link>
                                        <Link to="/cart" className="header-dropdown__link" onClick={() => setActiveDropdown(null)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                                            My Cart
                                        </Link>
                                        <Link to="/products" className="header-dropdown__link" onClick={() => setActiveDropdown(null)}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                            Wishlist
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Message */}
                        <div className="main-header__action-wrap">
                            <button className="main-header__action" onClick={() => toggleDropdown('message')}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <span className="main-header__action-label">Message</span>
                            </button>
                            {activeDropdown === 'message' && (
                                <div className="header-dropdown header-dropdown--messages">
                                    <div className="header-dropdown__header">
                                        <span className="header-dropdown__title">Messages</span>
                                    </div>
                                    <div className="header-dropdown__empty">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DEE2E7" strokeWidth="1.5">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        <p>No messages yet</p>
                                        <span>Your conversations will appear here</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Orders */}
                        <div className="main-header__action-wrap">
                            <button className="main-header__action" onClick={() => toggleDropdown('orders')}>
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <span className="main-header__action-label">Orders</span>
                            </button>
                            {activeDropdown === 'orders' && (
                                <div className="header-dropdown header-dropdown--orders">
                                    <div className="header-dropdown__header">
                                        <span className="header-dropdown__title">My Orders</span>
                                        {cartItems.length > 0 && (
                                            <span className="header-dropdown__count">{cartItems.length} item{cartItems.length > 1 ? 's' : ''}</span>
                                        )}
                                    </div>
                                    {cartItems.length === 0 ? (
                                        <div className="header-dropdown__empty">
                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#DEE2E7" strokeWidth="1.5">
                                                <rect x="2" y="3" width="20" height="18" rx="2" />
                                                <path d="M8 7h8M8 11h6M8 15h4" />
                                            </svg>
                                            <p>No orders yet</p>
                                            <span>Your orders will appear here</span>
                                        </div>
                                    ) : (
                                        <div className="header-dropdown__order-list">
                                            {cartItems.slice(0, 3).map(item => (
                                                <Link
                                                    key={item.id}
                                                    to={`/products/${item.product_id}`}
                                                    className="header-dropdown__order-item"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <img src={item.img} alt={item.name} className="header-dropdown__order-img" />
                                                    <div className="header-dropdown__order-info">
                                                        <span className="header-dropdown__order-name">{item.name}</span>
                                                        <span className="header-dropdown__order-meta">Qty: {item.quantity} · ${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    <Link
                                        to={cartItems.length > 0 ? '/cart' : '/products'}
                                        className="header-dropdown__footer-link"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        {cartItems.length > 0 ? `View all in cart →` : 'Start Shopping →'}
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className="main-header__action main-header__action--cart">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            <span className="main-header__action-label">My cart</span>
                            {cartCount > 0 && <span className="main-header__cart-badge">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className={`nav-bar ${isMobileMenuOpen ? 'nav-bar--open' : ''}`}>
                <div className="container nav-bar__inner">
                    <ul className="nav-bar__links">
                        {navLinks.map((link, i) => (
                            <li key={i} className="nav-bar__item">
                                <Link to={link.to} className="nav-bar__link">
                                    {i === 0 && (
                                        <svg className="nav-bar__hamburger-icon" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                            <path d="M1 1h16M1 7h16M1 13h16" stroke="#1C1C1C" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    )}
                                    {link.label}
                                    {link.hasDropdown && (
                                        <svg className="nav-bar__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                            <path d="M1 1l4 4 4-4" stroke="#8B96A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-bar__right">
                        <a href="#" className="nav-bar__right-link">
                            English, USD
                            <svg className="nav-bar__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M1 1l4 4 4-4" stroke="#8B96A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#" className="nav-bar__right-link">
                            Ship to
                            <span className="nav-bar__flag">
                                <img src="/assets/Layout1/Image/flags/DE@2x.png" alt="" className="nav-bar__flag-img" />
                            </span>
                            <svg className="nav-bar__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none">
                                <path d="M1 1l4 4 4-4" stroke="#8B96A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header

