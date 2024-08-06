"use strict"

//instalar el paquete express
/**
 * El paquete express es el framework de back-end más popular de NODE
 * Proporciona un conjunto de herramientas para aplicaiones web, peticionees y respuestas
 * enrrutamiento y midleware para construir y desplegar aplicaciones a gran escala.
 */

import express  from "express";
import routerInmobiliaria from "./routes/inmobiliaria.routes.js";

import {PORT} from './config.js'
import cors from 'cors';

const app = express(); // creado el objeto con la instancia de express

//habilitar las cors

app.use(cors());

//middleware
app.use(express.json());
app.use(routerInmobiliaria);

// servidor a la escucha por el puerto 3000
//middleware, controlar si se pasa una ruta en la url
app.use((req,res)=>{
    res.status(404).json({
        message:"endpoint no encontado"
    })
})
app.listen(PORT,()=>{
    console.log("escuchando solicitud");
});