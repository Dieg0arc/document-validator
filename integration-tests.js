// integration-tests.js

const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'Index.html'), 'utf8');

describe('Prueba de integración - validarDocumento()', () => {
  let window, document, script;

  beforeEach(() => {
    const dom = new JSDOM(html, { runScripts: "dangerously", resources: "usable" });
    window = dom.window;
    document = dom.window.document;

    global.window = window;
    global.document = document;

    script = require('./script.js');
  });

  it('Debe mostrar resultado VÁLIDO cuando se valida una cédula correcta desde el DOM', (done) => {
    const tipoSelect = document.getElementById('tipo-documento');
    const inputNumero = document.getElementById('numero');

    tipoSelect.value = 'cedula';
    inputNumero.value = '1234567890';

    script.validarDocumento();

    const resultado = document.getElementById('resultado-validacion');

    setTimeout(() => {
      expect(resultado.textContent).to.include('VÁLIDO');
      expect(resultado.style.display).to.equal('block');
      done();
    }, 100);
  });
});
