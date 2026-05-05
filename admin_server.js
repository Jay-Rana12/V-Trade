const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
const ADMIN_PUBLIC_DIR = path.resolve(__dirname, 'admin/public');
app.use('/public/uploads/blogs', express.static(path.join(ADMIN_PUBLIC_DIR, 'uploads/blogs')));
app.use('/uploads/blogs', express.static(path.join(ADMIN_PUBLIC_DIR, 'uploads/blogs')));
app.use('/public', express.static(ADMIN_PUBLIC_DIR));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'admin', 'assets')));
app.use('/assets', express.static(path.join(__dirname, 'admin', 'public', 'assets')));
app.get('/api/ping', (req, res) => res.json({ status: 'ok', version: '1.4-v1-BLOG-SYNC', time: new Date().toISOString() }));

// --- LOCATIONS API ---
app.get('/api/locations', async (req, res) => {
    try {
        // Return a curated list of major Indian industrial hubs
        // This resolves the 404 in the frontend and provides immediate value
        const locations = [
            "Mumbai", "Delhi", "Ahmedabad", "Rajkot", "Morbi", 
            "Chennai", "Kolkata", "Pune", "Bangalore", "Hyderabad",
            "Surat", "Indore", "Jaipur", "Ludhiana", "Noida", "Gurgaon"
        ].sort();
        res.json({ status: 'success', data: locations });
    } catch (err) {
        console.error('Locations API error:', err);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
});

// --- FILE UPLOAD CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const url = `http://localhost:5001/uploads/${req.file.filename}`;
    res.json({ url });
});

// --- PROFESSIONAL DATABASE CONNECTION ---
// Using exact database name as requested: u728463759_Vitrade
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'u728463759_Vitrade'
};

const pool = mysql.createPool(dbConfig);

// Helper for Database Interaction
async function query(sql, params) {
    try {
        // Use pool.query instead of execute for better handling of LIMIT params and simpler syntax
        const [results] = await pool.query(sql, params);
        return results;
    } catch (err) {
        console.error('❌ DATABASE ERROR:', err.message, '| SQL:', sql);
        throw err;
    }
}

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString(), database: dbConfig.database });
});

// BRANDS


app.get('/api/brands', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        const hasLogo = req.query.hasLogo === 'true';
        const hasWebsite = req.query.hasWebsite === 'true';

        const categoryId = req.query.categoryId || '';
        const categories = req.query.categories || '';
        
        let sql = '';
        let countSql = '';
        let params = [];
        let whereClauses = [];

        // Strict category filtering logic
        const hasCategories = (categories && categories.trim() !== '' && categories !== 'all');
        const hasCategoryId = (categoryId && categoryId.trim() !== '' && categoryId !== 'all' && categoryId !== 'undefined' && categoryId !== 'null');

        if (hasCategories || hasCategoryId) {
            sql = 'SELECT DISTINCT b.* FROM app_brands b INNER JOIN app_products p ON b.id = p.brand_id';
            countSql = 'SELECT COUNT(DISTINCT b.id) as total FROM app_brands b INNER JOIN app_products p ON b.id = p.brand_id';
            
            if (hasCategories) {
                const catArray = categories.split(',').filter(c => c.trim() !== '');
                if (catArray.length > 0) {
                    const placeholders = catArray.map(() => '?').join(',');
                    whereClauses.push(`p.category_id IN (${placeholders})`);
                    params.push(...catArray);
                }
            } else {
                whereClauses.push('p.category_id = ?');
                params.push(categoryId);
            }
        } else {
            sql = 'SELECT * FROM app_brands b';
            countSql = 'SELECT COUNT(*) as total FROM app_brands b';
        }

        if (search) {
            whereClauses.push('b.company_name LIKE ?');
            params.push(`%${search}%`);
        }

        if (hasLogo) whereClauses.push('b.logo_path IS NOT NULL AND b.logo_path != ""');
        if (hasWebsite) whereClauses.push('b.website_url IS NOT NULL AND b.website_url != ""');

        if (whereClauses.length > 0) {
            const whereStr = ' WHERE ' + whereClauses.join(' AND ');
            sql += whereStr;
            countSql += whereStr;
        }

        // Always order by company_name for better UX in dropdowns
        sql += ' ORDER BY b.company_name ASC LIMIT ? OFFSET ?';

        // Log for debugging
        const logMsg = `[${new Date().toISOString()}] BRANDS_API: SQL="${sql}" PARAMS=${JSON.stringify([...params, limit, offset])}\n`;
        fs.appendFileSync(path.join(__dirname, 'logs', 'query_log.txt'), logMsg);

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        const mapped = items.map(b => ({
            id: b.id,
            name: b.company_name,
            email: b.contact_email,
            phone: b.contact_phone,
            whatsapp: b.whatsapp_number,
            gst: b.gst,
            website: b.website_url,
            address: b.address,
            about: b.about,
            fb: b.facebook_url,
            insta: b.instagram_url,
            twitter: b.twitter_url,
            linkedin: b.linkedin_url,
            logo: b.logo_path
        }));

        res.json({
            data: mapped,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: `Database Fetch Error: ${err.message}` });
    }
});

