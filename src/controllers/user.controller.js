const db = require("../config/dbMySQL.js");
const { v4: uuidv4 } = require('uuid');
const CryptoJS = require("crypto-js");
const Joi = require("joi");
// creamos schema de validacion de user
const userSchema = Joi.object({
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
const updateSchema = Joi.object({
    username: Joi.string().min(3).max(15),
    password: Joi.string().min(6)
});

exports.getAllUsers = async (req, res) => {
    let connection; // declarada fuera para que se pueda acceder desde cada bloque
    try {
        connection = await db.getConnection();
        const [result] = await db.query("select * from users");
        if (result.length === 0) {
            return res.status(204).json({
                message: "No se encontraron usuarios"
            });
        }
        return res.status(200).json({
            message: "Lista de usuarios encontrados",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo obtener los usuarios",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}
exports.getUserById = async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection();
        const [result] = await db.query("select * from users where id = ?", [req.params.id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "No se encontro usuario con el id: " + req.params.id
            });
        }
        return res.status(200).json({
            message: "Usuario encontrado",
            result
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo obtener el usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}
exports.createUser = async (req, res) => {
    let connection;
    try {
        // validar 
        const { error } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }
        // destructuring object
        const { username, email, password } = req.body;
        connection = await db.getConnection();
        // Validar que el email no este registrado en MySQL
        const [userEmailExists] = await db.query("select email from users where email = ?", [email]);
        if (userEmailExists.length > 0) {
            return res.status(400).json({
                message: `Usuario con email: ${email} ya existe!`,
                error: "Error de validación"
            });
        }
        const id = uuidv4();
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        // evitar inyección sql // evitar que se ingresen datos a SQL con consultas maliciosas externas.
        const sql = "insert into users values (?, ?, ?, ?, default, default)";
        await db.query(sql, [id, username, email, hashPassword]);
        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user: { id, username, email, hashPassword }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo registrar usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}
exports.updateUser= async (req, res) => {
    try {
        const id = req.params.id;
        connection = await db.getConnection();
          // validar si la id por url existe
        const [result] = await db.query("select * from users where id = ?", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "No se encontró usuario con id: " + id
            });
        }
        const { error } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
                error: "Error de validación"
            });
        }
        const { username, password } = req.body;
        const updateFields = [];
        const values = [];
        // construimos la consulta dinámicamente
        if (username) {
            updateFields.push("username = ?");
            values.push(username);
        }
        const hashPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET).toString();
        if (password) {
            updateFields.push("password = ?");
            values.push(hashPassword);
        }
        values.push(id);
        // validar que no vengan otras props por el body
        if (updateFields.length === 0) {
            return res.status(400).json({
                message: "No se han proporcionado los datos correctos ('username' y 'password')",
                error: "Error de validación"
            });
        }
        const sql = `update users set ${updateFields.join(', ')} where id = ?`;
        await db.query(sql, values);
        return res.status(201).json({
            message: "Usuario actualizado correctamente",
            user: { id, username, hashPassword }
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo actualizar usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}
exports.deleteUser = async (req, res) => {
    let connection;
    try {
        const { id } = req.params;
        connection = await db.getConnection();
        const [result] = await db.query("select * from users where id = ?", [id]);
        if (result.length === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }
        await db.query("delete from users where id = ?", [id]);
        return res.status(200).json({
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "No se pudo eliminar usuario",
            error: "Error 500: " + error
        });
    } finally {
        connection.release();
    }
}

// TODO: getUserById, updateUser, deleteUser