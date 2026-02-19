import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductListing.css'

/* ── Product Data with categories, brands, features, condition ── */
const allProducts = [
    {
        id: 1,
        name: 'Canon Camera EOS 2000, Black 10x zoom',
        img: '/assets/Image/tech/image 23.png',
        price: 998,
        oldPrice: 1128,
        rating: 4,
        orders: 154,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        category: 'Electronics',
        brand: 'Samsung',
        features: ['Metallic', '8GB Ram'],
        condition: 'Brand new',
    },
    {
        id: 2,
        name: 'GoPro HERO6 4K Action Camera - Black',
        img: '/assets/Image/tech/image 32.png',
        price: 998,
        oldPrice: 1128,
        rating: 5,
        orders: 154,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
        category: 'Electronics',
        brand: 'Pocco',
        features: ['Plastic cover', 'Super power'],
        condition: 'Brand new',
    },
    {
        id: 3,
        name: 'Lenovo Laptop IdeaPad 15.6" Full HD',
        img: '/assets/Image/tech/image 29.png',
        price: 998,
        rating: 4,
        orders: 154,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'Modern tech',
        brand: 'Lenovo',
        features: ['Metallic', '8GB Ram'],
        condition: 'Brand new',
    },
    {
        id: 4,
        name: 'T-shirts with multiple colors, for men and lady',
        img: '/assets/Layout/alibaba/Image/cloth/Bitmap.png',
        price: 10.30,
        oldPrice: 12.50,
        rating: 4,
        orders: 250,
        shipping: 'Free Shipping',
        description: 'Size: medium, Color: blue, Material: Jeans. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
        category: 'Mobile accessory',
        brand: 'Samsung',
        features: ['Plastic cover'],
        condition: 'Brand new',
    },
    {
        id: 5,
        name: 'Apple AirPods Pro with noise cancellation',
        img: '/assets/Layout/alibaba/Image/cloth/image 24.png',
        price: 249,
        oldPrice: 299,
        rating: 5,
        orders: 320,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        category: 'Mobile accessory',
        brand: 'Apple',
        features: ['PVC Leather'],
        condition: 'Refurbished',
    },
    {
        id: 6,
        name: 'Huawei MatePad Pro 10.8" tablet',
        img: '/assets/Layout/alibaba/Image/cloth/image 30.png',
        price: 12.50,
        rating: 5,
        orders: 120,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
        category: 'Smartphones',
        brand: 'Huawei',
        features: ['PVC Leather', 'Plastic cover'],
        condition: 'Brand new',
    },
    {
        id: 7,
        name: 'Samsung Gaming Headset with mic pro',
        img: '/assets/Image/tech/image 85.png',
        price: 8.99,
        oldPrice: 12.00,
        rating: 3,
        orders: 86,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.',
        category: 'Electronics',
        brand: 'Samsung',
        features: ['Plastic cover', 'Super power'],
        condition: 'Refurbished',
    },
    {
        id: 8,
        name: 'Apple Watch Series 7, silver color',
        img: '/assets/Image/tech/image 34.png',
        price: 399,
        rating: 4,
        orders: 200,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
        category: 'Modern tech',
        brand: 'Apple',
        features: ['Metallic', 'Super power'],
        condition: 'Brand new',
    },
    {
        id: 9,
        name: 'Huawei Leather wallet brown color',
        img: '/assets/Layout/alibaba/Image/cloth/Bitmap (2).png',
        price: 99.00,
        oldPrice: 120.00,
        rating: 2,
        orders: 50,
        shipping: 'Free Shipping',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing.',
        category: 'Mobile accessory',
        brand: 'Huawei',
        features: ['PVC Leather'],
        condition: 'Old items',
    },
    {
        id: 10,
        name: 'Pocco X5 Pro 5G Smartphone 128GB',
        img: '/assets/Image/tech/6.png',
        price: 299,
        oldPrice: 349,
        rating: 4,
        orders: 180,
        shipping: 'Free Shipping',
        description: 'Pocco X5 Pro with 5G connectivity, 128GB storage, AMOLED display.',
        category: 'Smartphones',
        brand: 'Pocco',
        features: ['Metallic', '8GB Ram'],
        condition: 'Brand new',
    },
    {
        id: 11,
        name: 'Lenovo ThinkPad Gaming Mouse',
        img: '/assets/Image/tech/image 86.png',
        price: 25.50,
        rating: 3,
        orders: 95,
        shipping: 'Free Shipping',
        description: 'Ergonomic gaming mouse with 6 programmable buttons and RGB lighting.',
        category: 'Electronics',
        brand: 'Lenovo',
        features: ['Plastic cover', 'Super power'],
        condition: 'Refurbished',
    },
    {
        id: 12,
        name: 'Samsung Galaxy Buds Pro wireless',
        img: '/assets/Image/tech/image 33.png',
        price: 179,
        oldPrice: 199,
        rating: 5,
        orders: 410,
        shipping: 'Free Shipping',
        description: 'Premium wireless earbuds with active noise cancellation and 360 audio.',
        category: 'Mobile accessory',
        brand: 'Samsung',
        features: ['Metallic', 'Super power'],
        condition: 'Brand new',
    },
]

