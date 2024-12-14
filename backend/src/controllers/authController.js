import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';
import { createUser, findByEmail } from '../models/userModel.js';
import bcrypt from 'bcryptjs';

// Registro de usuario
export const register = async (req, res) => {
    const { nombre, email, contrasena, area , rol='docente' } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const userId = await createUser(nombre, email, hashedPassword, rol , area);
        const token = jwt.sign(
            { id: userId, email, rol },
            JWT_SECRET,
            { expiresIn: '5d' }
        );
      
        // Responder con los datos del usuario y token
        res.status(201).json({
            message: 'Usuario registrado y autenticado con éxito',
            user: {
                id: userId,
                nombre,
                email,
                rol,
                area,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error });
    }
};

// Login de usuario
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await findByEmail(email);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Verificar si la contraseña es correcta
        const isPasswordValid = await bcrypt.compare(password, user.contraseña_hash);
        if (!isPasswordValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar el token de acceso
        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            JWT_SECRET,
            { expiresIn: '5d' } // Token con expiración de 5 días
        );

        // Enviar la respuesta con los datos del usuario y el token
        res.json({
            message: 'Login exitoso',
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
                area: user.area
            },
            token,
        });
    } catch (error) {
        console.error(error); // Imprimir el error en el servidor para debugging
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message || error });
    }
};
