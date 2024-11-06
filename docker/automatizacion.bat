# Limpiar todos los containers y la caché
docker system prune -af
# Crear nuestro docker container
docker build -t 10b .
# Ejecutar el container para que genere un resultado
docker run -it 10b

# Sacar el último ID del container que hicimos
docker ps -aql > ids.txt
set /p id= < ids.txt
del ids.txt

# Extraer el reporte
docker cp %id%:/mochawesome-report .