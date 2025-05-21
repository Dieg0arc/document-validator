// ui-tests.js

// Objeto para las pruebas de UI
const uiTests = {
    specs: [
      {
        id: "UI-01",
        descripcion: "El botón 'Validar' muestra correctamente el resultado para una cédula válida",
        pasos: [
          "Seleccionar 'Cédula de Ciudadanía' en el dropdown",
          "Ingresar '1234567890' en el campo de texto",
          "Hacer clic en el botón 'Validar'"
        ],
        resultadoEsperado: "Se muestra un mensaje de 'VÁLIDO' con fondo verde",
        resultadoObtenido: "",
        estado: ""
      },
      {
        id: "UI-02",
        descripcion: "El botón 'Validar' muestra correctamente el resultado para una cédula inválida",
        pasos: [
          "Seleccionar 'Cédula de Ciudadanía' en el dropdown",
          "Ingresar '123456789' en el campo de texto",
          "Hacer clic en el botón 'Validar'"
        ],
        resultadoEsperado: "Se muestra un mensaje de 'INVÁLIDO' con fondo rojo",
        resultadoObtenido: "",
        estado: ""
      },
      {
        id: "UI-03",
        descripcion: "El registro de validaciones muestra correctamente una nueva entrada",
        pasos: [
          "Seleccionar 'Teléfono' en el dropdown",
          "Ingresar '3001234567' en el campo de texto",
          "Hacer clic en el botón 'Validar'"
        ],
        resultadoEsperado: "Se agrega una nueva fila a la tabla de registro con los datos correctos",
        resultadoObtenido: "",
        estado: ""
      },
      {
        id: "UI-04",
        descripcion: "El botón 'Ejecutar Pruebas' muestra el plan de pruebas completo",
        pasos: [
          "Hacer clic en el botón 'Ejecutar Pruebas'"
        ],
        resultadoEsperado: "Se muestra el panel con el objetivo, alcance y casos de prueba",
        resultadoObtenido: "",
        estado: ""
      }
    ],
    
    // Método para ejecutar las pruebas de UI manualmente
    ejecutarPruebasUI: function() {
      const panelPruebas = document.getElementById('panel-pruebas');
      
      let contenidoHTML = `
        <div class="plan-info">
          <h3>Pruebas de Interfaz de Usuario</h3>
          <p>Estas pruebas deben ser verificadas manualmente siguiendo los pasos indicados.</p>
        </div>
        
        <div style="overflow-x: auto;">
          <table style="table-layout: fixed; width: 100%;">
            <thead>
              <tr>
                <th style="width: 10%;">ID</th>
                <th style="width: 20%;">Descripción</th>
                <th style="width: 35%;">Pasos</th>
                <th style="width: 20%; writing-mode: horizontal-tb !important;">Resultado esperado</th>
                <th style="width: 15%; writing-mode: horizontal-tb !important;">Estado</th>
              </tr>
            </thead>
            <tbody>
      `;
      
      this.specs.forEach(spec => {
        contenidoHTML += `
          <tr>
            <td>${spec.id}</td>
            <td>${spec.descripcion}</td>
            <td>
              <ol>
                ${spec.pasos.map(paso => `<li>${paso}</li>`).join('')}
              </ol>
            </td>
            <td style="writing-mode: horizontal-tb !important;">${spec.resultadoEsperado}</td>
            <td style="writing-mode: horizontal-tb !important;">
              <select class="test-status" data-id="${spec.id}">
                <option value="">Seleccionar</option>
                <option value="Éxito">Éxito</option>
                <option value="Fallo">Fallo</option>
                <option value="Pendiente">Pendiente</option>
              </select>
            </td>
          </tr>
        `;
      });
      
      contenidoHTML += `
            </tbody>
          </table>
        </div>
        <div class="actions" style="margin-top: 20px;">
          <button id="guardar-resultados">Guardar Resultados</button>
        </div>
      `;
      
      panelPruebas.innerHTML = contenidoHTML;
      
      // Agregar evento para guardar resultados
      document.getElementById('guardar-resultados').addEventListener('click', function() {
        const selectores = document.querySelectorAll('.test-status');
        selectores.forEach(selector => {
          const id = selector.getAttribute('data-id');
          const estado = selector.value;
          const spec = uiTests.specs.find(s => s.id === id);
          if (spec) {
            spec.estado = estado;
          }
        });
        
        // Mostrar resultados
        let resultados = {
          total: uiTests.specs.length,
          exito: uiTests.specs.filter(s => s.estado === 'Éxito').length,
          fallo: uiTests.specs.filter(s => s.estado === 'Fallo').length,
          pendiente: uiTests.specs.filter(s => s.estado === 'Pendiente' || s.estado === '').length
        };
        
        alert(`Resultados guardados:\nTotal: ${resultados.total}\nÉxito: ${resultados.exito}\nFallo: ${resultados.fallo}\nPendiente: ${resultados.pendiente}`);
      });
    }
  };
  
  // Función para cambiar entre pruebas funcionales y de UI
  function cambiarTipoPrueba() {
    const tipoPrueba = document.getElementById('tipo-prueba').value;
    if (tipoPrueba === 'funcional') {
      ejecutarPruebas(); // La función original de pruebas
    } else if (tipoPrueba === 'ui') {
      uiTests.ejecutarPruebasUI();
    }
  }