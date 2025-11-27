import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// =========================================
// BANCO DE DADOS
// =========================================
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("Erro ao conectar ao SQLite:", err);
  else console.log("SQLite conectado.");
});

// Criar tabelas automaticamente
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      telefone TEXT NOT NULL,
      data_viagem TEXT NOT NULL,
      pacote TEXT NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// =========================================
// ROTAS DA API
// =========================================

// NEWSLETTER
app.post("/newsletter", (req, res) => {
  const { email } = req.body;

  db.run(
    `INSERT INTO newsletter (email) VALUES (?)`,
    [email],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao salvar email." });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// CONTATO
app.post("/contato", (req, res) => {
  const { nome, email, mensagem } = req.body;

  db.run(
    `INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)`,
    [nome, email, mensagem],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao salvar contato." });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// RESERVAS
app.post("/reserva", (req, res) => {
  const { nome, telefone, data_viagem, pacote } = req.body;

  db.run(
    `INSERT INTO reservas (nome, telefone, data_viagem, pacote) VALUES (?, ?, ?, ?)`,
    [nome, telefone, data_viagem, pacote],
    function (err) {
      if (err) return res.status(500).json({ error: "Erro ao salvar reserva." });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// =========================================
// INICIAR SERVIDOR
// =========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API rodando na porta " + PORT));

app.get("/", (req, res) => {
  res.send("API online!");
});
