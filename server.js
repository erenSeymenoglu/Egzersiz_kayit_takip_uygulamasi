const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000

// MySQL bağlantısı
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'db', // Buradaki 'db' host adı doğru olmalı
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'eren12416',
    database: process.env.DB_NAME || 'egzersiz_uygulamasi',
    connectTimeout: 15000,
    charset: 'utf8mb4',
});
const path = require('path'); // Dosya yollarını yönetmek için gerekli

// Statik dosyaları servis et
app.use(express.static(path.join(__dirname, 'public')));

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL bağlantısı başarılı!');
});

// Ana rota (test amaçlı)
app.get('/', (req, res) => {
    res.send('Egzersiz API Sunucusu Çalışıyor!');
});

// Egzersiz ekleme
app.post('/add-exercise', (req, res) => {
    const { egzersiz_adi, tarih, sure } = req.body;
    const sql = 'INSERT INTO egzersizler (egzersiz_adi, tarih, sure) VALUES (?, ?, ?)';
    db.query(sql, [egzersiz_adi, tarih, sure], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Egzersiz başarıyla kaydedildi!', id: result.insertId });
    });
});

// Egzersiz listesini alma
app.get('/get-exercises', (req, res) => {
    const sql = 'SELECT * FROM egzersizler ORDER BY tarih DESC';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// 3000 portunda server başlat
const server1 = http.createServer(app);
server1.listen(3000, () => {
    console.log('Sunucu 3000 üzerinde çalışıyor.');
});
