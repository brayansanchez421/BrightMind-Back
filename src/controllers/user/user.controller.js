import User from "../../models/user/user.model.js";
import Role from '../../models/user/role.models.js';
import Course from '../../models/courses/course.model.js'; // Asegúrate de tener importado el modelo de curso

import bcrypt from 'bcryptjs';

import { setSend } from "../../helpers/setSend.js";
import {sendDeleteAccountConfirmationEmail, sendDeleteUserEmail, sendRegistrationEmailWithTemporaryPassword} from "../../helpers/email/emailRegister.js"

// Crear un nuevo usuario
// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const { username, email, role } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Verificar si el nombre de usuario ya existe en la base de datos.
        const existingName = await User.findOne({ username });
        if (existingName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Verificar si el rol existe
        const roleObject = await Role.findOne({ nombre: role });
        if (!roleObject) {
            return res.status(404).json({ message: 'Role not found' });
        }

        // Crear y guardar el nuevo usuario
        const temporaryPassword = Math.random().toString(36).substring(2, 10);
        const hashedPassword = await bcrypt.hash(temporaryPassword, 10);

        const newUser = new User({ username, email, password: hashedPassword, role: roleObject._id });
        const userSaved = await newUser.save();

        // Enviar el correo de registro
        await sendRegistrationEmailWithTemporaryPassword(email, username, temporaryPassword);

        // Responder con éxito
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
            message: "Successful registration. Check your email for the temporary password.",
        });
    } catch (error) {
        console.error(error);

        // Manejo de errores específicos
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", details: error.errors });
        } else if (error.name === 'CastError') {
            return res.status(400).json({ message: `Invalid ${error.path}: ${error.value}` });
        } else if (error.code === 11000) { // Error de duplicado
            const field = Object.keys(error.keyValue)[0];
            if (field === 'email') {
                return res.status(400).json({ message: "Email already exists" });
            }
            if (field === 'username') {
                return res.status(400).json({ message: "Username already exists" });
            }
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, state, role, userImage } = req.body;
    const file = req.file;

    console.log("Received data:");
    console.log("id:", id);
    console.log("username:", username);
    console.log("email:", email);
    console.log("state:", state);
    console.log("role:", role);
    console.log("file:", file);

    try {
        const roleObject = await Role.findOne({ nombre: role });
        if (!roleObject) {
            return res.status(404).json({ msg: 'Role not found' });
        }

        // Obtener la URL de la imagen subida si existe
        let updatedFields = { username, email, state, role: roleObject._id, userImage };
        if (file) {
            updatedFields.userImage = file.path; // Suponiendo que 'image' es el campo donde guardas la URL de la imagen
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Registrar a un usuario en un curso
export const registerToCourse = async (req, res) => {
    const { userId, courseId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json(setSend("User not found"));
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json(setSend("Course not found"));
        }

        // Verificar si el curso ya está registrado en el usuario
        if (user.courses.includes(courseId)) {
            return res.status(400).json(setSend("User already registered to this course"));
        }

        user.courses.push(courseId);
        await user.save();

        res.status(200).json(setSend("User registered to course successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(setSend("Internal server error"));
    }
};

// Obtener los cursos de un usuario
export const getUserCourses = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('courses');
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user.courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener cursos del usuario' });
    }
};

// Obtener un usuario por ID
export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json(setSend( "User not found" ));
        }

        // Obtener el nombre del rol asociado al usuario
        const role = await Role.findById(user.role); // Suponiendo que el campo "role" contiene el _id del rol
        if (!role) {
            return res.status(404).json(setSend( "Role not found" ));
        }

        // Modificar la respuesta para incluir el nombre del rol en lugar del _id
        const userWithRoleName = { ...user.toJSON(), role: role.nombre };

        res.json(userWithRoleName);
    } catch (error) {
        res.status(500).json(setSend( "Internal server error" ));
    }
};

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('role', 'nombre'); // Hacer el populate solo en el campo 'nombre'
        const usersWithRoleNames = users.map(user => ({
            ...user._doc,
            role: user.role.nombre // Reemplazar el objeto 'role' con el campo 'nombre'
        }));
        res.json(usersWithRoleNames);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json(setSend("User not found"));
        }

        const deleteCode = generateConfirmationCode();
        user.deleteCode = deleteCode;
        user.deleteCodeExpires = Date.now() + 3600000; 
        await user.save();

        await sendDeleteAccountConfirmationEmail(user.email, deleteCode);

        res.status(200).json(setSend("Confirmation code sent successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(setSend("Internal server error"));
    }
};

// Confirmación de eliminación de usuario
export const deleteUserConfirmation = async (req, res) => {
    const { id } = req.params;
    const { confirmationCode } = req.body;

    try {
        // Busca al usuario por ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json(setSend("User not found"));
        }

        // Verifica el código de confirmación
        if (user.deleteCode !== confirmationCode) {
            return res.status(400).json(setSend("Invalid confirmation code"));
        }

        // Elimina al usuario de la base de datos
        await User.findByIdAndDelete(id);

        // Envía un correo electrónico de confirmación de eliminación
        await sendDeleteUserEmail(user.email);

        // Opcional: Limpia cualquier cookie relacionada con el usuario si es necesario
        res.cookie("token", "", {
            expires: new Date(0),
            httpOnly: true,
        });

        // Envía una respuesta de éxito
        res.status(200).json(setSend("User deleted successfully"));
    } catch (error) {
        console.error(error);
        res.status(500).json(setSend("Internal server error"));
    }
};

// Generar código de confirmación
const generateConfirmationCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let confirmationCode = '';

    for (let i = 0; i < 6; i++) {
        confirmationCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return confirmationCode;
};

// Cambiar contraseña de usuario
export const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;
    console.log('Received email:', email);
    console.log('Received newPassword:', newPassword);

    try {
        // Verificar que el usuario existe
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña del usuario
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};


