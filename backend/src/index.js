require("dotenv").config();//ejecuta el archivo con las variables de entorno

const app = require("./app");
require("./database");

async function main(){//se encarga de iniciar el programa
await app.listen(app.get("port"));// esperamos a que inicie y luego despues sigue
  console.log("server on port", app.get("port"))
}

main();
