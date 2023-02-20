# 🎥 Cines Haven 🎥

<p align="center">
  <img width="280" alt="logo" src="https://user-images.githubusercontent.com/92323915/220186818-007160d6-0e37-430b-9e8f-7bc8cacf21ca.png">
</p>

## Descripción del proyecto

Primera versión del proyecto para los Cines Haven con el cual se pretende crear una aplicación 
web para la gestión de un hipotético cine en su versión final.

En esta primera versión la aplicación es capaz de:

- Ver que películas estan hoy en cartelera.
- Ver que películas estan en cartelera en una fecha concreta.
- Ver los detalles de la pelicula seleccionada.
- Mostrar la cartelera de la susodicha película en los siguientes dias.
- Registro y login a partir de la API.
- Modificación de los datos del usuario y subida de imagen de perfil.
- Los datos que maneja la aplicación los saca de la llama a la [API](https://github.com/JoseLuis-TR/backend-cines_haven).

## Tecnologías usadas

Esta primera versión ha sido creada con las siguientes tecnologías:

- FrontEnd
  - [Vue.js](https://vuejs.org/)
  - [Vite](https://vitejs.dev/)
  - [Vue Router](https://router.vuejs.org/)
  - [Vuetify](https://vuetifyjs.com/en/)
  - [Crypto-js](https://www.npmjs.com/package/crypto-js)
  - [Sass](https://sass-lang.com/)
- Backend
  - [Node.js](https://nodejs.org/es/)
  - [Express](https://expressjs.com/es/)
  - [Nodemom](https://www.npmjs.com/package/nodemon)
  - [router](https://www.npmjs.com/package/router)
  - [multer](https://www.npmjs.com/package/multer)
  - [cors](https://www.npmjs.com/package/cors)
  - [uuid](https://www.npmjs.com/package/uuid)

## Instalación

Para poder utilizar el proyecto en local, se recomiendan los siguientes pasos:

1. Clonar el repositorio.
    ```
    git clone https://github.com/JoseLuis-TR/cines_haven.git
    ```
2. Instalar las dependencias.
    ```
    npm install
    ```
3. Ejecutar el proyecto.
    ```
    npm run dev
    ```
4. Acceder a la aplicación en el navegador usando el enlace que indique vite al ser iniciado.

## Despliegue

La aplicación ha sido desplegada usando el servicio de [Netlify](https://www.netlify.com/) y puede ser revisado
en el siguiente [enlace](https://cines-haven.netlify.app/).

## Documentación

Para la correcta documentación del proyecto se ha hecho uso de [JSDoc](https://jsdoc.app/). Para poder generar
de manera automática.
