"use strict";

export function handleSuccess(res,statusCode,message,data={}){

    return res.status(statusCode).json({
        status:"éxito",
        message,
        data
    });
}

export function handleErrorClient(res,statusCode,message,details={}){
    return res.status(statusCode).json({
        status:"error",
        message,
        details
    });
}

export function handleErrorServer(res,statusCode,message){
    return res.status(statusCode).json({
        status:"error interno del servidor",
        message
    });
}