const categories = ['Mobile accessory', 'Electronics', 'Smartphones', 'Modern tech']
const brands = ['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo']
const features = ['Metallic', 'Plastic cover', 'PVC Leather', '8GB Ram', 'Super power']
const conditions = ['Any', 'Refurbished', 'Brand new', 'Old items']

const ITEMS_PER_PAGE = 6

/* ── Star Component ── */
const Stars = ({ count }) => (
    <div className="plp-stars">
        {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                fill={i <= count ? '#FF9017' : '#DEE2E7'} stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
        ))}
        <span className="plp-stars__rating">{count}.0</span>
    </div>
)

/* ── Main Component ── */
const ProductListing = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [viewMode, setViewMode] = useState('grid') /* grid | list */
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrands, setSelectedBrands] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [selectedCondition, setSelectedCondition] = useState('Any')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [selectedRating, setSelectedRating] = useState(0)
    const [sortBy, setSortBy] = useState('featured')

    /* Filter logic — ALL filters applied */
    const filteredProducts = allProducts.filter(p => {
        // Category filter
        if (selectedCategory && p.category !== selectedCategory) return false
        // Brand filter
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false
        // Feature filter
        if (selectedFeatures.length > 0 && !selectedFeatures.every(f => p.features.includes(f))) return false
        // Price range filter
        if (minPrice && p.price < Number(minPrice)) return false
        if (maxPrice && p.price > Number(maxPrice)) return false
        // Condition filter
        if (selectedCondition !== 'Any' && p.condition !== selectedCondition) return false
        // Rating filter
        if (selectedRating > 0 && p.rating < selectedRating) return false
        return true
    })

    /* Sort logic */
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'lowest': return a.price - b.price
            case 'highest': return b.price - a.price
            case 'rating': return b.rating - a.rating
            default: return 0
        }
    })

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const toggleBrand = (b) => {
        setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])
        setCurrentPage(1)
    }

    const toggleFeature = (f) => {
        setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSelectedCategory('')
        setSelectedBrands([])
        setSelectedFeatures([])
        setSelectedCondition('Any')
        setMinPrice('')
        setMaxPrice('')
        setSelectedRating(0)
        setCurrentPage(1)
    }

    const hasActiveFilters = selectedCategory || selectedBrands.length > 0 || selectedFeatures.length > 0 ||
        selectedCondition !== 'Any' || minPrice || maxPrice || selectedRating > 0

    return (
        <div className="plp">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="plp__breadcrumb">
                    <Link to="/" className="plp__breadcrumb-link">Home</Link>
                    <span className="plp__breadcrumb-sep">{'>'}</span>
                    <Link to="/products" className="plp__breadcrumb-link">Clothings</Link>
                    <span className="plp__breadcrumb-sep">{'>'}</span>
                    <span className="plp__breadcrumb-current">Men's wear</span>
                </nav>

                <div className="plp__layout">
                    {/* ── Sidebar Filters ── */}
                    <aside className="plp__sidebar">
                        {/* Category */}
                        <div className="plp__filter-section">
                            <h4 className="plp__filter-title">Category</h4>
                            <ul className="plp__filter-list">
                                {categories.map(c => (
                                    <li
                                        key={c}
                                        className={`plp__filter-item ${selectedCategory === c ? 'plp__filter-item--active' : ''}`}
                                        onClick={() => { setSelectedCategory(selectedCategory === c ? '' : c); setCurrentPage(1) }}
                                    >
                                        {c}
                                    </li>
                                ))}
                                <li className="plp__filter-item plp__filter-item--link"
                                    onClick={() => { setSelectedCategory(''); setCurrentPage(1) }}>See all</li>
                            </ul>
                        </div>

                        {/* Brands */}
                        <div className="plp__filter-section">
                            <h4 className="plp__filter-title">Brands</h4>
                            {brands.map(b => (
                                <label key={b} className="plp__checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(b)}
                                        onChange={() => toggleBrand(b)}
                                    />
                                    <span>{b}</span>
                                </label>
                            ))}
                        </div>

                        {/* Features */}
                        <div className="plp__filter-section">
                            <h4 className="plp__filter-title">Features</h4>
                            {features.map(f => (
                                <label key={f} className="plp__checkbox">
                                    <input
                                        type="checkbox"
                                        checked={selectedFeatures.includes(f)}
                                        onChange={() => toggleFeature(f)}
                                    />
                                    <span>{f}</span>
                                </label>
                            ))}
                        </div>

                        {/* Price Range */}
                        <div className="plp__filter-section">
                            <h4 className="plp__filter-title">Price range</h4>
                            <div className="plp__price-inputs">
                                <input
                                    type="number"
                                    className="plp__price-input"
                                    placeholder="Min"
                                    value={minPrice}
                                    onChange={e => { setMinPrice(e.target.value); setCurrentPage(1) }}
                                />
                                <span className="plp__price-sep">-</span>
                                <input
                                    type="number"
                                    className="plp__price-input"
                                    placeholder="Max"
                                    value={maxPrice}
                                    onChange={e => { setMaxPrice(e.target.value); setCurrentPage(1) }}
                                />
                            </div>
                            <button className="plp__filter-apply" onClick={() => setCurrentPage(1)}>Apply</button>
                        </div>

                        {/* Condition */}
                        <div className="plp__filter-section">
                            <h4 className="plp__filter-title">Condition</h4>
                            {conditions.map(c => (
                                <label key={c} className="plp__radio">
                                    <input
                                        type="radio"
                                        name="condition"
                                        checked={selectedCondition === c}
                                        onChange={() => { setSelectedCondition(c); setCurrentPage(1) }}
                                    />
                                    <span>{c}</span>
                                </label>
                            ))}
                        </div>

                        {/* Ratings */}
                        <div className="plp__filter-section">
                            <h4 className="plp__filter-title">Ratings</h4>
                            {[5, 4, 3, 2].map(r => (
                                <label key={r} className="plp__radio plp__radio--stars">
                                    <input
                                        type="radio"
                                        name="rating"
                                        checked={selectedRating === r}
                                        onChange={() => { setSelectedRating(r); setCurrentPage(1) }}
                                    />
                                    <div className="plp__rating-stars">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <svg key={i} width="16" height="16" viewBox="0 0 24 24"
                                                fill={i <= r ? '#FF9017' : '#DEE2E7'} stroke="none">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                                            </svg>
                                        ))}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </aside>

                    {/* ── Product Grid ── */}
                    <div className="plp__main">
                        {/* Toolbar */}
                        <div className="plp__toolbar">
                            <div className="plp__toolbar-left">
                                <span className="plp__result-count">{sortedProducts.length} items found</span>
                                {hasActiveFilters && (
                                    <button className="plp__clear-btn" onClick={clearFilters}>Clear all filters</button>
                                )}
                            </div>
                            <div className="plp__toolbar-right">
                                <div className="plp__sort">
                                    <select className="plp__sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                        <option value="featured">Featured</option>
                                        <option value="lowest">Lowest price</option>
                                        <option value="highest">Highest price</option>
                                        <option value="rating">Best rating</option>
                                    </select>
                                </div>
                                <div className="plp__view-toggle">
                                    <button
                                        className={`plp__view-btn ${viewMode === 'grid' ? 'plp__view-btn--active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                        aria-label="Grid view"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                            <rect x="0" y="0" width="7" height="7" rx="1" />
                                            <rect x="11" y="0" width="7" height="7" rx="1" />
                                            <rect x="0" y="11" width="7" height="7" rx="1" />
                                            <rect x="11" y="11" width="7" height="7" rx="1" />
                                        </svg>
                                    </button>
                                    <button
                                        className={`plp__view-btn ${viewMode === 'list' ? 'plp__view-btn--active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                        aria-label="List view"
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                                            <rect x="0" y="1" width="18" height="3" rx="1" />
                                            <rect x="0" y="7.5" width="18" height="3" rx="1" />
                                            <rect x="0" y="14" width="18" height="3" rx="1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {hasActiveFilters && (
                            <div className="plp__active-filters">
                                {selectedCategory && (
                                    <span className="plp__filter-chip">
                                        {selectedCategory}
                                        <button className="plp__chip-remove" onClick={() => setSelectedCategory('')}>×</button>
                                    </span>
                                )}
                                {selectedBrands.map(b => (
                                    <span key={b} className="plp__filter-chip">
                                        {b}
                                        <button className="plp__chip-remove" onClick={() => toggleBrand(b)}>×</button>
                                    </span>
                                ))}
                                {selectedFeatures.map(f => (
                                    <span key={f} className="plp__filter-chip">
                                        {f}
                                        <button className="plp__chip-remove" onClick={() => toggleFeature(f)}>×</button>
                                    </span>
                                ))}
                                {selectedCondition !== 'Any' && (
                                    <span className="plp__filter-chip">
                                        {selectedCondition}
                                        <button className="plp__chip-remove" onClick={() => setSelectedCondition('Any')}>×</button>
                                    </span>
                                )}
                                {(minPrice || maxPrice) && (
                                    <span className="plp__filter-chip">
                                        ${minPrice || '0'} - ${maxPrice || '∞'}
                                        <button className="plp__chip-remove" onClick={() => { setMinPrice(''); setMaxPrice('') }}>×</button>
                                    </span>
                                )}
                                {selectedRating > 0 && (
                                    <span className="plp__filter-chip">
                                        {selectedRating}+ Stars
                                        <button className="plp__chip-remove" onClick={() => setSelectedRating(0)}>×</button>
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Products */}
                        {paginatedProducts.length === 0 ? (
                            <div className="plp__empty">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.5">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <p>No products match your filters</p>
                                <button className="plp__clear-btn" onClick={clearFilters}>Clear all filters</button>
                            </div>
                        ) : (
                            <div className={viewMode === 'grid' ? 'plp__grid' : 'plp__list'}>
                                {paginatedProducts.map(product => (
                                    viewMode === 'grid' ? (
                                        /* Grid Card */
                                        <div key={product.id} className="plp__card">
                                            <div className="plp__card-img-wrap">
                                                <img src={product.img} alt={product.name} className="plp__card-img" />
                                            </div>
                                            <div className="plp__card-body">
                                                <h3 className="plp__card-title">{product.name}</h3>
                                                <div className="plp__card-pricing">
                                                    <span className="plp__card-price">${product.price.toFixed(2)}</span>
                                                    {product.oldPrice && (
                                                        <span className="plp__card-old">${product.oldPrice.toFixed(2)}</span>
                                                    )}
                                                </div>
                                                <Stars count={product.rating} />
                                            </div>
                                        </div>
                                    ) : (
                                        /* List Row */
                                        <div key={product.id} className="plp__list-item">
                                            <div className="plp__list-img-wrap">
                                                <img src={product.img} alt={product.name} className="plp__list-img" />
                                            </div>
                                            <div className="plp__list-body">
                                                <h3 className="plp__list-title">{product.name}</h3>
                                                <div className="plp__list-pricing">
                                                    <span className="plp__list-price">${product.price.toFixed(2)}</span>
                                                    {product.oldPrice && (
                                                        <span className="plp__list-old">${product.oldPrice.toFixed(2)}</span>
                                                    )}
                                                </div>
                                                <Stars count={product.rating} />
                                                <p className="plp__list-desc">{product.description}</p>
                                                <span className="plp__list-shipping">{product.shipping}</span>
                                                <a href="#" className="plp__list-detail">View detail</a>
                                            </div>
                                        </div>
                                    )
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="plp__pagination">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        className={`plp__page-btn ${page === currentPage ? 'plp__page-btn--active' : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </button>
                                ))}
                                {currentPage < totalPages && (
                                    <button className="plp__page-btn plp__page-btn--next" onClick={() => setCurrentPage(p => p + 1)}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductListing
