const validate = require("../../validation/escuela.validate");

test('No se puede crear una escuela con los campos obligatorios faltantes', function() {
    const escuela = {
        nombre: "Universidad Tecnológica de Torreón",
        registro: "AAAA123456X12",
        clave: "XY1234",
        carreras: {
            "TIDSM": {
                nombre: "TI Desarrollo"
            }
        },
        colaboradores: [],
        estudiantes: []
    }

    const escuelaSinRegistro = Object.assign({}, escuela);
    escuelaSinRegistro.registro = undefined;
    let resultado = validate.nuevaEscuela(escuelaSinRegistro);
    expect(resultado.error.details).toEqual([{"context": {"key": "registro", "label": "registro"}, "message": "\"registro\" is required", "path": ["registro"], "type": "any.required"}]);

    const escuelaSinNombre = Object.assign({}, escuela);
    escuelaSinNombre.nombre = undefined;
    resultado = validate.nuevaEscuela(escuelaSinNombre);
    expect(resultado.error.details).toEqual([{"context": {"key": "nombre", "label": "nombre"}, "message": "\"nombre\" is required", "path": ["nombre"], "type": "any.required"}]);

    const escuelaSinClave = Object.assign({}, escuela);
    escuelaSinClave.clave = undefined;
    resultado = validate.nuevaEscuela(escuelaSinClave);
    expect(resultado.error.details).toEqual([{"context": {"key": "clave", "label": "clave"}, "message": "\"clave\" is required", "path": ["clave"], "type": "any.required"}]);

    const escuelaSinCarreras = Object.assign({}, escuela);
    escuelaSinCarreras.carreras = undefined;
    resultado = validate.nuevaEscuela(escuelaSinCarreras);
    expect(resultado.error.details).toEqual([{"context": {"key": "carreras", "label": "carreras"}, "message": "\"carreras\" is required", "path": ["carreras"], "type": "any.required"}]);
});

test('Se puede crear una escuela', function(){
    const escuela = {
        nombre: "Universidad Tecnológica de Torreón",
        registro: "AAAA123456X12",
        clave: "XY1234",
        carreras: {
            "TIDSM": {
                nombre: "TI Desarrollo"
            }
        },
        colaboradores: [],
        estudiantes: []
    }

    let resultado = validate.nuevaEscuela(escuela);
    expect(resultado).not.toHaveProperty('error');
});