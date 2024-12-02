const express = require("express");
const cors = require("cors");
const api = new express();
require("dotenv").config(); // importamos la configuración de entorno //sirve process.env.PORT

const userRoutes = require("./routes/user.routes.js"); // importamos las rutas de user
const authRoutes = require("./routes/auth.routes.js"); // importamos las rutas de auth
const apiRoutes = require("./routes/api.routes.js"); // importamos las rutas de api
// go to: http://localhost:3000/api-docs/ para ver la doc de nuestra API
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.routers.json");
api.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// config middlewares
api.use(express.json()); // body-parser para peticiones application/json
api.use(cors()); // habilita CORS para todos los dominios
api.use("/api/v1",userRoutes, authRoutes, apiRoutes); // montamos las rutas en /api/v1
api.use((req, res) => { // 404 
    res.status(404).json({ 
        message: "Ruta no encontrada",
        error: "Error 404"
    });
});

const PORT = process.env.PORT || 3000; // puerto de la API
api.listen(PORT, () => {
    console.log(`Servidor corriendo en "http://localhost:${PORT}"`);
});
