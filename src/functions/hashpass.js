import sha1 from 'crypto-js/sha1';

export const encriptarPass = (password) => {   
    return sha1(password).toString();
}

export const compararPass = (passNoHash, passHash) => {
    return sha1(passNoHash).toString() === passHash;
}