/**
 * Servicio Web API REST para Registro e Inicio de Sesión
 * Evidencia: GA7-220501096-AA5-EV01
 * Aprediz: Cristian Danilo Enciso Ahumada
 * Descripción: Implementación de endpoints de autenticación utilizando Express.
 */

// Importación de módulos necesarios
const express = require('express');
const cors = require('cors');

// Inicialización de la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar solicitudes en formato JSON
app.use(express.json());

// Middleware para habilitar el acceso desde distintos orígenes (CORS)
app.use(cors());

/**
 * Base de datos en memoria (Simulación)
 * Nota: En un entorno de producción, este arreglo se reemplaza por una base de datos (e.g., MongoDB, PostgreSQL).
 */
const usersDatabase = [];

// ==========================================
// ENDPOINT 1: REGISTRO DE USUARIO
// ==========================================
/**
 * @route   POST /api/register
 * @desc    Registra un nuevo usuario en el sistema
 * @access  Público
 */
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // Validación de entrada: verificar que se envíen ambos campos
    if (!username || !password) {
        return res.status(400).json({
            status: "error",
            message: "Por favor, ingrese un usuario y una contraseña válidos."
        });
    }

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = usersDatabase.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({
            status: "error",
            message: "El nombre de usuario ya se encuentra registrado."
        });
    }

    // Almacenar el nuevo usuario
    usersDatabase.push({ username, password });

    return res.status(201).json({
        status: "success",
        message: "Usuario registrado con éxito."
    });
});

// ==========================================
// ENDPOINT 2: INICIO DE SESIÓN / AUTENTICACIÓN
// ==========================================
/**
 * @route   POST /api/login
 * @desc    Autentica credenciales de un usuario
 * @access  Público
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Validación de entrada: verificar que se envíen ambos campos
    if (!username || !password) {
        return res.status(400).json({
            status: "error",
            message: "Error en la autenticación: debe proporcionar usuario y contraseña."
        });
    }

    // Buscar coincidencia exacta de usuario y contraseña
    const user = usersDatabase.find(
        u => u.username === username && u.password === password
    );

    // Caso de error: Credenciales inválidas
    if (!user) {
        return res.status(401).json({
            status: "error",
            message: "Error en la autenticación: usuario o contraseña incorrectos."
        });
    }

    // Caso de éxito: Autenticación correcta
    return res.status(200).json({
        status: "success",
        message: "Autenticación satisfactoria"
    });
});

// Inicialización del servidor HTTP
app.listen(PORT, () => {
    console.log(`Servidor de Autenticación ejecutándose en http://localhost:${PORT}`);
});

