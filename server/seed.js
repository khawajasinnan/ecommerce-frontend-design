import pool from './db.js'

async function seed() {
    const client = await pool.connect()
    try {
        console.log('🗄️  Creating tables...')

        await client.query(`
      DROP TABLE IF EXISTS cart_items CASCADE;
      DROP TABLE IF EXISTS reviews CASCADE;
      DROP TABLE IF EXISTS products CASCADE;

      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        img VARCHAR(500) NOT NULL,
        images TEXT[] DEFAULT '{}',
        price DECIMAL(10,2) NOT NULL,
        old_price DECIMAL(10,2),
        rating DECIMAL(2,1) DEFAULT 0,
        orders INTEGER DEFAULT 0,
        shipping VARCHAR(100) DEFAULT 'Free Shipping',
        description TEXT,
        category VARCHAR(100),
        brand VARCHAR(100),
        features TEXT[] DEFAULT '{}',
        condition VARCHAR(50) DEFAULT 'Brand new',
        in_stock BOOLEAN DEFAULT true,
        specs JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        author VARCHAR(100) NOT NULL,
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE cart_items (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `)

        console.log('📦 Seeding products...')

        const products = [
            {
                name: 'Canon Camera EOS 2000, Black 10x zoom',
                slug: 'canon-camera-eos-2000',
                img: '/assets/Image/tech/image 23.png',
                images: ['/assets/Image/tech/image 23.png', '/assets/Image/tech/image 32.png', '/assets/Image/tech/image 29.png', '/assets/Image/tech/image 34.png', '/assets/Image/tech/image 85.png', '/assets/Image/tech/image 33.png'],
                price: 998.00, oldPrice: 1128.00, rating: 4.0, orders: 154,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                category: 'Electronics', brand: 'Samsung',
                features: ['Metallic', '8GB Ram'],
                condition: 'Brand new',
                specs: { Model: '#8786867', Color: 'Shown in picture', Size: '34mm x 450mm x 19mm', Material: 'Aluminium', Memory: '36GB RAM' },
            },
            {
                name: 'GoPro HERO6 4K Action Camera - Black',
                slug: 'gopro-hero6-4k-action-camera',
                img: '/assets/Image/tech/image 32.png',
                images: ['/assets/Image/tech/image 32.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 29.png', '/assets/Image/tech/image 34.png'],
                price: 998.00, oldPrice: 1128.00, rating: 5.0, orders: 154,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.',
                category: 'Electronics', brand: 'Pocco',
                features: ['Plastic cover', 'Super power'],
                condition: 'Brand new',
                specs: { Model: '#4578631', Color: 'Black', Size: '62mm x 45mm x 33mm', Material: 'Plastic', Memory: '4GB' },
            },
            {
                name: 'Lenovo Laptop IdeaPad 15.6" Full HD',
                slug: 'lenovo-laptop-ideapad',
                img: '/assets/Image/tech/image 29.png',
                images: ['/assets/Image/tech/image 29.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 32.png'],
                price: 998.00, oldPrice: null, rating: 4.0, orders: 154,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                category: 'Modern tech', brand: 'Lenovo',
                features: ['Metallic', '8GB Ram'],
                condition: 'Brand new',
                specs: { Model: '#LEN7721', Color: 'Silver', Size: '15.6 inch', Material: 'Aluminium', Memory: '8GB RAM' },
            },
            {
                name: 'T-shirts with multiple colors, for men and lady',
                slug: 't-shirts-multiple-colors',
                img: '/assets/Layout/alibaba/Image/cloth/Bitmap.png',
                images: ['/assets/Layout/alibaba/Image/cloth/Bitmap.png', '/assets/Layout/alibaba/Image/cloth/image 24.png', '/assets/Layout/alibaba/Image/cloth/image 30.png'],
                price: 10.30, oldPrice: 12.50, rating: 4.0, orders: 250,
                description: 'Size: medium, Color: blue, Material: Jeans. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor.',
                category: 'Mobile accessory', brand: 'Samsung',
                features: ['Plastic cover'],
                condition: 'Brand new',
                specs: { Model: '#TSH4421', Color: 'Blue, Red, Green', Size: 'Medium', Material: 'Cotton' },
            },
            {
                name: 'Apple AirPods Pro with noise cancellation',
                slug: 'apple-airpods-pro',
                img: '/assets/Layout/alibaba/Image/cloth/image 24.png',
                images: ['/assets/Layout/alibaba/Image/cloth/image 24.png', '/assets/Image/tech/image 33.png', '/assets/Image/tech/image 34.png'],
                price: 249.00, oldPrice: 299.00, rating: 5.0, orders: 320,
                description: 'Premium wireless earphones with active noise cancellation, transparency mode, and spatial audio.',
                category: 'Mobile accessory', brand: 'Apple',
                features: ['PVC Leather'],
                condition: 'Refurbished',
                specs: { Model: '#APP2241', Color: 'White', Size: 'One size', Material: 'Silicone', Battery: '6 hours' },
            },
            {
                name: 'Huawei MatePad Pro 10.8" tablet',
                slug: 'huawei-matepad-pro',
                img: '/assets/Layout/alibaba/Image/cloth/image 30.png',
                images: ['/assets/Layout/alibaba/Image/cloth/image 30.png', '/assets/Image/tech/image 29.png'],
                price: 12.50, oldPrice: null, rating: 5.0, orders: 120,
                description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.',
                category: 'Smartphones', brand: 'Huawei',
                features: ['PVC Leather', 'Plastic cover'],
                condition: 'Brand new',
                specs: { Model: '#HW10823', Color: 'Gray', Size: '10.8 inch', Material: 'Metal + Glass', Memory: '6GB RAM' },
            },
            {
                name: 'Samsung Gaming Headset with mic pro',
                slug: 'samsung-gaming-headset',
                img: '/assets/Image/tech/image 85.png',
                images: ['/assets/Image/tech/image 85.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 34.png'],
                price: 8.99, oldPrice: 12.00, rating: 3.0, orders: 86,
                description: 'Professional gaming headset with noise-cancelling microphone, surround sound.',
                category: 'Electronics', brand: 'Samsung',
                features: ['Plastic cover', 'Super power'],
                condition: 'Refurbished',
                specs: { Model: '#SMH5567', Color: 'Black', Size: 'Adjustable', Material: 'Plastic', Connectivity: 'USB + 3.5mm' },
            },
            {
                name: 'Apple Watch Series 7, silver color',
                slug: 'apple-watch-series-7',
                img: '/assets/Image/tech/image 34.png',
                images: ['/assets/Image/tech/image 34.png', '/assets/Image/tech/image 33.png', '/assets/Image/tech/image 23.png'],
                price: 399.00, oldPrice: null, rating: 4.0, orders: 200,
                description: 'Always-on Retina display, blood oxygen sensor, ECG app, water resistant.',
                category: 'Modern tech', brand: 'Apple',
                features: ['Metallic', 'Super power'],
                condition: 'Brand new',
                specs: { Model: '#AW7441', Color: 'Silver', Size: '41mm', Material: 'Aluminium', Battery: '18 hours' },
            },
            {
                name: 'Huawei Leather wallet brown color',
                slug: 'huawei-leather-wallet',
                img: '/assets/Layout/alibaba/Image/cloth/Bitmap (2).png',
                images: ['/assets/Layout/alibaba/Image/cloth/Bitmap (2).png', '/assets/Layout/alibaba/Image/cloth/image 24.png'],
                price: 99.00, oldPrice: 120.00, rating: 2.0, orders: 50,
                description: 'Premium leather wallet with multiple card slots and bill compartment.',
                category: 'Mobile accessory', brand: 'Huawei',
                features: ['PVC Leather'],
                condition: 'Old items',
                specs: { Model: '#HWL9987', Color: 'Brown', Size: '11cm x 9cm', Material: 'Genuine Leather' },
            },
            {
                name: 'Pocco X5 Pro 5G Smartphone 128GB',
                slug: 'pocco-x5-pro-5g',
                img: '/assets/Image/tech/6.png',
                images: ['/assets/Image/tech/6.png', '/assets/Image/tech/image 23.png', '/assets/Image/tech/image 32.png'],
                price: 299.00, oldPrice: 349.00, rating: 4.0, orders: 180,
                description: 'Pocco X5 Pro with 5G connectivity, 128GB storage, AMOLED display.',
                category: 'Smartphones', brand: 'Pocco',
                features: ['Metallic', '8GB Ram'],
                condition: 'Brand new',
                specs: { Model: '#PX5128', Color: 'Blue', Size: '6.67 inch', Material: 'Glass', Memory: '8GB RAM', Storage: '128GB' },
            },
            {
                name: 'Lenovo ThinkPad Gaming Mouse',
                slug: 'lenovo-thinkpad-gaming-mouse',
                img: '/assets/Image/tech/image 86.png',
                images: ['/assets/Image/tech/image 86.png', '/assets/Image/tech/image 85.png'],
                price: 25.50, oldPrice: null, rating: 3.0, orders: 95,
                description: 'Ergonomic gaming mouse with 6 programmable buttons and RGB lighting.',
                category: 'Electronics', brand: 'Lenovo',
                features: ['Plastic cover', 'Super power'],
                condition: 'Refurbished',
                specs: { Model: '#LGM3345', Color: 'Black', Size: '125mm x 68mm', Material: 'Plastic', DPI: '16000' },
            },
            {
                name: 'Samsung Galaxy Buds Pro wireless',
                slug: 'samsung-galaxy-buds-pro',
                img: '/assets/Image/tech/image 33.png',
                images: ['/assets/Image/tech/image 33.png', '/assets/Image/tech/image 34.png', '/assets/Image/tech/image 85.png'],
                price: 179.00, oldPrice: 199.00, rating: 5.0, orders: 410,
                description: 'Premium wireless earbuds with active noise cancellation and 360 audio.',
                category: 'Mobile accessory', brand: 'Samsung',
                features: ['Metallic', 'Super power'],
                condition: 'Brand new',
                specs: { Model: '#SGB2241', Color: 'Phantom Violet', Size: 'One size', Material: 'Plastic', Battery: '5 hours' },
            },
        ]

        for (const p of products) {
            await client.query(
                `INSERT INTO products (name, slug, img, images, price, old_price, rating, orders, description, category, brand, features, condition, specs)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
                [p.name, p.slug, p.img, p.images, p.price, p.oldPrice, p.rating, p.orders, p.description, p.category, p.brand, p.features, p.condition, JSON.stringify(p.specs)]
            )
        }

        console.log('⭐ Seeding reviews...')

        const reviewData = [
            { product_id: 1, author: 'Ahmed K.', rating: 5, comment: 'Great camera for beginners. Excellent image quality!' },
            { product_id: 1, author: 'Sara M.', rating: 4, comment: 'Good value for the price. Lightweight and easy to use.' },
            { product_id: 1, author: 'John D.', rating: 4, comment: 'Perfect for travel photography.' },
            { product_id: 2, author: 'Mike R.', rating: 5, comment: 'Amazing action camera! 4K quality is stunning.' },
            { product_id: 2, author: 'Lisa T.', rating: 5, comment: 'Waterproof and durable. Perfect for outdoor sports.' },
            { product_id: 5, author: 'David W.', rating: 5, comment: 'Best noise cancellation I have ever used.' },
            { product_id: 5, author: 'Emma S.', rating: 5, comment: 'Sound quality is incredible. Worth every penny.' },
            { product_id: 8, author: 'Alex P.', rating: 4, comment: 'Beautiful watch with great health tracking features.' },
            { product_id: 8, author: 'Rachel N.', rating: 4, comment: 'Battery life could be better but overall excellent.' },
            { product_id: 12, author: 'Omar H.', rating: 5, comment: 'Crystal clear audio and comfortable fit.' },
            { product_id: 12, author: 'Nina L.', rating: 5, comment: 'ANC works beautifully. Best purchase this year.' },
            { product_id: 10, author: 'Hassan A.', rating: 4, comment: 'Great phone for the price. Fast 5G and smooth display.' },
        ]

        for (const r of reviewData) {
            await client.query(
                'INSERT INTO reviews (product_id, author, rating, comment) VALUES ($1, $2, $3, $4)',
                [r.product_id, r.author, r.rating, r.comment]
            )
        }

        console.log('✅ Database seeded successfully!')
        console.log('   - 12 products')
        console.log('   - 12 reviews')
        console.log('   - Cart table ready')

    } catch (err) {
        console.error('❌ Seed failed:', err.message)
        throw err
    } finally {
        client.release()
        await pool.end()
    }
}

seed()
