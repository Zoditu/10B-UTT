#Abelardo García Reyes
FROM alpine AS primerLinux 
# Instalar git en Alpine
RUN apk add --no-cache git
# Crear una carpeta
RUN mkdir /repo
# Clonar el repositorio
RUN git clone https://github.com/AbelardoReyes/RepoDockerFile.git /repo




FROM ubuntu:latest as miUbuntu
# Copiar el repositorio clonado
COPY --from=primerLinux /repo /repoDockerFile
CMD /bin/bash
