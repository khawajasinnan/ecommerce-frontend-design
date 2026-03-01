import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './ProductDetail.css'

/* ── Static fallback data (works without database) ── */
const fallbackProducts = [
    { id: 1, name: 'Canon Camera EOS 2000, Black 10x zoom', img: '/assets/Image/tech/image 23.png', images: ['/assets/Image/tech/image 23.png', '/assets/Image/tech/image 32.png', '/assets/Image/tech/image 29.png', '/assets/Image/tech/image 34.png', '/assets/Image/tech/image 85.png', '/assets/Image/tech/image 33.png'], price: 998, old_price: 1128, rating: 4, orders: 154, shipping: 'Free Shipping', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', category: 'Electronics', brand: 'Samsung', features: ['Metallic', '8GB Ram'], condition: 'Brand new', specs: { Model: '#8786867', Color: 'Shown in picture', Size: '34mm x 450mm x 19mm', Material: 'Aluminium', Memory: '36GB RAM' }, reviews: [{ author: 'Ahmed K.', rating: 5, comment: 'Great camera for beginners!' }, { author: 'Sara M.', rating: 4, comment: 'Good value.' }] },
    { id: 2, name: 'GoPro HERO6 4K Action Camera - Black', img: '/assets/Image/tech/image 32.png', images: ['/assets/Image/tech/image 32.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 29.png'], price: 998, old_price: 1128, rating: 5, orders: 154, shipping: 'Free Shipping', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.', category: 'Electronics', brand: 'Pocco', features: ['Plastic cover', 'Super power'], condition: 'Brand new', specs: { Model: '#4578631', Color: 'Black', Size: '62mm x 45mm x 33mm', Material: 'Plastic' }, reviews: [{ author: 'Mike R.', rating: 5, comment: 'Amazing 4K quality!' }] },
    { id: 3, name: 'Lenovo Laptop IdeaPad 15.6" Full HD', img: '/assets/Image/tech/image 29.png', images: ['/assets/Image/tech/image 29.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 32.png'], price: 998, old_price: null, rating: 4, orders: 154, description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', category: 'Modern tech', brand: 'Lenovo', features: ['Metallic', '8GB Ram'], condition: 'Brand new', specs: { Model: '#LEN7721', Color: 'Silver', Size: '15.6 inch', Material: 'Aluminium', Memory: '8GB RAM' }, reviews: [] },
    { id: 4, name: 'T-shirts with multiple colors, for men and lady', img: '/assets/Layout/alibaba/Image/cloth/Bitmap.png', images: ['/assets/Layout/alibaba/Image/cloth/Bitmap.png', '/assets/Layout/alibaba/Image/cloth/image 24.png', '/assets/Layout/alibaba/Image/cloth/image 30.png'], price: 10.30, old_price: 12.50, rating: 4, orders: 250, description: 'Size: medium, Color: blue, Material: Jeans. Lorem ipsum dolor sit amet.', category: 'Mobile accessory', brand: 'Samsung', features: ['Plastic cover'], condition: 'Brand new', specs: { Model: '#TSH4421', Color: 'Blue, Red, Green', Size: 'Medium', Material: 'Cotton' }, reviews: [] },
    { id: 5, name: 'Apple AirPods Pro with noise cancellation', img: '/assets/Layout/alibaba/Image/cloth/image 24.png', images: ['/assets/Layout/alibaba/Image/cloth/image 24.png', '/assets/Image/tech/image 33.png', '/assets/Image/tech/image 34.png'], price: 249, old_price: 299, rating: 5, orders: 320, description: 'Premium wireless earphones with active noise cancellation.', category: 'Mobile accessory', brand: 'Apple', features: ['PVC Leather'], condition: 'Refurbished', specs: { Model: '#APP2241', Color: 'White', Size: 'One size', Material: 'Silicone', Battery: '6 hours' }, reviews: [{ author: 'David W.', rating: 5, comment: 'Best noise cancellation!' }] },
    { id: 6, name: 'Huawei MatePad Pro 10.8" tablet', img: '/assets/Layout/alibaba/Image/cloth/image 30.png', images: ['/assets/Layout/alibaba/Image/cloth/image 30.png', '/assets/Image/tech/image 29.png'], price: 12.50, old_price: null, rating: 5, orders: 120, description: 'Lorem ipsum dolor sit amet.', category: 'Smartphones', brand: 'Huawei', features: ['PVC Leather', 'Plastic cover'], condition: 'Brand new', specs: { Model: '#HW10823', Color: 'Gray', Size: '10.8 inch', Material: 'Metal + Glass', Memory: '6GB RAM' }, reviews: [] },
    { id: 7, name: 'Samsung Gaming Headset with mic pro', img: '/assets/Image/tech/image 85.png', images: ['/assets/Image/tech/image 85.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 34.png'], price: 8.99, old_price: 12, rating: 3, orders: 86, description: 'Professional gaming headset with noise-cancelling microphone.', category: 'Electronics', brand: 'Samsung', features: ['Plastic cover', 'Super power'], condition: 'Refurbished', specs: { Model: '#SMH5567', Color: 'Black', Size: 'Adjustable', Material: 'Plastic' }, reviews: [] },
    { id: 8, name: 'Apple Watch Series 7, silver color', img: '/assets/Image/tech/image 34.png', images: ['/assets/Image/tech/image 34.png', '/assets/Image/tech/image 33.png', '/assets/Image/tech/image 23.png'], price: 399, old_price: null, rating: 4, orders: 200, description: 'Always-on Retina display, blood oxygen sensor, ECG app.', category: 'Modern tech', brand: 'Apple', features: ['Metallic', 'Super power'], condition: 'Brand new', specs: { Model: '#AW7441', Color: 'Silver', Size: '41mm', Material: 'Aluminium', Battery: '18 hours' }, reviews: [{ author: 'Alex P.', rating: 4, comment: 'Beautiful watch!' }] },
    { id: 9, name: 'Huawei Leather wallet brown color', img: '/assets/Layout/alibaba/Image/cloth/Bitmap (2).png', images: ['/assets/Layout/alibaba/Image/cloth/Bitmap (2).png', '/assets/Layout/alibaba/Image/cloth/image 24.png'], price: 99, old_price: 120, rating: 2, orders: 50, description: 'Premium leather wallet with multiple card slots.', category: 'Mobile accessory', brand: 'Huawei', features: ['PVC Leather'], condition: 'Old items', specs: { Model: '#HWL9987', Color: 'Brown', Size: '11cm x 9cm', Material: 'Genuine Leather' }, reviews: [] },
    { id: 10, name: 'Pocco X5 Pro 5G Smartphone 128GB', img: '/assets/Image/tech/6.png', images: ['/assets/Image/tech/6.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 32.png'], price: 299, old_price: 349, rating: 4, orders: 180, description: 'Pocco X5 Pro with 5G connectivity, 128GB storage.', category: 'Smartphones', brand: 'Pocco', features: ['Metallic', '8GB Ram'], condition: 'Brand new', specs: { Model: '#PX5128', Color: 'Blue', Size: '6.67 inch', Material: 'Glass', Memory: '8GB RAM' }, reviews: [{ author: 'Hassan A.', rating: 4, comment: 'Great phone!' }] },
    { id: 11, name: 'Lenovo ThinkPad Gaming Mouse', img: '/assets/Image/tech/image 86.png', images: ['/assets/Image/tech/image 86.png', '/assets/Image/tech/image 85.png'], price: 25.50, old_price: null, rating: 3, orders: 95, description: 'Ergonomic gaming mouse with 6 programmable buttons.', category: 'Electronics', brand: 'Lenovo', features: ['Plastic cover', 'Super power'], condition: 'Refurbished', specs: { Model: '#LGM3345', Color: 'Black', Size: '125mm x 68mm', Material: 'Plastic' }, reviews: [] },
    { id: 12, name: 'Samsung Galaxy Buds Pro wireless', img: '/assets/Image/tech/image 33.png', images: ['/assets/Image/tech/image 33.png', '/assets/Image/tech/image 34.png', '/assets/Image/tech/image 85.png'], price: 179, old_price: 199, rating: 5, orders: 410, description: 'Premium wireless earbuds with ANC and 360 audio.', category: 'Mobile accessory', brand: 'Samsung', features: ['Metallic', 'Super power'], condition: 'Brand new', specs: { Model: '#SGB2241', Color: 'Phantom Violet', Size: 'One size', Material: 'Plastic', Battery: '5 hours' }, reviews: [{ author: 'Omar H.', rating: 5, comment: 'Crystal clear audio!' }, { author: 'Nina L.', rating: 5, comment: 'ANC works beautifully.' }] },
]

/* ── Star Component ── */
const Stars = ({ rating, size = 16 }) => (
    <div className="pdp-stars">
        {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} width={size} height={size} viewBox="0 0 24 24"
                fill={i <= Math.round(rating) ? '#FF9017' : '#DEE2E7'} stroke="none">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
            </svg>
        ))}
    </div>
)

