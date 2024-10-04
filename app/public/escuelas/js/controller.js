const app = Vue.createApp({
    data() {
        return {
            nuevaEscuela: {
                nombre: "",
                registro: "",
                clave: ""
            },
            message: false,
            status: false
        }
    },
    methods: {
        async crearEscuela($event) {
            $event.preventDefault(); 
            
            const copiaEscuela = Object.assign({}, this.nuevaEscuela);
            copiaEscuela.carreras = {};
            console.log(copiaEscuela);

            //Crear escuela...
            try {
                await axios.post('/escuela/new', copiaEscuela, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                //Mostrar que se creó
                this.status = true;
                this.message = "Se creó la escuela :D";
            } catch(error) {
                //Mostrar error
                this.status = false;
                this.message = "No se pudo crear la escuela D:";
            }
        }
    }
});

app.mount('#app');