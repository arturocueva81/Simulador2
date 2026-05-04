
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

// Recupera el componente
let componente = document.getElementById("parametros");
// Recupera la lista de clases del componente
let listaClass = componente.classList;
// Agrega o elimina la clase
listaClass.add("activa");
listaClass.remove("activa");

function ocultarSecciones() {
  let secciones = document.getElementsByTagName('section');
  for (let i = 0; i < secciones.length; i++) {
    let componente = secciones[i];
    let listaClass = componente.classList;
    listaClass.remove('activa');
  }
}

function mostrarSeccion(id) {
  ocultarSecciones();

  let componente = document.getElementById(id);

  if (componente) {
    let listaClass = componente.classList;
    listaClass.add('activa');
  } else {
    console.error("mostrarSeccion: no existe ninguna sección con id = " + id);
  }
}

function guardarTasa() {

  let input = document.getElementById('tasaInteres');
  let mensaje = document.getElementById('mensajeTasa');

  if (!input || !mensaje) {
    console.error('guardarTasa: falta el input o el elemento mensajeTasa en el HTML');
    return;
  }

  let valor = Number(input.value);

  if (isNaN(valor)) {
    mensaje.className = 'rechazado';
    mensaje.textContent = 'Ingrese un valor numérico para la tasa';
    return;
  }

  if (valor >= 10 && valor <= 20) {
    tasaInteres = valor;

    mensaje.className = 'aprobado';
    mensaje.textContent = 'Tasa configurada correctamente: ' + valor + '%';
  } else {
    mensaje.className = 'rechazado';
    mensaje.textContent = 'La tasa debe estar entre 10% y 20%';
  }
}

mostrarSeccion("parametros");

