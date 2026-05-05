
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
//let componente = document.getElementById("parametros");
// Recupera la lista de clases del componente
//let listaClass = componente.classList;
// Agrega o elimina la clase
//listaClass.add("activa");
//listaClass.remove("activa");

//document.getElementById('nombre') 
//document.getElementById('ingresos') 
//document.getElementById('nombre').value

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

  let valor = recuperarInt('tasaInteres');

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


function guardarCliente() {
if (
  !document.getElementById('cedula') ||
  !document.getElementById('nombre') ||
  !document.getElementById('apellido') ||
  !document.getElementById('ingresos') ||
  !document.getElementById('egresos')) {
    console.error('guardarCliente: faltan inputs en el HTML (cedula/nombre/apellido/ingresos/egresos)');
    return;
  }

  let cedula = recuperarTexto('cedula').trim();
  let nombre = recuperarTexto('nombre').trim();
  let apellido = recuperarTexto('apellido').trim();
  let ingresos = recuperarFloat('ingresos');
  let egresos = recuperarFloat('egresos');

  if (!cedula || !nombre) {
    console.error('guardarCliente: la cédula y el nombre son obligatorios');
    return;
  }

  if (isNaN(ingresos)) ingresos = 0;
  if (isNaN(egresos)) egresos = 0;

  var cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  };

  clientes.push(cliente);

  console.log('Cliente guardado:', cliente);
  console.log('Lista clientes:', clientes);

  mostrarTextoEnCaja = ('cedula','');
  mostrarTextoEnCaja = ('nombre','');
  mostrarTextoEnCaja = ('apellido','');
  mostrarTextoEnCaja = ('ingresos','');
  mostrarTextoEnCaja = ('egresos','');

  pintarClientes();
}

function pintarClientes() {
  let tbody = document.getElementById('tablaClientes');
  if (!tbody) {
    console.error('pintarClientes: no se encontró tbody con id "tablaClientes"');
    return;
  }

  let filas = '';

  for (let i = 0; i < clientes.length; i++) {
    let c = clientes[i];
    filas += '<tr>' +
              '<td>' + c.cedula + '</td>' +
              '<td>' + c.nombre + '</td>' +
              '<td>' + (c.apellido || '') + '</td>' +
              '<td>' + c.ingresos + '</td>' +
              '<td>' + c.egresos + '</td>' +
              '<td>' +
                '<button type="button" onclick="actualizarCliente(' + i + ')">Actualizar</button>' +
              '</td>' +
              '</tr>';
  }

  tbody.innerHTML = filas;
}


function actualizarCliente(index) {
  console.log('actualizarCliente llamado para el índice:', index, 'cliente:', clientes[index]);
}


//mostrarSeccion("parametros");

