import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

/* ── Static data ── */
const heroCategories = [
    'Automobiles',
    'Clothes and wear',
    'Home interiors',
    'Computer and tech',
    'Tools, equipments',
    'Sports and outdoor',
    'Animal and pets',
    'Machinery tools',
    'More category',
]

const dealProducts = [
    { name: 'Smart watches', discount: '-25%', img: '/assets/Image/tech/image 34.png' },
    { name: 'Laptops', discount: '-15%', img: '/assets/Image/tech/image 29.png' },
    { name: 'GoPro cameras', discount: '-40%', img: '/assets/Image/tech/image 23.png' },
    { name: 'Headphones', discount: '-25%', img: '/assets/Image/tech/image 85.png' },
    { name: 'Canon cameras', discount: '-25%', img: '/assets/Image/tech/image 32.png' },
]

const homeOutdoorItems = [
    { name: 'Soft chairs', price: 'USD 19', img: '/assets/Image/interior/1.png' },
    { name: 'Sofa & chair', price: 'USD 19', img: '/assets/Image/interior/3.png' },
    { name: 'Kitchen dishes', price: 'USD 19', img: '/assets/Image/interior/6.png' },
    { name: 'Smart watches', price: 'USD 19', img: '/assets/Layout/alibaba/Image/interior/image 90.png' },
    { name: 'Kitchen mixer', price: 'USD 100', img: '/assets/Image/interior/7.png' },
    { name: 'Blenders', price: 'USD 39', img: '/assets/Image/interior/8.png' },
    { name: 'Home appliance', price: 'USD 19', img: '/assets/Image/interior/9.png' },
    { name: 'Coffee maker', price: 'USD 10', img: '/assets/Image/interior/image 89.png' },
]

const electronicsItems = [
    { name: 'Smart watches', price: 'USD 19', img: '/assets/Image/tech/image 34.png' },
    { name: 'Cameras', price: 'USD 89', img: '/assets/Image/tech/image 23.png' },
    { name: 'Headphones', price: 'USD 10', img: '/assets/Image/tech/image 85.png' },
    { name: 'Smart watches', price: 'USD 90', img: '/assets/Image/tech/image 33.png' },
    { name: 'Gaming set', price: 'USD 35', img: '/assets/Image/tech/8.png' },
    { name: 'Laptops & PC', price: 'USD 340', img: '/assets/Image/tech/image 29.png' },
    { name: 'Smartphones', price: 'USD 19', img: '/assets/Image/tech/6.png' },
    { name: 'Electric kattle', price: 'USD 240', img: '/assets/Image/tech/image 32.png' },
]

const recommendedItems = [
    { price: '$10.30', name: 'T-shirts with multiple colors, for men', img: '/assets/Layout/alibaba/Image/cloth/Bitmap.png' },
    { price: '$10.30', name: 'Jeans shorts for men blue color', img: '/assets/Layout/alibaba/Image/cloth/image 24.png' },
    { price: '$12.50', name: 'Brown winter coat medium size', img: '/assets/Layout/alibaba/Image/cloth/image 30.png' },
    { price: '$34.00', name: 'Jeans bag for travel for men', img: '/assets/Layout/alibaba/Image/cloth/image 26.png' },
    { price: '$99.00', name: 'Leather wallet', img: '/assets/Layout/alibaba/Image/cloth/Bitmap (2).png' },
    { price: '$9.99', name: 'Canon camera black, 100x zoom', img: '/assets/Image/tech/image 23.png' },
    { price: '$8.99', name: 'Headset for gaming with mic', img: '/assets/Image/tech/image 85.png' },
    { price: '$13.30', name: 'Smartwatch silver color modern', img: '/assets/Image/tech/image 34.png' },
    { price: '$10.30', name: 'Blue wallet for men leather', img: '/assets/Layout/alibaba/Image/cloth/2 1.png' },
    { price: '$80.95', name: 'Jeans bag for travel for men', img: '/assets/Image/tech/image 29.png' },
]

const extraServices = [
    {
        title: 'Source from\nIndustry Hubs',
        img: '/assets/Image/backgrounds/Mask group.png',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    {
        title: 'Customize Your\nProducts',
        img: '/assets/Image/backgrounds/Mask group (1).png',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        title: 'Fast, reliable shipping\nby ocean or air',
        img: '/assets/Image/backgrounds/image 106.png',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                <path d="M22 2L11 13" /><polygon points="22,2 15,22 11,13 2,9" />
            </svg>
        ),
    },
    {
        title: 'Product monitoring\nand inspection',
        img: '/assets/Image/backgrounds/image 107.png',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C1C1C" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
    },
]

