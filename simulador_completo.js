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

  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  };

  clientes.push(cliente);

  console.log('Cliente guardado:', cliente);
  console.log('Lista clientes:', clientes);

  mostrarTextoEnCaja('cedula','');
  mostrarTextoEnCaja('nombre','');
  mostrarTextoEnCaja('apellido','');
  mostrarTextoEnCaja('ingresos','');
  mostrarTextoEnCaja('egresos','');

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
                '<button type="button" onclick="seleccionarCliente(\'' + c.cedula + '\')">Actualizar</button>' +
              '</td>' +
              '</tr>';
  }

  tbody.innerHTML = filas;
}

function actualizarCliente(index) {
  console.log('actualizarCliente llamado para el índice:', index, 'cliente:', clientes[index]);
}

function guardarCliente() {

  if (
    !document.getElementById('cedula') ||
    !document.getElementById('nombre') ||
    !document.getElementById('apellido') ||
    !document.getElementById('ingresos') ||
    !document.getElementById('egresos')
  ) {
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


  let cliente = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    ingresos: ingresos,
    egresos: egresos
  };

  clientes.push(cliente);

  console.log('Cliente guardado:', cliente);
  console.log('Lista clientes:', clientes);

  mostrarTextoEnCaja('cedula', '');
  mostrarTextoEnCaja('nombre', '');
  mostrarTextoEnCaja('apellido', '');
  mostrarTextoEnCaja('ingresos', '');
  mostrarTextoEnCaja('egresos', '');
  pintarClientes();
}

function buscarCliente(cedula) {
  if (cedula === undefined || cedula === null) return null;
  let clave = String(cedula).trim();

  for (let i = 0; i < clientes.length; i++) {
    let c = clientes[i];
    if (String(c.cedula).trim() === clave) {
      return c;
    }
  }

  return null;
}

function seleccionarCliente(cedula) {
  let c = buscarCliente(cedula);

  if (!c) {
    console.error('seleccionarCliente: no se encontró cliente con cédula = ' + cedula);
    return;
  }

  clienteSeleccionado = c;
  mostrarTextoEnCaja('cedula', c.cedula);
  mostrarTextoEnCaja('nombre', c.nombre);
  mostrarTextoEnCaja('apellido', c.apellido || '');
  mostrarTextoEnCaja('ingresos', c.ingresos);
  mostrarTextoEnCaja('egresos', c.egresos);
}

