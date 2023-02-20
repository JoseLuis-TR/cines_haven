/**
 * @file formValidations.js - Funciones para validar los formularios
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @module Functions_Validations
 */

/**
 * Función que valida el email usando una expresión regular
 *
 * @memberof module:Functions_Validations
 * @function
 * @param {string} email Email a validar
 * @return {boolean}
 */
export const validateEmailRegex = (email) => {
    // Expresión regular que testea si lo recibido es un email valido
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
}

/**
 * Función que valida la contraseña usando una expresión regular
 *
 * @memberof module:Functions_Validations
 * @function
 * @param {string} password Contraseña a validar
 * @return {boolean}
 */
export const validatePasswordRegex = (password) => {
    // Contraseñas de más de 8 a 32 y debe de tener al menos una minúscula, una mayuscula, un número y un caracter especial
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\.\-\_])[A-Za-z\d@$!%*?&\.\-\_]{8,32}$/
    return passRegex.test(password);
}

/**
 * Función que valida que la contraseña al registrarse se repite corretamente
 *
 * @memberof module:Functions_Validations
 * @function
 * @param {string} check Contraseña que debe ser igual
 * @param {string} pass Contraseña a probar
 * @return {boolean}
 */
export const validateSamePassRegex = (check, pass) => {
    return check === pass;
}

/**
 * Función que valida el nombre de usuario usando una expresión regular
 *
 * @memberof module:Functions_Validations
 * @function
 * @param {string} user Nombre de usuario a validar
 * @return {boolean}
 */
export const validateUserRegex = (user) => {
    // Nombre de usuario que acepta letras, numeros y algún caracter especial
    const userRegex = /^[A-Za-z\d]{5,30}$/;
    return userRegex.test(user);
}