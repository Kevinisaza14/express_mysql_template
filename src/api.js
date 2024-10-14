const express = require("express");
const cors = require("cors");
const api = new express();
require("dotenv").config();

const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const apiRoutes = require("./routes/api.routes.js");

// config middlewares 
api.use(express.json());
api.use(cors());
api.use("/api/v1",userRoutes, authRoutes, apiRoutes);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "express_Mysql_template",
            version: "1.0.0",
            description: "Plantilla API REST con ExpressJS y MySQL",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
              url: "http://localhost:3000/docs",
            },
          ],
    },
    apis: ["./routes/*.js"],
}
const swaggerSpec = swaggerJsdoc(options);
api.use(
    "/api-docs", 
    swaggerUi.serve, 
    swaggerUi.setup(swaggerSpec, { explorer: true })
);
api.use((req, res) => { // 404
    res.status(404).json({ 
        message: "Ruta no encontrada",
        error: "Error 404"
    });
});

const PORT = process.env.PORT || 3000;
api.listen(PORT, () => {
    console.log(`Servidor corriendo en "http://localhost:${PORT}"`);
});
