const app = Vue.createApp({
    data() {
        return {
            nuevaEscuela: {
                nombre: "",
                registro: "",
                clave: ""
            },
            escuelas: [],
            message: false,
            status: false,
            showLoader: true
        }
    },
    methods: {
        async sleep (time) {
            new Promise((resolve, reject) => {
                setTimeout(() => {
                  resolve(true);
                }, time);
            });
        },
        async ocultarLoader() {
            await this.sleep(1500);
            this.showLoader = false;
        },
        async crearEscuela($event) {
            $event.preventDefault(); 
            
            this.showLoader = true;
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

                await this.actualizarEscuelas();
            } catch(error) {
                //Mostrar error
                this.status = false;
                this.message = "No se pudo crear la escuela D:";
            } finally {
                await this.ocultarLoader();
            }
        },

        async actualizarEscuelas() {
            this.escuelas = [];
            this.showLoader = true;
            try {
                const response = await axios.get('/escuela/all', {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const _escuelas = response.data;

                _escuelas.forEach(escuela => {
                    this.escuelas.push(escuela);
                });
            } catch(error) {
                console.error(error);
                this.escuelas = [];
            } finally {
                await this.ocultarLoader();
            }
        },

        async borrarEscuela(clave) {

            this.showLoader = true;
            try {
                await axios.delete(`/escuela/${clave}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                this.status = true;
                this.message = "Se eliminó la escuela :D";
            } catch(error) {
                this.status = false;
                this.message = "No se pudo eliminar la escuela D:";
            } finally {
                await this.actualizarEscuelas();
            }
        }
    },
    mounted() {
        this.actualizarEscuelas();
    }
});

app.mount('#app');