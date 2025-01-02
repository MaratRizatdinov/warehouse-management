const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

// Настройка CORS
app.use(cors());

// Настройка парсинга JSON
app.use(express.json());

// Подключение к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Роут для получения всех поставщиков
app.get("/api/suppliers", async (req, res) => {
  const { value, field } = req.query;  
  try {
    let query = "SELECT * FROM suppliers";

    if (value && field) {
      query += ` WHERE ${field} ILIKE '%${value}%'`;
    }
    console.log(query)
    const suppliers = await pool.query(query);
    res.json(suppliers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
});

// Роут для добавления нового поставщика
app.post("/api/suppliers", async (req, res) => {
  const { name, contact, phone } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO suppliers (name, contact, phone) VALUES ($1, $2, $3) RETURNING *",
      [name, contact, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при добавлении поставщика" });
  }
});

// Роут для удаления поставщика
app.delete("/api/suppliers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
    res.status(200).json({ message: "Поставщик удален" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при удалении поставщика" });
  }
});

// Роут для редактирования поставщика

app.put("/api/suppliers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, contact, phone } = req.body;

  try {
    const result = await pool.query(
      "UPDATE suppliers SET name = $1, contact = $2, phone = $3 WHERE id = $4 RETURNING *",
      [name, contact, phone, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Поставщик не найден" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обновлении поставщика" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
