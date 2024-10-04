const constants = require("../../app/utils/constants");

test('Se puede crear una escuela', async function(){
    const escuela = {
        "nombre": "Universidad Tecnológica de Torreón",
        "registro": "AAAA123456X17",
        "clave": "XY1236",
        "carreras": {
            "TIDSM": {
                "nombre": "TI Desarrollo"
            }
        },
        "colaboradores": [],
        "estudiantes": []
    };

    let created;
    let entorno = constants.ENVIRONMENTS.local;
    const URL = constants.URLS[entorno];

    let response = await fetch(`${URL}/escuela/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(escuela)
    });

    let responseBody = await response.json();
    created = responseBody.ok;

    expect(response.status).toBe(200);
    expect(created).toBe(true);

    response = await fetch(`${URL}/escuela/${escuela.clave}`, {
        method: "DELETE"
    });

    responseBody = await response.json();
    let deleted = responseBody.ok;
    expect(response.status).toBe(200);
    expect(deleted).toBe(true);
});

test('NO se puede duplicar una escuela por registro o clave', async function(){
    const escuela = {
        "nombre": "Universidad Tecnológica de Torreón",
        "registro": "AAAA123456X17",
        "clave": "XY1236",
        "carreras": {
            "TIDSM": {
                "nombre": "TI Desarrollo"
            }
        },
        "colaboradores": [],
        "estudiantes": []
    };

    let created;
    let entorno = constants.ENVIRONMENTS.local;
    const URL = constants.URLS[entorno];

    let response = await fetch(`${URL}/escuela/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(escuela)
    });

    let responseBody = await response.json();
    created = responseBody.ok;

    expect(response.status).toBe(200);
    expect(created).toBe(true);

    response = await fetch(`${URL}/escuela/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(escuela)
    });

    expect(response.status).toBe(409);

    response = await fetch(`${URL}/escuela/${escuela.clave}`, {
        method: "DELETE"
    });

    responseBody = await response.json();
    let deleted = responseBody.ok;
    expect(response.status).toBe(200);
    expect(deleted).toBe(true);
});