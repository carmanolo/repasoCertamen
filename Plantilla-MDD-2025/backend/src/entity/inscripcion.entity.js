/*"use strict";

import { EntitySchema } from "typeorm";

export const ElectivoEntity = new EntitySchema({
    name: "Electivo",
    tableName: "electivos",
    columns: {
        id_horario: {
            type: Number,
            primary: true,
            generated: true,
        },
        nombre_electivo: {
            type: String,
            unique: true,
            nullable: false,
        },
        cupos: {
            type: String,
            unique: true,
            nullable: false,
        },
        creditos: {
            type: String,
            unique: true,
            nullable: false,
        },
        id_usuario:{
            type: Number,
            primary: true,
            generated: true,
        },
        user_role: {
            type: String,
            foreign: true
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: () => "CURRENT_TIMESTAMP",
        },
    },
    relations:{
        usuarios:{
            type:"many-to-one",
            target: "user",
            joinColumn:{name:"id_usuario"}
        }
    }
});

export default ElectivoEntity;*/