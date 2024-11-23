
import { courseRoutes, authRoutes} from './routes/indexRoutes.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors'
dotenv.config();

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
