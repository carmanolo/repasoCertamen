"use strict";
import ElectivoEntity from "../entity/electivo.entity.js";
import { AppDataSource } from "../config/configDb.js";
import { comparePassword, encryptPassword } from "../helpers/bcrypt.helper.js";

export async function getElectivoService() {
  try {
    const { cod_electivo } = params;

    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);

    const electivoFound = await electivoRepository.findOne({
      where: [{ cod_electivo: cod_electivo }],relations:{usuarios:true},
    });

    if (!electivoFound) return [null, "Electivo no encontrado"];


    //const { password, ...electivoData } = electivoFound
  } catch (error) {
    console.error("Error obtener el electivo:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function getElectivosService() {
  try {
    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);

    const electivos = await electivoRepository.find({relations:{usuarios:true}});

    if (!electivos || electivos.length === 0) return [null, "No hay electivos"];

    //const electivosData = electivos.map(({ password, ...electivo }) => electivo);

    //return [electivosData, null];
    console.log("prueba exitosa");
  } catch (error) {
    console.error("Error al obtener los electivos:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateElectivoService(params, body) {
  try {
    const { cod_electivo } = params;

    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);

    const electivoFound = await electivoRepository.findOne({
      where: [{ cod_electivo:cod_electivo} ],
    });

    if (!electivoFound) return [null, "electivo no encontrado"];

    const existingElectivo = await electivoRepository.findOne({
      where: [{ cod_electivo:cod_electivo}],relations:{usuarios:true},
    });

    if (existingElectivo && existingElectivo.cod_electivo !== electivoFound.cod_electivo) {
      return [null, "Ya existe un electivo con el mismo ID"];
    }

    const dataElectivoUpdate = {
      nombre_electivo: body.nombre_electivo,
      cupos: body.cupos,
      creditos: body.creditos
    };


    await electivoRepository.update({ cod_electivo: electivoFound.cod_electivo }, dataElectivoUpdate);

    const electivoData = await electivoRepository.findOne({
      where: { cod_electivo: electivoFound.cod_electivo },
    });

    if (!electivoData) {
      return [null, "Electivo no encontrado después de actualizar"];
    }

    //const { password, ...userUpdated } = userData;

    //return [userUpdated, null];
  } catch (error) {
    console.error("Error al modificar un electivo:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteElectivoService(params) {
  try {
    const { cod_electivo} = params;

    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);

    const electivoFound = await electivoRepository.findOne({
      where: [{ cod_electivo: cod_electivo }],
    });

    if (!electivoFound) return [null, "electivo no encontrado"];


    await electivoRepository.remove(electivoFound);


  } catch (error) {
    console.error("Error al eliminar un electivo:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createElectivoService(body) {
  try {
    const electivoRepository = AppDataSource.getRepository(ElectivoEntity);
    const existingElectivo = await electivoRepository.findOne({
      where: [{ cod_electivo: body.cod_electivo }],
    }); 

    if (existingElectivo) {
      return [null, "Ya existe un electivo con el mismo id"];
    }


    const newElectivo = electivoRepository.create({
      nombre: body.nombre_electivo,
      cupos: body.cupos,
      creditos: body.creditos,
    });

    await electivoRepository.save(newElectivo);


  } catch (error) {
    console.error("Error al crear un electivo:", error);
    return [null, "Error interno del servidor"];
  }
}