const supplierRegions = [
    { flag: '/assets/Layout1/Image/flags/AE@2x.png', country: 'Arabic Emirates', site: 'shopname.ae' },
    { flag: '/assets/Layout1/Image/flags/US@2x.png', country: 'Australia', site: 'shopname.ae' },
    { flag: '/assets/Layout1/Image/flags/US@2x.png', country: 'United States', site: 'shopname.us' },
    { flag: '/assets/Layout1/Image/flags/RU@2x.png', country: 'Russia', site: 'shopname.ru' },
    { flag: '/assets/Layout1/Image/flags/IT@2x.png', country: 'Italy', site: 'shopname.it' },
    { flag: '/assets/Layout1/Image/flags/DK@2x.png', country: 'Denmark', site: 'shopname.dk' },
    { flag: '/assets/Layout1/Image/flags/FR@2x.png', country: 'France', site: 'shopname.fr' },
    { flag: '/assets/Layout1/Image/flags/CN@2x.png', country: 'China', site: 'shopname.cn' },
    { flag: '/assets/Layout1/Image/flags/GB@2x.png', country: 'Great Britain', site: 'shopname.uk' },
]

/* ── Countdown Timer Hook ── */
function useCountdown() {
    const [time, setTime] = useState({ days: 4, hours: 13, min: 56, sec: 23 })
    useEffect(() => {
        const id = setInterval(() => {
            setTime(prev => {
                let { days, hours, min, sec } = prev
                sec--
                if (sec < 0) { sec = 59; min-- }
                if (min < 0) { min = 59; hours-- }
                if (hours < 0) { hours = 23; days-- }
                if (days < 0) return { days: 0, hours: 0, min: 0, sec: 0 }
                return { days, hours, min, sec }
            })
        }, 1000)
        return () => clearInterval(id)
    }, [])
    return time
}

