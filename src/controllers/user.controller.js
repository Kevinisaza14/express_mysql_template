const dbConnection = require("../config/dbConnection.js");
const { v4: uuidv4 } = require('uuid');
// uuidv4()
// "G6A(7Hr|_ed$jr7#5k}?"
const CryptoJS = require("crypto-js");
const Joi = require("joi");
// creamos schema de validacion de user
const userSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

exports.getAllUsers = async (req, res) => {
    try {
        const [result] = await dbConnection.query("select * from users");
        return res.status(200).json({result});
    } catch (error) {
        return res.status(500).json({ 
            message: "No se pudo obtener los usuarios",
            error: "Error 500: " + error
        });
    }
}
