import db from '../configDB/db.js';

export const findByEmail = async(email)=>{
        const [rows] = await db.query('SELECT * FROM Usuarios WHERE email = ?', [email]);
        return rows[0];
    }

export const createUser = async (nombre, email, contraseña_hash, rol, area)=> {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, contraseña_hash, area, rol, fecha_registro) VALUES (?, ?, ?, ?, ?, NOW())',
            [nombre, email, contraseña_hash, area, rol]
        );
        return result.insertId;
    }

