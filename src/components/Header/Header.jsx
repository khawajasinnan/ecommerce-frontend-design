import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './Header.css'

const Header = () => {
    const navigate = useNavigate()
    const { cartCount } = useContext(CartContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All category')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const categories = [
        'All category',
        'Electronics',
        'Mobile accessory',
        'Smartphones',
        'Modern tech',
    ]

    const navLinks = [
        { label: 'All category', href: '#', hasMenu: true },
        { label: 'Hot offers', href: '#' },
        { label: 'Gift boxes', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'Menu item', href: '#' },
        { label: 'Help', href: '#', hasDropdown: true },
    ]

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
        }
    }

    return (
        <header className="header">
            {/* Main Header (Figma: Layout/header-alibaba, 86px, white bg) */}
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

                    {/* User Actions (gray-500 #8B96A5 icons) */}
                    <div className="main-header__actions">
                        <Link to="#" className="main-header__action">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <span className="main-header__action-label">Profile</span>
                        </Link>
                        <Link to="#" className="main-header__action">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            <span className="main-header__action-label">Message</span>
                        </Link>
                        <Link to="#" className="main-header__action">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className="main-header__action-label">Orders</span>
                        </Link>
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

            {/* Navigation Bar (Figma: white bg, dark text #1C1C1C) */}
            <nav className={`nav-bar ${isMobileMenuOpen ? 'nav-bar--open' : ''}`}>
                <div className="container nav-bar__inner">
                    <ul className="nav-bar__links">
                        {navLinks.map((link, i) => (
                            <li key={i} className="nav-bar__item">
                                <a href={link.href} className="nav-bar__link">
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
                                </a>
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
