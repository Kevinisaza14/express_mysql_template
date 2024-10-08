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
