// tests.js

// Definición del plan de pruebas según el formato requerido
const planPruebas = {
    objetivo: "Asegurar que la aplicación de validación de documentos funcione correctamente para diferentes tipos de documentos y formatos.",
    alcance: [
        "Validación de Cédula de Ciudadanía",
        "Validación de Tarjeta de Identidad",
        "Validación de Número de Teléfono"
    ],
    recursos: {
        tiempoEstimado: "30 minutos",
        herramientas: "Navegador web",
        equipo: "Computadora con sistema operativo Windows/Mac"
    },
    casosPrueba: [
        {
            id: "TC-01",
            funcion: "Validación de Cédula",
            entradas: "1234567890",
            accion: "Validar",
            resultadoEsperado: "Válido",
            resultadoObtenido: "",
            estado: ""
        },
        {
            id: "TC-02",
            funcion: "Validación de Cédula (formato incorrecto)",
            entradas: "123456000000",
            accion: "Validar",
            resultadoEsperado: "Inválido",
            resultadoObtenido: "",
            estado: ""
        },
        {
            id: "TC-03",
            funcion: "Validación de Tarjeta de Identidad",
            entradas: "9876543210",
            accion: "Validar",
            resultadoEsperado: "Válido",
            resultadoObtenido: "",
            estado: ""
        },
        {
            id: "TC-04",
            funcion: "Validación de Tarjeta de Identidad (longitud incorrecta)",
            entradas: "987654321",
            accion: "Validar",
            resultadoEsperado: "Inválido",
            resultadoObtenido: "",
            estado: ""
        },
        {
            id: "TC-05",
            funcion: "Validación de Teléfono",
            entradas: "3001234567",
            accion: "Validar",
            resultadoEsperado: "Válido",
            resultadoObtenido: "",
            estado: ""
        },
        {
            id: "TC-06",
            funcion: "Validación de Teléfono (longitud incorrecta)",
            entradas: "300123456-",
            accion: "Validar",
            resultadoEsperado: "Inválido",
            resultadoObtenido: "",
            estado: ""
        }
    ],
    riesgos: [
        "Si la aplicación no maneja correctamente los formatos especiales, podría validar documentos incorrectos.",
        "Podría haber problemas con la validación de números de teléfono internacionales."
    ],
    entorno: {
        sistemaOperativo: "Windows 10/11, macOS",
        navegador: "Chrome, Firefox, Safari versiones recientes"
    },
    criteriosAceptacion: "El software será considerado exitoso si todos los casos de prueba pasan, es decir, si las validaciones arrojan los resultados correctos para documentos válidos e inválidos."
};

function ejecutarPruebas() {
    const panelPruebas = document.getElementById('panel-pruebas');
    
    // Mostrar información del plan de pruebas
    let contenidoHTML = `
        <div class="plan-info">
            <h3>Plan de Pruebas</h3>
            <p><strong>Objetivo:</strong> ${planPruebas.objetivo}</p>
            <p><strong>Alcance:</strong></p>
            <ul>
                ${planPruebas.alcance.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        
        <h3>Casos de Prueba</h3>
        <div style="overflow-x: auto;">
            <table style="table-layout: fixed; width: 100%;">
                <thead>
                    <tr>
                        <th style="width: 8%;">ID</th>
                        <th style="width: 22%;">Función a probar</th>
                        <th style="width: 20%;">Entradas</th>
                        <th style="width: 15%;">Acción</th>
                        <th style="width: 15%; writing-mode: horizontal-tb !important;">Resultado esperado</th>
                        <th style="width: 15%; writing-mode: horizontal-tb !important;">Resultado obtenido</th>
                        <th style="width: 15%; writing-mode: horizontal-tb !important;">Estado</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // Ejecutar cada caso de prueba
    planPruebas.casosPrueba.forEach(caso => {
        // Determinar la función y ejecutar la prueba
        let resultado;
        let tipo;
        
        if (caso.funcion.includes("Cédula")) {
            resultado = validarCedula(caso.entradas);
            tipo = "cedula";
        } else if (caso.funcion.includes("Tarjeta")) {
            resultado = validarTarjetaIdentidad(caso.entradas);
            tipo = "tarjeta";
        } else if (caso.funcion.includes("Teléfono")) {
            resultado = validarTelefono(caso.entradas);
            tipo = "telefono";
        }
        
        // Establecer el resultado obtenido
        caso.resultadoObtenido = resultado ? "Válido" : "Inválido";
        
        // Determinar el estado (Éxito/Fallo)
        caso.estado = caso.resultadoEsperado === caso.resultadoObtenido ? "Éxito" : "Fallo";
        
        // Generar fila de la tabla
        const claseFila = caso.estado === "Éxito" ? 'test-success' : 'test-fail';
        
        contenidoHTML += `
            <tr class="${claseFila}">
                <td>${caso.id}</td>
                <td>${caso.funcion}</td>
                <td>${caso.entradas}</td>
                <td>${caso.accion}</td>
                <td style="writing-mode: horizontal-tb !important;">${caso.resultadoEsperado}</td>
                <td style="writing-mode: horizontal-tb !important;">${caso.resultadoObtenido}</td>
                <td style="writing-mode: horizontal-tb !important;">${caso.estado}</td>
            </tr>
        `;
        
        // Registrar el caso de prueba en el historial
        agregarRegistro(tipo, caso.entradas, resultado);
    });
    
    contenidoHTML += `
            </tbody>
        </table>
        </div>
        
        <div class="plan-info">
            <h3>Criterios de Aceptación</h3>
            <p>${planPruebas.criteriosAceptacion}</p>
            
            <h3>Riesgos Identificados</h3>
            <ul>
                ${planPruebas.riesgos.map(riesgo => `<li>${riesgo}</li>`).join('')}
            </ul>
        </div>
    `;
    
    panelPruebas.innerHTML = contenidoHTML;
}