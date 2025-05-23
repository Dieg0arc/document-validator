let contadorRegistros = 0;

function validarCedula(cedula) {
    // Eliminar espacios y guiones
    cedula = cedula.replace(/[\s-]/g, '');

    // Verificar que solo contiene dígitos
    if (!/^\d+$/.test(cedula)) {
        return false;
    }

    if (cedula.length !== 10) {
        return false;
    }

    return true;
}

function validarTarjetaIdentidad(tarjeta) {
    tarjeta = tarjeta.replace(/[\s-]/g, '');

    // Verificar que solo contiene dígitos
    if (!/^\d+$/.test(tarjeta)) {
        return false;
    }

    if (tarjeta.length !== 10 && tarjeta.length !== 11) {
        return false;
    }

    return true;
}

function validarTelefono(telefono) {
    // Eliminar espacios, guiones y paréntesis
    telefono = telefono.replace(/[\s\-()]/g, '');

    if (telefono.startsWith('+57')) {
        telefono = telefono.substring(3);
    } else if (telefono.startsWith('57')) {
        telefono = telefono.substring(2);
    }

    // Verificar que solo contiene dígitos
    if (!/^\d+$/.test(telefono)) {
        return false;
    }

    if (telefono.length !== 10) {
        return false;
    }

    if (!/^(3|[1-2]|[4-8])/.test(telefono)) {
        return false;
    }

    return true;
}

function validarDocumento() {
    const tipo = document.getElementById('tipo-documento').value;
    const numero = document.getElementById('numero').value;
    let esValido = false;
    let tipoTexto = "";

    switch (tipo) {
        case 'cedula':
            esValido = validarCedula(numero);
            tipoTexto = "Cédula";
            break;
        case 'tarjeta':
            esValido = validarTarjetaIdentidad(numero);
            tipoTexto = "Tarjeta de Identidad";
            break;
        case 'telefono':
            esValido = validarTelefono(numero);
            tipoTexto = "Número de Teléfono";
            break;
    }

    const resultadoElement = document.getElementById('resultado-validacion');
    resultadoElement.className = 'resultado-validacion ' + (esValido ? 'valido' : 'invalido');
    resultadoElement.style.display = 'block';

    resultadoElement.innerHTML = `
        <p><strong>${tipoTexto}:</strong> ${numero}</p>
        <p><strong>Resultado:</strong> ${esValido ? 'VÁLIDO' : 'INVÁLIDO'}</p>
    `;

    agregarRegistro(tipo, numero, esValido);
}

function agregarRegistro(tipo, entrada, esValido) {
    contadorRegistros++;
    const tbody = document.getElementById('registro-validaciones');
    const fila = document.createElement('tr');
    fila.className = esValido ? 'test-success' : 'test-fail';

    let tipoTexto = tipo;
    switch (tipo) {
        case 'cedula':
            tipoTexto = "cedula";
            break;
        case 'tarjeta':
            tipoTexto = "tarjeta";
            break;
        case 'telefono':
            tipoTexto = "telefono";
            break;
    }

    fila.innerHTML = `
        <td>${contadorRegistros}</td>
        <td>${tipoTexto}</td>
        <td>${entrada}</td>
        <td>${esValido ? 'Válido' : 'Inválido'}</td>
    `;

    tbody.appendChild(fila);
}

// Exportar funciones para pruebas (solo en Node.js)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarCedula,
        validarTarjetaIdentidad,
        validarTelefono,
        validarDocumento
    };
}
