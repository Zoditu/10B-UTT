const Mathematics = require("./Mathematics");

test('La suma de 4, 5, 6 es 15', function(){
    const math = new Mathematics();
    const suma = math.suma(4, 5, 6);

    expect(suma).toBe(15);
});

test('La resta de 4, 3 es 1', function(){
    const math = new Mathematics();
    const resta = math.resta(4, 3);

    expect(resta).toBe(1);
});

//const resta = math.resta(4, 3);