// server.js

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*app.get("/", (req, res) => {
  res.send("¡Hola, servidor probando aqui!");
});*/

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Tu usuario de MySQL
  password: "luismiguel", // Tu contraseña de MySQL (deja en blanco si no tienes configurada una)
  database: "login", // Nombre de tu base de datos en MySQL
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL.");
});

// Endpoint para autenticación de login
app.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;
  const query = "SELECT * FROM admins WHERE usuario = ? AND contraseña = ?";

  db.query(query, [usuario, contraseña], (err, results) => {
    if (err) {
      console.error("Error ejecutando la consulta:", err);
      res.status(500).send("Error conectando a la base de datos");
      return;
    }

    if (results.length > 0) {
      res.send("Autenticación exitosa");
    } else {
      res.status(401).send("Credenciales incorrectas");
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
