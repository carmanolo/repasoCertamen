"use strict";

import { EntitySchema } from "typeorm";

export const ElectivoEntity = new EntitySchema({
    name: "Electivo",
    tableName: "electivos",
    columns: {
        cod_electivo: {
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
            primary: false,
            generated: false,
            nullable: false,
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
            target: "users",
            joinColumn:{name:"id_usuario"}
        }
    }
});

export default ElectivoEntity;