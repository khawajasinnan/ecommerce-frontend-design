import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Auth.css'

const Auth = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const isSignUp = location.pathname === '/signup'

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false,
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => {
            navigate('/')
        }, 1500)
    }

    if (submitted) {
        return (
            <div className="auth">
                <div className="container">
                    <div className="auth__success-card">
                        <div className="auth__success-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00B517" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <h2>{isSignUp ? 'Account Created!' : 'Welcome Back!'}</h2>
                        <p>Redirecting you to the homepage...</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="auth">
            <div className="container">
                <div className="auth__wrapper">
                    {/* Left: Branding */}
                    <div className="auth__brand">
                        <Link to="/" className="auth__brand-logo">
                            <img src="/assets/Layout/Brand/logo-colored.png" alt="Brand" className="auth__brand-logo-img" />
                        </Link>
                        <h2 className="auth__brand-title">
                            {isSignUp ? 'Create your account' : 'Welcome back'}
                        </h2>
                        <p className="auth__brand-subtitle">
                            {isSignUp
                                ? 'Join millions of users and start trading globally'
                                : 'Sign in to access your account, orders and wishlist'}
                        </p>
                        <div className="auth__brand-features">
                            <div className="auth__brand-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Source from verified suppliers</span>
                            </div>
                            <div className="auth__brand-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Track orders in real-time</span>
                            </div>
                            <div className="auth__brand-feature">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0D6EFD" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>Buyer protection & secure payments</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="auth__form-card">
                        <h3 className="auth__form-title">
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </h3>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div className="auth__field">
                                    <label className="auth__label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="auth__input"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            <div className="auth__field">
                                <label className="auth__label">Email address</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="auth__input"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="auth__field">
                                <label className="auth__label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="auth__input"
                                    placeholder="At least 6 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>

                            {isSignUp && (
                                <div className="auth__field">
                                    <label className="auth__label">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="auth__input"
                                        placeholder="Re-enter your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            )}

                            {isSignUp && (
                                <label className="auth__checkbox">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span>I agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></span>
                                </label>
                            )}

                            {!isSignUp && (
                                <div className="auth__remember-row">
                                    <label className="auth__checkbox">
                                        <input type="checkbox" />
                                        <span>Remember me</span>
                                    </label>
                                    <a href="#" className="auth__forgot">Forgot password?</a>
                                </div>
                            )}

                            <button type="submit" className="auth__submit">
                                {isSignUp ? 'Create Account' : 'Sign In'}
                            </button>
                        </form>

                        <div className="auth__divider">
                            <span>or</span>
                        </div>

                        <button className="auth__social auth__social--google">
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>

                        <p className="auth__switch">
                            {isSignUp ? (
                                <>Already have an account? <Link to="/signin">Sign In</Link></>
                            ) : (
                                <>Don't have an account? <Link to="/signup">Create one</Link></>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