/* ── Main Component ── */
const ProductDetail = () => {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)

    const [product, setProduct] = useState(null)
    const [related, setRelated] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedImage, setSelectedImage] = useState(0)
    const [activeTab, setActiveTab] = useState('description')
    const [quantity, setQuantity] = useState(1)
    const [wishlisted, setWishlisted] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    useEffect(() => {
        setLoading(true)

        const useFallback = () => {
            const prod = fallbackProducts.find(p => p.id === Number(id))
            const rel = fallbackProducts.filter(p => p.id !== Number(id)).slice(0, 6)
            setProduct(prod || null)
            setRelated(rel)
            setSelectedImage(0)
            setActiveTab('description')
            setQuantity(1)
            setLoading(false)
            window.scrollTo(0, 0)
        }

        Promise.all([
            fetch(`/api/products/${id}`).then(r => r.ok ? r.json() : null),
            fetch(`/api/products/${id}/related`).then(r => r.ok ? r.json() : []),
        ]).then(([prod, rel]) => {
            if (prod && !prod.error) {
                setProduct(prod)
                setRelated(Array.isArray(rel) ? rel : [])
                setSelectedImage(0)
                setActiveTab('description')
                setQuantity(1)
                setLoading(false)
                window.scrollTo(0, 0)
            } else {
                useFallback()
            }
        }).catch(() => useFallback())
    }, [id])

    const handleAddToCart = async () => {
        await addToCart(product.id, quantity, {
            name: product.name,
            img: product.img,
            price: product.price,
            brand: product.brand,
            category: product.category,
        })
        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    if (loading) {
        return (
            <div className="pdp">
                <div className="container pdp__loading">
                    <div className="pdp__spinner" />
                    <p>Loading product...</p>
                </div>
            </div>
        )
    }

    if (!product || product.error) {
        return (
            <div className="pdp">
                <div className="container pdp__error">
                    <h2>Product not found</h2>
                    <Link to="/products" className="pdp__back-link">← Back to products</Link>
                </div>
            </div>
        )
    }

    const images = product.images || [product.img]
    const specs = product.specs || {}
    const reviews = product.reviews || []
    const avgRating = reviews.length > 0
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : product.rating

    return (
        <div className="pdp">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="pdp__breadcrumb">
                    <Link to="/">Home</Link>
                    <span className="pdp__breadcrumb-sep">{'>'}</span>
                    <Link to="/products">Clothings</Link>
                    <span className="pdp__breadcrumb-sep">{'>'}</span>
                    <span className="pdp__breadcrumb-current">{product.category}</span>
                    <span className="pdp__breadcrumb-sep">{'>'}</span>
                    <span className="pdp__breadcrumb-current">{product.name}</span>
                </nav>

                {/* Top section: Gallery + Info + Sidebar */}
                <div className="pdp__top">
                    {/* Image Gallery */}
                    <div className="pdp__gallery">
                        <div className="pdp__main-img-wrap">
                            <img src={images[selectedImage]} alt={product.name} className="pdp__main-img" />
                        </div>
                        <div className="pdp__thumbnails">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    className={`pdp__thumb ${i === selectedImage ? 'pdp__thumb--active' : ''}`}
                                    onClick={() => setSelectedImage(i)}
                                >
                                    <img src={img} alt="" className="pdp__thumb-img" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="pdp__info">
                        <div className="pdp__stock-badge">
                            {product.in_stock !== false ? (
                                <span className="pdp__in-stock">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00B517" strokeWidth="2.5">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    In stock
                                </span>
                            ) : (
                                <span className="pdp__out-stock">Out of stock</span>
                            )}
                        </div>

                        <h1 className="pdp__title">{product.name}</h1>

                        <div className="pdp__meta">
                            <Stars rating={avgRating} />
                            <span className="pdp__rating-val">{avgRating}</span>
                            <span className="pdp__meta-sep">•</span>
                            <span className="pdp__orders">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                {reviews.length} reviews
                            </span>
                            <span className="pdp__meta-sep">•</span>
                            <span className="pdp__sold">{product.orders} sold</span>
                        </div>

                        <div className="pdp__price-box">
                            <div className="pdp__price-row">
                                <span className="pdp__price">${Number(product.price).toFixed(2)}</span>
                                {product.old_price && (
                                    <span className="pdp__old-price">${Number(product.old_price).toFixed(2)}</span>
                                )}
                            </div>
                        </div>

                        {/* Quantity + Add to Cart */}
                        <div className="pdp__actions">
                            <div className="pdp__quantity">
                                <button className="pdp__qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                                <span className="pdp__qty-val">{quantity}</span>
                                <button className="pdp__qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                            </div>
                            <button
                                className={`pdp__add-to-cart ${addedToCart ? 'pdp__add-to-cart--added' : ''}`}
                                onClick={handleAddToCart}
                                disabled={product.in_stock === false}
                            >
                                {addedToCart ? (
                                    <>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Added!
                                    </>
                                ) : 'Add to cart'}
                            </button>
                            <button
                                className={`pdp__wishlist ${wishlisted ? 'pdp__wishlist--active' : ''}`}
                                onClick={() => setWishlisted(!wishlisted)}
                                aria-label="Add to wishlist"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24"
                                    fill={wishlisted ? '#FF3B30' : 'none'}
                                    stroke={wishlisted ? '#FF3B30' : '#8B96A5'} strokeWidth="1.8">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                        </div>

                        {/* Quick Specs */}
                        <div className="pdp__quick-specs">
                            {Object.entries(specs).slice(0, 5).map(([key, val]) => (
                                <div key={key} className="pdp__spec-row">
                                    <span className="pdp__spec-label">{key}</span>
                                    <span className="pdp__spec-value">{val}</span>
                                </div>
                            ))}
                        </div>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div className="pdp__features">
                                {product.features.map((f, i) => (
                                    <span key={i} className="pdp__feature-tag">{f}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* You may like sidebar */}
                    <aside className="pdp__sidebar">
                        <h4 className="pdp__sidebar-title">You may like</h4>
                        {related.slice(0, 5).map(item => (
                            <Link to={`/products/${item.id}`} key={item.id} className="pdp__sidebar-item">
                                <img src={item.img} alt={item.name} className="pdp__sidebar-img" />
                                <div className="pdp__sidebar-info">
                                    <span className="pdp__sidebar-name">{item.name}</span>
                                    <span className="pdp__sidebar-price">${Number(item.price).toFixed(2)}{item.old_price && <s> ${Number(item.old_price).toFixed(2)}</s>}</span>
                                </div>
                            </Link>
                        ))}
                    </aside>
                </div>

                {/* Tabs Section */}
                <div className="pdp__tabs-section">
                    <div className="pdp__tabs">
                        {['description', 'reviews', 'shipping', 'about seller'].map(tab => (
                            <button
                                key={tab}
                                className={`pdp__tab ${activeTab === tab ? 'pdp__tab--active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="pdp__tab-content">
                        {activeTab === 'description' && (
                            <div className="pdp__description">
                                <p className="pdp__desc-text">{product.description}</p>
                                <table className="pdp__spec-table">
                                    <tbody>
                                        {Object.entries(specs).map(([key, val]) => (
                                            <tr key={key}>
                                                <td className="pdp__spec-table-label">{key}</td>
                                                <td className="pdp__spec-table-value">{val}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <ul className="pdp__feature-list">
                                    <li>Some great feature name here</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur</li>
                                    <li>Duis aute irure dolor in reprehenderit</li>
                                    <li>Some great feature name here</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="pdp__reviews">
                                {reviews.length === 0 ? (
                                    <p className="pdp__no-reviews">No reviews yet. Be the first to review this product!</p>
                                ) : (
                                    reviews.map((review, i) => (
                                        <div key={i} className="pdp__review">
                                            <div className="pdp__review-header">
                                                <div className="pdp__review-avatar">
                                                    {review.author.charAt(0)}
                                                </div>
                                                <div className="pdp__review-meta">
                                                    <span className="pdp__review-author">{review.author}</span>
                                                    <Stars rating={review.rating} size={14} />
                                                </div>
                                            </div>
                                            <p className="pdp__review-comment">{review.comment}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="pdp__shipping-info">
                                <div className="pdp__shipping-row">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.5">
                                        <rect x="1" y="3" width="15" height="13" /><polygon points="16,8 20,8 23,11 23,16 16,16" />
                                        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                    </svg>
                                    <div>
                                        <strong>Free Shipping</strong>
                                        <p>Delivery in 5-7 business days</p>
                                    </div>
                                </div>
                                <div className="pdp__shipping-row">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.5">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    <div>
                                        <strong>Buyer Protection</strong>
                                        <p>Full refund if item is not as described</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'about seller' && (
                            <div className="pdp__seller-info">
                                <div className="pdp__seller-card">
                                    <div className="pdp__seller-avatar">S</div>
                                    <div>
                                        <strong>Supplier #{product.id}</strong>
                                        <p>Member since 2020</p>
                                        <span className="pdp__seller-loc">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.5">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            China, Guangdong
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                <div className="pdp__related">
                    <h3 className="pdp__related-title">Related products</h3>
                    <div className="pdp__related-grid">
                        {related.map(item => (
                            <Link to={`/products/${item.id}`} key={item.id} className="pdp__related-card">
                                <div className="pdp__related-img-wrap">
                                    <img src={item.img} alt={item.name} className="pdp__related-img" />
                                </div>
                                <span className="pdp__related-name">{item.name}</span>
                                <span className="pdp__related-price">${Number(item.price).toFixed(2)}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