function guardarCliente() {

  if (
    !document.getElementById('cedula') ||
    !document.getElementById('nombre') ||
    !document.getElementById('apellido') ||
    !document.getElementById('ingresos') ||
    !document.getElementById('egresos')
  ) {
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

  let existente = buscarCliente(cedula);

  if (existente) {
    existente.nombre = nombre;
    existente.apellido = apellido;
    existente.ingresos = ingresos;
    existente.egresos = egresos;

    console.log('Cliente actualizado:', existente);
  } else {

    let cliente = {
      cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      ingresos: ingresos,
      egresos: egresos
    };

    clientes.push(cliente);
    console.log('Cliente guardado:', cliente);
  }

  pintarClientes();
  limpiar();

  clienteSeleccionado = null;
}

function limpiar() {
  mostrarTextoEnCaja('cedula', '');
  mostrarTextoEnCaja('nombre', '');
  mostrarTextoEnCaja('apellido', '');
  mostrarTextoEnCaja('ingresos', '');
  mostrarTextoEnCaja('egresos', '');

  let ced = document.getElementById('cedula');
  if (ced) ced.focus();
}

function buscarClienteCredito() {
  let input = document.getElementById('buscarCedulaCredito');
  let cont = document.getElementById('datosClienteCredito');

  if (!input || !cont) {
    console.error('buscarClienteCredito: faltan elementos en el HTML');
    return;
  }

  let cedula = input.value.trim();

  if (!cedula) {
    cont.innerHTML = '<p>Ingrese una cédula para buscar.</p>';
    return;
  }

  let cliente = buscarCliente(cedula);

  if (cliente) {
    // CORRECCIÓN: asignar clienteSeleccionado aquí
    clienteSeleccionado = cliente;

    cont.innerHTML = `
      <h3>Datos del Cliente</h3>
      <p><strong>Cédula:</strong> ${cliente.cedula}</p>
      <p><strong>Nombre:</strong> ${cliente.nombre}</p>
      <p><strong>Apellido:</strong> ${cliente.apellido || ''}</p>
      <p><strong>Ingresos:</strong> ${cliente.ingresos}</p>
      <p><strong>Egresos:</strong> ${cliente.egresos}</p>
    `;
  } else {
    clienteSeleccionado = null;
    cont.innerHTML = `<p>Cliente no encontrado con cédula: ${cedula}</p>`;
  }
}

function calcularCredito() {
  let inputCed = document.getElementById('buscarCedulaCredito');
  let inputMonto = document.getElementById('montoCredito');
  let inputPlazo = document.getElementById('plazoCredito');
  let contResultado = document.getElementById('resultadoCredito');
  let btnSolicitar = document.getElementById('btnAsignarCredito');

  if (!inputCed || !inputMonto || !inputPlazo || !contResultado || !btnSolicitar) {
    console.error('calcularCredito: faltan elementos en el HTML (buscarCedulaCredito, montoCredito, plazoCredito, resultadoCredito, btnAsignarCredito)');
    return;
  }

  let funcionesNecesarias = ['calcularDisponible','calcularCapacidadPago','calcularInteresSimple','calcularTotalPagar','calcularCuotaMensual','aprobarCredito'];
  for (let i = 0; i < funcionesNecesarias.length; i++) {
    if (typeof window[funcionesNecesarias[i]] !== 'function') {
      console.error('calcularCredito: falta la función required ' + funcionesNecesarias[i] + ' (reutilizar functions.js)');
      contResultado.innerHTML = '<p>Error: funciones de cálculo no encontradas. Asegure cargar functions.js</p>';
      return;
    }
  }

  let cedula = (clienteSeleccionado && clienteSeleccionado.cedula) ? String(clienteSeleccionado.cedula).trim() : inputCed.value.trim();
  if (!cedula) {
    contResultado.innerHTML = '<p>Ingrese o seleccione una cédula antes de calcular.</p>';
    return;
  }

  let cliente = buscarCliente(cedula);
  if (!cliente) {
    contResultado.innerHTML = '<p>Cliente no encontrado con cédula: ' + cedula + '</p>';
    return;
  }

  let monto = Number(inputMonto.value);
  let plazoAnios = Number(inputPlazo.value);

  if (isNaN(monto) || monto <= 0) {
    contResultado.innerHTML = '<p>Ingrese un monto válido mayor que 0.</p>';
    return;
  }
  if (isNaN(plazoAnios) || plazoAnios <= 0) {
    contResultado.innerHTML = '<p>Ingrese un plazo válido (años) mayor que 0.</p>';
    return;
  }

  let ingresos = Number(cliente.ingresos) || 0;
  let egresos = Number(cliente.egresos) || 0;
  let montoDisponible = calcularDisponible(ingresos, egresos, 0, 0);

  let capacidadPago = calcularCapacidadPago(montoDisponible);
  let interes = calcularInteresSimple(monto, tasaInteres, plazoAnios);
  let totalPagar = calcularTotalPagar(monto, interes);
  let cuotaMensual = calcularCuotaMensual(totalPagar, plazoAnios);
  let aprobado = aprobarCredito(capacidadPago, cuotaMensual);

  montoCalculado = monto;
  plazoCalculado = plazoAnios;
  cuotaCalculada = cuotaMensual;
  creditoAprobado = aprobado;

  contResultado.innerHTML = `
    Capacidad de pago: ${Number(capacidadPago).toFixed(2)}<br>
    Total a pagar: ${Number(totalPagar).toFixed(2)}<br>
    Cuota mensual: ${Number(cuotaMensual).toFixed(2)}<br>
    RESULTADO: ${aprobado ? 'APROBADO' : 'RECHAZADO'}
  `;

  contResultado.className = aprobado ? 'aprobado' : 'rechazado';
  btnSolicitar.disabled = !aprobado;

  let btnAsignar = document.getElementById('btnAsignarCredito');
  if (btnAsignar) {
    btnAsignar.disabled = !aprobado;
  }

}

function asignarCredito() {
  if (!clienteSeleccionado) {
    console.error('asignarCredito: no hay cliente seleccionado');
    return;
  }

  if (!creditoAprobado) {
    console.error('asignarCredito: el crédito no fue aprobado');
    return;
  }

  let credito = {
    cedula:   clienteSeleccionado.cedula,
    nombre:   clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto:    montoCalculado,
    tasa:     tasaInteres,
    plazo:    plazoCalculado,
    cuota:    cuotaCalculada
  };

  creditos.push(credito);
  pintarCreditos(creditos);

  console.log('Crédito asignado y tabla actualizada');
  console.log('Total créditos registrados:', creditos.length);

  // Deshabilitar botones para evitar doble asignación
  let btnAsignar = document.getElementById('btnAsignarCredito');
  let btnSolicitar = document.getElementById('btnSolicitarCredito');
  if (btnAsignar)   btnAsignar.disabled = true;
  if (btnSolicitar) btnSolicitar.disabled = true;

  let resultado = document.getElementById('resultadoCredito');
  if (resultado) {
    resultado.innerHTML += '<br><strong>✔ Crédito asignado correctamente.</strong>';
  }
}

function buscarCreditos(cedula) {
  let clave = String(cedula).trim();
  let resultado = [];

  for (let i = 0; i < creditos.length; i++) {
    if (String(creditos[i].cedula).trim() === clave) {
      resultado.push(creditos[i]);
    }
  }

  return resultado;
}

function pintarCreditos(listado) {
  let tbody = document.getElementById('tablaCreditos');

  if (!tbody) {
    console.error('pintarCreditos: no se encontró tbody con id "tablaCreditos"');
    return;
  }

  if (listado.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7">No hay créditos registrados.</td></tr>';
    return;
  }

  let filas = '';

  for (let i = 0; i < listado.length; i++) {
    let c = listado[i];
    filas += '<tr>' +
              '<td>' + c.cedula            + '</td>' +
              '<td>' + c.nombre            + '</td>' +
              '<td>' + (c.apellido || '')  + '</td>' +
              '<td>' + c.monto             + '</td>' +
              '<td>' + c.tasa + '%'        + '</td>' +
              '<td>' + c.plazo + ' años'   + '</td>' +
              '<td>' + Number(c.cuota).toFixed(2) + '</td>' +
              '</tr>';
  }

  tbody.innerHTML = filas;
}

function buscarCreditosCliente() {
  let input = document.getElementById('buscarCedulaListado');

  if (!input) {
    console.error('buscarCreditosCliente: no se encontró el input con id "buscarCedulaListado"');
    return;
  }

  let cedula = input.value.trim();

  if (!cedula) {
    console.error('buscarCreditosCliente: ingrese una cédula para buscar');
    pintarCreditos([]);
    return;
  }

  let resultado = buscarCreditos(cedula);
  pintarCreditos(resultado);
}