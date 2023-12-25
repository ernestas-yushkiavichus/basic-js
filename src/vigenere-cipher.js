const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
  }

  encrypt(message, key) {
    this.validateInput(message, key);
    const result = this.cipher(message, key, true);
    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.validateInput(encryptedMessage, key);
    const result = this.cipher(encryptedMessage, key, false);
    return this.isDirect ? result : result.split('').reverse().join('');
  }

  validateInput(message, key) {
    if (!message || !key) {
      throw new Error('Invalid input. Both message and key must be provided.');
    }
  }

  cipher(message, key, isEncrypt) {
    message = message.toUpperCase();
    key = key.toUpperCase();
    const result = [];
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (char >= 'A' && char <= 'Z') {
        const messageCharCode = char.charCodeAt(0) - 'A'.charCodeAt(0);
        const keyCharCode = key[keyIndex % key.length].charCodeAt(0) - 'A'.charCodeAt(0);
        const cipherCharCode = isEncrypt ? (messageCharCode + keyCharCode) % 26 : (messageCharCode - keyCharCode + 26) % 26;

        result.push(String.fromCharCode(cipherCharCode + 'A'.charCodeAt(0)));
        keyIndex++;
      } else {
        result.push(char);
      }
    }

    return result.join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
