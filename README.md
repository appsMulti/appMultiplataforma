# FCA Proyecto Apps Multiplataforma
Análisis, diseño e implementación del proyecto Final de la materia de aplicaciones multiplataforma 

## Integrantes:
 * Amezcua Arévalo Santiago
 * Centeno Cruz Mario Alberto
 * Cornejo Cornejo Gerardo Daniel
 * Ramos Morlet Iovanni José
 * Vázquez Díaz Yiria


## Para trabajar de forma remota
### Pre requisitos

* [Instalar git](https://git-scm.com/downloads/win)
> Descargar Standalone version


---
#### Para estar en el mismo entorno de trabajo

* [Instalar la version __24.15.0__ de Node.js](https://nodejs.org/en/download)
> Descargar la version *prebuilt* en su forma .msi, se encuentra bajando el bloque de código y elegir la arquitectura adecuada
---
### Instalar pgAdmin
* [Instalar pgAdmin 4 v9.14](https://www.pgadmin.org/download/pgadmin-4-windows/)
> Si tienen preguntas preguntarle a **io**

### Instalar postgressql
* [Instalar postgressql 17.9](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

----
## Para descargar el proyecto y trabajarlo de forma local
Crear una nueva carpeta donde descargaras todo el repositorio

__Dentro de esa carpeta inicializar git desde la terminal de git__

``git init``

# **IMPORTANTE**

>Después de eso, debes crear un a llave SSH, si no sabes cómo preguntale a gemini____


> ----
__Hacer un pull para instalar todo el repositorio de forma local__
---
Renombrar el nombre de la rama donde trabajarás como main


``git branch -m main``

## __*IMPORTANTE*__
__La primera vez, y solo la primera vez que se vayan a hacer un commit, correr el siguiente comando para vincular con el repositorio__

``git remote add appMultiplataforma https://github.com/appsMulti/appMultiplataforma.git``

>Cambia a tu rama personal para que no haya conflictos

``git branch <Nombre>``

### Para empezar a hacer cambios y no haya problemas, hazlo desde tu rama 

``git checkout <Nombre>``

# Debes crear la base de datos para poder conectarte en los siguientes pasos
* Pon el nombre que tu quieras a la BD, no es importante
* Entra a la DB y crea todas las tablas con el archivo [Crear db](./creartablas.sql)
>> copia y pega todo el archivo

## **IMPORTANTE**
> Asegurate de estar en la carpeta principal donde esta todo el proyecto para los siguientes pasos

* Modificar el archivo llamado __.env_example__ y renombrarlo como: __.env__ y modifica los siguientes valores
**Asegurate de crear la copia antes de comenzar a modificar el archivo, no lo elimines**

```
DB_HOST = <host que creaste en pgAdmin>
DB_USER = <userName de pgAdmin>
DB_PASSWORD = <password para el usuario en pgAdmin>
DB_NAME = <nombre de la base de datos que creaste para el proyecto en pgAdmin>
```

* Crear un archivo llamado ".gitignore" donde se escribirán los archivos que se ignorarán

> Agregar lo siguiente:
```
.gitignore 
.env
```

## __Antes de subir los cambios, hacer un git pull para estar en la versión más reciente del proyecto__

``git pull --no-rebase`` 
> De esta forma descarga los cambios que se han realizado en el repositorio para mantener la integridad

## Para subir cambios  
Para hacer un commit de todos los cambios, debes estar en la carpeta donde se encuentren todos los archivos del proyecto
>### Antes de hacer cambios

* Asegurarte de que existe .gitignore con los archivos que mencioné en la sección anterior

``git add .``
> Esto guardará TODOS los cambios y permitirá que puedas subirlos al repositorio

``git commit -m "Mensaje" ``
> Seguir una estructura de mensajes, que sean concisos de lo que se cambio
----

### __Para subir los cambios por primera vez__

``git push --set-upstream appMultiplataforma <Nombre de tu rama>``

## __Después de subir los cambios por primera vez__

> De ahora en adelante será solamente

``git push``

---
# IMPORTANTE
## Para jalar los ultimos cambios a tu rama

> Desde tu rama corre lo siguiente

```
git rebase main
git push 
```

> Esto hará que los cambios más recientes de main, estén en tu rama
----

----
# Una vez creado todo el entorno lo puedes probar
> Dentro de la carpeta donde esta el proyecto:

 ``node index.js``

 > Y te debera aparecer en consola que la aplicación esta siendo ejecutada en __localhost:3000__