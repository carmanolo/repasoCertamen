"use strict";
import Electivo from "../entity/electivo.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { handleErrorClient,handleErrorServer, handleErrorClient, handleSuccess } from "../handlers/response.Handlers.js";
import { getElectivosService } from "../services/electivo.service.js";

export async function getElectivos(req, res) {
  try {
    const [electivo, errorElectivos]= await getElectivosService();
    if(errorElectivos) return handleErrorClient(res, 404 ,"no se encontraron electivos");

    if(electivo.length===0){
        handleSuccess(res,200,"electivo encontrado");
    }
  } catch (error) {
    handleErrorServer(res,500,"error al conseguir electivos")
  }
}

export async function getUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });
    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function updateUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { username, email, rut } = req.body;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    user.username = username || user.username;
    user.email = email || user.email;
    user.rut = rut || user.rut;

    // Guardar los cambios en la base de datos
    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar el usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const { role } = user;

    if (role === "administrador") {
      return res.status(400).json({
        message: "No se puede eliminar un usuario con rol de administrador"
      });
    }

    // Eliminar el usuario de la base de datos
    await userRepository.remove(user);

    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}