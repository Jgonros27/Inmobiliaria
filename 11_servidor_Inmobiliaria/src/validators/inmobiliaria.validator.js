"use strict";
import {check, validationResult} from "express-validator"


const esDNI = (value) => {
    const dniRegex = /^[0-9]{8}[A-Z]$/;
    if (!dniRegex.test(value)) {
      return false;
    }
  
    const indiceLetra = parseInt(value.substring(0, 8)) % 23;
    const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const letraEsperada = letrasValidas.charAt(indiceLetra);
  
    return value.charAt(8) === letraEsperada;
  };


  //he intentado hacer arriba una validacion para el dni peroo no me ha dejado implementarsela
export const validacion=[
    //validar el nombre del cliente
    check("dni").exists().notEmpty().matches(/^[0-9]*8[A-Z]$/).withMessage("El dni no debe estar vacio, debe tener 8 numeros y una letra mayuscula al final"),
    check("inmueble").exists().notEmpty().isNumeric().withMessage("El inmueble no debe estar vacio, y de ser numérico"),
    
    (req,res,next)=>{
        const errors = validationResult(req); //Array tantas filas como campos valide
        if (!errors.isEmpty()) {
            res.status(400).json({
                errors:errors.array() //Devolver el mensaje
            })
        } else { //todo correcto
            next(); //Sigue la ejecución del siguiente middleware
        }
    }
]