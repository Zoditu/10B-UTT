class Estudiante {
    constructor(nombre, apellido_paterno, apellido_materno, matricula) {
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.matricula = matricula;
        this.curp;
    }

    get getNombre() {
        return this.nombre;
    }

    set setNombre(value) {
        this.nombre = value;
    }

    get getApellidoPaterno() {
        return this.apellido_paterno;
    }

    set setApellidoPaterno(value) {
        this.apellido_paterno = value;
    }

    get getApellidoMaterno() {
        return this.apellido_materno;
    }

    set setApellidoMaterno(value) {
        this.apellido_materno = value;
    }

    get getMatricula() {
        return this.matricula;
    }

    set setMatricula(value) {
        this.matricula = value;
    }

    get getCURP() {
        return this.curp;
    }

    set setCURP(value) {
        this.curp = value;
    }
}

module.exports = Estudiante;