

````markdown
#  Validador de Documentos

Este es un sistema web desarrollado para validar diferentes tipos de documentos como cédulas, tarjetas de identidad y teléfonos, mostrando los resultados en una tabla interactiva.

---

##  Inicio del Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/validador-documentos.git
   cd validador-documentos
````

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia la aplicación localmente:

   ```bash
   npm start
   ```

   Esto abrirá la aplicación en tu navegador (por ejemplo, en `http://localhost:5500/`).

---

##  Pruebas Funcionales

Las pruebas funcionales están organizadas por tipo: unitarias, de integración y de sistema. Todas se ejecutan con [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/) y [JSDOM](https://github.com/jsdom/jsdom).

### 1. Prueba Unitaria

 Archivo: `unit-tests.js`
 Función: `validarCedula()`

Evalúa el comportamiento aislado de la función que valida cédulas. Se comprueba que solo acepte números, tenga 10 dígitos y rechace caracteres inválidos.

```bash
npx mocha unit-tests.js
```

---

### 2. Prueba de Integración

 Archivo: `integration-tests.js`
 Función: `validarDocumento()`

Verifica la interacción entre el DOM y la lógica de negocio, asegurando que se tomen los valores desde la interfaz y se muestre el resultado correspondiente.

```bash
npx mocha integration-tests.js
```

---

### 3. Prueba de Sistema (End-to-End)

 Archivo: `system-tests.js`
 Flujo completo del usuario

Simula el proceso completo: selección de documento, ingreso de datos, clic en “Validar” y verificación del mensaje y registro en la tabla.

```bash
npx mocha system-tests.js
```

---

##  Pruebas No Funcionales

Estas pruebas analizan el rendimiento, eficiencia, accesibilidad y buenas prácticas del sistema.

### 1. Carga Simultánea (Apache JMeter)

 Herramienta: Apache JMeter
 Objetivo: Simular múltiples usuarios concurrentes accediendo a `http://localhost/index.html`.

 Detalles:

* 5 usuarios virtuales (threads)
* Cada uno realiza 5 validaciones (25 en total)
* Se midió tiempo promedio, máximo, mínimo, errores y throughput.

 Resultado:
El sistema respondió en promedio en 3 ms por solicitud, sin errores, con un tiempo máximo de 43 ms.



---

### 2. Medición de Rendimiento (con JSDOM)

 Herramientas: Node.js, Mocha, JSDOM
 Objetivo: Medir el tiempo de ejecución interno de `validarDocumento()`.

 Pasos:

1. Cargar `Index.html` con JSDOM
2. Configurar entorno `window` y `document`
3. Importar la función desde `script.js`
4. Ejecutar `validarDocumento()`
5. Medir con `performance.now()`

 Resultado:
Tiempo de ejecución eficiente bajo entorno simulado de navegador.

---

### 3. Auditoría de Calidad Web (Lighthouse)

 Herramienta: Lighthouse (DevTools de Chrome)
 Objetivo: Evaluar usabilidad, accesibilidad y buenas prácticas.

 Pasos:

1. Abrir el sistema en `http://127.0.0.1:5500/`
2. Ejecutar Lighthouse en modo Desktop
3. Seleccionar categorías:

   * Rendimiento
   * Accesibilidad
   * Buenas Prácticas
   * SEO
4. Analizar el reporte generado

 Resultado:
Informe automático con calificaciones por categoría, destacando accesibilidad y rendimiento.

---

##  Tecnologías Usadas

* HTML5, CSS3, JavaScript
* Node.js
* Mocha + Chai (Testing)
* JSDOM (Simulación DOM)
* Apache JMeter (Pruebas de carga)
* Lighthouse (Auditoría web)

---

##  Estructura del Proyecto

```
Code_validador/
│
├── index.html
├── styles.css
├── tests.js
├── ui-tests.js
├── package.json
│
└── features/
    ├── validador_documentos.feature
    └── step_definitions/
        └── validador_steps.js
```

---

##  Autor

*  Diego Alandro Ramirez Castro
*  Diegoarc.dev@gmail.com

---
