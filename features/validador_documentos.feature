    @validacion
    Feature: Validación de documentos e información colombiana
    Como usuario del sistema
    Quiero validar diferentes tipos de documentos e información
    Para asegurar que cumplan con los formatos requeridos

    Background:
        Given el usuario está en la página del Validador de Documentos

    @cedula @positivo
    Scenario: Validación exitosa de cédula de ciudadanía
        When selecciona "Cédula de Ciudadanía" en el tipo de documento
        And ingresa "1234567890" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "VÁLIDO"
        And se debería agregar un registro en la tabla con tipo "cedula" y resultado "Válido"

    @cedula @negativo
    Scenario: Validación fallida de cédula con longitud incorrecta
        When selecciona "Cédula de Ciudadanía" en el tipo de documento
        And ingresa "12345678" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "INVÁLIDO"
        And se debería agregar un registro en la tabla con tipo "cedula" y resultado "Inválido"

    @tarjeta @positivo
    Scenario: Validación exitosa de tarjeta de identidad de 10 dígitos
        When selecciona "Tarjeta de Identidad" en el tipo de documento
        And ingresa "9876543210" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "VÁLIDO"
        And se debería agregar un registro en la tabla con tipo "tarjeta" y resultado "Válido"

    @tarjeta @positivo
    Scenario: Validación exitosa de tarjeta de identidad de 11 dígitos
        When selecciona "Tarjeta de Identidad" en el tipo de documento
        And ingresa "98765432109" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "VÁLIDO"
        And se debería agregar un registro en la tabla con tipo "tarjeta" y resultado "Válido"

    @telefono @positivo
    Scenario: Validación exitosa de número de teléfono colombiano
        When selecciona "Número de Teléfono" en el tipo de documento
        And ingresa "3001234567" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "VÁLIDO"
        And se debería agregar un registro en la tabla con tipo "telefono" y resultado "Válido"

    @telefono @negativo
    Scenario: Validación fallida de número de teléfono con caracteres no numéricos
        When selecciona "Número de Teléfono" en el tipo de documento
        And ingresa "300-123-4567" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "VÁLIDO"
        And se debería agregar un registro en la tabla con tipo "telefono" y resultado "Válido"

    @telefono @formato @positivo
    Scenario: Validación exitosa de número de teléfono con prefijo internacional
        When selecciona "Número de Teléfono" en el tipo de documento
        And ingresa "+573001234567" en el campo de número
        And hace clic en el botón Validar
        Then debería ver un mensaje de "VÁLIDO"
        And se debería agregar un registro en la tabla con tipo "telefono" y resultado "Válido"

    @pruebas @ui
    Scenario: Ejecución de pruebas de interfaz
        When selecciona "Pruebas de Interfaz" en el tipo de prueba
        And hace clic en el botón "Ejecutar Pruebas"
        Then debería ver el panel de pruebas con los casos de interfaz
        And cada caso debería tener un selector de estado