// BULK BRANDS IMPORT
app.post('/api/brands/bulk', async (req, res) => {
    try {
        const { brands } = req.body;
        if (!Array.isArray(brands)) return res.status(400).json({ error: 'Invalid data format' });

        for (const b of brands) {
            let id = b.id;
            let exists = false;
            if (id) {
                const check = await query('SELECT id FROM app_brands WHERE id = ?', [id]);
                if (check.length > 0) exists = true;
            }

            if (exists) {
                const sql = `UPDATE app_brands SET 
                             company_name=?, email=?, phone=?, 
                             whatsapp=?, gst_number=?, website_url=?, 
                             address=?, about_company=?, facebook_url=?, instagram_url=?
                             WHERE id = ?`;
                await query(sql, [
                    b.name || b.company_name, b.email, b.phone,
                    b.whatsapp, b.gst || b.gst_number, b.website || b.website_url,
                    b.address, b.about || b.about_company, b.fb || b.facebook_url, b.insta || b.instagram_url,
                    id
                ]);
            } else {
                if (!id) id = Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
                const sql = `INSERT INTO app_brands (id, company_name, email, phone, whatsapp, gst_number, website_url, address, about_company, facebook_url, instagram_url) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                await query(sql, [
                    id, b.name || b.company_name, b.email, b.phone,
                    b.whatsapp, b.gst || b.gst_number, b.website || b.website_url,
                    b.address, b.about || b.about_company, b.fb || b.facebook_url, b.insta || b.instagram_url
                ]);
            }
        }
        res.json({ success: true, count: brands.length });
    } catch (err) {
        console.error('Bulk Brands API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/brands', async (req, res) => {
    try {
        const b = req.body;
        let id = b.id;

        // Check if brand exists to decide between INSERT or UPDATE
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_brands WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            // PERFORM UPDATE
            const sql = `UPDATE app_brands SET 
                         company_name=?, contact_email=?, contact_phone=?, 
                         whatsapp_number=?, gst=?, website_url=?, 
                         address=?, about=?, facebook_url=?, 
                         instagram_url=?, twitter_url=?, linkedin_url=?,
                         logo_path=?
                         WHERE id = ?`;
            await query(sql, [b.name, b.email, b.phone, b.whatsapp, b.gst, b.website, b.address, b.about, b.fb, b.insta, b.twitter, b.linkedin, b.logo, id]);
        } else {
            // PERFORM INSERT
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_brands', []);
                id = (parseInt(rows[0].maxId || 0) + 1).toString();
            }
            const sql = `INSERT INTO app_brands (id, company_name, contact_email, contact_phone, whatsapp_number, gst, website_url, address, about, facebook_url, instagram_url, twitter_url, linkedin_url, logo_path) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await query(sql, [id, b.name, b.email, b.phone, b.whatsapp, b.gst, b.website, b.address, b.about, b.fb, b.insta, b.twitter, b.linkedin, b.logo]);
        }

        res.json({ success: true, brand: { ...b, id } });
    } catch (err) {
        console.error('Save Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/brands/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_brands WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PRODUCTS
app.get('/api/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const categoryId = req.query.categoryId || '';
        const categories = req.query.categories || '';
        const brandId = req.query.brandId || '';
        const brands = req.query.brands || '';
        const maxPrice = req.query.maxPrice || '';
        const search = req.query.search || '';
        const location = req.query.location || '';
        const tag = req.query.tag || '';
        const materialGrade = req.query.materialGrade || '';
        const size = req.query.size || '';
        const pieces = req.query.pieces || '';
        
        let sql = 'SELECT p.*, b.company_name as brand_name, b.address as brand_address, b.logo_path as brand_logo, c.name as category_name FROM app_products p LEFT JOIN app_brands b ON p.brand_id = b.id LEFT JOIN app_categories c ON p.category_id = c.id';
        let countSql = 'SELECT COUNT(*) as total FROM app_products p LEFT JOIN app_brands b ON p.brand_id = b.id LEFT JOIN app_categories c ON p.category_id = c.id';
        let params = [];
        let whereClauses = [];

        const cleanSearch = (search || '').toString().trim();
        if (cleanSearch && cleanSearch !== 'undefined' && cleanSearch !== 'null') {
            const isId = !isNaN(parseInt(cleanSearch)) && cleanSearch.match(/^\d+$/);
            if (isId) {
                whereClauses.push('(p.id = ? OR p.name LIKE ? OR p.material LIKE ? OR p.tags LIKE ? OR p.description LIKE ?)');
                params.push(parseInt(cleanSearch), `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`);
            } else {
                whereClauses.push('(p.name LIKE ? OR p.material LIKE ? OR p.tags LIKE ? OR p.description LIKE ?)');
                params.push(`%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`);
            }
        }

        // Multiple Categories Support
        if (categories) {
            const catArray = categories.split(',').filter(c => c.trim() !== '');
            if (catArray.length > 0) {
                const placeholders = catArray.map(() => '?').join(',');
                whereClauses.push(`p.category_id IN (${placeholders})`);
                params.push(...catArray);
            }
        } else if (categoryId && categoryId !== '' && categoryId !== 'all' && categoryId !== 'undefined' && categoryId !== 'null') {
            whereClauses.push('p.category_id = ?');
            params.push(categoryId);
        }

        // Multiple Brands Support
        if (brands) {
            const brandArray = brands.split(',').filter(b => b.trim() !== '');
            if (brandArray.length > 0) {
                const placeholders = brandArray.map(() => '?').join(',');
                whereClauses.push(`p.brand_id IN (${placeholders})`);
                params.push(...brandArray);
            }
        } else if (brandId && brandId !== '' && brandId !== 'all' && brandId !== 'undefined' && brandId !== 'null') {
            whereClauses.push('p.brand_id = ?');
            params.push(brandId);
        }

        // Location Filter
        if (location && location !== '' && location !== 'all') {
            whereClauses.push('b.address LIKE ?');
            params.push(`%${location}%`);
        }

        // Price Filter
        if (maxPrice && !isNaN(parseInt(maxPrice))) {
            whereClauses.push('p.price <= ?');
            params.push(parseInt(maxPrice));
        }

        // Tag Filter (Checks both tags and top_category for maximum compatibility)
        if (tag && tag !== '' && tag !== 'all') {
            whereClauses.push('(p.tags LIKE ? OR p.top_category LIKE ?)');
            params.push(`%${tag}%`, `%${tag}%`);
        }
        
        // Material Grade Filter
        if (materialGrade && materialGrade !== '' && materialGrade !== 'all') {
            whereClauses.push('(p.material LIKE ? OR p.specifications LIKE ?)');
            params.push(`%${materialGrade}%`, `%${materialGrade}%`);
        }

        // Available Sizes Filter
        if (size && size !== '' && size !== 'all') {
            whereClauses.push('(p.size LIKE ? OR p.specifications LIKE ?)');
            params.push(`%${size}%`, `%${size}%`);
        }
        
        // No of Pieces Filter
        if (pieces && pieces !== '' && pieces !== 'all') {
            // "pieces" might map to unit, min_order_qty, or specifications depending on DB population
            whereClauses.push('(p.unit LIKE ? OR p.specifications LIKE ? OR p.name LIKE ?)');
            params.push(`%${pieces}%`, `%${pieces}%`, `%${pieces}%`);
        }

        if (whereClauses.length > 0) {
            const whereStr = ' WHERE ' + whereClauses.join(' AND ');
            sql += whereStr;
            countSql += whereStr;
        }

        sql += ' ORDER BY p.id DESC LIMIT ? OFFSET ?';

        const logEntry = `[${new Date().toISOString()}] PRODUCTS_API: SQL="${sql}" PARAMS=${JSON.stringify([...params, limit, offset])}\n`;
        fs.appendFileSync(path.join(__dirname, 'logs', 'query_log.txt'), logEntry);
        console.log(`[PRODUCTS_API] SQL: ${sql}`);
        console.log(`[PRODUCTS_API] Params:`, params);

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        // Map to match frontend expectations
        const mapped = items.map(p => ({
            ...p,
            image: p.image_path,
            specs: p.specifications,
            notes: p.additional_notes,
            stock: p.quantity // Map quantity to stock for Products.jsx
        }));

        res.json({
            data: mapped,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        console.error('Products API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// BULK PRODUCTS IMPORT
app.post('/api/products/bulk', async (req, res) => {
    try {
        const { products } = req.body;
        if (!Array.isArray(products)) return res.status(400).json({ error: 'Invalid data format' });

        for (const p of products) {
            let id = p.id;
            let exists = false;
            if (id) {
                const check = await query('SELECT id FROM app_products WHERE id = ?', [id]);
                if (check.length > 0) exists = true;
            }

            if (exists) {
                const sql = `UPDATE app_products SET 
                             name=?, price=?, material=?, unit=?, 
                             weight=?, size=?, description=?, 
                             specifications=?, status=?, image_path=?,
                             brand_id=?, category_id=?, top_category=?,
                             quantity=?, dimensions=?, min_order_qty=?, additional_notes=?
                             WHERE id = ?`;
                await query(sql, [
                    p.name, p.price, p.material, p.unit,
                    p.weight, p.size, p.description,
                    p.specs || p.specifications, p.status || 'active', p.image || p.image_path,
                    p.brand_id, p.category_id, p.top_category,
                    p.quantity, p.dimensions, p.min_order_qty, p.notes || p.additional_notes,
                    id
                ]);
            } else {
                if (!id) id = Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
                const sql = `INSERT INTO app_products (id, name, price, material, unit, weight, size, description, specifications, status, image_path, brand_id, category_id, top_category, quantity, dimensions, min_order_qty, additional_notes) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                await query(sql, [
                    id, p.name, p.price, p.material, p.unit, p.weight, p.size, p.description, p.specs || p.specifications, p.status || 'active', p.image || p.image_path,
                    p.brand_id, p.category_id, p.top_category, p.quantity, p.dimensions, p.min_order_qty, p.notes || p.additional_notes
                ]);
            }
        }
        res.json({ success: true, count: products.length });
    } catch (err) {
        console.error('Bulk Products API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const p = req.body;
        let id = p.id;

        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_products WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            // UPDATE
            const sql = `UPDATE app_products SET 
                         name=?, price=?, material=?, unit=?, 
                         weight=?, size=?, description=?, 
                         specifications=?, status=?, image_path=?,
                         brand_id=?, category_id=?, top_category=?,
                         quantity=?, dimensions=?, min_order_qty=?, additional_notes=?
                         WHERE id = ?`;
            await query(sql, [
                p.name, p.price, p.material, p.unit,
                p.weight, p.size, p.description,
                p.specs, p.status || 'active', p.image,
                p.brand_id, p.category_id, p.top_category,
                p.quantity, p.dimensions, p.min_order_qty, p.notes,
                id
            ]);
        } else {
            // INSERT
            if (!id) id = Date.now().toString().slice(-8);
            const sql = `INSERT INTO app_products (id, name, price, material, unit, weight, size, description, specifications, status, image_path, brand_id, category_id, top_category, quantity, dimensions, min_order_qty, additional_notes) 
                         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await query(sql, [
                id, p.name, p.price, p.material, p.unit, p.weight, p.size, p.description, p.specs, p.status || 'active', p.image,
                p.brand_id, p.category_id, p.top_category, p.quantity, p.dimensions, p.min_order_qty, p.notes
            ]);
        }

        res.json({ success: true, product: { ...p, id } });
    } catch (err) {
        console.error('Product Save Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_products WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// USERS API
app.get('/api/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        let sql = 'SELECT id, full_name as name, username, email, phone FROM app_users';
        let countSql = 'SELECT COUNT(*) as total FROM app_users';
        let params = [];

        if (search) {
            sql += ' WHERE full_name LIKE ? OR username LIKE ? OR email LIKE ?';
            countSql += ' WHERE full_name LIKE ? OR username LIKE ? OR email LIKE ?';
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        res.json({
            data: items,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const u = req.body;
        let id = u.id;
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_users WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            if (u.password) {
                await query('UPDATE app_users SET full_name=?, username=?, email=?, phone=?, password=? WHERE id=?', [u.name, u.username, u.email, u.phone, u.password, id]);
            } else {
                await query('UPDATE app_users SET full_name=?, username=?, email=?, phone=? WHERE id=?', [u.name, u.username, u.email, u.phone, id]);
            }
        } else {
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_users', []);
                id = (parseInt(rows[0].maxId || 0) + 1);
            }
            await query('INSERT INTO app_users (id, full_name, username, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)', [id, u.name, u.username, u.email, u.phone, u.password || '']);
        }
        res.json({ success: true, user: { ...u, id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_users WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// BLOGS
app.get('/api/blogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const category = req.query.category || '';
        const search = req.query.search || '';
        let sql = 'SELECT * FROM app_blogs';
        let countSql = 'SELECT COUNT(*) as total FROM app_blogs';
        let params = [];
        let whereClauses = [];

        if (search) {
            whereClauses.push('title LIKE ?');
            params.push(`%${search}%`);
        }

        if (category) {
            whereClauses.push('category = ?');
            params.push(category);
        }

        if (whereClauses.length > 0) {
            const whereStr = ' WHERE ' + whereClauses.join(' AND ');
            sql += whereStr;
            countSql += whereStr;
        }

        sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        console.log(`[API] Blogs found: ${items.length} of total ${countResult[0].total}`);
        console.log(`[API] Titles:`, items.map(i => i.title));

        const mapped = items.map(b => ({
            id: b.id,
            title: b.title,
            slug: b.slug,
            content: b.content,
            excerpt: b.excerpt,
            author: b.author,
            category: b.category,
            tags: b.tags,
            status: b.status,
            image: b.image_path,
            image_path: b.image_path,
            is_published: b.is_published,
            created_at: b.created_at
        }));

        res.json({
            status: 'success',
            api_version: 'v2',
            data: mapped,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/api/blogs/:id/visibility', async (req, res) => {
    try {
        const { is_published } = req.body;
        const status = is_published ? 'Published' : 'Draft';
        await query('UPDATE app_blogs SET is_published = ?, status = ? WHERE id = ?', [is_published, status, req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// BULK BLOGS IMPORT
app.post('/api/blogs/bulk', async (req, res) => {
    try {
        const { blogs } = req.body;
        if (!Array.isArray(blogs)) return res.status(400).json({ error: 'Invalid data format' });

        for (const b of blogs) {
            let id = b.id;
            let exists = false;
            if (id) {
                const check = await query('SELECT id FROM app_blogs WHERE id = ?', [id]);
                if (check.length > 0) exists = true;
            }

            if (exists) {
                const sql = `UPDATE app_blogs SET 
                             title=?, content=?, category=?, author=?, image_url=?, status=?
                             WHERE id = ?`;
                await query(sql, [
                    b.title, b.content, b.category, b.author, b.image_url, b.status || 'published',
                    id
                ]);
            } else {
                if (!id) id = Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
                const sql = `INSERT INTO app_blogs (id, title, content, category, author, image_url, status) 
                             VALUES (?, ?, ?, ?, ?, ?, ?)`;
                await query(sql, [
                    id, b.title, b.content, b.category, b.author, b.image_url, b.status || 'published'
                ]);
            }
        }
        res.json({ success: true, count: blogs.length });
    } catch (err) {
        console.error('Bulk Blogs API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const b = req.body;
        let id = b.id;
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_blogs WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            const sql = `UPDATE app_blogs SET title=?, slug=?, content=?, excerpt=?, image_path=?, author=?, category=?, tags=?, status=?, is_published=? WHERE id = ?`;
            await query(sql, [b.title, b.slug, b.content, b.excerpt, b.image, b.author, b.category, b.tags, b.status, b.is_published, id]);
        } else {
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_blogs', []);
                id = (parseInt(rows[0].maxId || 0) + 1);
            }
            const sql = `INSERT INTO app_blogs (id, title, slug, content, excerpt, image_path, author, category, tags, status, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await query(sql, [id, b.title, b.slug, b.content, b.excerpt, b.image, b.author, b.category, b.tags, b.status, b.is_published]);
        }
        res.json({ success: true, blog: { ...b, id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_blogs WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CATEGORIES
app.get('/api/categories', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        let sql = 'SELECT * FROM app_categories';
        let countSql = 'SELECT COUNT(*) as total FROM app_categories';
        let params = [];

        if (search) {
            sql += ' WHERE name LIKE ?';
            countSql += ' WHERE name LIKE ?';
            params.push(`%${search}%`);
        }

        sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        res.json({
            data: items,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// BULK CATEGORIES IMPORT
app.post('/api/categories/bulk', async (req, res) => {
    try {
        const { categories } = req.body;
        if (!Array.isArray(categories)) return res.status(400).json({ error: 'Invalid data format' });

        for (const c of categories) {
            let id = c.id;
            let exists = false;
            if (id) {
                const check = await query('SELECT id FROM app_categories WHERE id = ?', [id]);
                if (check.length > 0) exists = true;
            }

            if (exists) {
                await query('UPDATE app_categories SET name=? WHERE id = ?', [c.name, id]);
            } else {
                if (!id) {
                    const max = await query('SELECT MAX(id) as maxId FROM app_categories');
                    id = (parseInt(max[0].maxId || 0) + 1);
                }
                await query('INSERT INTO app_categories (id, name) VALUES (?, ?)', [id, c.name]);
            }
        }
        res.json({ success: true, count: categories.length });
    } catch (err) {
        console.error('Bulk Categories API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const c = req.body;
        let id = c.id;
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_categories WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            await query('UPDATE app_categories SET name=? WHERE id = ?', [c.name, id]);
        } else {
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_categories', []);
                id = (parseInt(rows[0].maxId || 0) + 1);
            }
            await query('INSERT INTO app_categories (id, name) VALUES (?, ?)', [id, c.name]);
        }
        res.json({ success: true, category: { ...c, id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_categories WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// FREE JOINERS
app.get('/api/joiners', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';
        const hasLogo = req.query.hasLogo === 'true';
        const noLogo = req.query.hasLogo === 'false';
        const hasGst = req.query.hasGst === 'true';
        const noGst = req.query.hasGst === 'false';

        let sql = 'SELECT * FROM app_free_joiners';
        let countSql = 'SELECT COUNT(*) as total FROM app_free_joiners';
        let params = [];
        let whereClauses = [];

        if (search) {
            whereClauses.push('(full_name LIKE ? OR company_name LIKE ?)');
            params.push(`%${search}%`, `%${search}%`);
        }

        if (hasLogo) whereClauses.push('logo_path IS NOT NULL AND logo_path != ""');
        if (noLogo) whereClauses.push('(logo_path IS NULL OR logo_path = "")');
        if (hasGst) whereClauses.push('gst IS NOT NULL AND gst != ""');
        if (noGst) whereClauses.push('(gst IS NULL OR gst = "")');

        if (whereClauses.length > 0) {
            const whereStr = ' WHERE ' + whereClauses.join(' AND ');
            sql += whereStr;
            countSql += whereStr;
        }

        sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        const mapped = items.map(j => ({
            id: j.id,
            name: j.full_name,
            email: j.email,
            mobile: j.mobile,
            whatsapp: j.whatsapp_number,
            gst: j.gst,
            company: j.company_name,
            logo: j.logo_path,
            fb: j.facebook_link,
            insta: j.instagram_link,
            twitter: j.twitter_link,
            linkedin: j.linkedin_link
        }));

        res.json({
            data: mapped,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// BULK JOINERS IMPORT
app.post('/api/joiners/bulk', async (req, res) => {
    try {
        const { joiners } = req.body;
        if (!Array.isArray(joiners)) return res.status(400).json({ error: 'Invalid data format' });

        for (const j of joiners) {
            let id = j.id;
            let exists = false;
            if (id) {
                const check = await query('SELECT id FROM app_joiners WHERE id = ?', [id]);
                if (check.length > 0) exists = true;
            }

            if (exists) {
                const sql = `UPDATE app_joiners SET 
                             name=?, email=?, mobile=?, company_name=?, business_type=?, address=?, logo_path=?, status=?
                             WHERE id = ?`;
                await query(sql, [
                    j.name, j.email, j.mobile, j.company_name, j.business_type, j.address, j.logo || j.logo_path, j.status || 'pending',
                    id
                ]);
            } else {
                if (!id) id = Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
                const sql = `INSERT INTO app_joiners (id, name, email, mobile, company_name, business_type, address, logo_path, status) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                await query(sql, [
                    id, j.name, j.email, j.mobile, j.company_name, j.business_type, j.address, j.logo || j.logo_path, j.status || 'pending'
                ]);
            }
        }
        res.json({ success: true, count: joiners.length });
    } catch (err) {
        console.error('Bulk Joiners API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/joiners', async (req, res) => {
    try {
        const j = req.body;
        let id = j.id;
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_free_joiners WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            const sql = `UPDATE app_free_joiners SET full_name=?, email=?, mobile=?, whatsapp_number=?, gst=?, company_name=?, logo_path=?, facebook_link=?, instagram_link=?, twitter_link=?, linkedin_link=? WHERE id = ?`;
            await query(sql, [j.name, j.email, j.mobile, j.whatsapp, j.gst, j.company, j.logo, j.fb, j.insta, j.twitter, j.linkedin, id]);
        } else {
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_free_joiners', []);
                id = (parseInt(rows[0].maxId || 0) + 1);
            }
            const sql = `INSERT INTO app_free_joiners (id, full_name, email, mobile, whatsapp_number, gst, company_name, logo_path, facebook_link, instagram_link, twitter_link, linkedin_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await query(sql, [id, j.name, j.email, j.mobile, j.whatsapp, j.gst, j.company, j.logo, j.fb, j.insta, j.twitter, j.linkedin]);
        }
        res.json({ success: true, joiner: { ...j, id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/joiners/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_free_joiners WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PROFILES (BUSINESSES)
app.get('/api/profiles', async (req, res) => {
    try {
        console.log(`[PROFILES_API] Incoming Request: ${JSON.stringify(req.query)}`);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const type = req.query.type || '';
        const search = req.query.search || '';
        const location = req.query.location || req.query.loc || '';
        const category = req.query.category || '';
        let sql = 'SELECT * FROM app_profiles';
        let countSql = 'SELECT COUNT(*) as total FROM app_profiles';
        let params = [];
        let whereClauses = [];

        const cleanSearch = (search || '').toString().trim();
        if (cleanSearch && cleanSearch !== '' && cleanSearch !== 'undefined' && cleanSearch !== 'null') {
            console.log(`[PROFILES_API] Filtering for keyword: "${cleanSearch}"`);
            const isId = !isNaN(parseInt(cleanSearch)) && cleanSearch.match(/^\d+$/);
            if (isId) {
                whereClauses.push('(id = ? OR company_name LIKE ? OR owner_name LIKE ? OR email_address LIKE ? OR about_company LIKE ? OR company_address LIKE ?)');
                params.push(parseInt(cleanSearch), `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`);
            } else {
                whereClauses.push('(company_name LIKE ? OR owner_name LIKE ? OR email_address LIKE ? OR about_company LIKE ? OR company_address LIKE ?)');
                params.push(`%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`, `%${cleanSearch}%`);
            }
        }

        if (type && type !== '' && type !== 'all' && type !== 'undefined' && type !== 'null') {
            console.log(`[PROFILES_API] Filtering for type: "${type}"`);
            whereClauses.push('profile_type LIKE ?');
            params.push(`%${type}%`);
        }

        const rawLoc = (location || '').toString().trim();
        if (rawLoc && rawLoc !== '' && rawLoc !== 'all' && rawLoc !== 'undefined') {
            console.log(`[PROFILES_API] Location Filter Triggered: "${rawLoc}"`);
            whereClauses.push('company_address LIKE ?');
            params.push(`%${rawLoc}%`);
        }

        if (category && category !== '' && category !== 'all') {
            whereClauses.push('(about_company LIKE ? OR company_name LIKE ?)');
            params.push(`%${category}%`, `%${category}%`);
        }

        if (whereClauses.length > 0) {
            const whereStr = ' WHERE ' + whereClauses.join(' AND ');
            sql += whereStr;
            countSql += whereStr;
        }

        sql += ' ORDER BY company_name DESC LIMIT ? OFFSET ?';

        const logEntry = `[${new Date().toISOString()}] PROFILES_API: SQL="${sql}" PARAMS=${JSON.stringify([...params, limit, offset])}\n`;
        fs.appendFileSync(path.join(__dirname, 'logs', 'query_log.txt'), logEntry);
        console.log(`[PROFILES_API] SQL: ${sql}`);
        console.log(`[PROFILES_API] Params:`, params);

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        console.log(`Found ${items.length} items, Total in DB: ${countResult[0].total}`);

        const mapped = items.map(p => ({
            id: p.id,
            company_name: p.company_name,
            type: p.profile_type,
            owner: p.owner_name,
            phone: p.contact_number,
            email: p.email_address,
            address: p.company_address,
            website: p.website,
            about: p.about_company
        }));

        res.json({
            data: mapped,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        console.error('Profiles API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// BULK PROFILES IMPORT
app.post('/api/profiles/bulk', async (req, res) => {
    try {
        const { profiles } = req.body;
        if (!Array.isArray(profiles)) return res.status(400).json({ error: 'Invalid data format' });

        for (const p of profiles) {
            let id = p.id;
            let exists = false;
            if (id) {
                const check = await query('SELECT id FROM app_profiles WHERE id = ?', [id]);
                if (check.length > 0) exists = true;
            }

            if (exists) {
                const sql = `UPDATE app_profiles SET 
                             company_name=?, owner_name=?, email_address=?, 
                             mobile_number=?, whatsapp_number=?, company_address=?, 
                             about_company=?, profile_type=?, status=?, website=?
                             WHERE id = ?`;
                await query(sql, [
                    p.company_name || p.name, p.owner_name || p.owner, p.email_address || p.email,
                    p.mobile_number || p.phone, p.whatsapp_number || p.whatsapp, p.company_address || p.address,
                    p.about_company || p.about, p.profile_type || p.type, p.status || 'active', p.website,
                    id
                ]);
            } else {
                if (!id) id = Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
                const sql = `INSERT INTO app_profiles (id, company_name, owner_name, email_address, mobile_number, whatsapp_number, company_address, about_company, profile_type, status, website) 
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                await query(sql, [
                    id, p.company_name || p.name, p.owner_name || p.owner, p.email_address || p.email,
                    p.mobile_number || p.phone, p.whatsapp_number || p.whatsapp, p.company_address || p.address,
                    p.about_company || p.about, p.profile_type || p.type, p.status || 'active', p.website
                ]);
            }
        }
        res.json({ success: true, count: profiles.length });
    } catch (err) {
        console.error('Bulk Profiles API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/profiles', async (req, res) => {
    try {
        const p = req.body;
        let id = p.id;
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_profiles WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            const sql = `UPDATE app_profiles SET company_name=?, profile_type=?, owner_name=?, contact_number=?, email_address=?, company_address=?, website=?, about_company=? WHERE id = ?`;
            await query(sql, [p.company_name, p.type, p.owner, p.phone, p.email, p.address, p.website, p.about, id]);
        } else {
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_profiles', []);
                id = (parseInt(rows[0].maxId || 0) + 1);
            }
            const sql = `INSERT INTO app_profiles (id, company_name, profile_type, owner_name, contact_number, email_address, company_address, website, about_company) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            await query(sql, [id, p.company_name, p.type, p.owner, p.phone, p.email, p.address, p.website, p.about]);
        }
        res.json({ success: true, profile: { ...p, id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/profiles/bulk-delete', async (req, res) => {
    try {
        const type = req.query.type;
        if (type) {
            await query('DELETE FROM app_profiles WHERE profile_type = ? OR profile_type = ?', [type, type + 's']);
        } else {
            await query('DELETE FROM app_profiles', []);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/profiles/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_profiles WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DASHBOARD STATS
app.get('/api/stats', async (req, res) => {
    try {
        const [brandsCount, productsCount, profilesCount, blogsCount, categoriesCount, usersCount, joinersCount, recentBrands] = await Promise.all([
            query('SELECT COUNT(*) as total FROM app_brands', []),
            query('SELECT COUNT(*) as total FROM app_products', []),
            query('SELECT COUNT(*) as total FROM app_profiles', []),
            query('SELECT COUNT(*) as total FROM app_blogs', []),
            query('SELECT COUNT(*) as total FROM app_categories', []),
            query('SELECT COUNT(*) as total FROM app_users', []),
            query('SELECT COUNT(*) as total FROM app_free_joiners', []),
            query('SELECT id, company_name as name FROM app_brands ORDER BY id DESC LIMIT 6', [])
        ]);

        res.json({
            brands: brandsCount[0].total,
            products: productsCount[0].total,
            profiles: profilesCount[0].total,
            blogs: blogsCount[0].total,
            categories: categoriesCount[0].total,
            users: usersCount[0].total,
            joiners: joinersCount[0].total,
            inquiries: 0,
            recentBrands: recentBrands
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// USERS
app.get('/api/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const search = req.query.search || '';

        let sql = 'SELECT * FROM app_users';
        let countSql = 'SELECT COUNT(*) as total FROM app_users';
        let params = [];

        if (search) {
            sql += ' WHERE full_name LIKE ? OR username LIKE ?';
            countSql += ' WHERE full_name LIKE ? OR username LIKE ?';
            params.push(`%${search}%`, `%${search}%`);
        }

        sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';

        const [items, countResult] = await Promise.all([
            query(sql, [...params, limit, offset]),
            query(countSql, params)
        ]);

        const mapped = items.map(u => ({
            id: u.id,
            name: u.full_name,
            email: u.email,
            phone: u.phone,
            username: u.username,
            password: u.password
        }));

        res.json({
            data: mapped,
            total: countResult[0].total,
            page,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const u = req.body;
        let id = u.id;
        let exists = false;
        if (id) {
            const check = await query('SELECT id FROM app_users WHERE id = ?', [id]);
            if (check.length > 0) exists = true;
        }

        if (exists) {
            await query('UPDATE app_users SET full_name=?, email=?, phone=?, username=?, password=? WHERE id = ?', [u.name, u.email, u.phone, u.username, u.password, id]);
        } else {
            if (!id) {
                const rows = await query('SELECT MAX(id) as maxId FROM app_users', []);
                id = (parseInt(rows[0].maxId || 0) + 1);
            }
            await query('INSERT INTO app_users (id, full_name, email, phone, username, password) VALUES (?, ?, ?, ?, ?, ?)', [id, u.name, u.email, u.phone, u.username, u.password]);
        }
        res.json({ success: true, user: { ...u, id } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        await query('DELETE FROM app_users WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DASHBOARD STATS
app.get('/api/stats', async (req, res) => {
    try {
        const [products] = await query('SELECT COUNT(*) as c FROM app_products');
        const [brands] = await query('SELECT COUNT(*) as c FROM app_brands');
        const [profiles] = await query('SELECT COUNT(*) as c FROM app_profiles');
        const [joiners] = await query('SELECT COUNT(*) as c FROM app_free_joiners');
        const [categories] = await query('SELECT COUNT(*) as c FROM app_categories');
        const [blogs] = await query('SELECT COUNT(*) as c FROM app_blogs');

        const recentBrands = await query('SELECT id, company_name as name, contact_email as email FROM app_brands ORDER BY id DESC LIMIT 8');

        res.json({
            products: products.c,
            brands: brands.c,
            profiles: profiles.c,
            joiners: joiners.c,
            categories: categories.c,
            blogs: blogs.c,
            recentBrands: recentBrands
        });
    } catch (err) {
        console.error('Stats API Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Global Error Handler (Return JSON, not HTML)
app.use((err, req, res, next) => {
    console.error('❌ SERVER ERROR:', err.stack);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// --- AUTO SEED DATA ON BOOT ---
async function autoSeedProfiles() {
    try {
        const check = await query('SELECT count(*) as cnt FROM app_profiles WHERE profile_type IN ("Dealer", "Retailer", "Distributor")');
        if (check[0].cnt < 10) {
            console.log('Seeding Dealer, Retailer, and Distributor profiles...');
            const types = ['Dealer', 'Retailer', 'Distributor'];
            const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'];
            let id = 99000;
            for (const type of types) {
                for (let i = 1; i <= 6; i++) {
                    const city = cities[i % cities.length];
                    const p = {
                        id: (id++).toString(),
                        company_name: `${city} ${type}s Network ${i}`,
                        type: type,
                        owner: `Owner ${i}`,
                        phone: `+91 98${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
                        email: `contact${i}@${city.toLowerCase()}${type.toLowerCase()}s.com`,
                        address: `${Math.floor(Math.random() * 100)}, Industrial Area, ${city}`,
                        website: `www.${city.toLowerCase()}${type.toLowerCase()}s.com`,
                        about: `Leading ${type} in ${city} region specializing in premium products.`
                    };
                    const sql = `INSERT IGNORE INTO app_profiles (id, company_name, profile_type, owner_name, contact_number, email_address, company_address, website, about_company) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    await query(sql, [p.id, p.company_name, p.type, p.owner, p.phone, p.email, p.address, p.website, p.about]);
                }
            }
            console.log('Seeding complete.');
        }
    } catch (err) {
        console.error('Seeding error:', err);
    }
}


app.listen(PORT, async () => {
    console.log('---------------------------------------------------------');
    console.log(`🚀 DIRECT LIVE DATABASE ENGINE RUNNING`);
    await autoSeedProfiles();
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`📁 Database: ${dbConfig.database}`);
    console.log('---------------------------------------------------------');
});
