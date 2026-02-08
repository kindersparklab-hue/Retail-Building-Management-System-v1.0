const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        req.admin = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
    const admin = result.rows[0];
    if (!bcrypt.compareSync(password, admin.password_hash)) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);
    res.json({ token });
});

app.get('/api/dashboard', verifyToken, async (req, res) => {
    const total = await pool.query('SELECT COUNT(*) FROM shops');
    const occupied = await pool.query("SELECT COUNT(*) FROM shops WHERE status='occupied'");
    const rent = await pool.query("SELECT SUM(amount) FROM payments WHERE status='paid' AND EXTRACT(MONTH FROM payment_date)=EXTRACT(MONTH FROM CURRENT_DATE)");
    res.json({ totalShops: total.rows[0].count, occupiedShops: occupied.rows[0].count, rentCollected: rent.rows[0].sum || 0 });
});

app.get('/api/shops', verifyToken, async (req, res) => {
    const result = await pool.query('SELECT * FROM shops');
    res.json(result.rows);
});

app.post('/api/shops', verifyToken, async (req, res) => {
    const { number, floor, status, tenant_name, rent_amount, lease_start, lease_end } = req.body;
    await pool.query('INSERT INTO shops (number, floor, status, tenant_name, rent_amount, lease_start, lease_end) VALUES ($1, $2, $3, $4, $5, $6, $7)', [number, floor, status, tenant_name, rent_amount, lease_start, lease_end]);
    res.json({ message: 'Shop added' });
});

// Add more routes for rent, reminders, etc., as needed

app.listen(process.env.PORT || 5000, () => console.log('Backend running'));
