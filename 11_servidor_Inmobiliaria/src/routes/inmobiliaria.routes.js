"use strict"

import { Router } from "express"
import { getZonas, getInmuebles, addReserva } from "../controllers/inmobiliaria.controllers.js";
import { validacion } from "../validators/inmobiliaria.validator.js";

const router = Router();

router.get("/zonas",getZonas);

router.get("/inmuebles/:zona/:habitaciones/:precio",getInmuebles);

router.post("/reservas",validacion,addReserva);


export default router; //exportamos