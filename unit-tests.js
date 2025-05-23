// unit-tests.js

const { expect } = require('chai');
const { validarCedula, validarTarjetaIdentidad, validarTelefono } = require('./script.js');

describe('Pruebas Unitarias - validarCedula', () => {
    it('Debe retornar true para cédula válida de 10 dígitos', () => {
        expect(validarCedula('1234567890')).to.be.true;
    });

    it('Debe retornar false si contiene letras', () => {
        expect(validarCedula('1234a67890')).to.be.false;
    });

    it('Debe retornar false si tiene menos de 10 dígitos', () => {
        expect(validarCedula('12345678')).to.be.false;
    });

    it('Debe retornar false si tiene más de 10 dígitos', () => {
        expect(validarCedula('123456789012')).to.be.false;
    });

    it('Debe retornar true si tiene guiones o espacios pero es válida', () => {
        expect(validarCedula('123-456 7890')).to.be.true;
    });
});