/* ── Main Component ── */
const Home = () => {
    const countdown = useCountdown()
    const [email, setEmail] = useState('')

    return (
        <div className="home">
            {/* ====== 1. HERO SECTION ====== */}
            <section className="hero">
                <div className="container hero__inner">
                    {/* Left — Category sidebar */}
                    <aside className="hero__sidebar">
                        <ul className="hero__cat-list">
                            {heroCategories.map((cat, i) => (
                                <li key={i}>
                                    <a href="#" className="hero__cat-link">{cat}</a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Center — Banner */}
                    <div className="hero__banner">
                        <div className="hero__banner-content">
                            <span className="hero__banner-label">Latest trending</span>
                            <h2 className="hero__banner-title">Electronic items</h2>
                            <a href="#" className="hero__banner-btn">Learn more</a>
                        </div>
                        <img
                            src="/assets/Image/backgrounds/Banner-board-800x420 2.png"
                            alt="Electronics banner"
                            className="hero__banner-img"
                        />
                    </div>

                    {/* Right — User & Promo cards */}
                    <aside className="hero__right">
                        <div className="hero__user-card">
                            <div className="hero__user-row">
                                <img src="/assets/Image/profile-avatar.png" alt="User avatar" className="hero__user-avatar" />
                                <span className="hero__user-greeting">Hi, user<br />let's get started</span>
                            </div>
                            <a href="#" className="hero__user-btn hero__user-btn--join">Join now</a>
                            <a href="#" className="hero__user-btn hero__user-btn--login">Log in</a>
                        </div>
                        <div className="hero__promo hero__promo--orange">
                            Get US $10 off with a new supplier
                        </div>
                        <div className="hero__promo hero__promo--teal">
                            Send quotes with supplier preferences
                        </div>
                    </aside>
                </div>
            </section>

            {/* ====== 2. DEALS & OFFERS ====== */}
            <section className="deals">
                <div className="container deals__inner">
                    <div className="deals__info">
                        <h3 className="deals__title">Deals and offers</h3>
                        <p className="deals__subtitle">Hygiene equipments</p>
                        <div className="deals__timer">
                            {Object.entries(countdown).map(([label, val]) => (
                                <div key={label} className="deals__timer-box">
                                    <span className="deals__timer-val">{String(val).padStart(2, '0')}</span>
                                    <span className="deals__timer-label">{label === 'min' ? 'Min' : label === 'sec' ? 'Sec' : label.charAt(0).toUpperCase() + label.slice(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {dealProducts.map((item, i) => (
                        <div key={i} className="deals__card">
                            <div className="deals__card-img-wrap">
                                <img src={item.img} alt={item.name} className="deals__card-img" />
                            </div>
                            <span className="deals__card-name">{item.name}</span>
                            <span className="deals__card-badge">{item.discount}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ====== 3. HOME AND OUTDOOR ====== */}
            <section className="category-panel">
                <div className="container category-panel__inner">
                    <div className="category-panel__banner category-panel__banner--green">
                        <img src="/assets/Image/backgrounds/Group 969.png" alt="" className="category-panel__banner-bg" />
                        <div className="category-panel__banner-overlay">
                            <h3 className="category-panel__banner-title">Home and<br />outdoor</h3>
                            <a href="#" className="category-panel__banner-btn">Source now</a>
                        </div>
                    </div>
                    <div className="category-panel__grid">
                        {homeOutdoorItems.map((item, i) => (
                            <div key={i} className="category-panel__item">
                                <div className="category-panel__item-info">
                                    <span className="category-panel__item-name">{item.name}</span>
                                    <span className="category-panel__item-price">From<br />{item.price}</span>
                                </div>
                                <img src={item.img} alt={item.name} className="category-panel__item-img" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== 4. CONSUMER ELECTRONICS ====== */}
            <section className="category-panel">
                <div className="container category-panel__inner">
                    <div className="category-panel__banner category-panel__banner--blue">
                        <img src="/assets/Image/backgrounds/image 98.png" alt="" className="category-panel__banner-bg" />
                        <div className="category-panel__banner-overlay">
                            <h3 className="category-panel__banner-title">Consumer<br />electronics and<br />gadgets</h3>
                            <a href="#" className="category-panel__banner-btn">Source now</a>
                        </div>
                    </div>
                    <div className="category-panel__grid">
                        {electronicsItems.map((item, i) => (
                            <div key={i} className="category-panel__item">
                                <div className="category-panel__item-info">
                                    <span className="category-panel__item-name">{item.name}</span>
                                    <span className="category-panel__item-price">From<br />{item.price}</span>
                                </div>
                                <img src={item.img} alt={item.name} className="category-panel__item-img" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== 5. INQUIRY / SEND REQUEST ====== */}
            <section className="inquiry">
                <div className="container inquiry__inner">
                    <img src="/assets/Image/backgrounds/Group 982.png" alt="" className="inquiry__bg-img" />
                    <div className="inquiry__left">
                        <h3 className="inquiry__title">An easy way to send<br />requests to all suppliers</h3>
                        <p className="inquiry__desc">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt.
                        </p>
                    </div>
                    <div className="inquiry__form-card">
                        <h4 className="inquiry__form-title">Send quote to suppliers</h4>
                        <input type="text" className="inquiry__input" placeholder="What item you need?" />
                        <textarea className="inquiry__textarea" placeholder="Type more details" rows={3} />
                        <div className="inquiry__row">
                            <input type="number" className="inquiry__input inquiry__input--qty" placeholder="Quantity" min="1" />
                            <select className="inquiry__select">
                                <option>Pcs</option>
                                <option>Kg</option>
                                <option>Liters</option>
                                <option>Sets</option>
                            </select>
                        </div>
                        <button className="inquiry__submit">Send inquiry</button>
                    </div>
                </div>
            </section>

            {/* ====== 6. RECOMMENDED ITEMS ====== */}
            <section className="recommended">
                <div className="container">
                    <h3 className="recommended__title">Recommended items</h3>
                    <div className="recommended__grid">
                        {recommendedItems.map((item, i) => (
                            <Link to="/products" key={i} className="recommended__card">
                                <div className="recommended__card-img-wrap">
                                    <img src={item.img} alt={item.name} className="recommended__card-img" />
                                </div>
                                <div className="recommended__card-info">
                                    <span className="recommended__card-price">{item.price}</span>
                                    <span className="recommended__card-name">{item.name}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== 7. OUR EXTRA SERVICES ====== */}
            <section className="extra-services">
                <div className="container">
                    <h3 className="extra-services__title">Our extra services</h3>
                    <div className="extra-services__grid">
                        {extraServices.map((svc, i) => (
                            <div key={i} className="extra-services__card">
                                <div className="extra-services__card-img-wrap">
                                    <img src={svc.img} alt={svc.title} className="extra-services__card-img" />
                                    <div className="extra-services__card-icon">{svc.icon}</div>
                                </div>
                                <div className="extra-services__card-body">
                                    <span className="extra-services__card-title">{svc.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== 8. SUPPLIERS BY REGION ====== */}
            <section className="suppliers">
                <div className="container">
                    <h3 className="suppliers__title">Suppliers by region</h3>
                    <div className="suppliers__grid">
                        {supplierRegions.map((s, i) => (
                            <div key={i} className="suppliers__region">
                                <img src={s.flag} alt={s.country} className="suppliers__flag" />
                                <div className="suppliers__region-info">
                                    <span className="suppliers__country">{s.country}</span>
                                    <span className="suppliers__site">{s.site}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ====== 9. NEWSLETTER ====== */}
            <section className="newsletter">
                <div className="container newsletter__inner">
                    <h3 className="newsletter__title">Subscribe on our newsletter</h3>
                    <p className="newsletter__desc">Get daily news on upcoming offers from many suppliers all over the world</p>
                    <form className="newsletter__form" onSubmit={e => { e.preventDefault(); setEmail('') }}>
                        <div className="newsletter__input-wrap">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B96A5" strokeWidth="1.5">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input
                                type="email"
                                className="newsletter__input"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="newsletter__btn">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Home
