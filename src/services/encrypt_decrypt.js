const CryptoJS = require('crypto-js');
const { encryptDecryptKey } = require('../../constants');

const encrypt = (text)=> {
    const ciphertext = CryptoJS.AES.encrypt(text, encryptDecryptKey).toString();
    console.log(text, "  :  ", ciphertext);
    return ciphertext;
}

const decrypt = async (ciphertext)=> {
    const originalText = CryptoJS.AES.decrypt(ciphertext, encryptDecryptKey).toString(CryptoJS.enc.Utf8);
    return originalText;
}

module.exports = {
    encrypt,
    decrypt,
};