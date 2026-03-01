import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext'
import './Checkout.css'

const Checkout = () => {
    const navigate = useNavigate()
    const { cartItems, clearCart } = useContext(CartContext)

    const [step, setStep] = useState(1) // 1: shipping, 2: payment, 3: confirm
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [errors, setErrors] = useState({})

    const [shipping, setShipping] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        address: '', city: '', state: '', zip: '', country: 'United States',
    })

    const [payment, setPayment] = useState({
        method: 'card',
        cardNumber: '', expiry: '', cvv: '', cardName: '',
    })

    const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    const shippingCost = subtotal > 100 ? 0 : 14.99
    const tax = subtotal * 0.05
    const total = subtotal + shippingCost + tax

    const handleShippingChange = (e) => {
        const { name, value } = e.target
        setShipping(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => { const next = { ...prev }; delete next[name]; return next })
        }
    }

    const handlePaymentChange = (e) => {
        const { name, value } = e.target
        setPayment(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => { const next = { ...prev }; delete next[name]; return next })
        }
    }

    /* ── Validation ── */
    const validateShipping = () => {
        const newErrors = {}
        if (!shipping.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!shipping.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!shipping.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
            newErrors.email = 'Enter a valid email address'
        }
        if (!shipping.address.trim()) newErrors.address = 'Address is required'
        if (!shipping.city.trim()) newErrors.city = 'City is required'
        if (!shipping.zip.trim()) newErrors.zip = 'ZIP code is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const validatePayment = () => {
        const newErrors = {}
        if (payment.method === 'card') {
            if (!payment.cardNumber.trim()) {
                newErrors.cardNumber = 'Card number is required'
            } else if (payment.cardNumber.replace(/\s/g, '').length < 16) {
                newErrors.cardNumber = 'Enter a valid 16-digit card number'
            }
            if (!payment.expiry.trim()) {
                newErrors.expiry = 'Expiry date is required'
            } else if (!/^\d{2}\/\d{2}$/.test(payment.expiry)) {
                newErrors.expiry = 'Use MM/YY format'
            }
            if (!payment.cvv.trim()) {
                newErrors.cvv = 'CVV is required'
            } else if (payment.cvv.length < 3) {
                newErrors.cvv = 'CVV must be 3-4 digits'
            }
            if (!payment.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNextShipping = () => {
        if (validateShipping()) setStep(2)
    }

    const handleNextPayment = () => {
        if (validatePayment()) setStep(3)
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault()
        setOrderPlaced(true)
        clearCart()
    }

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="checkout">
                <div className="container">
                    <div className="checkout__empty">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#DEE2E7" strokeWidth="1">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <h2>Your cart is empty</h2>
                        <p>Add some items before checking out.</p>
                        <Link to="/products" className="checkout__shop-btn">Browse products</Link>
                    </div>
                </div>
            </div>
        )
    }

    if (orderPlaced) {
        return (
            <div className="checkout">
                <div className="container">
                    <div className="checkout__success">
                        <div className="checkout__success-icon">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00B517" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>Order Placed Successfully!</h2>
                        <p className="checkout__success-id">Order #{Math.floor(100000 + Math.random() * 900000)}</p>
                        <p>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
                        <Link to="/" className="checkout__success-btn">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="checkout">
            <div className="container">
                <nav className="checkout__breadcrumb">
                    <Link to="/">Home</Link>
                    <span>{'>'}</span>
                    <Link to="/cart">Cart</Link>
                    <span>{'>'}</span>
                    <span>Checkout</span>
                </nav>

                {/* Progress Steps */}
                <div className="checkout__steps">
                    {['Shipping', 'Payment', 'Confirm'].map((label, i) => (
                        <div
                            key={label}
                            className={`checkout__step ${step >= i + 1 ? 'checkout__step--active' : ''} ${step > i + 1 ? 'checkout__step--done' : ''}`}
                        >
                            <div className="checkout__step-circle">
                                {step > i + 1 ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : i + 1}
                            </div>
                            <span className="checkout__step-label">{label}</span>
                        </div>
                    ))}
                </div>

                <div className="checkout__layout">
                    {/* Main Form */}
                    <div className="checkout__main">
                        {/* Step 1: Shipping */}
                        {step === 1 && (
                            <div className="checkout__section">
                                <h2 className="checkout__section-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="1" y="3" width="15" height="13" /><polygon points="16,8 20,8 23,11 23,16 16,16" />
                                        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                                    </svg>
                                    Shipping Information
                                </h2>

                                {Object.keys(errors).length > 0 && (
                                    <div className="checkout__error-banner">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        Please fill in all required fields to continue
                                    </div>
                                )}

                                <div className="checkout__grid-2">
                                    <div className={`checkout__field ${errors.firstName ? 'checkout__field--error' : ''}`}>
                                        <label>First Name <span className="checkout__required">*</span></label>
                                        <input type="text" name="firstName" value={shipping.firstName} onChange={handleShippingChange} placeholder="John" />
                                        {errors.firstName && <span className="checkout__field-error">{errors.firstName}</span>}
                                    </div>
                                    <div className={`checkout__field ${errors.lastName ? 'checkout__field--error' : ''}`}>
                                        <label>Last Name <span className="checkout__required">*</span></label>
                                        <input type="text" name="lastName" value={shipping.lastName} onChange={handleShippingChange} placeholder="Doe" />
                                        {errors.lastName && <span className="checkout__field-error">{errors.lastName}</span>}
                                    </div>
                                </div>
                                <div className="checkout__grid-2">
                                    <div className={`checkout__field ${errors.email ? 'checkout__field--error' : ''}`}>
                                        <label>Email <span className="checkout__required">*</span></label>
                                        <input type="email" name="email" value={shipping.email} onChange={handleShippingChange} placeholder="john@example.com" />
                                        {errors.email && <span className="checkout__field-error">{errors.email}</span>}
                                    </div>
                                    <div className="checkout__field">
                                        <label>Phone</label>
                                        <input type="tel" name="phone" value={shipping.phone} onChange={handleShippingChange} placeholder="+1 (555) 123-4567" />
                                    </div>
                                </div>
                                <div className={`checkout__field ${errors.address ? 'checkout__field--error' : ''}`}>
                                    <label>Address <span className="checkout__required">*</span></label>
                                    <input type="text" name="address" value={shipping.address} onChange={handleShippingChange} placeholder="123 Main Street, Apt 4B" />
                                    {errors.address && <span className="checkout__field-error">{errors.address}</span>}
                                </div>
                                <div className="checkout__grid-3">
                                    <div className={`checkout__field ${errors.city ? 'checkout__field--error' : ''}`}>
                                        <label>City <span className="checkout__required">*</span></label>
                                        <input type="text" name="city" value={shipping.city} onChange={handleShippingChange} placeholder="New York" />
                                        {errors.city && <span className="checkout__field-error">{errors.city}</span>}
                                    </div>
                                    <div className="checkout__field">
                                        <label>State</label>
                                        <input type="text" name="state" value={shipping.state} onChange={handleShippingChange} placeholder="NY" />
                                    </div>
                                    <div className={`checkout__field ${errors.zip ? 'checkout__field--error' : ''}`}>
                                        <label>ZIP Code <span className="checkout__required">*</span></label>
                                        <input type="text" name="zip" value={shipping.zip} onChange={handleShippingChange} placeholder="10001" />
                                        {errors.zip && <span className="checkout__field-error">{errors.zip}</span>}
                                    </div>
                                </div>
                                <div className="checkout__field">
                                    <label>Country</label>
                                    <select name="country" value={shipping.country} onChange={handleShippingChange}>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                        <option>Canada</option>
                                        <option>Germany</option>
                                        <option>France</option>
                                        <option>Australia</option>
                                        <option>Pakistan</option>
                                        <option>India</option>
                                        <option>China</option>
                                        <option>Japan</option>
                                        <option>South Korea</option>
                                        <option>Brazil</option>
                                        <option>Mexico</option>
                                        <option>Italy</option>
                                        <option>Spain</option>
                                        <option>Netherlands</option>
                                        <option>Turkey</option>
                                        <option>Saudi Arabia</option>
                                        <option>United Arab Emirates</option>
                                        <option>South Africa</option>
                                        <option>Nigeria</option>
                                        <option>Egypt</option>
                                        <option>Russia</option>
                                        <option>Sweden</option>
                                        <option>Norway</option>
                                        <option>Denmark</option>
                                        <option>Switzerland</option>
                                        <option>Singapore</option>
                                        <option>Malaysia</option>
                                        <option>Indonesia</option>
                                        <option>Thailand</option>
                                        <option>Vietnam</option>
                                        <option>Philippines</option>
                                        <option>New Zealand</option>
                                        <option>Argentina</option>
                                        <option>Colombia</option>
                                        <option>Chile</option>
                                        <option>Poland</option>
                                        <option>Portugal</option>
                                        <option>Belgium</option>
                                        <option>Ireland</option>
                                    </select>
                                </div>
                                <button className="checkout__next-btn" onClick={handleNextShipping}>
                                    Continue to Payment
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Step 2: Payment */}
                        {step === 2 && (
                            <div className="checkout__section">
                                <h2 className="checkout__section-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
                                    </svg>
                                    Payment Method
                                </h2>

                                {Object.keys(errors).length > 0 && (
                                    <div className="checkout__error-banner">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        Please fill in all payment details to continue
                                    </div>
                                )}

                                <div className="checkout__payment-methods">
                                    {[
                                        { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
                                        { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                                        { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
                                    ].map(m => (
                                        <label key={m.id} className={`checkout__payment-option ${payment.method === m.id ? 'checkout__payment-option--active' : ''}`}>
                                            <input type="radio" name="method" value={m.id} checked={payment.method === m.id} onChange={handlePaymentChange} />
                                            <span className="checkout__payment-icon">{m.icon}</span>
                                            <span>{m.label}</span>
                                        </label>
                                    ))}
                                </div>

                                {payment.method === 'card' && (
                                    <div className="checkout__card-fields">
                                        <div className={`checkout__field ${errors.cardNumber ? 'checkout__field--error' : ''}`}>
                                            <label>Card Number <span className="checkout__required">*</span></label>
                                            <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handlePaymentChange} placeholder="1234 5678 9012 3456" maxLength={19} />
                                            {errors.cardNumber && <span className="checkout__field-error">{errors.cardNumber}</span>}
                                        </div>
                                        <div className="checkout__grid-2">
                                            <div className={`checkout__field ${errors.expiry ? 'checkout__field--error' : ''}`}>
                                                <label>Expiry Date <span className="checkout__required">*</span></label>
                                                <input type="text" name="expiry" value={payment.expiry} onChange={handlePaymentChange} placeholder="MM/YY" maxLength={5} />
                                                {errors.expiry && <span className="checkout__field-error">{errors.expiry}</span>}
                                            </div>
                                            <div className={`checkout__field ${errors.cvv ? 'checkout__field--error' : ''}`}>
                                                <label>CVV <span className="checkout__required">*</span></label>
                                                <input type="text" name="cvv" value={payment.cvv} onChange={handlePaymentChange} placeholder="123" maxLength={4} />
                                                {errors.cvv && <span className="checkout__field-error">{errors.cvv}</span>}
                                            </div>
                                        </div>
                                        <div className={`checkout__field ${errors.cardName ? 'checkout__field--error' : ''}`}>
                                            <label>Name on Card <span className="checkout__required">*</span></label>
                                            <input type="text" name="cardName" value={payment.cardName} onChange={handlePaymentChange} placeholder="John Doe" />
                                            {errors.cardName && <span className="checkout__field-error">{errors.cardName}</span>}
                                        </div>
                                    </div>
                                )}

                                {payment.method === 'paypal' && (
                                    <div className="checkout__paypal-note">
                                        <p>You will be redirected to PayPal to complete your payment after placing the order.</p>
                                    </div>
                                )}

                                {payment.method === 'cod' && (
                                    <div className="checkout__cod-note">
                                        <p>Pay with cash when your order is delivered. Additional fee of $4.99 may apply.</p>
                                    </div>
                                )}

                                <div className="checkout__btn-row">
                                    <button className="checkout__back-btn" onClick={() => { setErrors({}); setStep(1) }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button className="checkout__next-btn" onClick={handleNextPayment}>
                                        Review Order
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirm */}
                        {step === 3 && (
                            <div className="checkout__section">
                                <h2 className="checkout__section-title">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                    </svg>
                                    Review Your Order
                                </h2>

                                <div className="checkout__review-section">
                                    <h4>Shipping to:</h4>
                                    <p>{shipping.firstName} {shipping.lastName}</p>
                                    <p>{shipping.address}</p>
                                    <p>{shipping.city}, {shipping.state} {shipping.zip}</p>
                                    <p>{shipping.country}</p>
                                    <p>{shipping.email} {shipping.phone && `• ${shipping.phone}`}</p>
                                </div>

                                <div className="checkout__review-section">
                                    <h4>Payment:</h4>
                                    <p>{payment.method === 'card' ? `Card ending in ${payment.cardNumber.slice(-4) || '****'}` : payment.method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</p>
                                </div>

                                <div className="checkout__review-section">
                                    <h4>Items ({cartItems.length}):</h4>
                                    {cartItems.map(item => (
                                        <div key={item.id} className="checkout__review-item">
                                            <img src={item.img} alt={item.name} className="checkout__review-img" />
                                            <div>
                                                <span className="checkout__review-name">{item.name}</span>
                                                <span className="checkout__review-qty">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</span>
                                            </div>
                                            <span className="checkout__review-price">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="checkout__btn-row">
                                    <button className="checkout__back-btn" onClick={() => setStep(2)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M19 12H5M12 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </button>
                                    <button className="checkout__place-btn" onClick={handlePlaceOrder}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                        Place Order — ${total.toFixed(2)}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <aside className="checkout__summary">
                        <h3 className="checkout__summary-title">Order Summary</h3>
                        <div className="checkout__summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="checkout__summary-item">
                                    <img src={item.img} alt="" className="checkout__summary-img" />
                                    <div className="checkout__summary-item-info">
                                        <span className="checkout__summary-item-name">{item.name}</span>
                                        <span className="checkout__summary-item-qty">× {item.quantity}</span>
                                    </div>
                                    <span className="checkout__summary-item-price">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="checkout__summary-totals">
                            <div className="checkout__summary-row">
                                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="checkout__summary-row">
                                <span>Shipping</span><span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="checkout__summary-row">
                                <span>Tax</span><span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="checkout__summary-row checkout__summary-row--total">
                                <span>Total</span><span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                        {shippingCost === 0 && (
                            <div className="checkout__free-ship-badge">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00B517" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Free shipping on orders over $100
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Checkout
