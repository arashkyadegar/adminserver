const { JWE } = require('node-jose');
const { encode, decode } = require('./base64');
const fss = require('fs');
const jose = ( ) => {
  const privateKey = fss.readFileSync("id_rsa", { encoding: "utf8" });
  const publicKey = fss.readFileSync("id_rsa.pub", { encoding: "utf8" });

  async function encrypt(raw) {
    if (!raw) throw new Error('Missing raw data.')
    const buffer = Buffer.from(JSON.stringify(raw))
    const encrypted = await JWE.createEncrypt(publicKey)
      .update(buffer).final()
     return encode(encrypted)
  }
  
  async function decrypt(encrypted) {
      if (!encrypted) throw new Error('Missing encrypted data.')
      const decoded = decode(encrypted)
      const { payload } = await JWE.createDecrypt(privateKey)
        .decrypt(decoded)
      return JSON.parse(payload)
  }
  return { encrypt, decrypt }
}
module.exports = jose