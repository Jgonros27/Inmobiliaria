let boton = null; // Variable para el botón de grabar
let dni = ""; // Variable para almacenar el DNI

window.addEventListener("DOMContentLoaded", () => {
  validarForm(); // Llamada a la función de validación del formulario
  mostrarZonas(); // Llamada a la función para mostrar zonas
  });


  // Función para validar el formulario utilizando jQuery Validate
  const validarForm = () => {

     // Se define un método de validación personalizado para expresiones regulares
    $.validator.addMethod("regex", function (value, element, regexp) {
      const re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },"formato no valido");
    
    // Otro método de validación personalizado para verificar la letra del DNI
    $.validator.addMethod("letra", function (element) {
        let numeroDNI = parseInt(element.substr(0,8));
        let letraDNI = element.substr(-1);
        let cadena = "TRWAGMYFPDXBNJZSQVHLCKE";
        let posicion = numeroDNI % 23;
        letraDNICorrecta = cadena[posicion];
        if (letraDNI == letraDNICorrecta) {
            return true;
        }else{
            return false;
        }
      },"letra no válida");

      // Configuración de la validación del formulario
    $(".formInmo").validate({
      errorElement: "em",
      errorPlacement: function (error, element) {
        error.addClass("invalid-feedback");
  
        if (element.prop("type") === "radio") {
          error.insertAfter(element.parent("div").parent("div"));
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        if ($(element).prop("type") !== "radio") {
            $(element).addClass("is-invalid").removeClass("is-valid");
        }
      },
      unhighlight: function (element, errorClass, validClass) {
        if ($(element).prop("type") !== "radio") {
            $(element).addClass("is-valid").removeClass("is-invalid");
        }
      },
      rules: {
        dni: {
          required: true,
          regex: /^[0-9]{8}[A-Z]$/,
          letra: true

        },
        zona: "required",
        numhab: "required",
        precio: "required",
      },
      
      messages: {
        dni: {
          required: "El Campo es requerido",
        },
      },

      //para especificar que haacer al enviar el formulario
      submitHandler: (form) => {
        buscar();
        dni = $("#dni").val();
      },
    });
  };


  // Función para cargar select de zonas 
  function mostrarZonas() {
    $.ajax({
        url: "http://localhost:3000/zonas",
        type: "GET",
        dataType:"json"
    })
        .done(function (responseText) {
            //cargar en el select
            console.log(responseText);
            $(responseText).each((ind, ele) => {
                $("#zona").append("<option value=" + ele.idzona + ">" + ele.descripcion + "</option>")
            })
        })
        //en caso de fallo
        .fail(function (responseText, textStatus, xhr) {
            Swal.fire({
                icon: "error",
                title: "Error " + xhr.status,
                text: xhr.statusText
            })
        })
    
  }

  const buscar=async()=>{
    // Función para realizar la búsqueda de inmuebles utilizando DataTables
    if ($.fn.DataTable.isDataTable(".table")) {
      // Se destruye y limpia la tabla DataTable antes de crear una nueva
      $(".table").DataTable().clear().destroy();
    }
// Configuración de DataTables, incluyendo AJAX para cargar datos de forma asíncrona
    $('.table').DataTable({
     'ajax':{
        url:`http://localhost:3000/inmuebles/${$("#zona").val()}/${$('input[name="numhab"]:checked').val()}/${$("#precio").val()}`,
        type:'GET',
        dataType:'json'
     },
     columns:[{
         data: "idinmuebles"
     },
     {
         data: "domicilio"
     },
     {
         data: "precio"
     }
     ],
     'language':{
         url:'../assets/librerias/DataTables/es-ES.json',
         select:{
          rows:{
              _:'Ha seleccionado %d filas',
              0:'Haga click en una fila para seleccionarla',
              1:'solo 1 fila sleccionada'
          },
          columns:{
            _:'',
            0:'',
            1:''
          },
          cells:{
            _:'',
            0:'',
            1:''
          }
      }
     },
     'sPaginationType':'full_numbers',
    
     "select":{
        style:'multi',
             
    }
     
 });

  //const dataTable = $('.table').DataTable();
  //const hasRows = dataTable.rows().count() > 0;

// Se verifica si ya existe el botón de grabar, y si no, se llama a la función para crearlo
 if (boton == null) {
  grabar();
 }
}

function grabar() {
  // Función para crear el botón de grabar
  boton = $("<button>");
  $(boton).attr("id", "btn-grabar");
  $(boton).addClass("boton btn btn-primary btn-lg");
  $(boton).text("Grabar")
  $(".capaGrabar").append(boton);
  // Se asigna un evento al botón para realizar acciones al hacer clic
  $(boton).on("click",()=>{

    const selectedRows = $('.table').DataTable().rows({ selected: true }).data();
    
    console.log(selectedRows[0].idinmuebles);
    let fallo = 0;

    if (selectedRows.length > 0) {
      for (let index = 0; index < selectedRows.length; index++) {
        
        if (reservas(selectedRows[index].idinmuebles)==true) {
          fallo++;
        }
      }
      if (fallo === 0) {
        mensaje('Reservas guardadas con éxito', "success");
        limpiar();
      }else{
        mensaje('Error al guardar las reservas', "error");
      }
      
    } else {
        mensaje('No hay inmuebles seleccionados para reserva.',"error");
    }
  })
}

// Función para mostrar mensajes utilizando SweetAlert
function mensaje(texto,icono) {
  Swal.fire({
    position: "center",
    title: texto,
    icon: icono,
    showConfirmButton: true,
  })
}

// Función para realizar reservas utilizando una solicitud POST con Axios
async function reservas(idInmueble) {
  const data={
      dni:dni,
      inmueble:idInmueble
  };

    try {
        await axios.post('http://localhost:3000/reservas', data);
        return false;
    } catch (error) {
      return true;
    }
}

// Función para limpiar campos y reiniciar variables
function limpiar() {
  $("#dni").val("");
  $("#zona").val("");
  $("#precio").val("");
  $('input[name="numhab"]:checked').prop("checked",false);
  $("#btn-grabar").remove();
  boton=null;
  $(".table").DataTable().clear().destroy();
  $("#dni").removeClass("is-valid");
  $("#zona").removeClass("is-valid");
  $("#precio").removeClass("is-valid");
}


