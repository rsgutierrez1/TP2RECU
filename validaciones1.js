function resetForm() {
    document.getElementById('formulario').reset();
  }

  function mostrarError(string) {
    let alerta = document.getElementById("error");
    alerta.textContent = string;
    alerta.style.display = 'block';
  }

  function ocultarError() {
    let alerta = document.getElementById("error");
    alerta.style.display = "none";
  }

function validarCampotexto(nombre){
    const regexLetras = /^[a-zA-Z]+$/;
    if (nombre.trim() !== ''){
      if (!regexLetras.test(nombre)){
        mostrarError('El campo "Nombre" debe contener letras solamente.');
        return false;
      }
      ocultarError();
      return true;
    }





}

function validarCampoNum(nombre){
  const regexNumeros = /^\d+$/;
  if (nombre.trim() !== ''){
    if (!regexNumeros.test(nombre)){
      mostrarError('El campo "telefono" debe contener numeros solamente.');
      return false;
    }
    ocultarError();
    return true;
  }
}

function validarCamposVacios(nombre, telefono,sueldo) {
  if (nombre.length === 0 || telefono.length === 0 || sueldo.length === 0 ) {
    mostrarError('Los campos nombre, telefono y sueldo son obligatorios');
    return false;
  } else {
    ocultarError();
    return true;
  }
}

function agregarDatos(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const empresa = document.getElementById('empresa').value;
    const sueldo = document.getElementById('sueldo').value;
    const mensaje = document.getElementById('mensaje').value;  
  

    if (validarCamposVacios(nombre, telefono,sueldo))
    {   if (validarCampotexto(nombre))
          { if (sueldo>250000){
          
            const tabla = document.getElementById('tabla');
            const nuevaFila = tabla.insertRow(-1); // Inserto una nueva fila al final de la tabla
        
            const celdaNombre = nuevaFila.insertCell(0); // Inserto una nueva celda y le agrego contenido
            celdaNombre.textContent = nombre;
        
            const celdaTelefono = nuevaFila.insertCell(1);
            celdaTelefono.textContent = telefono;
      
            const celdaEmail = nuevaFila.insertCell(2);
            celdaEmail.textContent = email;
      
            const celdaEmpresa = nuevaFila.insertCell(3);
            celdaEmpresa.textContent = empresa;
      
            const celdaMensaje = nuevaFila.insertCell(4);
            celdaMensaje.textContent = mensaje;

            //Sueldo en pesos
            const celdaSueldo = nuevaFila.insertCell(5);
            celdaSueldo.textContent = parseFloat(sueldo) + 'ARG';
        
            //Sueldo en dolares
            const sueldoUSD = sueldo / 493;
            const celdaSueldoUSD = nuevaFila.insertCell(5);
            celdaSueldoUSD.textContent = sueldoUSD.toFixed(2) + 'USD';
        
            resetForm();
          }
          else{resetForm();
          }
      }
        else{
        validarCampotexto(nombre);
        return false;
      }
      
    } validarCamposVacios(nombre,telefono,sueldo);
  }



    function ordenarTabla() {
        let ordenSeleccion = document.getElementById('ordenar');
        let cuerpoTabla = document.getElementById('cuerpoTabla');
        let filas = cuerpoTabla.getElementsByTagName('tr');
      
        // Convierto las filas en un array para poder utilizar el array sort
        let filasArray = Array.from(filas);
      
        // Elimino la opcion default asi no pueden volver a seleccionarla
        let optionDefault = ordenSeleccion.querySelector('option[value="default"]');
        if (optionDefault) {
          optionDefault.remove();
        }
      
        // capturo el valor del section
        let seleccion = ordenSeleccion.value;
      
        switch (seleccion) {
          case 'default':
            // Por defecto no realiza ningun cambio
            break;
      
          case 'nombre':
            filasArray.sort(function (a, b) {
              let nombreA = a.cells[0].textContent.toUpperCase();
              let nombreB = b.cells[0].textContent.toUpperCase();
              return nombreA.localeCompare(nombreB);
            });
            break;
      
          case 'empresa':
            filasArray.sort(function (a, b) {
              let empresaA = a.cells[3].textContent.toUpperCase();
              let empresaB = b.cells[3].textContent.toUpperCase();
              return empresaA.localeCompare(empresaB);
            });
            break;
      
          case 'sueldodesc':
            filasArray.sort(function (a, b) {
              let sueldoA = parseFloat(a.cells[5].textContent);
              let sueldoB = parseFloat(b.cells[5].textContent);
              return sueldoB - sueldoA;
            });
            break;
      
          case 'sueldoasc':
            filasArray.sort(function (a, b) {
              let sueldoA = parseFloat(a.cells[5].textContent);
              let sueldoB = parseFloat(b.cells[5].textContent);
              return sueldoA - sueldoB;
            });
            break;
        }
      
        // Elimino las filas que existen en la tabla
        while (cuerpoTabla.firstChild) {
          cuerpoTabla.removeChild(cuerpoTabla.firstChild);
        }
      
        // Agrego las filas nuevamente pero ordenadas
        filasArray.forEach(function (fila) {
          cuerpoTabla.appendChild(fila);
        });
      }
    