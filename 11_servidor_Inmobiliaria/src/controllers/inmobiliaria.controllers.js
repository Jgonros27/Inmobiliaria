import conexion from "../mysql_conector.js"



export const getZonas= async (req,res)=>{
   try {
      //throw new Error();
      const [result] = await conexion.query("SELECT * FROM zonas");
   console.log(result);
   res.status(200).json(result);
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

export const getInmuebles= async (req,res)=>{
   try {
      console.log(req.params);
      const {zona, habitaciones, precio}=req.params;
   const [data] = await conexion.query("SELECT * FROM `inmuebles` WHERE zona=? and habitaciones=? and precio<=?  ",[zona, habitaciones, precio]);
   console.log(data);
   res.status(200).json({data}); //La respuesta que devuelve el servidor
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}


export const addReserva= async (req,res)=>{
   try {
      console.log(req.body);
    const {dni, inmueble}=req.body;
    const [result] = await conexion.query("INSERT INTO reservas VALUES(NULL,?,? ,CURDATE())",[dni,inmueble]);
    console.log(result);
   res.status(201).json({result}); //La respuesta que devuelve el servidor
   } catch (error) {
      res.status(500).json({
         message:"Error en el servidor"
      });
   }
   
}

