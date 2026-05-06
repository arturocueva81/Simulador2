function calcularDisponible(ingresos, arriendo, alimentacion, varios) {
    let egresos = arriendo + alimentacion + varios;
    let disponible = ingresos - egresos;
    if (disponible < 0) {
        return 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible) {
    return montoDisponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
    return plazoAnios * monto * (tasa / 100);
}

function calcularTotalPagar(monto, interes) {
    return monto + interes + 100;
}

function calcularCuotaMensual(total, plazoAnios) {
    let meses = plazoAnios * 12;
    return total / meses;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
    return capacidadPago >= cuotaMensual;
}