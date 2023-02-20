import sha1 from 'crypto-js/sha1';
/**
 * @file formValidations.js - Funciones para validar los formularios
 * @author José Luis Tocino Rojo
 * @see <a href="https://github.com/JoseLuis-TR/cines_haven" target="_blank">Github</a>
 */

/**
 * @module Functions_PassOperations
 */

/**
 * Encripta la contraseña utilizando sha1
 *
 * @memberof module:Functions_PassOperations
 * @function
 * @param {string} password Contraseña a encriptar
 * @return {string} Contraseña encriptada
 */
export const encriptarPass = (password) => {   
    return sha1(password).toString();
}

/**
 * Compara la contraseña encriptada con la contraseña no encriptada
 *
 * @memberof module:Functions_PassOperations
 * @function
 * @param {string} passNoHash Contraseña sin encriptar
 * @param {string} passHash Contraseña encriptada
 * @return {boolean}
 */
export const compararPass = (passNoHash, passHash) => {
    return sha1(passNoHash).toString() === passHash;
}