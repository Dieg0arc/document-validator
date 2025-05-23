// performance-tests.js

const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

describe('Prueba de rendimiento - validarDocumento()', () => {
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
    setTimeout(() => done(), 20);
  });

  it('Debe ejecutarse en menos de 20ms', () => {
    document.getElementById('tipo-documento').value = 'telefono';
    document.getElementById('numero').value = '3001234567';

    const start = performance.now();
    script.validarDocumento();
    const end = performance.now();

    const duracion = end - start;
    console.log(`Duración: ${duracion.toFixed(2)} ms`);

    expect(duracion).to.be.below(20);
  });
});
