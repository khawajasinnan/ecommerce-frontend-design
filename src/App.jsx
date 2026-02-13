import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <div className="container">
                    <div className="main-content__placeholder">
                        <h1>Welcome to Brand Marketplace</h1>
                        <p>
                            This is the homepage layout. Content sections (hero banner,
                            product grids, deals, newsletter, etc.) will be added in the
                            upcoming weeks.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default App
