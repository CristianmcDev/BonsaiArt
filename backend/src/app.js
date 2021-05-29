

const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors");
//settings

app.set("port", process.env.PORT || 4000);// en caso de que exista un puerto en las variables de entorno lo coge

//middlewares funciones antes de llegar a las urls

app.use(cors());//para poder comunicar entre servidores front y back
app.use(express.json());//para que lea lo recibido de json
//testing

app.get('/', (req, res) => {
  res.json({
    message: "Hello World"
  })
})

//routes
//con use, cuando alguien visite esa ruta, se ira al archivo
app.use("/api/users", require("./routers/users"));//creamos rutas del servidor
app.use("/api/admin", require("./routers/admins"));
app.use("/api/products", require("./routers/products"));
app.use("/api/cart", require("./routers/cart"));
app.use("/api/orders", require("./routers/orders"));
app.use("/api/notifications", require("./routers/notifications"));


module.exports = app;
