const Estudiante = require("./Estudiante");

class Escuela {
    constructor(nombre, clave, registro) {
        this.nombre = nombre;
        this.clave = clave;
        this.registro = registro;
        this.estudiantes = [];
        this.colaboradores = [];
        this.carreras = {};
    }

    get getNombre() {
        return this.nombre;
    }

    get getRegistro() {
        return this.registro;
    }

    
    get getClave() {
        return this.clave;
    }

    
    get getColaboradores() {
        return this.colaboradores;
    }

    /**
     * Regresa el arreglo de estudiantes de la escuela
     * @return {[Estudiante]}
     */
    get getEstudiantes() {
        return this.estudiantes;
    }

    
    get getCarreras() {
        return this.carreras;
    }

    set setColaboradores(value) {
        this.colaboradores = value;
    }

    /**
     * @param value {[Estudiante]} Es el arreglo de estudiantes
     */
    set setEstudiantes(value) {
        this.estudiantes = value;
    }

    set setCarreras(value) {
        this.carreras = value;
    }

}

module.exports = Escuela;