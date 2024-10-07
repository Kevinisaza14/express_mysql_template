const db = require("../config/dbMySQL.js");
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');
const Joi = require("joi");

const signupSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
// validar codigo, debe ser post
//revisar desencritar password
// comparar password
exports.signin = async (req, res) => {
    let connection;
    const { email, password } = req.body;
    try {
        connection = await db.getConnection();
        const results = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }
        const passwordIsValid = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET)
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        }
        return res.status(200).json({ message: 'Authentication successful.' });
    } catch (error) {
        res.status(500).json({ message: 'Error on the server.', error });
    } finally {
        connection.release();
    }
};

/* exports.signup = async (req, res) => {
    let connection;
    try {
        //Validaciones
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }
        const { username, email, password } = req.body;
        connection = await db.getConnection();
        const [userEmailExists] = await db.query("select email from users where email = ?", [email]);
        if (userEmailExists.length > 0) {
            return res.status(400).json({
                message: `Usuario con email: ${email} ya existe!`,
                error: "Error de validación"
            });
        }
        const id = uuidv4();
        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        const sql = "insert into users values (?, ?, ?, ?, default, default)";
        await db.query(sql, [id, username, email, hashedPassword]);
        return res.status(200).json({
            message: "Usuario registrado exitosamente",
            User: { id, username, email, hashPassword }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error on the server.', error });
    } finally {
        connection.release();
    }
}; */