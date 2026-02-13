import './Footer.css'

const Footer = () => {
    const footerColumns = [
        {
            title: 'About',
            links: ['About Us', 'Find store', 'Categories', 'Blogs'],
        },
        {
            title: 'Partnership',
            links: ['About Us', 'Find store', 'Categories', 'Blogs'],
        },
        {
            title: 'Information',
            links: ['Help Center', 'Money Refund', 'Shipping', 'Contact us'],
        },
        {
            title: 'For users',
            links: ['Login', 'Register', 'Settings', 'My Orders'],
        },
    ]

    return (
        <footer className="footer">
            {/* Main Footer (Figma: white bg) */}
            <div className="footer__main">
                <div className="container">
                    <div className="footer__grid">
                        {/* Brand Column */}
                        <div className="footer__brand">
                            <a href="/" className="footer__logo">
                                <img
                                    src="/assets/Layout/Brand/logo-colored.png"
                                    alt="Brand"
                                    className="footer__logo-img"
                                />
                            </a>
                            <p className="footer__description">
                                Best information about the company gies here but now lorem ipsum is
                            </p>
                            <div className="footer__social">
                                <a href="#" className="footer__social-link" aria-label="Facebook">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
                                        <path d="M15.75 14h2.625l1.05-3.5H15.75V8.75c0-.896 0-1.75 1.75-1.75h1.925V3.675a28.074 28.074 0 0 0-2.807-.175c-2.771 0-4.668 1.69-4.668 4.795V10.5H9.1V14h2.85v8.75h3.8V14Z" />
                                    </svg>
                                </a>
                                <a href="#" className="footer__social-link" aria-label="Twitter">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
                                        <path d="M25.2 6.657a9.025 9.025 0 0 1-2.652.727 4.56 4.56 0 0 0 2.03-2.538 9.143 9.143 0 0 1-2.907 1.112A4.6 4.6 0 0 0 18.32 4.55a4.573 4.573 0 0 0-4.575 4.575c0 .359.04.709.12 1.044a12.996 12.996 0 0 1-9.435-4.787 4.576 4.576 0 0 0 1.416 6.107 4.553 4.553 0 0 1-2.072-.572v.057a4.575 4.575 0 0 0 3.668 4.485 4.588 4.588 0 0 1-2.065.078 4.577 4.577 0 0 0 4.273 3.176A9.187 9.187 0 0 1 2.8 20.62a12.96 12.96 0 0 0 7.016 2.057c8.42 0 13.022-6.974 13.022-13.023 0-.198-.004-.395-.013-.591A9.305 9.305 0 0 0 25.2 6.657Z" />
                                    </svg>
                                </a>
                                <a href="#" className="footer__social-link" aria-label="LinkedIn">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
                                        <path d="M7.523 9.45H3.85v12.6h3.673V9.45Zm16.627 4.55c0-3.046-1.977-4.55-4.474-4.55a3.999 3.999 0 0 0-3.556 1.893V9.45H12.25v12.6h3.87v-6.638a2.379 2.379 0 0 1 2.267-2.562c1.26 0 2.007.775 2.007 2.47v6.73h3.756V14Zm-16.875-4.2A2.1 2.1 0 1 0 5.175 5.6a2.1 2.1 0 0 0 2.1 4.2Z" />
                                    </svg>
                                </a>
                                <a href="#" className="footer__social-link" aria-label="Instagram">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
                                        <path d="M14 9.917a4.083 4.083 0 1 0 0 8.166 4.083 4.083 0 0 0 0-8.166Zm0 6.733A2.653 2.653 0 1 1 14 11.35a2.653 2.653 0 0 1 0 5.3Zm5.197-6.9a.953.953 0 1 1-.953-.953.951.951 0 0 1 .953.953ZM22.75 14c0-1.207.011-2.403-.057-3.608-.068-1.399-.387-2.64-1.412-3.665-1.027-1.027-2.266-1.344-3.665-1.412-1.207-.068-2.403-.057-3.608-.057-1.207 0-2.403-.011-3.608.057-1.399.068-2.64.387-3.665 1.412C5.708 7.754 5.391 8.993 5.323 10.392 5.255 11.597 5.266 12.793 5.266 14c0 1.207-.011 2.405.057 3.608.068 1.399.387 2.64 1.412 3.665 1.027 1.027 2.266 1.344 3.665 1.412 1.207.068 2.403.057 3.608.057 1.207 0 2.403.011 3.608-.057 1.399-.068 2.64-.387 3.665-1.412 1.027-1.027 1.344-2.266 1.412-3.665.07-1.203.057-2.399.057-3.608Zm-1.71 5.142a2.695 2.695 0 0 1-1.518 1.518c-1.051.417-3.546.321-4.708.321-1.162 0-3.66.094-4.708-.323a2.695 2.695 0 0 1-1.518-1.518c-.417-1.049-.321-3.544-.321-4.706 0-1.162-.094-3.66.323-4.708a2.695 2.695 0 0 1 1.518-1.518c1.049-.417 3.544-.321 4.706-.321 1.162 0 3.66-.094 4.708.323a2.695 2.695 0 0 1 1.518 1.518c.417 1.049.321 3.544.321 4.706 0 1.162.096 3.66-.321 4.708Z" />
                                    </svg>
                                </a>
                                <a href="#" className="footer__social-link" aria-label="YouTube">
                                    <svg width="28" height="28" viewBox="0 0 28 28" fill="currentColor">
                                        <path d="M23.956 8.82a2.822 2.822 0 0 0-1.986-1.998C20.18 6.3 14 6.3 14 6.3s-6.18 0-7.97.522A2.822 2.822 0 0 0 4.044 8.82C3.522 10.61 3.522 14 3.522 14s0 3.39.522 5.18a2.822 2.822 0 0 0 1.986 1.998c1.79.522 7.97.522 7.97.522s6.18 0 7.97-.522a2.822 2.822 0 0 0 1.986-1.998c.522-1.79.522-5.18.522-5.18s0-3.39-.522-5.18ZM11.9 17.35v-6.7L17.5 14l-5.6 3.35Z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Link Columns */}
                        {footerColumns.map((col, i) => (
                            <div key={i} className="footer__column">
                                <h3 className="footer__column-title">{col.title}</h3>
                                <ul className="footer__column-list">
                                    {col.links.map((link, j) => (
                                        <li key={j}>
                                            <a href="#" className="footer__column-link">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Get App Column */}
                        <div className="footer__getapp">
                            <h3 className="footer__getapp-title">Get app</h3>
                            <div className="footer__getapp-buttons">
                                <a href="#" className="footer__store-btn" aria-label="App Store">
                                    <svg width="102" height="24" viewBox="0 0 102 24" fill="white">
                                        <text x="0" y="10" fontSize="7" fontFamily="Inter" fontWeight="300" fill="white">Download on the</text>
                                        <text x="0" y="21" fontSize="10" fontFamily="Inter" fontWeight="600" fill="white">App Store</text>
                                    </svg>
                                </a>
                                <a href="#" className="footer__store-btn" aria-label="Google Play">
                                    <svg width="102" height="24" viewBox="0 0 102 24" fill="white">
                                        <text x="0" y="10" fontSize="7" fontFamily="Inter" fontWeight="300" fill="white">GET IT ON</text>
                                        <text x="0" y="21" fontSize="10" fontFamily="Inter" fontWeight="600" fill="white">Google Play</text>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar (Figma: #EFF2F4 bg, border-top #DEE2E7) */}
            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <span className="footer__copyright">© 2023 Ecommerce.</span>
                    <div className="footer__lang-selector">
                        <img
                            src="/assets/Layout1/Image/flags/US@2x.png"
                            alt="US"
                            className="footer__lang-flag"
                        />
                        English
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 5l4-4 4 4" stroke="#1C1C1C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
