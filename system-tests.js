// system-tests.js

const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Prueba de sistema - Flujo completo de validación', () => {
  let window, document, script;

  beforeEach((done) => {
    const html = fs.readFileSync(path.resolve(__dirname, 'Index.html'), 'utf8');
    const dom = new JSDOM(html, {
      runScripts: "dangerously",
      resources: "usable"
    });

    window = dom.window;
    document = window.document;

    global.window = window;
    global.document = document;

    script = require('./script.js');

    setTimeout(() => done(), 50);
  });

  it('Debe completar el flujo: seleccionar tipo, ingresar dato, hacer clic, mostrar resultado y registrar fila', () => {
    document.getElementById('tipo-documento').value = 'telefono';
    document.getElementById('numero').value = '3001234567';

    script.validarDocumento();

    const resultado = document.getElementById('resultado-validacion');
    expect(resultado.innerHTML).to.include('VÁLIDO');
    expect(resultado.style.display).to.equal('block');

    const filas = document.querySelectorAll('#registro-validaciones tr');
    expect(filas.length).to.equal(1);

    const ultimaFila = filas[filas.length - 1];
    expect(ultimaFila.innerHTML).to.include('telefono');
    expect(ultimaFila.innerHTML).to.include('3001234567');
    expect(ultimaFila.innerHTML).to.include('Válido');
  });
});
